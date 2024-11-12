import { useState } from 'react';

import { ChildrenProps } from '@/types/Props';
import { StorageProvider, StorageProviderValue } from '@/types/StorageProviders';
import { createContext } from '@/utils/createContext';

export type StorageSettingsContext = {
  selectedStorage: StorageProvider | undefined;
  setSelectedStorage: (storage: StorageProvider | undefined) => void;

  onSaveSubmit: (cloudStorage: StorageProviderValue) => Promise<void>;
};

export type StorageSettingsProviderProps = ChildrenProps<Pick<StorageSettingsContext, 'onSaveSubmit'>>;

const [Provider, useContext] = createContext<StorageSettingsContext>({
  hookName: 'useStorageSettingsContext',
  name: 'StorageSettingsContext',
  providerName: 'StorageSettingsProvider',
});

export const StorageSettingsProvider: React.FC<StorageSettingsProviderProps> = ({ children, onSaveSubmit }) => {
  const [selectedStorage, setSelectedStorage] = useState<StorageProvider>();

  return (
    <Provider
      value={{
        selectedStorage,
        setSelectedStorage,
        onSaveSubmit,
      }}
    >
      {children}
    </Provider>
  );
};

export const useStorageSettingsContext = useContext;
