import { Form, LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { Dialog } from '@/ui';

import { CreateApiTokenModal } from './CreateApiTokenModal';

type CreateApiTokenModalState = {
  isOpen: boolean;
  apiTokenValue?: string;
};

export type CreateApiTokenProps = {
  modalState: CreateApiTokenModalState;
  closeModal: () => void;
  isLoading?: boolean;
};

export const CreateApiToken: React.FC<CreateApiTokenProps> = ({
  closeModal,
  modalState,
  isLoading,
}) => {
  return (
    <SettingsBox.Container>
      <SettingsBox.Title>API token</SettingsBox.Title>
      <SettingsBox.Text>
        Create an API token to utilize in Fleek integrations.
      </SettingsBox.Text>

      <Form.InputField
        name="apiTokenName"
        placeholder="Name"
        isLoading={isLoading}
      />

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_API_TOKENS}>
          API tokens
        </LearnMoreMessage>
        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <Form.SubmitButton>Add API token</Form.SubmitButton>
        )}
      </SettingsBox.ActionRow>

      <Dialog.Root open={modalState?.isOpen} onOpenChange={closeModal}>
        <CreateApiTokenModal
          closeModal={closeModal}
          apiTokenValue={modalState?.apiTokenValue}
        />
      </Dialog.Root>
    </SettingsBox.Container>
  );
};
