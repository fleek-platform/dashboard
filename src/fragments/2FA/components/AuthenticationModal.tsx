import { useState } from 'react';

import { Form, LearnMoreMessage, Modal } from '@/components';
import { constants } from '@/constants';
import { Button, Dialog, Text } from '@/ui';

type AuthenticationType = keyof typeof AuthenticationMap;

const AuthenticationMap = {
  CODE: {
    title: 'Enter Authentication code',
    description: 'You can find the 6-digit code in your authenticator app.',
    inputName: 'verificationCode',
  },
  RECOVERY: {
    title: 'Enter Recovery code',
    description: 'This is the recovery code you downloaded when you set up your authenticator app.',
    inputName: 'recoveryCode',
  },
};

export const AuthenticationModal: React.FC = () => {
  const [modalType, setModalType] = useState<AuthenticationType>('CODE');
  const { shouldDisableSubmit, isSubmitting, submit } = Form.useContext<
    { setupVerificationCode: string },
    { isVerified: boolean; recoveryCodes: string[] }
  >();

  const reset = () => {
    setModalType('CODE');
  };

  const handleSubmit = async () => {
    reset();
    await submit();
  };

  return (
    <Modal.Content>
      <Modal.Heading>{AuthenticationMap[modalType].title}</Modal.Heading>
      <Text>{AuthenticationMap[modalType].description}</Text>
      <Form.InputField name={AuthenticationMap[modalType].inputName} placeholder="Enter Code" maxLength={8} disableValidMessage />
      {modalType === 'CODE' ? (
        <Text className="flex gap-1 whitespace-nowrap">
          Unable to scan? Use a{' '}
          <Text onClick={() => setModalType('RECOVERY')} className="text-accent-11 cursor-pointer hover:underline">
            recovery key
          </Text>{' '}
          instead.
        </Text>
      ) : (
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_SUPPORT} prefix="Still having trouble?">
          Contact Support
        </LearnMoreMessage>
      )}
      <Modal.CTARow>
        <Dialog.Close asChild>
          <Button intent="neutral" onClick={reset} className="flex-1">
            Cancel
          </Button>
        </Dialog.Close>
        <Dialog.Close asChild>
          <Button loading={isSubmitting} disabled={shouldDisableSubmit} onClick={handleSubmit} className="flex-1">
            Continue
          </Button>
        </Dialog.Close>
      </Modal.CTARow>
    </Modal.Content>
  );
};
