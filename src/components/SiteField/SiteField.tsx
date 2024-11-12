import { DisabledProps, LoadingProps } from '@/types/Props';

import { Form } from '../Form/Form';

type SiteFieldProps = LoadingProps<
  DisabledProps<{
    label?: string;
  }>
>;

export const SiteField: React.FC<SiteFieldProps> = ({ isLoading, isDisabled, label }) => {
  return <Form.InputField name="name" placeholder="Your site name" label={label} isLoading={isLoading} isDisabled={isDisabled} autoFocus />;
};
