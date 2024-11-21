import { useState } from 'react';

import { AlertBox, Modal } from '@/components';
import { Button, Dialog, Text } from '@/ui';

import { RecoveryCodes, type RecoveryCodesProps } from './RecoveryCodes';

export type RecoveryCodesModalProps = Omit<
  RecoveryCodesProps,
  'handleDownloadCodes'
> &
  Dialog.RootProps;

export const RecoveryCodesModal = ({
  isLoading,
  codes,
  ...dialogProps
}: RecoveryCodesModalProps) => {
  const [hasDownloadedCodes, setHasDownloadedCodes] = useState<boolean>(false);

  return (
    <Dialog.Root {...dialogProps}>
      <Dialog.Overlay />
      <Dialog.Portal>
        <Modal.Content>
          <Modal.Heading>Recovery Codes</Modal.Heading>
          <Text>
            You can use recovery codes as a second factor to authenticate in
            case you lose access to your device.
          </Text>
          <AlertBox variant="warning" size="sm">
            Keep your recovery codes in a safe spot.
          </AlertBox>
          <RecoveryCodes
            codes={codes}
            handleDownloadCodes={() => setHasDownloadedCodes(true)}
            isLoading={isLoading}
          />
          <Dialog.Close asChild>
            <Button disabled={isLoading || !hasDownloadedCodes}>Done</Button>
          </Dialog.Close>
        </Modal.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
