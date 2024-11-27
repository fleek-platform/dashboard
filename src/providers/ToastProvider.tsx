import { useState } from 'react';

import { ChildrenProps } from '@/types/Props';
import { Toast } from '@/types/Toast';
import { createContext } from '@/utils/createContext';

export type ToastContext = {
  toasts: Toast[];
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  onDismiss: (id: number) => void;
};

const [Provider, useContext] = createContext<ToastContext>({
  hookName: 'useToastContext',
  name: 'ToastContext',
  providerName: 'ToastProvider',
});

export const ToastProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast: ToastContext['pushToast'] = (toast) => {
    setToasts([...toasts, { id: Date.now(), ...toast }]);
  };

  const onDismiss = (id: number) => {
    setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
  };

  return (
    <Provider value={{ toasts, pushToast, onDismiss }}>{children}</Provider>
  );
};

export const useToastContext = useContext;
