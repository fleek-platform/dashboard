import { LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { LoadingProps } from '@/types/Props';
import { Button } from '@/ui';

import { DeleteSiteModal, DeleteSiteModalProps } from './DeleteUserModal';

export type DeleteUserProps = LoadingProps<
  Pick<DeleteSiteModalProps, 'username'>
>;

export const DeleteUser: React.FC<DeleteUserProps> = ({
  username,
  isLoading,
}) => {
  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Delete Account</SettingsBox.Title>
      <SettingsBox.Text>
        Delete your Fleek account and all projects, files, and data. This action
        is irreversible.
      </SettingsBox.Text>

      <SettingsBox.ActionRow>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_DELETE_ACCOUNT}
        >
          deleting an account
        </LearnMoreMessage>

        <DeleteSiteModal username={username}>
          {isLoading ? (
            <SettingsBox.Skeleton variant="button" />
          ) : (
            <Button intent="danger" disabled>
              Delete account
            </Button>
          )}
        </DeleteSiteModal>
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
