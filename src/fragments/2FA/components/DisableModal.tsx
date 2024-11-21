import { Modal } from '@/components';
import type { LoadingProps } from '@/types/Props';
import { Button, Dialog, Text } from '@/ui';

export type DisableModalProps = {
  onConfirmDelete: () => void;
} & Dialog.RootProps &
  LoadingProps;

export const DisableModal: React.FC<DisableModalProps> = ({
  onConfirmDelete,
  isLoading,
  ...dialogProps
}) => (
  <Dialog.Root {...dialogProps}>
    <Dialog.Overlay />
    <Dialog.Portal>
      <Modal.Content>
        <Modal.Heading>Disable Two-factor Authentication</Modal.Heading>
        <Text>Are you sure you want to disable two-factor authentication?</Text>
        <Text>
          Two-factor authentication adds an additional layer of security to your
          account by requiring more than just a password or wallet connection to
          sign in.
        </Text>
        <Text>
          Fleek highly recommends that you keep two-factor authentication
          enabled on your account. If you need to change your configuration, or
          generate new recovery codes, you can do that in the settings below.
        </Text>
        <Modal.CTARow>
          <Dialog.Close asChild>
            <Button disabled={isLoading} intent="neutral" className="flex-1">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            intent="danger"
            onClick={onConfirmDelete}
            loading={isLoading}
            className="flex-1"
          >
            Disable
          </Button>
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
