import { functionName, slug } from '@fleek-platform/utils-validation';
import { useState } from 'react';
import { useClient } from 'urql';
import zod from 'zod';

import { PermissionsTooltip, SettingsBox } from '@/components';
import { Form } from '@/components/Form/Form';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { ChildrenProps } from '@/types/Props';
import { Box } from '@/ui';

import { SlugField } from './SlugField';

type UpdateFormType = 'slug' | 'name';
type UpdateFormProps = ChildrenProps<{
  type: UpdateFormType;
  value: string;
  isLoading?: boolean;
  onSubmit: (v: Record<string, string>) => Promise<void>;
}>;

export const UpdateForm = ({ children, type, value, isLoading, onSubmit }: UpdateFormProps) => {
  const client = useClient();
  const [saving, setSaving] = useState(false);

  const hasEditFunctionSettingsPermission = usePermissions({ action: [constants.PERMISSION.FUNCTIONS.EDIT_SETTINGS] });

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
        <PermissionsTooltip hasAccess={hasEditFunctionSettingsPermission} isLoading={isLoading}>
          <FieldComponent
            name={type}
            disabled={saving || !hasEditFunctionSettingsPermission}
            onKeyDown={({ key }) => {
              if (key === 'Enter' && form.isValid) {
                form.submit();
              }
            }}
            isLoading={isLoading}
          />
        </PermissionsTooltip>

        <Box className="flex-row items-center justify-between">
          {children}
          {isLoading ? <SettingsBox.Skeleton variant="button" /> : <Form.SubmitButton loading={saving}>Save Changes</Form.SubmitButton>}
        </Box>
      </Box>
    </Form.Provider>
  );
};
