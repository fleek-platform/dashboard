import { DateTime } from 'luxon';
import { ComponentProps } from 'react';

import { Text } from '@/ui';

type DeployTimeProps = {
  at?: string;
  before?: string;
  size?: ComponentProps<typeof Text>['size'];
  variant?: ComponentProps<typeof Text>['variant'];
};

export const DeployTime = ({
  at,
  before,
  size = 'sm',
  variant = 'primary',
}: DeployTimeProps) => {
  if (!at) {
    return (
      <Text size={size} variant={variant}>
        -
      </Text>
    );
  }

  return (
    <time dateTime={at}>
      <Text size={size} variant={variant} className="flex gap-[0.25em]">
        <span>{before}</span>
        <span>{DateTime.fromISO(at).toRelative()}</span>
      </Text>
    </time>
  );
};
