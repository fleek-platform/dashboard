import { AlertBox, Form, Modal } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { Button, Dialog, Text } from '@/ui';

export type DeleteSiteModalProps = ChildrenProps<{
  username?: string;
}>;

export const DeleteSiteModal: React.FC<DeleteSiteModalProps> = ({
  children,
  username,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Overlay />

      <Modal.Content>
        <Text as="h1" variant="primary" size="xl" weight={700}>
          Delete Account
        </Text>
        <Text>
          Your account will be permanently deleted, including your projects,
          sites and files.
        </Text>

        <AlertBox variant="danger" size="sm">
          Are you sure you want to proceed? This action is irreversible, and
          cannot be undone.
        </AlertBox>

        <Form.InputField
          name="username"
          label={
            <>
              Enter your username <b>{username}</b> to continue
            </>
          }
          placeholder={username}
          disableValidMessage
        />

        <Modal.CTARow>
          <CloseButton />
          <Form.SubmitButton intent="danger">Delete account</Form.SubmitButton>
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};

const CloseButton: React.FC = () => (
  <Dialog.Close asChild>
    <Button intent="neutral">Cancel</Button>
  </Dialog.Close>
);
