import { useState } from 'react';

import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { ChildrenProps } from '@/types/Props';
import { Button, Dialog } from '@/ui';

import { Modal } from '../Modal/Modal';

type DeleteDomainModalProps = ChildrenProps<{
  title?: string;
}>;

export const DeleteDomainModal: React.FC<DeleteDomainModalProps> = ({ children, title = 'Remove Domain' }) => {
  const { isDeleteDomainModalOpen, closeDeleteModal } = useSettingsItemContext();

  const handleOpenChange = () => {
    if (isDeleteDomainModalOpen) {
      closeDeleteModal('domain');
    }
  };

  return (
    <Dialog.Root open={isDeleteDomainModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />
      <Modal.Content>
        <Modal.Heading>{title}</Modal.Heading>

        {children}

        <Modal.CTARow>
          <Dialog.Close asChild>
            <Button intent="neutral" className="flex-1">
              Cancel
            </Button>
          </Dialog.Close>

          <SubmitButton />
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};

const SubmitButton: React.FC = () => {
  const { selectedId, onSubmitDelete, closeDeleteModal } = useSettingsItemContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (onSubmitDelete) {
      setIsLoading(true);
      await onSubmitDelete(selectedId);
      setIsLoading(false);
      closeDeleteModal('domain');
    }
  };

  return (
    <Button loading={isLoading} disabled={isLoading} onClick={handleSubmit} intent="danger" className="flex-1">
      Remove domain
    </Button>
  );
};
