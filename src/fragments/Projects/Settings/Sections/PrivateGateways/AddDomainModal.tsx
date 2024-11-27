import { useEffect } from 'react';

import { DomainField, Form, LearnMoreMessage, Modal } from '@/components';
import { constants } from '@/constants';
import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { Button, Dialog, Text } from '@/ui';

import { usePrivateGatewayContext } from './PrivateGateway.context';

type AddDomainModalProps = {
  onCancel: () => void;
};

export const AddDomainModal: React.FC<AddDomainModalProps> = ({ onCancel }) => {
  const { isModalOpen, closeModal, selectedZoneId } = usePrivateGatewayContext();
  const form = Form.useContext();

  const handleOpenChange = () => {
    if (isModalOpen) {
      onCancel();
      closeModal();
    }
  };

  useEffect(() => {
    form.resetForm({ zoneId: selectedZoneId, hostname: '' });
  }, [selectedZoneId, form]);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />
      <Modal.Content>
        <Modal.Heading>Add domain to gateway</Modal.Heading>
        <Text>
          Enter the domain you want to use within this gateway. You can edit this domain or add others later from the &lsquo;Settings&rsquo;
          view.
        </Text>

        <DomainField withLabel />

        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_PRIVATE_GATEWAYS}>private gateway domains</LearnMoreMessage>

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
  const { closeModal } = usePrivateGatewayContext();
  const { shouldDisableSubmit, isSubmitting, submit } = Form.useContext();
  const { setShouldOpenModalOnCreated } = useSettingsItemContext();

  const handleSubmit = async () => {
    await submit();
    setShouldOpenModalOnCreated(true);
    closeModal();
  };

  return (
    <Button loading={isSubmitting} disabled={shouldDisableSubmit} onClick={handleSubmit} className="flex-1">
      Add domain
    </Button>
  );
};
