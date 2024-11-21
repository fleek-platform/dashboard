import { Form, LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import type { LoadingProps } from '@/types/Props';
import { Dialog } from '@/ui';

import { CreatePATModal } from './CreatePATModal';

type CreatePATModalState = {
  isOpen: boolean;
  patValue?: string;
};

export type CreatePATProps = LoadingProps<{
  modalState: CreatePATModalState;
  closeModal: () => void;
}>;

export const CreatePAT: React.FC<CreatePATProps> = ({
  closeModal,
  modalState,
  isLoading,
}) => {
  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Personal Access Tokens</SettingsBox.Title>
      <SettingsBox.Text>
        Create a personal access token to utilize in Fleek integrations.
      </SettingsBox.Text>

      <Form.InputField
        name="patName"
        placeholder="Name"
        isLoading={isLoading}
      />

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_PAT}>
          personal access tokens
        </LearnMoreMessage>
        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <Form.SubmitButton>Add token</Form.SubmitButton>
        )}
      </SettingsBox.ActionRow>

      <Dialog.Root open={modalState?.isOpen} onOpenChange={closeModal}>
        {closeModal && (
          <CreatePATModal
            closeModal={closeModal}
            patValue={modalState?.patValue}
          />
        )}
      </Dialog.Root>
    </SettingsBox.Container>
  );
};
