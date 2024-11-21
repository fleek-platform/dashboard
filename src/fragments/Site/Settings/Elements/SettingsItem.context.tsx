import { useState } from 'react';
import type { UseQueryExecute } from 'urql';

import type { PrimaryDomainItem } from '@/types/Domain';
import type { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

type OpenDeleteModalProps = {
  itemId: string;
  hostname: string;
  resourceName: string;
  modal: 'domain' | 'primary-domain';
};

export type SettingsItemContext = {
  selectedId: string;
  isModalOpen: boolean;
  openModal: (itemId: string) => void;
  closeModal: () => void;

  hostname: string;
  resourceName: string;
  isDeleteDomainModalOpen: boolean;
  isDeletePrimaryDomainModalOpen: boolean;
  openDeleteModal: ({
    itemId,
    hostname,
    resourceName,
    modal,
  }: OpenDeleteModalProps) => void;
  closeDeleteModal: (modal: string) => void;
  activeDomains: PrimaryDomainItem[];
  setActiveDomains: (domains: PrimaryDomainItem[]) => void;
  newPrimaryDomain: PrimaryDomainItem | undefined;
  setNewPrimaryDomain: (domain: PrimaryDomainItem | undefined) => void;

  shouldOpenModalOnCreated: boolean;
  setShouldOpenModalOnCreated: (value: boolean) => void;

  onSubmitVerification: (
    itemId: string,
    withDnsLink?: boolean,
  ) => Promise<boolean | undefined>;
  onSubmitDelete: (
    itemId: string,
    newPrimaryDomain?: string,
  ) => Promise<boolean | undefined>;
  onSubmitPrimaryDomain?: (domainId: string) => Promise<boolean | undefined>;
  refetchQuery?: UseQueryExecute;

  withDnsLink: boolean;
  setWithDnsLink: (value: boolean) => void;
};

export type SettingsItemProviderProps = ChildrenProps<
  Pick<
    SettingsItemContext,
    | 'onSubmitVerification'
    | 'onSubmitDelete'
    | 'onSubmitPrimaryDomain'
    | 'refetchQuery'
  >
>;

const [Provider, useContext] = createContext<SettingsItemContext>({
  hookName: 'useSettingsItemContext',
  name: 'SettingsItemContext',
  providerName: 'SettingsItemProvider',
});

export const SettingsItemProvider: React.FC<SettingsItemProviderProps> = ({
  children,
  onSubmitVerification,
  onSubmitDelete,
  onSubmitPrimaryDomain,
  refetchQuery,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [shouldOpenModalOnCreated, setShouldOpenModalOnCreated] =
    useState(false);

  const [isDeleteDomainModalOpen, setIsDeleteDomainModalOpen] = useState(false);
  const [isDeletePrimaryDomainModalOpen, setIsDeletePrimaryDomainModalOpen] =
    useState(false);
  const [hostname, setHostname] = useState('');
  const [resourceName, setResourceName] = useState('');
  const [activeDomains, setActiveDomains] = useState<PrimaryDomainItem[]>([]);
  const [newPrimaryDomain, setNewPrimaryDomain] = useState<
    PrimaryDomainItem | undefined
  >();
  const [withDnsLink, setWithDnsLink] = useState(false);

  const openDeleteModal = ({
    itemId,
    hostname,
    resourceName,
    modal,
  }: OpenDeleteModalProps) => {
    setHostname(hostname);
    setSelectedId(itemId);
    setResourceName(resourceName);

    if (modal === 'domain') {
      setIsDeleteDomainModalOpen(true);
    } else {
      setIsDeletePrimaryDomainModalOpen(true);
    }
  };

  const closeDeleteModal = (modal: string) => {
    if (modal === 'domain') {
      setIsDeleteDomainModalOpen(false);
    } else {
      setIsDeletePrimaryDomainModalOpen(false);
    }
  };

  const openModal = (itemId: string) => {
    setSelectedId(itemId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setWithDnsLink(false);
    setIsModalOpen(false);
    setSelectedId('');
  };

  return (
    <Provider
      value={{
        selectedId,
        closeModal,
        openModal,
        isModalOpen,
        hostname,
        resourceName,
        isDeleteDomainModalOpen,
        isDeletePrimaryDomainModalOpen,
        openDeleteModal,
        closeDeleteModal,
        newPrimaryDomain,
        setNewPrimaryDomain,
        activeDomains,
        setActiveDomains,
        onSubmitVerification,
        onSubmitDelete,
        refetchQuery,
        onSubmitPrimaryDomain,
        shouldOpenModalOnCreated,
        setShouldOpenModalOnCreated,
        withDnsLink,
        setWithDnsLink,
      }}
    >
      {children}
    </Provider>
  );
};

export const useSettingsItemContext = useContext;
