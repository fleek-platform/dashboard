import { functionName, slug } from '@fleek-platform/utils-validation';
import { type PropsWithChildren, useState } from 'react';
import { useClient } from 'urql';
import zod from 'zod';

import { SettingsBox } from '@/components';
import { Form } from '@/components/Form/Form';
import { Box } from '@/ui';

import { SlugField } from './SlugField';

type UpdateFormType = 'slug' | 'name';
type UpdateFormProps = PropsWithChildren<{
  type: UpdateFormType;
  value: string;
  isLoading?: boolean;
  onSubmit: (v: Record<string, string>) => Promise<void>;
}>;

export const UpdateForm = ({ children, type, value, isLoading, onSubmit }: UpdateFormProps) => {
  const client = useClient();
  const [saving, setSaving] = useState(false);
  const form = Form.useForm({
    values: { [type]: value },
    schema: zod.object({ [type]: type === 'name' ? functionName : slug }),
    extraValidations: {
      slug: Form.createExtraValidation.slug(client),
      name: Form.createExtraValidation.functionName(client),
    },
    onSubmit: async (arg) => {
      setSaving(true);
      await onSubmit(arg);
      setSaving(false);
    },
  });

  const FieldComponent = type === 'slug' ? SlugField : Form.InputField;

  return (
    <Form.Provider value={form}>
      <Box className="gap-4">
        <FieldComponent
          name={type}
          disabled={saving}
          onKeyDown={({ key }) => {
            if (key === 'Enter' && form.isValid) {
              form.submit();
            }
          }}
          isLoading={isLoading}
        />

        <Box className="flex-row items-center justify-between">
          {children}
          {isLoading ? <SettingsBox.Skeleton variant="button" /> : <Form.SubmitButton loading={saving}>Save Changes</Form.SubmitButton>}
        </Box>
      </Box>
    </Form.Provider>
  );
};
