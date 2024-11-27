import React, { useState } from 'react';

import { createContext } from '@/utils/createContext';

type FeedbackModalContextType = {
  isOpen: boolean;
  selectedTab: TAB;
  setSelectedTab: React.Dispatch<React.SetStateAction<TAB>>;
  openModal: () => void;
  openModalWithTab: (tab: OpenModalWithTabProps) => void;
  closeModal: () => void;
  toggleModal: () => void;
};

export type TAB = 'PROBLEM' | 'QUESTION' | 'FEEDBACK';
type OpenModalWithTabProps = TAB;

const [Provider, useContext] = createContext<FeedbackModalContextType>({
  name: 'FeedbackModalContext',
  hookName: 'FeedbackModal.useContext',
  providerName: 'FeedbackModal.Provider',
});

export const FeedbackModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<TAB>('PROBLEM');

  const openModal = () => setIsOpen(true);
  const openModalWithTab = (tab: OpenModalWithTabProps) => {
    setSelectedTab(tab);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  return (
    <Provider
      value={{
        isOpen,
        selectedTab,
        setSelectedTab,
        openModal,
        openModalWithTab,
        closeModal,
        toggleModal,
      }}
    >
      {children}
    </Provider>
  );
};

export const useFeedbackModal = useContext;
