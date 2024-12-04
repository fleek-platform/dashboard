import { forwardRef } from 'react';

import { Icon } from '@/ui';
import { cn } from '@/utils/cn';

export type StatusRadioProps = {
  status?: 'error' | 'success' | 'spinner';
} & React.HTMLAttributes<HTMLSpanElement>;

export const StatusRadio = forwardRef<HTMLSpanElement, StatusRadioProps>(
  ({ status, ...props }, ref) => {
    const getIcon = () => {
      switch (status) {
        case 'error':
          return 'alert-circled';
        case 'success':
          return 'check-circled';
        case 'spinner':
          return 'spinner';
        default:
          return 'circle';
      }
    };

    return (
      <Icon
        {...props}
        ref={ref}
        name={getIcon()}
        className={cn('text-neutral-7', {
          'text-success-11': status === 'success',
          'text-danger-11': status === 'error',
        })}
      />
    );
  },
);
