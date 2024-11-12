import { Icon } from '@/ui';

import { BillingStyles as S } from './Billing.styles';

export type BenefitsListProps = {
  benefits: string[];
};

export const BenefitsList: React.FC<BenefitsListProps> = ({ benefits }) => {
  return (
    <S.BenefitsList.Container>
      {benefits.map((benefit) => (
        <S.BenefitsList.Item key={benefit}>
          <Icon name="fleek" />
          {benefit}
        </S.BenefitsList.Item>
      ))}
    </S.BenefitsList.Container>
  );
};
