import {
  FormProvider,
  useForm,
  useFormContext,
  useFormField,
} from './FormProvider';
import { InputField } from './InputField/InputField';
import { SubmitButton } from './SubmitButton/SubmitButton';
import { createExtraValidation } from './createExtraValidation';

export const Form = {
  useForm: useForm,
  useContext: useFormContext,
  useField: useFormField,

  Provider: FormProvider,
  InputField: InputField,
  SubmitButton: SubmitButton,

  createExtraValidation,
};
