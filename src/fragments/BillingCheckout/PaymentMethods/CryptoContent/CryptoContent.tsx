import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

import { useCryptoPaymentCheckout } from '@/hooks/useCryptoPaymentCheckout';
import { useCryptoPaymentStatus } from '@/hooks/useCryptoPaymentStatus';
import { useToast } from '@/hooks/useToast';
import { CryptoPayment } from '@/types/Billing';

import { useBillingCheckoutContext } from '../../Context';
import { PaymentComplete } from './PaymentComplete';
import { PaymentConfirming } from './PaymentConfirming';
import { PaymentData } from './PaymentData';
import { PaymentTrigger } from './PaymentTrigger';

export const CryptoContent: React.FC = () => {
  const { selectedToken, selectedPlatform, plan, setTokenAmount, setStage } = useBillingCheckoutContext();
  const [state, setState] = useState('trigger');
  const [paymentData, setPaymentData] = useState<CryptoPayment>();
  const toast = useToast();

  const checkoutMutation = useCryptoPaymentCheckout();

  const statusPool = useCryptoPaymentStatus({
    variables: {
      paymentUuid: paymentData?.uuid || '',
    },
    enabled: Boolean(paymentData),
  });

  const isPaymentTriggerDisabled = !selectedToken || !selectedPlatform || !plan;

  const handlePaymentBegin = async () => {
    if (isPaymentTriggerDisabled) {
      return;
    }

    try {
      const data = await checkoutMutation.mutateAsync({
        currency: selectedToken.symbol,
        network: selectedPlatform.id,
        planId: plan.id,
      });

      if ('error' in data) {
        throw data.error;
      }

      setPaymentData(data);
      setTokenAmount(data.amount);
      setState('data');
      setStage('crypto-selected');
    } catch (error) {
      toast.error({ message: 'Failed to create payment intent. Please contact the support or try again later.' });
    }
  };

  const handleCancel = () => {
    setPaymentData(undefined);
    setTokenAmount(undefined);
    setState('trigger');
    setStage('initial');
  };

  useEffect(() => {
    switch (statusPool.data?.status) {
      case 'check':
        setState('data');
        break;

      case 'confirm_check':
        setState('confirming');
        break;

      case 'paid':
      case 'paid_over':
        setState('complete');
        break;

      default:
        break;
    }
  }, [statusPool.data?.status]);

  return match(state)
    .with('trigger', () => (
      <PaymentTrigger
        isPaymentBeginning={checkoutMutation.isLoading}
        onPaymentBegin={handlePaymentBegin}
        isDisabled={isPaymentTriggerDisabled}
      />
    ))
    .with('data', () => <PaymentData data={paymentData as CryptoPayment} onCancel={handleCancel} />)
    .with('confirming', () => <PaymentConfirming network={statusPool.data?.network} transactionId={statusPool.data?.transactionId} />)
    .with('complete', () => <PaymentComplete />)
    .otherwise(() => null);
};
