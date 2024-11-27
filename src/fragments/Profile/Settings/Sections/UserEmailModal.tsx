import { useEmailVerificationRequest, useUserUpdateRequest } from '@dynamic-labs/sdk-react-core';
import { useState } from 'react';

import { Form, Modal } from '@/components';
import { SettingsItemModal } from '@/fragments/Site/Settings/Elements/SettingsItemModal';
import { useToast } from '@/hooks/useToast';
import { Button, Dialog, FormField, Input, Stepper, Text } from '@/ui';

type UserEmailModalProps = {
  isOpen: boolean;
  isEditing?: boolean;
  closeModal: () => void;
};

export const UserEmailModal: React.FC<UserEmailModalProps> = ({ isOpen, isEditing = false, closeModal }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeModal}>
      <Dialog.Overlay />
      <Modal.Content>
        <Stepper.Root>
          <Stepper.Indicator />

          <Stepper.Container>
            <Stepper.Step>
              <Step1 isEditing={isEditing} />
            </Stepper.Step>

            <Stepper.Step>
              <Step2 closeModal={closeModal} />
            </Stepper.Step>
          </Stepper.Container>
        </Stepper.Root>
      </Modal.Content>
    </Dialog.Root>
  );
};

type Step1Props = {
  isEditing: boolean;
};

const Step1: React.FC<Step1Props> = ({ isEditing }) => {
  const { nextStep } = Stepper.useContext();
  const { updateUser } = useUserUpdateRequest();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { shouldDisableSubmit, values } = Form.useContext();

  const handleContinue = async () => {
    try {
      setIsSubmitting(true);
      await updateUser({ email: values.email });

      nextStep();
    } catch (error) {
      toast.error({ message: 'There was an error trying to update your email' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal.Heading>{isEditing ? 'Change' : 'Add'} Email</Modal.Heading>
      <Text>Enter your email address, after this you will receive a code to verify your email.</Text>

      <Form.InputField name="email" placeholder="Email" />

      <Modal.CTARow>
        <SettingsItemModal.CloseButton />
        <Button disabled={shouldDisableSubmit || isSubmitting} onClick={handleContinue} loading={isSubmitting} className="flex-1">
          Continue
        </Button>
      </Modal.CTARow>
    </>
  );
};

type Step2Props = {
  closeModal: () => void;
};

const Step2: React.FC<Step2Props> = ({ closeModal }) => {
  const { isSubmitting, submit } = Form.useContext();
  const { verifyEmail } = useEmailVerificationRequest();
  const [otpCode, setOtpCode] = useState('');

  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const numericValue = value.replace(/[^0-9]/g, '');

    if (value.length <= 6) {
      setOtpCode(numericValue);
    }
  };

  const handleSave = async () => {
    if (otpCode.length === 6) {
      // run validation against dynamic

      try {
        setIsVerifying(true);

        setError('');
        await verifyEmail(otpCode);
        await submit();

        closeModal();
      } catch (error) {
        setError('The code you entered is incorrect. Please try again.');
      } finally {
        setIsVerifying(false);
      }
    }
  };

  return (
    <>
      <Modal.Heading>Verify Email</Modal.Heading>
      <Text>A verification code has been sent to your email, input the code to save your new email address.</Text>

      <FormField.Root error={Boolean(error)}>
        <Input.Root>
          <Input.Field placeholder="Enter code" onChange={handleCodeChange} value={otpCode} maxLength={6} />
        </Input.Root>

        {error && <FormField.Hint>{error}</FormField.Hint>}
      </FormField.Root>

      <Modal.CTARow>
        <SettingsItemModal.CloseButton />
        <Button disabled={otpCode.length !== 6 || isSubmitting || isVerifying} loading={isSubmitting || isVerifying} onClick={handleSave}>
          Save
        </Button>
      </Modal.CTARow>
    </>
  );
};
