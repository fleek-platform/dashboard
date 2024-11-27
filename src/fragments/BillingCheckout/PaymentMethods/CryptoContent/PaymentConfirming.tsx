import { Icon } from '@/ui';
import { getLinkForBlockchainTransaction } from '@/utils/getLinkForBlockchainTransaction';

import { CryptoContentStyles as S } from './CryptoContent.styles';

export type PaymentConfirmingProps = {
  transactionId?: string;
  network?: string;
};

export const PaymentConfirming: React.FC<PaymentConfirmingProps> = ({
  transactionId,
  network,
}) => {
  return (
    <>
      <S.PaymentStatus.Wrapper>
        <S.PaymentStatus.Icon name="spinner" />
        <S.Title>Confirming Transaction</S.Title>
        <S.Text>Please wait until the network confirms your payment.</S.Text>
      </S.PaymentStatus.Wrapper>

      {transactionId && network && (
        <S.PaymentStatus.ViewTransactionButton
          href={getLinkForBlockchainTransaction({ transactionId, network })}
        >
          View my Transaction <Icon name="arrow-up-right" />
        </S.PaymentStatus.ViewTransactionButton>
      )}
    </>
  );
};
