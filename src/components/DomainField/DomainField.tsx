import type { DisabledProps, LoadingProps } from '@/types/Props';

import { Form } from '../Form/Form';

export type DomainFieldProps = LoadingProps<
  DisabledProps<{
    withLabel?: boolean;
  }>
>;

export const DomainField: React.FC<DomainFieldProps> = ({
  isLoading,
  isDisabled,
  withLabel = false,
}) => {
  return (
    <Form.InputField
      name="hostname"
      placeholder="example.com"
      label={withLabel ? 'Domain' : undefined}
      isLoading={isLoading}
      isDisabled={isDisabled}
    />
  );
};
