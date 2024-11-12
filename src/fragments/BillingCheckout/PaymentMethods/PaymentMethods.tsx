import { match } from 'ts-pattern';

import { useBillingCheckoutContext } from '../Context';
import { CryptoContent } from './CryptoContent/CryptoContent';
import { FiatContent } from './FiatContent';
import { MethodSelector } from './MethodSelector';
import { PaymentMethodsStyles as S } from './PaymentMethods.styles';

export const PaymentMethods: React.FC = () => {
  const { method } = useBillingCheckoutContext();

  return (
    <S.Container>
      <MethodSelector />

      {match(method)
        .with('crypto', () => <CryptoContent />)
        .with('fiat', () => <FiatContent />)
        .exhaustive()}
    </S.Container>
  );
};
