import { BadgeText } from '@/components';
import type { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Skeleton, Text } from '@/ui';

import { PriceTag } from './PriceTag';

export type HorizontalPlanCardProps = ChildrenProps<HeaderProps>;

export const HorizontalPlanCard: React.FC<HorizontalPlanCardProps> = ({
  children,
  ...headerProps
}) => {
  return (
    <Box variant="container">
      <Header {...headerProps} />
      {children}
    </Box>
  );
};

type HeaderProps = LoadingProps<{
  title: string;
  description: string;
  price: string | null;
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
      <Box className="flex-row justify-between items-center">
        <Box className="w-1/3 gap-3">
          <Skeleton variant="text" className="w-1/2" />
          <Skeleton variant="text" />
        </Box>
        <Skeleton variant="text" className="w-1/5" />
      </Box>
    );
  }

  return (
    <Box className="flex-row justify-between items-center">
      <Box className="gap-2">
        <Box>
          <Text variant="primary" weight={700} size="lg">
            {title}
          </Text>
          {isActive && <BadgeText colorScheme="green">Active</BadgeText>}
        </Box>
        <Text>{description}</Text>
      </Box>

      <Box>
        {price && <PriceTag>{price}</PriceTag>}
        {withOverload && <Text>&nbsp;(+ overage)</Text>}
      </Box>
    </Box>
  );
};
