import {
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  ProjectField,
} from '@/components';
import { SettingsBox } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';

type RenameProjectProps = LoadingProps;

export const RenameProject: React.FC<RenameProjectProps> = ({ isLoading }) => {
  const hasRenameProjectPermission = usePermissions({
    action: [constants.PERMISSION.PROJECT.EDIT_NAME],
  });

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Project Name</SettingsBox.Title>
      <SettingsBox.Text>
        This is your project&apos;s name within Fleek. For example, the name of
        your company.
      </SettingsBox.Text>

      <PermissionsTooltip hasAccess={hasRenameProjectPermission}>
        <ProjectField
          isLoading={isLoading}
          isDisabled={!hasRenameProjectPermission}
        />
      </PermissionsTooltip>
      <SettingsBox.ActionRow>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_PROJECT_NAME}
        >
          project names
        </LearnMoreMessage>

        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <Form.SubmitButton>Save changes</Form.SubmitButton>
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
