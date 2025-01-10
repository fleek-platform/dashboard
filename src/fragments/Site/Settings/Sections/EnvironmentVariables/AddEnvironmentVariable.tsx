import {
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';
import { FormField } from '@/ui';

import { KeyField } from './Fields/KeyField';
import { ValueField } from './Fields/ValueField';
import { VisibilityField } from './Fields/VisibilityField';

export const AddEnvironmentVariable: React.FC<LoadingProps> = ({
  isLoading,
}) => {
  const hasEditEnvVariablesPermission = usePermissions({
    action: [constants.PERMISSION.SITE.EDIT_ENV_VARIABLES],
  });

  return (
    <SettingsBox.Container className="bg-transparent">
      <SettingsBox.Column>
        <SettingsBox.Title>Environment variables</SettingsBox.Title>
        <SettingsBox.Text>
          Set environment variables for when your site is built.
          {/* TODO: add "Paste a .env file below to populate multiple variables at once." once functionality is added */}
        </SettingsBox.Text>
      </SettingsBox.Column>

      <SettingsBox.FieldsRow>
        <PermissionsTooltip
          className="flex-1"
          hasAccess={hasEditEnvVariablesPermission}
        >
          <FormField.Root className="flex-1">
            <KeyField
              isLoading={isLoading}
              isDisabled={!hasEditEnvVariablesPermission}
            />
          </FormField.Root>
        </PermissionsTooltip>

        <PermissionsTooltip
          className="flex-1"
          hasAccess={hasEditEnvVariablesPermission}
        >
          <FormField.Root className="flex-1">
            <ValueField
              isLoading={isLoading}
              isDisabled={!hasEditEnvVariablesPermission}
            />
          </FormField.Root>
        </PermissionsTooltip>

        <PermissionsTooltip hasAccess={hasEditEnvVariablesPermission}>
          <VisibilityField
            isLoading={isLoading}
            isDisabled={!hasEditEnvVariablesPermission}
          />
        </PermissionsTooltip>
      </SettingsBox.FieldsRow>

      <SettingsBox.ActionRow>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_ENVIRONMENT_VARIABLES}
        >
          environment variables
        </LearnMoreMessage>
        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <Form.SubmitButton>Add Variable</Form.SubmitButton>
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
