import { BadgeText } from '@/components';
import type { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Text } from '@/ui';

import { BillingStyles as S } from './Billing.styles';
import { PriceTag } from './PriceTag';

export type HorizontalPlanCardProps = ChildrenProps<HeaderProps>;

export const HorizontalPlanCard: React.FC<HorizontalPlanCardProps> = ({
  children,
  ...headerProps
}) => {
  return (
    <S.Container horizontal>
      <Header {...headerProps} />

      {children}
    </S.Container>
  );
};

type HeaderProps = LoadingProps<{
  title: string;
  description: string;
  price: string;
  isActive?: boolean;
  withOverload?: boolean;
}>;

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  price,
  isActive,
  isLoading,
  withOverload,
}) => {
  if (isLoading) {
    return (
      <S.HeaderWrapper>
        <Box>
          <S.Skeleton variant="title" />
          <S.Skeleton variant="description" />
        </Box>
        <S.Skeleton variant="price" />
      </S.HeaderWrapper>
    );
  }

  return (
    <S.HeaderWrapper>
      <Box>
        <S.Title>
          {title}
          {isActive && <BadgeText colorScheme="green">Active</BadgeText>}
        </S.Title>
        <S.Description>{description}</S.Description>
      </Box>

      <span>
        <PriceTag>{price}</PriceTag>
        {withOverload && <Text>&nbsp;(+ overage)</Text>}
      </span>
    </S.HeaderWrapper>
  );
};
