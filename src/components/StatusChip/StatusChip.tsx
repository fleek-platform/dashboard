import type React from 'react';
import { useMemo } from 'react';

import { useSystemStatus } from '@/hooks/useSystemStatus';
import { forwardStyledRef } from '@/theme';
import { Icon, Text } from '@/ui';

import { StatusChipStyles as S } from './StatusChip.styles';

export type StatusChipProps = React.ComponentProps<typeof S.Container>;

export const StatusChip = forwardStyledRef<HTMLDivElement, StatusChipProps>(
  S.Container,
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
      <S.Container variant="container" {...props} ref={ref}>
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
      </S.Container>
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
