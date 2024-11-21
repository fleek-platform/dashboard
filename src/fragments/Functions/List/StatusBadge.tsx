import { capitalize } from 'lodash';

import { type BadgeTextColor, BadgeText } from '@/components';
import { type FleekFunctionStatus } from '@/generated/graphqlClient';

type StatusBadgeProps = {
  status?: FleekFunctionStatus | string | null;
};

const STATUS_COLOR_MAP: Record<string, BadgeTextColor> = {
  ACTIVE: 'green',
  INACTIVE: 'red',
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const resolvedStatus = capitalize(status ?? 'Not deployed');

  const colorScheme = STATUS_COLOR_MAP[resolvedStatus.toUpperCase()] || 'amber';

  return <BadgeText colorScheme={colorScheme}>{resolvedStatus}</BadgeText>;
};
