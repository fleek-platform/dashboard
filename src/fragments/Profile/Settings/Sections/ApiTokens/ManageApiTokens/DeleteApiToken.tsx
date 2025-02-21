import { AlertBox, Form, Modal } from '@/components';
import { Button, Dialog, Text } from '@/ui';

import type { ApiToken } from '../useApiTokens';

export type DeleteApiTokenModalProps = {
  apiToken?: ApiToken | null;
  close: () => void;
} & React.ComponentPropsWithoutRef<typeof Dialog.Root>;

export const DeleteApiTokenModal: React.FC<DeleteApiTokenModalProps> = ({
  apiToken,
  close,
  ...props
}) => {
  if (!apiToken) {
    return null;
  }

  return (
    <Dialog.Root {...props}>
      <Dialog.Overlay />

      <Modal.Content>
        <Text as="h1" variant="primary" size="xl" weight={700}>
          Delete API Token
        </Text>
        <Text>This API token will be deleted.</Text>

        <AlertBox variant="danger" size="sm">
          Warning: This action is irreversible.
        </AlertBox>

        <Form.InputField
          name="name"
          label={
            <>
              Enter the API token name <b>{apiToken.name || 'Unnamed'}</b> to
              continue
            </>
          }
          placeholder={apiToken.name || 'Unnamed'}
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
    <Button
      intent="danger"
      type="submit"
      loading={isSubmitting}
      disabled={shouldDisableSubmit}
      onClick={handleSubmitForm}
    >
      Delete API token
    </Button>
  );
};
