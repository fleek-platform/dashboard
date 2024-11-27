import { Form, Modal } from '@/components';
import { useFormField } from '@/components/Form/FormProvider';
import { Box, Button, Dialog, Text } from '@/ui';

import { useStorageContext } from '../Storage.context';

type UpdatePinModalProps = {
  isEditModalOpen: boolean;
  handleOpenChange: (open: boolean) => void;
};

export const UpdatePinModal: React.FC<UpdatePinModalProps> = ({
  isEditModalOpen,
  handleOpenChange,
}) => {
  const { isFolder } = useStorageContext();

  const { value: extension } = useFormField<string>('extension');
  const { value: name } = useFormField<string>('name');

  return (
    <Dialog.Root open={isEditModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />

      <Modal.Content>
        <Modal.Heading>{`Edit ${isFolder ? 'folder' : 'pin'} name`}</Modal.Heading>
        <Text>This name will be displayed across Fleek.</Text>

        <Form.InputField
          name="name"
          inputRootClassName="overflow-hidden"
          beforeContent={
            <Box className="absolute flex-row whitespace-nowrap pointer-events-none">
              <span className="invisible">{name}</span>
              <span className="text-neutral-9">
                {extension ? `.${extension}` : ''}
              </span>
            </Box>
          }
        />

        <Modal.CTARow>
          <CloseButton />
          <Form.SubmitButton className="flex-1">Save changes</Form.SubmitButton>
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
