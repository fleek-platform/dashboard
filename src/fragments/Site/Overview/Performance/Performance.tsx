import React from 'react';

import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Button, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';

export type PerformanceProps = LoadingProps<{
  score?: number;
}>;

export const Performance: React.FC<PerformanceProps> = ({
  score,
  isLoading,
}) => {
  return (
    <Box
      variant="container"
      className="p-5 gap-4 items-center rounded-lg flex-1 bg-surface-content justify-between"
    >
      <Box className="flex flex-row justify-between w-full items-center">
        {isLoading ? (
          <>
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="button" className="w-1/4 h-[2rem]" />
          </>
        ) : (
          <>
            <Text
              variant="primary"
              size="md"
              weight={700}
              className="self-start"
            >
              Site Performance
            </Text>
            <Button variant="outline" intent="neutral" disabled={isLoading}>
              View performance
            </Button>
          </>
        )}
      </Box>
      <Box className="flex-row gap-6 items-center w-full">
        <ScoreCircle score={score} isLoading={isLoading} />
        <Box className="gap-2 flex-1">
          <PerformanceItem route="/" score={100} isLoading={isLoading} />
          <PerformanceItem route="/docs" score={100} isLoading={isLoading} />
          <PerformanceItem route="/home" score={100} isLoading={isLoading} />
          <PerformanceItem
            route="/docs/toast"
            score={100}
            isLoading={isLoading}
          />
        </Box>
      </Box>
      <Box
        variant="container"
        className={cn(
          'flex flex-row gap-3 py-2.5 px-0 w-full rounded-[22.5rem] justify-center bg-transparent',
          {
            'border-none': isLoading,
          },
        )}
      >
        {isLoading ? (
          <Skeleton className="w-full h-[2rem] rounded-[22.5rem]" />
        ) : (
          <>
            <ScoreReference variant="red">0-49</ScoreReference>
            <ScoreReference variant="yellow">50-89</ScoreReference>
            <ScoreReference variant="green">90-100</ScoreReference>
          </>
        )}
      </Box>
    </Box>
  );
};

const ScoreReference: React.FC<
  ChildrenProps<{ variant: 'red' | 'yellow' | 'green' }>
> = ({ children, variant }) => (
  <Box className="flex-row items-center gap-2 text-xs">
    <span
      className={cn('aspect-square rounded-full w-[0.625rem]', {
        'bg-danger-11': variant === 'red',
        'bg-warning-11': variant === 'yellow',
        'bg-success-11': variant === 'green',
      })}
    />
    {children}
  </Box>
);

type ScoreCircleProps = LoadingProps<{
  score?: PerformanceProps['score'];
}>;

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score, isLoading }) => {
  const variant = getScoreVariant(score);

  return (
    <Box
      className={cn(
        'aspect-square rounded-full w-[5.75rem] h-[5.75rem] items-center justify-center border-4 border-solid font-medium text-3xl',
        {
          'border-success-8 bg-success-2 text-success-11': variant === 'green',
          'border-warning-8 bg-warning-2': variant === 'yellow',
          'border-danger-8 bg-danger-2': variant === 'red',
          'border-neutral-8 bg-neutral-2': variant === 'pending',
          'border-none': isLoading,
        },
      )}
    >
      {isLoading ? (
        <Skeleton className="w-full rounded-full h-full" />
      ) : (
        score || 'Pending'
      )}
    </Box>
  );
};

type PerformanceItemProps = LoadingProps<{
  route: string;
  score: number;
}>;

const PerformanceItem: React.FC<PerformanceItemProps> = ({
  route,
  score,
  isLoading,
}) => {
  return (
    <Box
      variant="container"
      className={cn(
        'flex-row rounded-md bg-transparent justify-between py-2.5 px-3',
        { 'p-0 border-none': isLoading },
      )}
    >
      {isLoading ? (
        <Skeleton className="w-full h-[2rem]" />
      ) : (
        <>
          <Text variant="primary" size="xs">
            {route}
          </Text>
          <Text variant="secondary" size="xs">
            {score}
          </Text>
        </>
      )}
    </Box>
  );
};

type ScoreCircleVariantType = 'pending' | 'green' | 'yellow' | 'red';

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
