import { useState } from 'react';

import { CodeSnippet, Form, LearnMoreMessage, Modal } from '@/components';
import { constants } from '@/constants';
import { Button, Dialog, Divider, Icon, Text } from '@/ui';

import { Styles as S } from '../2FAStyles.styles';
import { UnableToScanMessage } from './UnableToScanMessage';

export type EditModalProps = Dialog.RootProps & { otpUrl: string; isLoading: boolean };

export const EditModal: React.FC<EditModalProps> = ({ isLoading, otpUrl, ...dialogProps }) => {
  const [isUnableToScan, setIsUnableToScan] = useState<boolean>(false);

  const { shouldDisableSubmit, isSubmitting, submit } = Form.useContext();
  const secretKeyField = Form.useField<string>('secretKey');

  const handleSubmitForm = async () => {
    await submit();
    reset();
  };

  const reset = () => {
    setIsUnableToScan(false);
  };

  return (
    <Dialog.Root {...dialogProps}>
      <Dialog.Overlay />
      <Dialog.Portal>
        <Modal.Content>
          <Modal.Heading>Edit Authenticator App</Modal.Heading>
          <Text>Follow the below steps to finish securing your account with two-factor authentication.</Text>
          <S.TextSection>
            <Text variant="primary" weight={700}>
              Scan the QR code
            </Text>
            <Text>Use an authenticator app to scan.</Text>
            <S.QrContainer isLoading={isLoading}>{isLoading ? <Icon name="spinner" /> : <S.QRCode value={otpUrl} />}</S.QrContainer>
          </S.TextSection>
          <UnableToScanMessage onClick={() => setIsUnableToScan(true)} />
          {isUnableToScan && <CodeSnippet title="Setup key" code={secretKeyField.value} isLoading={isLoading} />}
          <Divider />
          <S.TextSection>
            <Text variant="primary" weight={700}>
              Verify Code
            </Text>
            <Text>Enter the code from the app you just setup with.</Text>
          </S.TextSection>
          <Form.InputField name="token" disableValidMessage type="number" maxLength={6} />
          <LearnMoreMessage prefix="Need Help?" href={constants.EXTERNAL_LINK.FLEEK_DOCS_2FA_EDIT}>
            Follow Instructions Here
          </LearnMoreMessage>
          <Modal.CTARow>
            <Dialog.Close asChild>
              <Button intent="neutral" onClick={reset} className="flex-1">
                Cancel
              </Button>
            </Dialog.Close>
            <Button loading={isSubmitting} disabled={shouldDisableSubmit || isLoading} onClick={handleSubmitForm} className="flex-1">
              Continue
            </Button>
          </Modal.CTARow>
        </Modal.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
