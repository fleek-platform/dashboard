import { useState } from 'react';

import { Modal } from '@/components';
import { useRouter } from '@/hooks/useRouter';
import { ChildrenProps } from '@/types/Props';
import { Button, Dialog } from '@/ui';

import { useSettingsItemContext } from './SettingsItem.context';

const Root: React.FC<SettingsItemModal.RootProps> = ({ children }) => {
  const { isModalOpen, closeModal } = useSettingsItemContext();

  const handleOpenChange = () => {
    if (isModalOpen) {
      closeModal();
    }
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />

      <Modal.Content>{children}</Modal.Content>
    </Dialog.Root>
  );
};

const CloseButton: React.FC<SettingsItemModal.CloseButtonProps> = ({
  children = 'Cancel',
}) => (
  <Dialog.Close asChild>
    <Button intent="ghost" className="flex-1">
      {children}
    </Button>
  </Dialog.Close>
);

const SubmitButton: React.FC<SettingsItemModal.SubmitButtonProps> = ({
  children = 'Confirm',
  disabled,
}) => {
  const { selectedId, withDnsLink, onSubmitVerification, closeModal } =
    useSettingsItemContext();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async () => {
    const isSiteDomain = route.pathname.includes('sites');

    setIsLoading(true);
    const shouldClose = await onSubmitVerification(
      selectedId,
      isSiteDomain ? withDnsLink : false,
    );
    setIsLoading(false);

    if (shouldClose) {
      closeModal();
    }
  };

  return (
    <Button
      loading={isLoading}
      disabled={disabled || isLoading}
      onClick={handleSubmit}
      className="flex-1"
    >
      {children}
    </Button>
  );
};

export const SettingsItemModal = {
  Root,
  CloseButton,
  SubmitButton,
};

export namespace SettingsItemModal {
  export type RootProps = ChildrenProps;
  export type CloseButtonProps = ChildrenProps;
  export type SubmitButtonProps = ChildrenProps<{ disabled?: boolean }>;
}
