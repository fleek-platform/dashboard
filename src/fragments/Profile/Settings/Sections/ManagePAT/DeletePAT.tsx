import { AlertBox, Form, Modal } from '@/components';
import { PersonalAccessToken } from '@/generated/graphqlClient';
import { Button, Dialog, Text } from '@/ui';

export type DeletePATModalProps = {
  pat?: PersonalAccessToken;
  close: () => void;
} & React.ComponentPropsWithoutRef<typeof Dialog.Root>;

export const DeletePATModal: React.FC<DeletePATModalProps> = ({ pat, close, ...props }) => {
  if (!pat) {
    return null;
  }

  return (
    <Dialog.Root {...props}>
      <Dialog.Overlay />

      <Modal.Content>
        <Text as="h1" variant="primary" size="xl" weight={700}>
          Delete Personal Access Token
        </Text>
        <Text>This personal access token will be deleted.</Text>

        <AlertBox variant="danger" size="sm">
          Warning: This action is irreversible.
        </AlertBox>

        <Form.InputField
          name="name"
          label={
            <>
              Enter the PAT name <b>{pat.name || 'Unnamed'}</b> to continue
            </>
          }
          placeholder={pat.name || 'Unnamed'}
          disableValidMessage
        />

        <Modal.CTARow>
          <Button intent="ghost" onClick={close}>
            Cancel
          </Button>
          <SubmitButton close={close} />
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};

type SubmitButtonProps = {
  close: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ close }) => {
  const { shouldDisableSubmit, isSubmitting, submit } = Form.useContext();

  const handleSubmitForm = async () => {
    await submit();
    close();
  };

  return (
    <Button intent="danger" type="submit" loading={isSubmitting} disabled={shouldDisableSubmit} onClick={handleSubmitForm}>
      Delete token
    </Button>
  );
};
