import { AlertBox, CodeSnippet, Modal } from '@/components';
import { Button, Dialog, Text } from '@/ui';

export type CreateApiTokenModalProps = {
  closeModal: () => void;
  apiTokenValue?: string;
};

export const CreateApiTokenModal: React.FC<CreateApiTokenModalProps> = ({
  closeModal,
  apiTokenValue,
}) => {
  return (
    <>
      <Dialog.Overlay />
      <Modal.Content>
        <Text as="h1" variant="primary" size="xl" weight={700}>
          API Token
        </Text>
        <Text>
          Copy the below access token, you won&apos;t be able to see it again
          after this.
        </Text>
        <CodeSnippet title="API Token" code={apiTokenValue || ' '} />
        <AlertBox variant="warning" size="sm">
          This API token is only shown during creation.
        </AlertBox>
        <Modal.CTARow>
          <Button disabled={!apiTokenValue} onClick={closeModal}>
            Ok, I have copied it
          </Button>
        </Modal.CTARow>
      </Modal.Content>
    </>
  );
};
