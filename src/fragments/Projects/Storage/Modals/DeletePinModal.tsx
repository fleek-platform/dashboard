import { useState } from 'react';

import { AlertBox, Modal } from '@/components';
import { useDeleteFolderMutation, useDeletePinMutation } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Button, Dialog, Text } from '@/ui';

import { modalType, useStorageContext } from '../Storage.context';

export const DeletePinModal: React.FC = () => {
  const { isDeleteModalOpen, selectedItemName, isFolder, closeModal } = useStorageContext();

  const handleOpenChange = () => {
    if (isDeleteModalOpen) {
      closeModal(modalType.DELETE);
    }
  };

  return (
    <Dialog.Root open={isDeleteModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />

      <Modal.Content>
        <Modal.Heading>Delete {isFolder ? 'Folder' : 'File'}</Modal.Heading>
        <Text>
          The <b>{selectedItemName}</b> {isFolder ? 'folder' : 'file'} will be deleted from your project.
        </Text>
        <Text>Are you sure you want to proceed? This action is irreversible, and cannot be undone</Text>
        <AlertBox variant="danger" size="sm">
          Warning: This action is irreversible.
        </AlertBox>

        <Modal.CTARow>
          <CloseButton />
          <SubmitButton />
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

const SubmitButton: React.FC = () => {
  const toast = useToast();
  const { closeModal, selectedPinId, selectedFolderId, selectedItemName } = useStorageContext();
  const [isLoading, setIsLoading] = useState(false);

  const [, deletePin] = useDeletePinMutation();
  const [, deleteFolder] = useDeleteFolderMutation();

  const handleDeletePin = async () => {
    setIsLoading(true);

    try {
      let deletePinResult;

      if (selectedPinId) {
        deletePinResult = await deletePin({ where: { id: selectedPinId } });
      } else if (selectedFolderId) {
        deletePinResult = await deleteFolder({ where: { id: selectedFolderId } });
      }

      if (!deletePinResult?.data) {
        throw deletePinResult?.error;
      }

      toast.default({ message: `"${selectedItemName}" was removed` });
      closeModal(modalType.DELETE);
    } catch (error) {
      toast.error({ message: 'Error trying to delete pin' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button intent="danger" loading={isLoading} disabled={isLoading} onClick={handleDeletePin} className="flex-1">
      Delete
    </Button>
  );
};
