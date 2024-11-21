import { useState } from 'react';

import {
  SettingsItemContext,
  SettingsItemProvider,
} from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { usePrivateGatewaysQuery } from '@/generated/graphqlClient';
import { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

export type PrivateGatewayContext = {
  isModalOpen: boolean;
  openModal: (itemId: string) => void;
  closeModal: () => void;

  selectedZoneId: string;

  onSubmitDeletePrivateGateway: (
    privateGatewayId: string,
  ) => Promise<boolean | undefined>;
};

export type PrivateGatewayProviderProps = ChildrenProps<
  Pick<PrivateGatewayContext, 'onSubmitDeletePrivateGateway'> &
    Pick<
      SettingsItemContext,
      'onSubmitVerification' | 'onSubmitDelete' | 'onSubmitPrimaryDomain'
    >
>;

const [Provider, useContext] = createContext<PrivateGatewayContext>({
  hookName: 'usePrivateGatewayContext',
  name: 'PrivateGatewayContext',
  providerName: 'PrivateGatewayProvider',
});

export const PrivateGatewayProvider: React.FC<PrivateGatewayProviderProps> = ({
  children,
  onSubmitDeletePrivateGateway,
  onSubmitVerification,
  onSubmitDelete,
  onSubmitPrimaryDomain,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState('');

  const [, refetchPrivateGatewaysQuery] = usePrivateGatewaysQuery();

  const openModal = (itemId: string) => {
    setSelectedZoneId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Provider
      value={{
        selectedZoneId,
        isModalOpen,
        openModal,
        closeModal,
        onSubmitDeletePrivateGateway,
      }}
    >
      <SettingsItemProvider
        onSubmitVerification={onSubmitVerification}
        onSubmitDelete={onSubmitDelete}
        onSubmitPrimaryDomain={onSubmitPrimaryDomain}
        refetchQuery={refetchPrivateGatewaysQuery}
      >
        {children}
      </SettingsItemProvider>
    </Provider>
  );
};

export const usePrivateGatewayContext = useContext;
