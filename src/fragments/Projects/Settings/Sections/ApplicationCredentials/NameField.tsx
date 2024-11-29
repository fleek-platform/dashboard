import { Form } from '@/components';
import type { LoadingProps } from '@/types/Props';

export const NameField: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Form.InputField
      name="name"
      placeholder="Application"
      label="Name"
      isLoading={isLoading}
      autoFocus
    />
  );
};
