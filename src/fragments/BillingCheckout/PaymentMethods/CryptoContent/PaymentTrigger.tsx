// TODO: This file and related can be deleted?
import { useEffect } from 'react';

import { constants } from '@/constants';
import { useCryptoPaymentOptions } from '@/hooks/useCryptoPaymentOptions';
import type { CryptoPaymentOption } from '@/types/Billing';
import type { DisabledProps, LoadingProps } from '@/types/Props';
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

  return null;
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
