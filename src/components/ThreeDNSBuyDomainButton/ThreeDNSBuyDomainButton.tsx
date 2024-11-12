import { constants } from '@/constants';

import { ThreeDNSBuyDomainButtonStyles as S } from './ThreeDNSBuyDomainButton.styles';

export const ThreeDNSBuyDomainButton: React.FC = () => {
  return (
    <S.Container href={constants.EXTERNAL_LINK.THREE_DNS_BUY_DOMAIN}>
      Buy Domain <S.Icon name="3dns" is3DNS />
      <S.Icon name="arrow-up-right" />
    </S.Container>
  );
};
