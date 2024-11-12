import { LogoUpload, LogoUploadProps, PermissionsTooltip } from '@/components';
import { SettingsBox } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionContext } from '@/providers/SessionProvider';
import { LoadingProps } from '@/types/Props';

export type ProjectLogoProps = LoadingProps<Pick<LogoUploadProps, 'onSubmit' | 'initialImage'>>;

export const ProjectLogo: React.FC<ProjectLogoProps> = ({ onSubmit, initialImage, isLoading }) => {
  const session = useSessionContext();
  const hasChangeAvatarPermission = usePermissions({ action: [constants.PERMISSION.PROJECT.EDIT_AVATAR] });

  return (
    <SettingsBox.Container>
      <SettingsBox.ActionRow>
        <SettingsBox.Column>
          <SettingsBox.Title>Project Avatar</SettingsBox.Title>
          <SettingsBox.Text>Click on the avatar to upload a custom one.</SettingsBox.Text>
        </SettingsBox.Column>

        {isLoading ? (
          <SettingsBox.Skeleton variant="logo" />
        ) : (
          <PermissionsTooltip hasAccess={hasChangeAvatarPermission}>
            <LogoUpload
              onSubmit={onSubmit}
              initialImage={initialImage}
              withAvatar={!initialImage}
              avatarTitle={session.project.id}
              isDisabled={!hasChangeAvatarPermission}
            />
          </PermissionsTooltip>
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
