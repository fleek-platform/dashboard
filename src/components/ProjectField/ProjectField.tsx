import type { DisabledProps, LoadingProps } from '@/types/Props';

import { Form } from '../Form/Form';

export const ProjectField: React.FC<LoadingProps<DisabledProps>> = ({
  isLoading,
  isDisabled,
}) => {
  return (
    <Form.InputField
      name="name"
      placeholder="Project name"
      isLoading={isLoading}
      isDisabled={isDisabled}
    />
  );
};
