import { useState } from 'react';

import { PrimaryDomainItem } from '@/types/Domain';
import { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

export type DeletePrivateGatewayContext = {
  isOpen: boolean;
  openModal: ({ id, name }: OpenModalProps) => void;
  toggleOpen: () => void;
  newPrimaryDomain: PrimaryDomainItem | undefined;
  setNewPrimaryDomain: (domian: PrimaryDomainItem | undefined) => void;
  privateGatewayId?: string;
  privateGatewayName?: string;
  onSubmitDelete: (
    privateGatewayId: string,
    domainId?: string,
  ) => Promise<true | undefined>;
};

type OpenModalProps = {
  id: string;
  name: string;
};

export type DeletePrivateGatewayProviderProps = ChildrenProps<
  Pick<DeletePrivateGatewayContext, 'onSubmitDelete'>
>;

const [Provider, useContext] = createContext<DeletePrivateGatewayContext>({
  hookName: 'useDeletePrivateGatewayContext',
  name: 'DeletePrivateGatewayContext',
  providerName: 'DeletePrivateGatewayProvider',
});

export const DeletePrivateGatewayProvider: React.FC<
  DeletePrivateGatewayProviderProps
> = ({ children, onSubmitDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPrimaryDomain, setNewPrimaryDomain] = useState<
    PrimaryDomainItem | undefined
  >();
  const [privateGatewayId, setPrivateGatewayId] = useState<string>();
  const [privateGatewayName, setPrivateGatewayName] = useState<string>();

  const openModal = ({ id, name }: OpenModalProps) => {
    setPrivateGatewayId(id);
    setPrivateGatewayName(name);
    setIsOpen(true);
  };

  const toggleOpen = () => {
    setNewPrimaryDomain(undefined);
    setIsOpen(!isOpen);
  };

  return (
    <Provider
      value={{
        isOpen,
        openModal,
        privateGatewayId,
        privateGatewayName,
        newPrimaryDomain,
        setNewPrimaryDomain,
        toggleOpen,
        onSubmitDelete,
      }}
    >
      {children}
    </Provider>
  );
};

export const useDeletePrivateGatewayContext = useContext;
