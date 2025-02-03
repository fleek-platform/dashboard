import { ChildrenProps } from '@/types/Props';
import { Box, Text } from '@/ui';

export type PriceTagProps = ChildrenProps;

export const PriceTag: React.FC<PriceTagProps> = ({ children }) => {
  return (
    <Box className="flex-row gap-1 items-end">
      <Text variant="primary" size="lg" weight={500}>
        $
      </Text>
      <Text variant="primary" size="3xl" weight={700} className="leading-none">
        {children}
      </Text>
      <Text variant="primary" size="lg" weight={500}>
        /mo
      </Text>
    </Box>
  );
};
