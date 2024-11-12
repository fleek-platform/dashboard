import { useDynamicContext, useUserUpdateRequest, useUserWallets } from '@dynamic-labs/sdk-react-core';
import { useEffect, useState } from 'react';
import { useEnsName } from 'wagmi';

import { BadgeText, Form, SettingsBox, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, IconName } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { shortStringFormat } from '@/utils/stringFormat';

import { ManageConnectionStyles as S } from './ManageConnection.style';
import { UserEmailModal } from './UserEmailModal';

export const ManageConnections: React.FC<LoadingProps> = () => {
  const { user, sdkHasLoaded } = useDynamicContext();
  const [verifiedConnections, setVerifiedConnections] = useState<any[]>([]);

  const form = Form.useContext();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenModalChange = () => {
    if (isEditModalOpen) {
      // reset form values
      form.resetForm();
    }

    setIsEditModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (user?.verifiedCredentials) {
      setVerifiedConnections(user.verifiedCredentials);
    }
  }, [user]);

  // TODO remove this once dynamic fix the issue with verifiedCredentials
  const userEmail = user?.email;

  return (
    <>
      <SettingsBox.Container>
        <SettingsBox.Title>Manage Connections</SettingsBox.Title>

        <SettingsBox.Text>Manage your available connections here and easily remove any you no longer need.</SettingsBox.Text>

        {!sdkHasLoaded && (
          <>
            <SettingsListItem.Skeleton />
            <SettingsListItem.Skeleton />
          </>
        )}
        {sdkHasLoaded &&
          verifiedConnections.length > 0 &&
          verifiedConnections.map((connection) => {
            if (connection.format === 'email' && connection.email === userEmail) {
              return <EmailCredential key={connection.id} connection={connection} handleOpenEditEmailModal={handleOpenModalChange} />;
            }

            if (connection.format === 'blockchain') {
              return <BlockchainCredential key={connection.id} connection={connection} />;
            }
          })}
      </SettingsBox.Container>

      <UserEmailModal isOpen={isEditModalOpen} closeModal={handleOpenModalChange} isEditing />
    </>
  );
};

type VerifiedCredentialProps = ChildrenProps<{
  title: string;
  avatarSrc?: string;
  avatarIcon?: IconName;
  isActive: boolean;
  isLoading: boolean;
}>;

const VerifiedCredential: React.FC<VerifiedCredentialProps> = ({ children, title, avatarSrc, avatarIcon, isActive, isLoading }) => {
  return (
    <SettingsListItem title={title} avatarSrc={avatarSrc} avatarIcon={avatarIcon}>
      {isActive && <BadgeText colorScheme="green">Active</BadgeText>}
      <SettingsListItem.DropdownMenu isDisabled={isLoading} isLoading={isLoading}>
        {children}
      </SettingsListItem.DropdownMenu>
    </SettingsListItem>
  );
};

type BlockchainCredentialProps = {
  connection: any;
};

const BlockchainCredential: React.FC<BlockchainCredentialProps> = ({ connection }) => {
  const { primaryWallet, user, handleUnlinkWallet } = useDynamicContext();
  const toast = useToast();
  const [isUnlinkingWallet, setIsUnlinkingWallet] = useState(false);

  const { data: ensName, isLoading } = useEnsName({
    address: connection.address! as `0x${string}`,
  });

  const address = shortStringFormat({ str: connection.address! });
  const title = ensName ? `${ensName} (${address})` : address;

  if (isLoading) {
    return <SettingsListItem.Skeleton enableAvatar />;
  }

  const handleUnlinkWalletOnClick = async () => {
    try {
      setIsUnlinkingWallet(true);
      await handleUnlinkWallet(connection.id);
      toast.success({ message: 'Wallet unlinked successfully' });
    } catch (error) {
      toast.error({ message: 'Failed to unlink wallet' });
    } finally {
      setIsUnlinkingWallet(false);
    }
  };

  const handleCopyAddress = (value: string) => {
    try {
      copyToClipboard(value);
      toast.success({ message: 'Copied to clipboard' });
    } catch (error) {
      toast.error({ message: 'Failed to copy to clipboard' });
    }
  };

  return (
    <VerifiedCredential
      title={title}
      avatarSrc={constants.ASSET_URL.ETHEREUM_LOGO}
      isActive={Boolean(primaryWallet)}
      isLoading={isUnlinkingWallet}
    >
      <SettingsListItem.DropdownMenuItem icon="copy" onClick={() => handleCopyAddress(connection.address)}>
        Copy Address
      </SettingsListItem.DropdownMenuItem>
      {ensName && (
        <SettingsListItem.DropdownMenuItem icon="copy" onClick={() => handleCopyAddress(ensName)}>
          Copy ENS
        </SettingsListItem.DropdownMenuItem>
      )}
      <SettingsListItem.DropdownMenuSeparator />
      {primaryWallet ? (
        <S.MenuItem disabled>
          <Box>
            Unlink Wallet
            <S.Subtitle>
              {user?.email
                ? 'You must be signed in with your email to unlink this wallet.'
                : 'You must add an email address to unlink this wallet.'}
            </S.Subtitle>
          </Box>
        </S.MenuItem>
      ) : (
        <SettingsListItem.DropdownMenuItem icon="exit" onClick={handleUnlinkWalletOnClick}>
          Unlink Wallet
        </SettingsListItem.DropdownMenuItem>
      )}
    </VerifiedCredential>
  );
};

type EmailCredentialProps = {
  connection: any;
  handleOpenEditEmailModal: () => void;
};

const EmailCredential: React.FC<EmailCredentialProps> = ({ connection, handleOpenEditEmailModal }) => {
  const { updateUser: updateDynamicUser } = useUserUpdateRequest();
  const { primaryWallet } = useDynamicContext();
  const { update: updateUser } = useUpdateUser();
  const userWallets = useUserWallets();
  const [isDeletingEmail, setIsDeletingEmail] = useState(false);

  const handleDeleteEmail = async () => {
    try {
      setIsDeletingEmail(true);

      await updateDynamicUser({ email: '' });
      await updateUser({ updateUserArgs: { email: null }, successMessage: 'Email removed successfully' });
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeletingEmail(false);
    }
  };

  return (
    <VerifiedCredential title={connection.email} avatarIcon="email" isActive={!primaryWallet} isLoading={isDeletingEmail}>
      <SettingsListItem.DropdownMenuItem icon="pencil" onClick={handleOpenEditEmailModal}>
        Change Email
      </SettingsListItem.DropdownMenuItem>
      {userWallets.length === 0 || !primaryWallet ? (
        <S.MenuItem disabled>
          <Box>
            Remove Email
            <S.Subtitle>
              {userWallets.length === 0
                ? 'You must add an ethereum wallet to remove this email.'
                : 'You must be signed in with your wallet to remove this email.'}
            </S.Subtitle>
          </Box>
        </S.MenuItem>
      ) : (
        <SettingsListItem.DropdownMenuItem icon="trash" onClick={handleDeleteEmail}>
          Delete
        </SettingsListItem.DropdownMenuItem>
      )}
    </VerifiedCredential>
  );
};
