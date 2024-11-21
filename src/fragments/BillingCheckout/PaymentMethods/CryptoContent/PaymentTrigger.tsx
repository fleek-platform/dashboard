import { useEffect } from 'react';

import { constants } from '@/constants';
import { useCryptoPaymentOptions } from '@/hooks/useCryptoPaymentOptions';
import { CryptoPaymentOption } from '@/types/Billing';
import { DisabledProps, LoadingProps } from '@/types/Props';
import { Button, Combobox, FormField, Image } from '@/ui';

import { useBillingCheckoutContext } from '../../Context';
import { CryptoContentStyles as S } from './CryptoContent.styles';

export type PaymentTriggerProps = {
  onPaymentBegin: () => void;
  isPaymentBeginning: boolean;
} & DisabledProps;

export const PaymentTrigger: React.FC<PaymentTriggerProps> = ({
  onPaymentBegin,
  isPaymentBeginning,
  isDisabled,
}) => {
  const cryptoPaymentOptions = useCryptoPaymentOptions();

  return (
    <>
      <S.GapWrapper>
        <S.Title>Pay with Crypto</S.Title>
        <S.Text>
          Select the network and currency to send payment to the recipient
          address provided below.
        </S.Text>

        <CurrencyOptions
          isLoading={cryptoPaymentOptions.isLoading}
          options={
            cryptoPaymentOptions.data && 'options' in cryptoPaymentOptions.data
              ? cryptoPaymentOptions.data.options
              : []
          }
        />
      </S.GapWrapper>

      <S.PaymentTrigger.CTAContainer>
        <S.Title>Are you ready to pay?</S.Title>
        <S.Text>Click the button below to begin the payment process.</S.Text>

        <Button
          onClick={onPaymentBegin}
          loading={isPaymentBeginning}
          disabled={isDisabled}
        >
          Begin payment
        </Button>
      </S.PaymentTrigger.CTAContainer>
    </>
  );
};

type CurrencyOptionsProps = LoadingProps<{
  options: CryptoPaymentOption[];
}>;

const CurrencyOptions: React.FC<CurrencyOptionsProps> = ({
  options,
  isLoading,
}) => {
  const {
    selectedToken,
    setSelectedToken,
    selectedPlatform,
    setSelectedPlatform,
  } = useBillingCheckoutContext();

  useEffect(() => {
    if (selectedToken) {
      setSelectedPlatform(selectedToken.networks[0]);
    }
  }, [selectedToken, setSelectedPlatform]);

  useEffect(() => {
    if (options) {
      const defaultToken =
        options.find(
          (option) => option.symbol === constants.BILLING.DEFAULT_CRYPTO_TOKEN,
        ) || options[0];
      setSelectedToken(defaultToken);
    }
  }, [options, setSelectedToken]);

  return (
    <S.PaymentTrigger.OptionsWrapper>
      <FormField.Root>
        <FormField.Label>Currency</FormField.Label>
        <Combobox
          selected={[selectedToken, setSelectedToken]}
          items={options || []}
          queryKey="symbol"
          isLoading={isLoading}
        >
          {({ Field, Options }) => (
            <>
              <Field>
                {(selected) => (
                  <>
                    <Image src={selected.iconSrc} alt={selected.symbol} />{' '}
                    {selected.symbol}
                  </>
                )}
              </Field>

              <Options disableSearch>
                {(item) => (
                  <>
                    <Image src={item.iconSrc} alt={item.symbol} /> {item.symbol}
                  </>
                )}
              </Options>
            </>
          )}
        </Combobox>
      </FormField.Root>

      <FormField.Root>
        <FormField.Label>Network</FormField.Label>
        <Combobox
          selected={[selectedPlatform, setSelectedPlatform]}
          items={selectedToken?.networks || []}
          queryKey="title"
          isLoading={isLoading}
        >
          {({ Field, Options }) => (
            <>
              <Field>
                {(selected) => (
                  <>
                    <Image src={selected.iconSrc} alt={selected.title} />{' '}
                    {selected.title}
                  </>
                )}
              </Field>

              <Options disableSearch>
                {(item) => (
                  <>
                    <Image src={item.iconSrc} alt={item.title} /> {item.title}
                  </>
                )}
              </Options>
            </>
          )}
        </Combobox>
      </FormField.Root>
    </S.PaymentTrigger.OptionsWrapper>
  );
};
