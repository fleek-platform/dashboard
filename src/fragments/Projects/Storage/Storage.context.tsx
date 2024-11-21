import { useState } from 'react';

import { constants } from '@/constants';
import type { ChildrenProps } from '@/types/Props';
import type { StorageProvider as StorageProviderType } from '@/types/StorageProviders';
import { createContext } from '@/utils/createContext';

export const modalType = {
  DELETE: 'DELETE',
  UPDATE_PIN: 'UPDATE_PIN', //could be used for both pin and folder
  UPDATE_FOLDER: 'UPDATE_FOLDER', //fleek folder
};

type OpenModalProps = {
  pinId?: string;
  folderId?: string;
  modal: string;
  isFolder: boolean;
  pinName: string;
};

type StorageContext = {
  selectedStorage: StorageProviderType | undefined;
  setSelectedStorage: (storage: StorageProviderType | undefined) => void;

  selectedPinId: string;
  selectedFolderId: string;
  isFolder: boolean;
  selectedItemName: string;

  privateGatewayDomain: string | undefined;
  setPrivateGatewayDomain: (domain: string | undefined) => void;

  isDeleteModalOpen: boolean;
  isEditPinModalOpen: boolean;
  isEditFolderModalOpen: boolean;
  openModal: ({ pinId, modal, isFolder, pinName }: OpenModalProps) => void;
  closeModal: (modal: string) => void;

  storageProviders: StorageProviderType[];
};

const [Provider, useContext] = createContext<StorageContext>({
  name: 'StorageContext',
  hookName: 'StorageContext.useContext',
  providerName: 'StorageContext.Provider',
});

export const StorageProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [selectedStorage, setSelectedStorage] = useState<
    StorageProviderType | undefined
  >(constants.STORAGE_PROVIDERS.all);
  const [selectedPinId, setSelectedPinId] = useState<string>('');
  const [selectedFolderId, setSelectedFolderId] = useState<string>('');
  const [privateGatewayDomain, setPrivateGatewayDomain] = useState<
    string | undefined
  >();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditPinModalOpen, setIsEditPinModalOpen] = useState(false);
  const [isEditFolderModalOpen, setIsEditFolderModalOpen] = useState(false);
  const [selectedItemName, setSelectedItemName] = useState<string>('');
  const [isFolder, setIsFolder] = useState<boolean>(false);

  const openModal = ({
    pinId,
    folderId,
    modal,
    isFolder,
    pinName,
  }: OpenModalProps) => {
    if (folderId) {
      setSelectedFolderId(folderId);
      setSelectedPinId('');
    } else if (pinId) {
      setSelectedPinId(pinId);
      setSelectedFolderId('');
    }

    setSelectedItemName(pinName);
    setIsFolder(isFolder);

    if (modal === modalType.DELETE) {
      setIsDeleteModalOpen(true);
    } else if (modal === modalType.UPDATE_PIN) {
      setIsEditPinModalOpen(true);
    } else {
      setIsEditFolderModalOpen(true);
    }
  };

  const closeModal = (modal: string) => {
    if (modal === modalType.DELETE) {
      setIsDeleteModalOpen(false);
    } else if (modal === modalType.UPDATE_PIN) {
      setIsEditPinModalOpen(false);
    } else {
      setIsEditFolderModalOpen(false);
    }
  };

  return (
    <Provider
      value={{
        storageProviders: Object.values(constants.STORAGE_PROVIDERS),
        selectedStorage,
        selectedPinId,
        isDeleteModalOpen,
        isEditPinModalOpen,
        isEditFolderModalOpen,
        selectedItemName,
        selectedFolderId,
        privateGatewayDomain,
        isFolder,
        openModal,
        closeModal,
        setSelectedStorage,
        setPrivateGatewayDomain,
      }}
    >
      {children}
    </Provider>
  );
};

export const useStorageContext = useContext;
