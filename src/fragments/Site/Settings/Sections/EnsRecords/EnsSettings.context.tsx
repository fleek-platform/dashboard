import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useState } from 'react';

import type { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

export type EnsSettingsContext = {
  selectedId: string;
  isModalOpen: boolean;
  openModal: (itemId: string, ensName: string) => void;
  closeModal: () => void;

  ensName: string;

  ipfsContentHash: string;
  setIpfsContentHash: (value: string) => void;
  ipnsContentHash: string;
  setIpnsContentHash: (value: string) => void;

  shouldOpenModalOnCreated: boolean;
  setShouldOpenModalOnCreated: (value: boolean) => void;

  ensSetupMethodSelected: 'manual' | 'automatic';
  setEnsSetupMethodSelected: (value: 'manual' | 'automatic') => void;

  automaticSetupMethod: 'ipns' | 'ipfs';
  setAutomaticSetupMethod: (value: 'ipns' | 'ipfs') => void;

  isManualSetupModalOpen: boolean;
  isAutomaticSetupModalOpen: boolean;

  openSetupModal: () => void;
  closeSetupModal: () => void;

  onSubmitVerification: (itemId: string) => Promise<boolean | undefined>;
  onSubmitDelete: (itemId: string) => Promise<boolean | undefined>;
};

export type EnsSettingsProviderProps = ChildrenProps<
  Pick<EnsSettingsContext, 'onSubmitVerification' | 'onSubmitDelete'>
>;

const [Provider, useContext] = createContext<EnsSettingsContext>({
  hookName: 'useEnsSettingsContext',
  name: 'EnsSettingsContext',
  providerName: 'EnsSettingsProvider',
});

export const EnsSettingsProvider: React.FC<EnsSettingsProviderProps> = ({
  children,
  onSubmitVerification,
  onSubmitDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [ensSetupMethodSelected, setEnsSetupMethodSelected] = useState<
    'manual' | 'automatic'
  >('automatic');
  const [shouldOpenModalOnCreated, setShouldOpenModalOnCreated] =
    useState(false);
  const [isManualSetupModalOpen, setIsManualSetupModalOpen] = useState(false);
  const [isAutomaticSetupModalOpen, setIsAutomaticSetupModalOpen] =
    useState(false);
  const [automaticSetupMethod, setAutomaticSetupMethod] = useState<
    'ipns' | 'ipfs'
  >('ipns');
  const [ensName, setEnsName] = useState('');
  const [ipfsContentHash, setIpfsContentHash] = useState('');
  const [ipnsContentHash, setIpnsContentHash] = useState('');

  const { showAuthFlow } = useDynamicContext();

  const openModal = (itemId: string, ensName: string) => {
    setSelectedId(itemId);
    setIsModalOpen(true);
    setEnsName(ensName);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEnsSetupMethodSelected('automatic');
  };

  const openSetupModal = () => {
    if (ensSetupMethodSelected === 'manual') {
      setIsManualSetupModalOpen(true);
    } else {
      setIsAutomaticSetupModalOpen(true);
    }

    setIsModalOpen(false);
  };

  const closeSetupModal = () => {
    if (showAuthFlow) {
      return;
    }

    setIsManualSetupModalOpen(false);
    setIsAutomaticSetupModalOpen(false);

    setEnsSetupMethodSelected('automatic');
    setAutomaticSetupMethod('ipns');
  };

  return (
    <Provider
      value={{
        selectedId,
        closeModal,
        openModal,
        ensName,
        isModalOpen,
        onSubmitVerification,
        onSubmitDelete,
        shouldOpenModalOnCreated,
        setShouldOpenModalOnCreated,
        ensSetupMethodSelected,
        setEnsSetupMethodSelected,
        automaticSetupMethod,
        setAutomaticSetupMethod,
        isManualSetupModalOpen,
        isAutomaticSetupModalOpen,
        openSetupModal,
        closeSetupModal,
        ipfsContentHash,
        setIpfsContentHash,
        ipnsContentHash,
        setIpnsContentHash,
      }}
    >
      {children}
    </Provider>
  );
};

export const useEnsSettingsContext = useContext;
