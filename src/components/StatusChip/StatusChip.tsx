import React, { forwardRef, useMemo } from 'react';

import { useSystemStatus } from '@/hooks/useSystemStatus';
import { Box, Icon, Text } from '@/ui';

export type StatusChipProps = React.ComponentProps<typeof Box>;

export const StatusChip = forwardRef<HTMLDivElement, StatusChipProps>(
  (props, ref) => {
    const systemStatus = useSystemStatus();

    const text = useMemo(() => {
      if (systemStatus.isLoading) {
        return 'Loading...';
      }

      return systemStatus.data?.status.description || 'Could not fetch status';
    }, [systemStatus]);

    const color = useMemo(() => {
      return parseStatusToColor(systemStatus.data?.status.indicator);
    }, [systemStatus]);

    return (
      <Box
        className="flex-row items-center gap-2 bg-neutral-3 rounded py-2 px-3 text-sm"
        {...props}
        ref={ref}
      >
        <Text>Status:</Text>
        {systemStatus.isLoading ? (
          <Icon name="spinner" />
        ) : (
          <span
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: `rgb(var(--color-ftw-${color}-11))` }}
          />
        )}
        <span
          className="truncate font-medium"
          style={{ color: `rgb(var(--color-ftw-${color}-11))` }}
        >
          {text}
        </span>
      </Box>
    );
  },
);

const parseStatusToColor = (status?: string) => {
  switch (status) {
    case 'none':
      return 'success';
    case 'minor':
      return 'warning';
    case 'major':
      return 'warning';
    case 'critical':
      return 'danger';
    default:
      return 'neutral';
  }
};
