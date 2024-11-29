import { LogoUpload, type LogoUploadProps, SettingsBox } from '@/components';
import { useMeQuery } from '@/generated/graphqlClient';
import type { LoadingProps } from '@/types/Props';

export type ChangeAvatarProps = LoadingProps<
  Pick<LogoUploadProps, 'onSubmit' | 'initialImage'>
>;

export const ChangeAvatar: React.FC<ChangeAvatarProps> = ({
  onSubmit,
  initialImage,
  isLoading,
}) => {
  const [meQuery] = useMeQuery();

  return (
    <SettingsBox.Container>
      <SettingsBox.ActionRow>
        <SettingsBox.Column>
          <SettingsBox.Title>Avatar</SettingsBox.Title>
          <SettingsBox.Text>
            Set an image as your account&apos;s profile picture.
          </SettingsBox.Text>
        </SettingsBox.Column>

        {isLoading ? (
          <SettingsBox.Skeleton variant="logo" />
        ) : (
          <LogoUpload
            onSubmit={onSubmit}
            initialImage={initialImage}
            withAvatar={!initialImage}
            avatarTitle={meQuery.data?.user.id}
          />
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
