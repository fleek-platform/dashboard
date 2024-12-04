import React from 'react';

import { useTheme } from '@/providers/ThemeProvider';
import { LoadingProps } from '@/types/Props';
import { Box, Button, Image, Skeleton, Text } from '@/ui';

export const Analytics: React.FC<LoadingProps> = ({ isLoading }) => {
  const { resolvedTheme = 'dark' } = useTheme();

  return (
    <Box
      variant="container"
      className="p-5 gap-4 items-center rounded-lg flex-1 bg-surface-content justify-between h-full"
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
              Analytics
            </Text>
            <Button variant="outline" intent="neutral" disabled={isLoading}>
              View analytics
            </Button>
          </>
        )}
      </Box>
      <Image
        src={`/assets/static/${resolvedTheme}/analytics-chart.png`}
        alt="chart"
      />
      <Box className="flex-row justify-around w-full">
        <Box className="gap-0">
          <Text variant="secondary" size="xs" className="self-start">
            Weekly
          </Text>
          <Text variant="primary" size="sm" weight={500} className="self-start">
            13,281
          </Text>
        </Box>
        <Box className="gap-0">
          <Text variant="secondary" size="xs" className="self-start">
            Monthly
          </Text>
          <Text variant="primary" size="sm" weight={500} className="self-start">
            48,291
          </Text>
        </Box>
        <Box className="gap-0">
          <Text variant="secondary" size="xs" className="self-start">
            Quarterly
          </Text>
          <Text variant="primary" size="sm" weight={500} className="self-start">
            321,390
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
