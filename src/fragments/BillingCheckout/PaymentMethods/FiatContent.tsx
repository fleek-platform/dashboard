import { useEffect } from 'react';
import { match } from 'ts-pattern';

import { AlertBox } from '@/components';
import { useStripeCheckout } from '@/hooks/useStripeCheckout';
import { Button } from '@/ui';

import { useBillingCheckoutContext } from '../Context';
import { PaymentComplete } from './CryptoContent/PaymentComplete';
import { PaymentMethodsStyles as S } from './PaymentMethods.styles';

export const FiatContent: React.FC = () => {
  const { setStage, plan } = useBillingCheckoutContext();
  const checkout = useStripeCheckout({
    plan,
    domSelector: '#payment-element',
  });

  useEffect(() => {
    switch (checkout.state) {
      case undefined:
      case 'initial':
      case 'stripe-loaded':
      case 'elements-mounted':
      case 'submit-failed':
        setStage('initial');
        break;

      case 'submitting':
        setStage('fiat-selected');
        break;

      case 'submit-success':
        setStage('complete');
        break;
    }
  }, [checkout.state, setStage]);

  if (checkout.state === 'submit-success') {
    return <PaymentComplete />;
  }

  return match(checkout.state)
    .with(undefined, 'initial', 'stripe-loaded', 'elements-mounted', 'submitting', 'submit-failed', (state) => {
      const isLoading = state === 'submitting';

      return (
        <>
          <S.GapWrapper>
            <S.Title>Pay with Fiat</S.Title>
            <S.Text>Select the network and currency to send payment to the recipient address provided below.</S.Text>
          </S.GapWrapper>

          {/* eslint-disable-next-line react/forbid-elements */}
          <div style={{ minHeight: 285 }} id="payment-element" />

          {checkout.submit && (
            <Button onClick={checkout.submit} loading={isLoading} disabled={isLoading || !checkout.submit}>
              Pay
            </Button>
          )}

          {checkout.message && (
            <AlertBox variant="danger" size="sm">
              {checkout.message}
            </AlertBox>
          )}
        </>
      );
    })
    .exhaustive();
};
