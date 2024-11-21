import type { ChildrenProps } from '@/types/Props';

import { BillingStyles as S } from './Billing.styles';

export type PriceTagProps = ChildrenProps;

export const PriceTag: React.FC<PriceTagProps> = ({ children }) => {
  return (
    <S.Price>
      $<b>{children}</b>
      /mo
    </S.Price>
  );
};
