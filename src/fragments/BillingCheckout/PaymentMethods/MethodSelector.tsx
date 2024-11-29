import type { ChildrenProps } from '@/types/Props';
import { Button, type IconName } from '@/ui';

import { type BillingCheckoutContext, useBillingCheckoutContext } from '../Context';
import { PaymentMethodsStyles as S } from './PaymentMethods.styles';

export const MethodSelector: React.FC = () => {
  return (
    <S.Selector.Wrapper>
      <MethodSelectorButton method="crypto" icon="wallet">
        Crypto Payment
      </MethodSelectorButton>

      <MethodSelectorButton method="fiat" icon="fleek">
        Fiat Payment
      </MethodSelectorButton>
    </S.Selector.Wrapper>
  );
};

type MethodSelectorProps = ChildrenProps<{
  method: BillingCheckoutContext['method'];
  icon: IconName;
}>;

const MethodSelectorButton: React.FC<MethodSelectorProps> = ({
  method,
  icon,
  children,
}) => {
  const {
    method: selectedMethod,
    setMethod,
    stage,
  } = useBillingCheckoutContext();
  const isSelected = selectedMethod === method;

  const handleSelect = () => {
    setMethod(method);
  };

  return (
    <Button
      intent={isSelected ? 'accent' : 'ghost'}
      disabled={stage !== 'initial'}
      onClick={handleSelect}
      iconLeft={icon}
    >
      {children}
    </Button>
  );
};
