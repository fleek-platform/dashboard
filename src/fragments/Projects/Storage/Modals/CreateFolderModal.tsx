import { Form, Modal } from '@/components';
import { Button, Dialog } from '@/ui';

type CreateFolderModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />

      <Modal.Content>
        <Modal.Heading>New folder</Modal.Heading>

        <Form.InputField label="Folder name" placeholder="Enter folder name" name="name" />
        <Modal.CTARow>
          <CloseButton />
          <Form.SubmitButton className="flex-1">Create folder</Form.SubmitButton>
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};

const CloseButton: React.FC = () => (
  <Dialog.Close asChild>
    <Button intent="ghost" className="flex-1">
      Cancel
    </Button>
  </Dialog.Close>
);
