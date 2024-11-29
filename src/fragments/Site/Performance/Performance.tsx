import type { LoadingProps } from '@/types/Props';
import { Box, Button, Skeleton, Text } from '@/ui';

import { PerformanceStyles as S } from './Performance.styles';

export type PerformanceProps = LoadingProps<{
  score?: number;
}>;

export const Performance: React.FC<PerformanceProps> = ({
  score,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <S.Container isLoading>
        <Skeleton />
        <S.ScoreCircle variant="loading">
          <Skeleton />
        </S.ScoreCircle>
        <S.SkeletonRow />
        <S.ButtonSkeleton />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Text variant="tertiary" size="lg" weight={700} className="self-start">
        Site Performance
      </Text>
      <S.ScoreCircle variant={getScoreVariant(score)}>
        {score || 'Pending'}
      </S.ScoreCircle>
      <S.Row>
        <Box>
          <S.CircleDecoration variant="red" />
          0-49
        </Box>
        <Box>
          <S.CircleDecoration variant="yellow" />
          50-89
        </Box>
        <Box>
          <S.CircleDecoration variant="green" />
          90-100
        </Box>
      </S.Row>
      <Button intent="neutral">View analytics</Button>
    </S.Container>
  );
};

type ScoreCircleVariantType = React.ComponentProps<
  typeof S.ScoreCircle
>['variant'];

const getScoreVariant = (
  score: PerformanceProps['score'],
): ScoreCircleVariantType => {
  if (!score) {
    return 'pending';
  }

  if (score >= 90) {
    return 'green';
  }

  if (score >= 50) {
    return 'yellow';
  }

  return 'red';
};
