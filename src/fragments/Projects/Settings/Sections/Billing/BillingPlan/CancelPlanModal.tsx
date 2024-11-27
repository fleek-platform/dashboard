import { useState } from 'react';

import { Modal } from '@/components';
import { Button, Dialog, Text } from '@/ui';

type CancelPlanModalProps = {
  isOpen: boolean;
  dueDate: string;
  onOpenChange: (open: boolean) => void;
  onCancelPlan: () => void;
};

export const CancelPlanModal: React.FC<CancelPlanModalProps> = ({
  isOpen,
  dueDate,
  onOpenChange,
  onCancelPlan,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = async () => {
    setIsSubmitting(true);
    await onCancelPlan();
    setIsSubmitting(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Overlay />
      <Modal.Content>
        <Modal.Heading>We&apos;re sorry to see you go!</Modal.Heading>
        <Text>
          Are you sure you want to end your subscription? If you cancel today,
          it will be converted to a Free plan on {dueDate}.
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
            onClick={handleCancel}
            loading={isSubmitting}
          >
            Cancel plan
          </Button>
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};
