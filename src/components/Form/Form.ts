import { createExtraValidation } from './createExtraValidation';
import {
  FormProvider,
  useForm,
  useFormContext,
  useFormField,
} from './FormProvider';
import { InputField } from './InputField/InputField';
import { SubmitButton } from './SubmitButton/SubmitButton';

export const Form = {
  useForm: useForm,
  useContext: useFormContext,
  useField: useFormField,

  Provider: FormProvider,
  InputField: InputField,
  SubmitButton: SubmitButton,

  createExtraValidation,
};

export interface FormValues {
  // biome-ignore lint/suspicious/noExplicitAny: Allow any for flexible form values
  [key: string]: any;
}
