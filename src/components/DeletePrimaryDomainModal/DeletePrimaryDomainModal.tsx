import { useState } from 'react';

import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import type { ChildrenProps } from '@/types/Props';
import { Button, Combobox, Dialog, FormField } from '@/ui';

import { Modal } from '../Modal/Modal';

type DeletePrimaryDomainModalProps = ChildrenProps<{
  title?: string;
  comboboxLabel?: string;
}>;

export const DeletePrimaryDomainModal: React.FC<
  DeletePrimaryDomainModalProps
> = ({
  children,
  title = 'Remove Domain',
  comboboxLabel = 'New Primary Domain',
}) => {
  const {
    isDeletePrimaryDomainModalOpen,
    activeDomains,
    closeDeleteModal,
    newPrimaryDomain,
    setNewPrimaryDomain,
  } = useSettingsItemContext();

  const handleOpenChange = () => {
    if (isDeletePrimaryDomainModalOpen) {
      closeDeleteModal('primary-domain');
    }
  };

  return (
    <Dialog.Root
      open={isDeletePrimaryDomainModalOpen}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Overlay />
      <Modal.Content>
        <Modal.Heading>{title}</Modal.Heading>
        {children}
        <FormField.Root>
          <FormField.Label>{comboboxLabel}</FormField.Label>

          <Combobox
            items={activeDomains}
            selected={[newPrimaryDomain, setNewPrimaryDomain]}
            queryKey="hostname"
          >
            {({ Field, Options }) => (
              <>
                <Field placeholder="Select Domain">
                  {(selected) => selected.hostname}
                </Field>

                <Options>{(item) => item.hostname}</Options>
              </>
            )}
          </Combobox>
        </FormField.Root>

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
  const { selectedId, newPrimaryDomain, onSubmitDelete, closeDeleteModal } =
    useSettingsItemContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPrimaryDomain) {
      setIsLoading(true);
      await onSubmitDelete(selectedId, newPrimaryDomain.id);
      setIsLoading(false);
      closeDeleteModal('primary-domain');
    }
  };

  return (
    <Button
      loading={isLoading}
      disabled={isLoading || newPrimaryDomain === undefined}
      onClick={handleSubmit}
      intent="danger"
      className="flex-1"
    >
      Remove domain
    </Button>
  );
};
