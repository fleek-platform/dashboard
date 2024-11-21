import { useState } from 'react';

import type { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

export type ApplicationCredentialsContext = {
  isModalOpen: boolean;
  openModal: (id: string) => void;
  closeModal: () => void;

  selectedId: string;

  onSubmitDelete: (id: string) => Promise<void>;
};

export type ApplicationCredentialsProviderProps = ChildrenProps<
  Pick<ApplicationCredentialsContext, 'onSubmitDelete'>
>;

const [Provider, useContext] = createContext<ApplicationCredentialsContext>({
  hookName: 'useApplicationCredentialsContext',
  name: 'ApplicationCredentialsContext',
  providerName: 'ApplicationCredentialsProvider',
});

export const ApplicationCredentialsProvider: React.FC<
  ApplicationCredentialsProviderProps
> = ({ children, onSubmitDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  return (
    <Provider
      value={{
        isModalOpen,
        selectedId,
        onSubmitDelete,
        closeModal,
        openModal,
      }}
    >
      {children}
    </Provider>
  );
};

export const useApplicationCredentialsContext = useContext;
