import type React from 'react';
import { createContext, useContext, useState } from 'react';

import { Form } from '@/components';
import type { TokenSubmitArgs } from '@/types/2FA';
import type { ChildrenProps } from '@/types/Props';
import { Dialog } from '@/ui';

import { AuthenticationModal } from './components/AuthenticationModal';

type TwoFactorModalContextType = {
  showModal: (onConfirm: (token: TokenSubmitArgs) => void) => void;
  setOnClose: (onClose: () => void) => void;
  hideModal: () => void;
  isVisible: boolean;
};

const TwoFactorModalContext = createContext<
  TwoFactorModalContextType | undefined
>(undefined);

export const TwoFactorModalProvider: React.FC<ChildrenProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [onConfirm, setOnConfirm] = useState<
    ({ verificationCode, recoveryCode }: TokenSubmitArgs) => void
  >(() => {});
  const [onClose, setOnClose] = useState<() => void>(() => {});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const authenticateForm = Form.useForm({
    values: {
      verificationCode: '',
      recoveryCode: '',
    },
    onSubmit: async (values) => {
      setHasSubmitted(true);
      onConfirm(values);
    },
  });

  const showModal = (confirm: (token: TokenSubmitArgs) => void) => {
    setHasSubmitted(false);
    setIsVisible(true);
    setOnConfirm(() => confirm);
  };

  const hideModal = () => {
    if (onClose && !hasSubmitted) {
      onClose();
    }

    setIsVisible(false);
    authenticateForm.resetForm();
  };

  const handleSetOnClose = (close: () => void) => {
    setOnClose(() => close);
  };

  return (
    <TwoFactorModalContext.Provider
      value={{ isVisible, showModal, hideModal, setOnClose: handleSetOnClose }}
    >
      {children}
      {isVisible && (
        <Form.Provider value={authenticateForm}>
          <Dialog.Root defaultOpen onOpenChange={hideModal}>
            <Dialog.Portal forceMount>
              <Dialog.Overlay />
              <AuthenticationModal />
            </Dialog.Portal>
          </Dialog.Root>
        </Form.Provider>
      )}
    </TwoFactorModalContext.Provider>
  );
};

export const useTwoFactorModal = () => {
  const context = useContext(TwoFactorModalContext);

  if (!context) {
    // eslint-disable-next-line fleek-custom/no-default-error
    throw new Error('useTwoFactorModal must be used within a PopoverProvider');
  }

  return context;
};
