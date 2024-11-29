import { Form, ToggleButton } from '@/components';
import type { DisabledProps, LoadingProps } from '@/types/Props';
import { FormField } from '@/ui';

import { EnvironmentVariablesStyles as S } from '../EnvironmentVariables.styles';

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
    <S.VisibilityField.Root>
      {!disableLabel && <FormField.Label>Encrypt</FormField.Label>}
      <ToggleButton
        value={field.value}
        onChange={handleValueChange}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </S.VisibilityField.Root>
  );
};
