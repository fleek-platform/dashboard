import { Form } from '@/components';
import { DisabledProps, LoadingProps } from '@/types/Props';

type ValueFieldProps = LoadingProps<
  DisabledProps<{
    disableLabel?: boolean;
  }>
>;

export const ValueField: React.FC<ValueFieldProps> = ({
  isLoading,
  isDisabled,
  disableLabel = false,
}) => {
  const field = Form.useField<boolean>('encrypted');

  return (
    <Form.InputField
      name="value"
      label={disableLabel ? '' : 'Value'}
      placeholder="someValue"
      type={field.value ? 'password' : 'text'}
      isLoading={isLoading}
      disableValidMessage
      disableValidationDebounce
      isDisabled={isDisabled}
    />
  );
};
