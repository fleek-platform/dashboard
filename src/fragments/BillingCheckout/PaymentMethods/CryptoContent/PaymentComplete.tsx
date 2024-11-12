import { routes } from '@fleek-platform/utils-routes';

import { CryptoContentStyles as S } from './CryptoContent.styles';

export const PaymentComplete: React.FC = () => {
  return (
    <>
      <S.PaymentStatus.Wrapper>
        <S.PaymentStatus.Icon name="check-circled" color="green" />
        <S.Title>Payment Complete</S.Title>
        <S.Text>
          Payment has been received successfully, your plan has now been
          upgraded.
        </S.Text>
      </S.PaymentStatus.Wrapper>

      <S.PaymentStatus.FinishButton href={routes.home()}>
        Go to Home
      </S.PaymentStatus.FinishButton>
    </>
  );
};
