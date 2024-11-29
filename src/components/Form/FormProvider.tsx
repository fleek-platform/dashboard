import { useEffect, useMemo, useState } from 'react';

import { createContext } from '@/utils/createContext';

import { FormController } from './FormController';
import type { FormValues } from '@/components/Form/Form';

const [Provider, useInternalForm] = createContext<FormController<FormValues, void>>({
  hookName: 'Form.useContext',
  providerName: 'Form.Provider',
  name: 'Form',
});

export const useForm = <Values extends FormController.FormValues, Response>(
  args: FormController.ConstructorArgs<Values, Response>,
) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: values are handled by valueReferences utility
  const form = useMemo(
    () => new FormController<Values, Response>(args),
    valueReferences(args.values), // recreate the form when the values change  
  );

  /**
   * The next methods are used to bypass the memorized reference and keep the form functions updated
   */
  form._submitHandler = args.onSubmit;

  if (args.schema) {
    form._schema = args.schema;
  }

  if (args.extraValidations) {
    form._extraValidations = args.extraValidations;
  }

  return form;
};

export const useFormField = <Type,>(fieldName: string) => {
  const form = useFormWithListener(fieldName);

  return form.fields[fieldName] as FormController.Field<Type>;
};

export const useFormContext = <
  Values extends FormController.FormValues,
  Response,
>() => {
  return useFormWithListener() as FormController<Values, Response>;
};

export const FormProvider = Provider;

const useFormWithListener = (field?: string) => {
  const form = useInternalForm();

  const [, setState] = useState(0);

  useEffect(() => {
    const listener = () => setState((state) => state + 1);

    if (field) {
      form.addFieldListener(field, listener);
    } else {
      form.addFormListener(listener);
    }

    return () => {
      if (field) {
        form.removeFieldListener(field, listener);
      } else {
        form.removeFormListener(listener);
      }
    };
  }, [form, field]);

  return form;
};

// TODO: Move as an utility?
const valueReferences = <
  ValueReferencesProps extends FormController.FormValues,
>(
  values: ValueReferencesProps,
) => {
  return Object.values(values).map((value) =>
    typeof value === 'object' ? JSON.stringify(value) : value,
  );
};
