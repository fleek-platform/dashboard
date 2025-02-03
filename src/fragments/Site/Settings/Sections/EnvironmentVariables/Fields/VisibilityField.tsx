import { Form, ToggleButton } from '@/components';
import { DisabledProps, LoadingProps } from '@/types/Props';
import { FormField } from '@/ui';

type VisibilityFieldProps = LoadingProps<
  DisabledProps<{
    disableLabel?: boolean;
  }>
>;

export const VisibilityField: React.FC<VisibilityFieldProps> = ({
  isLoading,
  isDisabled,
  disableLabel,
}) => {
  const field = Form.useField<boolean>('encrypted');

  const handleValueChange = (value: boolean) => {
    field.setValue(value, true);
  };

  return (
    <FormField.Root className="flex-grow-0">
      {!disableLabel && <FormField.Label>Encrypt</FormField.Label>}
      <ToggleButton
        value={field.value}
        onChange={handleValueChange}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </FormField.Root>
  );
};
