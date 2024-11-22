import { Modal } from '@/components';
import { useRouter } from '@/hooks/useRouter';
import { useSiteStopDeploy } from '@/hooks/useSiteCancelDeploy';
import { Button, Dialog, Text } from '@/ui';

type CancelDeploymentModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDeploymentCancelable: boolean;
  deploymentId: string;
};

export const CancelDeploymentModal: React.FC<CancelDeploymentModalProps> = ({
  open,
  isDeploymentCancelable,
  deploymentId,
  onOpenChange,
}) => {
  const stopDeploy = useSiteStopDeploy();
  const router = useRouter();

  const siteId = router.query.siteId!;

  const handleCancelDeploy = async () => {
    await stopDeploy.mutateAsync({
      siteId,
      deploymentId,
      onSuccess: () => onOpenChange(false),
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay />

      <Modal.Content>
        <Modal.Heading>Cancel deployment</Modal.Heading>
        <Text>
          Are you sure you want to cancel this deployment? You won&apos;t be
          able to resume after canceling.
        </Text>

        <Modal.CTARow>
          <Dialog.Close asChild>
            <Button intent="ghost" className="flex-1">
              Never mind
            </Button>
          </Dialog.Close>
          <Button
            intent="danger"
            className="flex-1"
            loading={stopDeploy.isLoading}
            disabled={!isDeploymentCancelable}
            onClick={handleCancelDeploy}
          >
            Cancel deployment
          </Button>
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};
