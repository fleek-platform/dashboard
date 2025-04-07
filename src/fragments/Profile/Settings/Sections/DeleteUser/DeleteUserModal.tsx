import { AlertBox, Form, Modal } from '@/components';
import type { ChildrenProps } from '@/types/Props';
import { Button, Dialog, Text, Icon } from '@/ui';
import zod from 'zod';

export type DeleteUserModalProps = ChildrenProps<{
  username: string;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}>;

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  children,
  username,
  onDelete,
  isDeleting,
}) => {
  const deleteForm = Form.useForm({
    values: {
      username: '',
    },
    schema: zod.object({
      username: zod.literal(username, {
        errorMap: () => ({ message: 'Incorrect username' }),
      }),
    }),
    onSubmit: onDelete,
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Overlay />

      <Form.Provider value={deleteForm}>
        <Modal.Content>
          <Text as="h1" variant="primary" size="xl" weight={700}>
            Delete Account
          </Text>
          <Text>
            Your account will be permanently deleted, including all your project
            files, custom domain settings, sites, etc.
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
            <Form.SubmitButton intent="danger" disabled={isDeleting}>
              Delete account
            </Form.SubmitButton>
          </Modal.CTARow>
        </Modal.Content>
      </Form.Provider>
    </Dialog.Root>
  );
};

const CloseButton: React.FC = () => (
  <Dialog.Close asChild>
    <Button intent="neutral">Cancel</Button>
  </Dialog.Close>
);
