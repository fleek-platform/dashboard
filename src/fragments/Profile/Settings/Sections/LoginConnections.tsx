import {
  DynamicMultiWalletPromptsWidget,
  useDynamicContext,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { useState } from 'react';

import { Form, LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { Button } from '@/ui';

import { LoginConnectionStyles as S } from './ManageConnection.style';
import { UserEmailModal } from './UserEmailModal';

export const LoginConnections: React.FC = () => {
  const { sdkHasLoaded } = useDynamicContext();
  const form = Form.useContext();

  const [isAddEmailModalOpen, setIsAddEmailModalOpen] = useState(false);

  const handleOpenModalChange = () => {
    if (isAddEmailModalOpen) {
      form.resetForm();
    }

    setIsAddEmailModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <SettingsBox.Container>
        <SettingsBox.Title>Login Connections</SettingsBox.Title>

        <SettingsBox.Text>
          Choose your preferred login method below to seamlessly access your
          account in the way that works best for you.
        </SettingsBox.Text>

        <S.ButtonContainer>
          {sdkHasLoaded ? (
            <>
              <AddWalletButton />
              <AddEmailButton openModal={handleOpenModalChange} />
            </>
          ) : (
            <>
              <SettingsBox.Skeleton variant="button" />
              <SettingsBox.Skeleton variant="button" />
            </>
          )}
        </S.ButtonContainer>

        <SettingsBox.ActionRow>
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_LOGIN_CONNECTIONS}
          >
            login connections
          </LearnMoreMessage>
        </SettingsBox.ActionRow>
      </SettingsBox.Container>

      <DynamicMultiWalletPromptsWidget />

      <UserEmailModal
        isOpen={isAddEmailModalOpen}
        closeModal={handleOpenModalChange}
      />
    </>
  );
};

const AddWalletButton: React.FC = () => {
  const { setShowAuthFlow } = useDynamicContext();
  const userWallets = useUserWallets();

  const handleLogIn = () => {
    setShowAuthFlow(true);
  };

  return (
    <Button
      iconLeft="wallet"
      onClick={handleLogIn}
      disabled={userWallets.length > 0}
    >
      Add Ethereum wallet
    </Button>
  );
};

type AddEmailButtonProps = {
  openModal: () => void;
};

const AddEmailButton: React.FC<AddEmailButtonProps> = ({ openModal }) => {
  const { user } = useDynamicContext();

  return (
    <Button iconLeft="email" disabled={!!user?.email} onClick={openModal}>
      Add email address
    </Button>
  );
};
