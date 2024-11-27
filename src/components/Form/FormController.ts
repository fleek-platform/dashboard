import type { AnyZodObject } from 'zod';
import zod from 'zod';

import { secrets } from '@/secrets';

const DEFAULT_OPTIONS: FormController.FormOptions = {
  validateNotDirty: false,
  validationDebounce: secrets.TEST_MODE ? 0 : 700,
  partial: false,
};

export class FormController<Values extends FormController.FormValues, Response> {
  private initialValues: Values;
  private schema: FormController.ValidationSchema;
  private extraValidations: FormController.ExtraValidations<Values>;
  private fieldListeners: {
    [key in keyof Values]: ((field: FormController.Field<Values[key]>) => void)[];
  };
  private formListeners: ((form: FormController<Values, Response>) => void)[];
  private submitHandler: FormController.SubmitHandler<Values, Response>;
  private options: FormController.FormOptions;

  public fields: FormController.Fields<Values>;
  public isSubmitting = false;

  constructor(args: FormController.ConstructorArgs<Values, Response>) {
    this.schema = args.schema || (zod.object({}) as FormController.ValidationSchema);
    this.initialValues = args.values;
    this.extraValidations = args.extraValidations || {};
    this.submitHandler = args.onSubmit;

    this.fieldListeners = this.createFieldListeners(args.values);
    this.formListeners = [];

    this.options = Object.assign({}, DEFAULT_OPTIONS, args.options || {});

    this.fields = this.createFields(args.values);
  }

  public get isValid() {
    if (this.options.partial) {
      return Object.values(this.fields).every(
        (field) => field.status !== 'invalid' && field.status !== 'validating' && field.status !== 'debouncing'
      );
    }

    return Object.values(this.fields).every((field) => field.status === 'valid');
  }

  public get isDirty() {
    return Object.values(this.fields).some((field) => field.dirty);
  }

  public get shouldDisableSubmit() {
    return !this.isDirty || this.isSubmitting || !this.isValid;
  }

  public get values() {
    return Object.keys(this.fields).reduce((acc, key: keyof Values) => {
      acc[key] = this.fields[key].value;

      return acc;
    }, {} as Values);
  }

  public submit = async () => {
    if (!this.isValid) {
      console.error('Form is not valid', this.fields);

      return;
    }

    try {
      this.isSubmitting = true;
      this.emitFormChange();

      const result = await this.submitHandler(this.values);

      this.isSubmitting = false;
      this.emitFormChange();

      return result;
    } catch (error) {
      this.isSubmitting = false;
      this.emitFormChange();

      throw error;
    }
  };

  public validate = async () => {
    const validationPromises = Object.keys(this.fields).map((key) => this.validateField(key as keyof Values));

    await Promise.all(validationPromises);

    return this.isValid;
  };

  public validateField = async <Key extends keyof Values>(key: Key) => {
    if (!this.options.validateNotDirty && !this.fields[key].dirty) {
      return;
    }

    const validationResult = this.schema.shape[key]?.safeParse(this.fields[key].value);

    if (validationResult && !validationResult.success) {
      // when the field is in the schema but the value is invalid
      this.handleStatusChange(key, 'invalid', validationResult.error.issues[0].message);

      return;
    }

    const extraValidation = this.extraValidations[key];

    if (extraValidation) {
      const willValidateFor = this.fields[key].value;

      this.handleStatusChange(key, 'validating');
      const validationResult = await extraValidation(willValidateFor);

      if (willValidateFor === this.fields[key].value) {
        // if there is no change then set the result

        this.handleStatusChange(key, validationResult.status, validationResult.message);
      }

      return;
    }

    this.handleStatusChange(key, 'valid');
  };

  public resetForm = (values: Partial<Values> = {}) => {
    this.initialValues = Object.assign({}, this.initialValues, values);

    this.fields = this.createFields(this.initialValues);
  };

  public addFieldListener = <Key extends keyof Values>(key: Key, listener: (field: FormController.Field<Values[Key]>) => void) => {
    this.fieldListeners[key].push(listener);
  };

  public removeFieldListener = <Key extends keyof Values>(key: Key, listener: (field: FormController.Field<Values[Key]>) => void) => {
    this.fieldListeners[key] = this.fieldListeners[key].filter((l) => l !== listener);
  };

  public addFormListener = (listener: (form: FormController<Values, Response>) => void) => {
    this.formListeners.push(listener);
  };

  public removeFormListener = (listener: (form: FormController<Values, Response>) => void) => {
    this.formListeners = this.formListeners.filter((l) => l !== listener);
  };

  private handleValueChange<Key extends keyof Values>(key: Key, value: Values[Key], skipDebounce = false) {
    this.fields[key].value = value;
    this.fields[key].dirty = this.fields[key].value !== this.initialValues[key];
    this.fields[key].message = undefined;
    this.fields[key].status = this.fields[key].dirty ? 'debouncing' : 'pending';
    this.emitFieldChange(key);

    if (skipDebounce) {
      this.validateField(key);

      return;
    }

    // debounce
    new Promise((resolve) => setTimeout(resolve, this.options.validationDebounce)).then(() => {
      if (this.fields[key].value !== value) {
        return;
      }

      this.validateField(key);
    });
  }

  private handleTouchChange<Key extends keyof Values>(key: Key, touched: boolean) {
    this.fields[key].touched = touched;

    this.emitFieldChange(key);

    // validate if the field is not validated already
    if (this.fields[key].status === 'pending') {
      this.validateField(key);
    }
  }

  private handleStatusChange<Key extends keyof Values>(key: Key, status: FormController.FieldStatus, message?: React.ReactNode) {
    this.fields[key].status = status;
    this.fields[key].message = message;

    this.emitFieldChange(key);
  }

  private emitFieldChange<Key extends keyof Values>(key: Key) {
    this.fieldListeners[key].forEach((listener) => listener(this.fields[key]));
    this.emitFormChange();
  }

  private emitFormChange() {
    this.formListeners.forEach((listener) => listener(this));
  }

  private createFields(values: Values): FormController.Fields<Values> {
    return Object.keys(values).reduce((acc, key: keyof Values) => {
      acc[key] = {
        value: values[key],
        setValue: (value, skipDebounce) => this.handleValueChange(key, value, skipDebounce),
        status: this.schema.shape[key] || this.extraValidations[key] ? 'pending' : 'valid',
        dirty: false,
        touched: false,
        setTouched: (touched) => this.handleTouchChange(key, touched),
      };

      return acc;
    }, {} as FormController<Values, Response>['fields']);
  }

  private createFieldListeners(values: Values) {
    return Object.keys(values).reduce((acc, key: keyof Values) => {
      acc[key] = [];

      return acc;
    }, {} as FormController<Values, Response>['fieldListeners']);
  }

  /**
   * The next methods are used to bypass the memorized reference and keep the form callback updated
   */

  public set _submitHandler(handler: FormController.SubmitHandler<Values, Response>) {
    this.submitHandler = handler;
  }

  public set _schema(schema: FormController.ValidationSchema) {
    this.schema = schema;
  }

  public set _extraValidations(extraValidations: FormController.ExtraValidations<Values>) {
    this.extraValidations = extraValidations;
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FormController {
  export type FormValues = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [field: string]: any;
  };

  export type SubmitHandler<Values extends FormValues, Response> = (values: Values) => Promise<Response>;

  export type ConstructorArgs<Values extends FormValues, Response> = {
    values: Values;
    schema?: ValidationSchema;
    extraValidations?: {
      [key in keyof Values]?: ExtraValidation<key, Values>;
    };
    onSubmit: SubmitHandler<Values, Response>;
    options?: Partial<FormOptions>;
  };

  export type FormOptions = {
    /**
     * If true, the form will validate the fields when they are not dirty
     *
     * @default false
     */
    validateNotDirty: boolean;
    /**
     * The debounce time for the change validation
     *
     * @default 700
     */
    validationDebounce: number;
    /**
     * Accept partially valid forms.
     *
     * Useful for update forms and forms that have optional fields.
     *
     * @default false
     */
    partial: boolean;
  };

  // TODO: Add generic type <Values extends FormValues> back
  export type ValidationSchema = AnyZodObject;

  export type ExtraValidationResult = { status: FieldStatusCompleted; message?: React.ReactNode };

  export type ExtraValidation<Key extends keyof Values, Values extends FormValues> = (arg: Values[Key]) => Promise<ExtraValidationResult>;

  export type ExtraValidations<Values extends FormValues> = {
    [key in keyof Values]?: FormController.ExtraValidation<key, Values>;
  };

  export type FieldStatusCompleted = 'valid' | 'invalid' | 'other';

  export type FieldStatus = 'pending' | 'debouncing' | 'validating' | FieldStatusCompleted;

  export type Field<Type> = {
    value: Type;
    setValue: (value: Type, skipDebounce?: boolean) => void;
    status: FieldStatus;
    dirty: boolean;
    touched: boolean;
    setTouched: (touched: boolean) => void;
    message?: React.ReactNode;
  };

  export type Fields<Values extends FormValues> = {
    [key in keyof Values]: Field<Values[key]>;
  };
}
