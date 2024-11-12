import { BadgeText } from '@/components';
import { Box, Text } from '@/ui';

import { DeploymentStyles as S } from './DeploymentDetail.styles';

export const BuildBreakdown: React.FC = () => {
  return (
    <>
      <BreakdownRow label="Build" />
      <BreakdownRow label="Upload" />
      <BreakdownRow label="Release" />
      <BreakdownRow label="Check" />
    </>
  );
};

type BreakdownRowProps = {
  label: string;
  text?: string;
};

export const BreakdownRow: React.FC<BreakdownRowProps> = ({ label, text = '-' }) => (
  <S.Row.Container>
    <Box>
      <Text variant="primary">{label}</Text>
      <Text size="xs">{text}</Text>
    </Box>
    <BadgeText colorScheme="green">Complete</BadgeText>
  </S.Row.Container>
);
