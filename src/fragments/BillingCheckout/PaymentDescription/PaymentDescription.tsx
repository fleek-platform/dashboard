import { AlertBox, Billing, Form, LearnMoreMessage } from '@/components';
import { useToast } from '@/hooks/useToast';
import { BillingPlan, CryptoPaymentOption } from '@/types/Billing';
import { Divider, Icon } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';

import { useBillingCheckoutContext } from '../Context';
import { PaymentDescriptionStyles as S } from './PaymentDescription.styles';

export const PaymentDescription: React.FC = () => {
  const { method, plan, selectedToken } = useBillingCheckoutContext();

  const values = methodValues[method];

  return (
    <S.Container>
      <S.GapWrapper>
        <S.Title>Plan Benefits</S.Title>
        <S.Text>Take the next steps to upgrade your plan.</S.Text>
      </S.GapWrapper>

      <Billing.BenefitsList benefits={plan.benefits} />

      <Divider />

      <Form.InputField name="promoCode" label="Promo Code" placeholder="Enter Promo" />

      <S.GapWrapper>
        <PriceRow label="Plan" value={`${formatPrice(plan.price)} USD`} />
        <PriceRow
          label={values.totalMessage}
          value={values.getAmount({ token: selectedToken, plan })}
          highlight
          copyValue={values.enableCopy && plan.price}
        />
      </S.GapWrapper>

      <S.Text>Transaction fee not included in total cost.</S.Text>

      <AlertBox variant="tertiary" size="sm">
        Overage will be billed next payment (if applicable)
      </AlertBox>

      <LearnMoreMessage href={values.readMoreHref}>{values.readMoreMessage}</LearnMoreMessage>
    </S.Container>
  );
};

type PriceRowProps = {
  label: string;
  value: string;
  copyValue?: number | false;
  highlight?: boolean;
};

const PriceRow: React.FC<PriceRowProps> = ({ label, value, highlight, copyValue }) => {
  const toast = useToast();

  const handleCopy = () => {
    if (!copyValue) {
      return;
    }

    try {
      copyToClipboard(copyValue.toString());
      toast.success({ message: 'Amount copied to clipboard' });
    } catch {
      toast.error({ message: 'Failed to copy amount to clipboard' });
    }
  };

  return (
    <S.Row>
      {label}
      <S.Price highlight={highlight} onClick={handleCopy}>
        {value} {copyValue && <Icon name="copy" />}
      </S.Price>
    </S.Row>
  );
};

const methodValues = {
  fiat: {
    readMoreMessage: 'Paying with Fiat',
    readMoreHref: '#',
    totalMessage: 'Total in Fiat',
    getAmount: ({ plan }: GetFiatAmountArgs) => {
      return `$${formatPrice(plan.price)}`;
    },
    enableCopy: false,
  },
  crypto: {
    readMoreMessage: 'Paying with Crypto',
    readMoreHref: '#',
    totalMessage: 'Total in Crypto',
    getAmount: ({ token, plan }: GetCryptoAmountArgs) => {
      return `${formatPrice(plan.price)} ${token?.symbol}`;
    },
    enableCopy: true,
  },
} as const;

const formatPrice = (price: number) => {
  return price.toFixed(2);
};

type GetCryptoAmountArgs = {
  token?: CryptoPaymentOption;
  plan: BillingPlan;
};

type GetFiatAmountArgs = {
  plan: BillingPlan;
};
