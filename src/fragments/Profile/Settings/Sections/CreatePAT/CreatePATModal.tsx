import { AlertBox, CodeSnippet, Modal } from '@/components';
import { Button, Dialog, Text } from '@/ui';

export type CreatePATModalProps = {
  closeModal: () => any;
  patValue?: string;
};

export const CreatePATModal: React.FC<CreatePATModalProps> = ({
  closeModal,
  patValue,
}) => {
  return (
    <>
      <Dialog.Overlay />
      <Modal.Content>
        <Text as="h1" variant="primary" size="xl" weight={700}>
          Personal Access Token
        </Text>
        <Text>
          Copy the below access token, you won&apos;t be able to see it again
          after this.
        </Text>
        <CodeSnippet title="Token" code={patValue || ' '} />
        <AlertBox variant="warning" size="sm">
          This token is only shown during creation.
        </AlertBox>
        <Modal.CTARow>
          <Button disabled={!patValue} onClick={closeModal}>
            Ok, I have copied it
          </Button>
        </Modal.CTARow>
      </Modal.Content>
    </>
  );
};
