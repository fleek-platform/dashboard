import { CodeSnippet, Form, Modal } from '@/components';
import { SettingsItemModal } from '@/fragments/Site/Settings/Elements/SettingsItemModal';
import { Button, Dialog, Stepper, Text } from '@/ui';

import { NameField } from './NameField';
import { WhitelistDomains } from './WhitelistDomains';

type AddApplicationCredentialsModalProps = {
  isOpen: boolean;
  clientId: string | null;
  handleCloseModal: () => void;
  setClientId: (clientId: string) => void;
};

export const AddApplicationCredentialsModal: React.FC<AddApplicationCredentialsModalProps> = ({
  isOpen,
  clientId,
  handleCloseModal,
  setClientId,
}) => {
  const { resetForm } = Form.useContext();

  const handleOpenChange = () => {
    handleCloseModal();
    resetForm();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Overlay />
      <Modal.Content>
        <Stepper.Root>
          <Stepper.Indicator />

          <Stepper.Container>
            <Stepper.Step>
              <Step1 setClientId={setClientId} />
            </Stepper.Step>

            <Stepper.Step>
              <Step2 clientId={clientId} handleCloseModal={handleOpenChange} />
            </Stepper.Step>
          </Stepper.Container>
        </Stepper.Root>
      </Modal.Content>
    </Dialog.Root>
  );
};

type Step1Props = {
  setClientId: (clientId: string) => void;
};

const Step1: React.FC<Step1Props> = ({ setClientId }) => {
  return (
    <>
      <Modal.Heading>Application credentials</Modal.Heading>
      <Text>Fill in the inputs below to create your application credentials. In the next step, you&apos;ll get your ID. </Text>

      <NameField />

      <WhitelistDomains />

      <Modal.CTARow>
        <SettingsItemModal.CloseButton />
        <SubmitButton setClientId={setClientId} />
      </Modal.CTARow>
    </>
  );
};

type SubmitButtonProps = {
  setClientId: (clientId: string) => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ setClientId }) => {
  const { nextStep } = Stepper.useContext();
  const { isSubmitting, shouldDisableSubmit, submit } = Form.useContext();

  const handleSubmit = async () => {
    const clientId = await submit();

    if (typeof clientId === 'string') {
      setClientId(clientId);
      nextStep();
    }
  };

  return (
    <Button loading={isSubmitting} disabled={shouldDisableSubmit} onClick={handleSubmit} className="flex-1">
      Create
    </Button>
  );
};

type Step2Props = {
  clientId: string | null;
  handleCloseModal: () => void;
};

const Step2: React.FC<Step2Props> = ({ clientId, handleCloseModal }) => {
  return (
    <>
      <Modal.Heading>Application credential ID</Modal.Heading>
      <Text>Copy the below credential ID. You can also view and copy it later within &lsquo;Settings&rsquo;. </Text>

      <CodeSnippet title="Token" code={clientId || ' '} />

      <Modal.CTARow>
        <SettingsItemModal.CloseButton />
        <Button onClick={handleCloseModal} className="flex-1">
          Ok, I&apos;ve copied it
        </Button>
      </Modal.CTARow>
    </>
  );
};
