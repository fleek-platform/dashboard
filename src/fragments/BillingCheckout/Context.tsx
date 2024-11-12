import { useState } from 'react';

import { BillingPlan, CryptoPaymentOption } from '@/types/Billing';
import { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

export type BillingCheckoutContext = {
  stage: 'initial' | 'crypto-selected' | 'fiat-selected' | 'complete';
  setStage: (stage: BillingCheckoutContext['stage']) => void;

  method: 'crypto' | 'fiat';
  setMethod: (method: 'crypto' | 'fiat') => void;

  selectedToken?: CryptoPaymentOption;
  setSelectedToken: (token?: CryptoPaymentOption) => void;
  selectedPlatform?: CryptoPaymentOption['networks'][0];
  setSelectedPlatform: (platform?: CryptoPaymentOption['networks'][0]) => void;
  tokenAmount?: string;
  setTokenAmount: (amount?: string) => void;

  plan: BillingPlan;
};

const [Provider, useContext] = createContext<BillingCheckoutContext>({
  name: 'BillingCheckoutContext',
  hookName: 'useBillingCheckoutContext',
  providerName: 'BillingCheckoutProvider',
});

export type BillingCheckoutProviderProps = ChildrenProps &
  Pick<BillingCheckoutContext, 'plan'> & {
    initialMethod: BillingCheckoutContext['method'];
  };

export const BillingCheckoutProvider: React.FC<BillingCheckoutProviderProps> = ({ children, initialMethod, plan }) => {
  const [stage, setStage] = useState<BillingCheckoutContext['stage']>('initial');
  const [method, setMethod] = useState<BillingCheckoutContext['method']>(initialMethod);
  const [selectedToken, setSelectedToken] = useState<BillingCheckoutContext['selectedToken']>();
  const [selectedPlatform, setSelectedPlatform] = useState<BillingCheckoutContext['selectedPlatform']>();
  const [tokenAmount, setTokenAmount] = useState<BillingCheckoutContext['tokenAmount']>();

  return (
    <Provider
      value={{
        plan,
        stage,
        setStage,
        method,
        setMethod,
        selectedToken,
        setSelectedToken,
        selectedPlatform,
        setSelectedPlatform,
        tokenAmount,
        setTokenAmount,
      }}
    >
      {children}
    </Provider>
  );
};

export const useBillingCheckoutContext = useContext;
