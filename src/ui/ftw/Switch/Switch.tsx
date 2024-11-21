import * as RadixSwitch from '@radix-ui/react-switch';
import { type VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

import { buttonIntent } from '../Button/Button';

const switchVariants = cva(
  cn(
    'relative flex justify-center items-center w-fit',
    'focus-visible:ring-2 select-none font-medium',
    'disabled:cursor-not-allowed disabled:text-opacity-30',
    'rounded-full shadow-inner',
  ),
  {
    variants: {
      size: {
        sm: 'text-xs last:py-1 last:px-2.5 last:min-w-8',
        md: 'text-sm last:py-2 last:px-4 last:min-w-9',
        lg: 'text-md last:py-3 last:px-4 last:min-w-[80px]',
      },
      intent: buttonIntent,
      loading: {
        true: 'pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
      intent: 'neutral',
    },
  },
);

export type SwitchProps = RadixSwitch.SwitchProps &
  VariantProps<typeof switchVariants> & {
    labelOn?: string;
    labelOff?: string;
    loading?: boolean;
  };

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      children,
      loading,
      size,
      intent,
      disabled,
      checked,
      className,
      labelOff,
      labelOn,
      ...props
    },
    ref,
  ) => {
    return (
      <RadixSwitch.Root
        {...props}
        ref={ref}
        checked={checked}
        disabled={disabled}
        className={cn(switchVariants({ size, intent, loading }), className)}
      >
        <RadixSwitch.Thumb
          className={cn(
            'absolute flex h-full w-1/2 p-1 transition-transform duration-100',
            'after:bg-monochrome-normal after:rounded-full after:aspect-square',
            'after:shadow after:border',
            {
              'justify-end translate-x-1/2': checked,
              'justify-start -translate-x-1/2': !checked,
              'after:bg-opacity-30': disabled,
              'after:animate-ping': loading,
            },
          )}
        />

        <span
          className={cn('flex flex-1', {
            'justify-start': checked,
            'justify-end': !checked,
            'animate-pulse': loading,
          })}
        >
          {(checked ? labelOn : labelOff) || '\u00A0'}
          {children}
        </span>
      </RadixSwitch.Root>
    );
  },
);
