import { useCallback, useState } from 'react';

import { useToastContext } from '@/providers/ToastProvider';
import { Toast as ToastType } from '@/types/Toast';
import { Button } from '@/ui';

import { DismissTimeout, ToastStyles as S } from './ToastContainer.styles';

export const ToastsContainer: React.FC = () => {
  const { toasts } = useToastContext();

  return (
    <S.Provider duration={3000} swipeDirection="down">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
      <S.Viewport />
    </S.Provider>
  );
};

type ToastProps = ToastType;

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  onDismiss,
  duration = 3000,
  withCloseButton = false,
}) => {
  const { onDismiss: removeToast } = useToastContext();
  const [open, setOpen] = useState(true);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value);

      if (!value) {
        if (onDismiss) {
          onDismiss();
        }

        setTimeout(() => {
          removeToast(id);
        }, DismissTimeout);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onDismiss, id],
  );

  return (
    <S.Root
      open={open}
      duration={duration}
      variant={type}
      onOpenChange={handleOpenChange}
    >
      <S.Layout>
        <S.Content>
          <S.Body>{message}</S.Body>
        </S.Content>
        <S.Close asChild>
          {withCloseButton && (
            <Button intent="neutral" onClick={onDismiss}>
              Close
            </Button>
          )}
        </S.Close>
      </S.Layout>
    </S.Root>
  );
};
