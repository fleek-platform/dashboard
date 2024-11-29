import { Form } from '@/components';
import type { DisabledProps, LoadingProps } from '@/types/Props';

export const KeyField: React.FC<LoadingProps<DisabledProps>> = ({
  isLoading,
  isDisabled,
}) => {
  return (
    <Form.InputField
      name="key"
      placeholder="EXAMPLE_NAME"
      label="Name"
      isLoading={isLoading}
      isDisabled={isDisabled}
    />
  );
};
