import {
  LogoUpload,
  type LogoUploadProps,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import type { LoadingProps } from '@/types/Props';

export type SiteLogoProps = LoadingProps<
  Pick<LogoUploadProps, 'onSubmit' | 'initialImage'>
>;

export const SiteLogo: React.FC<SiteLogoProps> = ({
  onSubmit,
  initialImage,
  isLoading,
}) => {
  const router = useRouter();
  const hasSiteLogoPermission = usePermissions({
    action: [constants.PERMISSION.SITE.EDIT_AVATAR],
  });

  return (
    <SettingsBox.Container>
      <SettingsBox.ActionRow>
        <SettingsBox.Column>
          <SettingsBox.Title>Site Avatar</SettingsBox.Title>
          <SettingsBox.Text>
            Click on the avatar to upload a custom one.
          </SettingsBox.Text>
        </SettingsBox.Column>

        {isLoading ? (
          <SettingsBox.Skeleton variant="logo" />
        ) : (
          <PermissionsTooltip hasAccess={hasSiteLogoPermission}>
            <LogoUpload
              onSubmit={onSubmit}
              initialImage={initialImage}
              withAvatar
              avatarTitle={router.query.siteId!}
              isDisabled={!hasSiteLogoPermission}
            />
          </PermissionsTooltip>
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
