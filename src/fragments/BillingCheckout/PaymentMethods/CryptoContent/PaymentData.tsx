import { DateTime, Duration } from 'luxon';
import { useEffect, useState } from 'react';

import { useToast } from '@/hooks/useToast';
import { TEST_ID } from '@/test/testId';
import { CryptoPayment } from '@/types/Billing';
import { Button, Icon, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';

import { CryptoContentStyles as S } from './CryptoContent.styles';

export type PaymentDataProps = {
  data: CryptoPayment;
  onCancel: () => void;
};

export const PaymentData: React.FC<PaymentDataProps> = ({ data, onCancel }) => {
  return (
    <>
      <S.GapWrapper>
        <S.Title>Pay with Crypto</S.Title>
        <S.Text>
          Execute the transaction rather using the QRCode or transferring the
          exact amount described for the address below.
        </S.Text>
      </S.GapWrapper>

      <S.PaymentData.Container>
        <Address>{data.address}</Address>
        <S.PaymentData.BottomRow>
          <S.PaymentData.QrCode data={data.paymentUri} />
          <Timer expireAt={data.expireAt} />
        </S.PaymentData.BottomRow>
      </S.PaymentData.Container>

      <Button intent="neutral" onClick={onCancel}>
        Cancel
      </Button>
    </>
  );
};

type AddressProps = {
  children: string;
};

const Address: React.FC<AddressProps> = ({ children }) => {
  const toast = useToast();

  const handleCopy = () => {
    try {
      copyToClipboard(children);
      toast.success({ message: 'Address copied to clipboard' });
    } catch (error) {
      toast.error({ message: 'Failed to copy address to clipboard' });
    }
  };

  return (
    <S.PaymentData.Address.Wrapper>
      <S.PaymentData.Address.Label>
        Recipient Address
      </S.PaymentData.Address.Label>
      <S.PaymentData.Address.Container onClick={handleCopy}>
        <Text className="truncate">{children}</Text>
        <Icon name="copy" />
      </S.PaymentData.Address.Container>
    </S.PaymentData.Address.Wrapper>
  );
};

type TimerProps = {
  expireAt: string;
};

const Timer: React.FC<TimerProps> = ({ expireAt }) => {
  const [timeLeft, setTimeLeft] = useState(
    DateTime.fromISO(expireAt).diffNow(),
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Math.floor(timeLeft.as('seconds')) > 0) {
        setTimeLeft(DateTime.fromISO(expireAt).diffNow());
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [timeLeft, expireAt]);

  return (
    <S.PaymentData.Timer.Wrapper>
      <S.PaymentData.Timer.Counter data-testid={TEST_ID.BILLING_CHECKOUT_TIMER}>
        <Icon name="spinner" />
        {Duration.fromMillis(Math.max(0, timeLeft.toMillis())).toFormat(
          'hh:mm:ss',
        )}
      </S.PaymentData.Timer.Counter>

      <Text>
        Time left to send the payment, if not received in time, the transaction
        will cancel.
      </Text>
    </S.PaymentData.Timer.Wrapper>
  );
};
