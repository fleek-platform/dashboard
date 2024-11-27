import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { Icon, IconProps } from '@/ui';
import { cn } from '@/utils/cn';

export const buttonIntent = {
  neutral: 'text-neutral-11 bg-neutral-3 hover:bg-neutral-4 active:bg-neutral-5 focus-visible:ring-neutral-8',
  accent: 'text-accent-11 bg-accent-3 hover:bg-accent-4 active:bg-accent-5 focus-visible:ring-accent-8',
  success: 'text-success-11 bg-success-3 hover:bg-success-4 active:bg-success-5 focus-visible:ring-success-8',
  warning: 'text-warning-11 bg-warning-3 hover:bg-warning-4 active:bg-warning-5 focus-visible:ring-warning-8',
  danger: 'text-danger-11 bg-danger-3 hover:bg-danger-4 active:bg-danger-5 focus-visible:ring-danger-8',
  ghost: 'text-neutral-11 bg-transparent hover:bg-neutral-4 active:bg-neutral-5 disabled:bg-transparent  focus-visible:ring-neutral-8',
} as const;

export const buttonVariants = cva(
  'flex relative items-center w-fit justify-center focus-visible:ring-2 select-none font-medium transition-all disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'disabled:bg-neutral-3 disabled:text-neutral-8',
        outline: 'outline outline-1 disabled:outline-neutral-7 disabled:text-neutral-8 disabled:hover:bg-transparent',
      },
      intent: buttonIntent,
      size: {
        xs: 'px-2.5 h-6',
        sm: 'h-[2rem] px-2.5 text-sm rounded-md gap-1',
        md: 'h-[2.5rem] px-3 text-sm rounded-lg gap-3',
        lg: 'h-8 px-4 text-md rounded-xl gap-3',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        intent: 'accent',
        className: 'bg-transparent outline-accent-8 hover:bg-accent-2 active:bg-accent-3',
      },
      {
        variant: 'outline',
        intent: 'success',
        className: 'bg-transparent outline-success-8 hover:bg-success-2 active:bg-success-3',
      },
      {
        variant: 'outline',
        intent: 'warning',
        className: 'bg-transparent outline-warning-8 hover:bg-warning-2 active:bg-warning-3',
      },
      {
        variant: 'outline',
        intent: 'danger',
        className: 'bg-transparent outline-danger-8 hover:bg-danger-2 active:bg-danger-3',
      },
      {
        variant: 'outline',
        intent: 'neutral',
        className: 'bg-transparent outline-neutral-8 hover:bg-neutral-2 active:bg-neutral-3',
      },
      {
        variant: 'outline',
        intent: 'ghost',
        className: 'outline-none',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      intent: 'accent',
      size: 'sm',
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    iconLeft?: IconProps['name'];
    iconRight?: IconProps['name'];
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, intent, variant, size, loading, disabled, iconLeft, iconRight, className, ...props }, ref) => {
    return (
      <button {...props} ref={ref} disabled={disabled || loading} className={cn(buttonVariants({ variant, intent, size }), className)}>
        {loading && <Icon name="spinner" />}
        {!loading && iconLeft && <Icon name={iconLeft} />}
        {children}
        {iconRight && <Icon name={iconRight} />}
      </button>
    );
  }
);
