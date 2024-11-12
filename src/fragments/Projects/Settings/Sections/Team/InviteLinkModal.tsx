import { CodeSnippet, Modal } from '@/components';
import { Button, Dialog, Text } from '@/ui';

type InviteLinkModalProps = {
  inviteLink: string;
  isOpen: boolean;
  closeModal: () => void;
};

export const InviteLinkModal: React.FC<InviteLinkModalProps> = ({
  inviteLink,
  isOpen,
  closeModal,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={closeModal}>
      <Dialog.Overlay />

      <Modal.Content>
        <Modal.Heading>Invite link</Modal.Heading>
        <Text>
          Allow others to join your Fleek project through the link below. Those
          who join with this link will be given a &lsquo;Member&rsquo; role.
        </Text>
        <CodeSnippet title="Copy invite link" code={inviteLink || ' '} />

        <Modal.CTARow>
          <Dialog.Close asChild>
            <Button disabled={!inviteLink} className="flex-1">
              Done
            </Button>
          </Dialog.Close>
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};
