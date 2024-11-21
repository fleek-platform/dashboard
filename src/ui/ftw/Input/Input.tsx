/* eslint-disable react/forbid-elements */

import { cva, VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';

import { IconTooltip } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { Icon as IconComponent } from '@/ui/Icon/Icon';
import { IconName } from '@/ui/Icon/IconLibrary';
import { cn } from '@/utils/cn';

import { Text } from '../Text/Text';

const inputVariants = cva(
  'w-full border border-transparent overflow-hidden bg-transparent flex items-center text-neutral-12',
  {
    variants: {
      size: {
        xs: 'min-h-6 px-2.5 text-xs gap-2 rounded-md',
        sm: 'min-h-[2rem] px-2.5 text-sm gap-2 rounded-lg',
        md: 'min-h-[2.5rem] px-3 gap-2 rounded-lg',
        lg: 'min-h-8 text-lg px-4 gap-3 rounded-xl',
      },
      variant: {
        outline:
          'border-neutral-7 focus-within:outline outline-1 outline-offset-0 focus-within:outline-neutral-8 focus-within:border-neutral-8',
        ghost: 'px-0 rounded-none',
      },
      status: {
        isLoading: 'border-neutral-4 animate-pulse bg-neutral-4',
        error:
          'border-danger-8 focus-within:border-danger-8 focus-within:outline-danger-8',
        disabled: 'cursor-not-allowed bg-neutral-3 border-neutral-7',
      },
    },
    compoundVariants: [
      {
        variant: 'ghost',
        status: 'isLoading',
        className:
          'border border-neutral-4 animate-pulse bg-neutral-4 rounded-lg',
      },
      {
        variant: 'ghost',
        status: 'error',
        className:
          'border-0 rounded-none border-b border-danger-8 focus-within:border-danger-8',
      },
      {
        variant: 'ghost',
        status: 'disabled',
        className: 'bg-transparent border-none cursor-not-allowed',
      },
    ],
    defaultVariants: {
      variant: 'outline',
      size: 'sm',
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;

export type InputStatus =
  | 'validating'
  | 'invalid'
  | 'valid'
  | 'pending'
  | 'debouncing'
  | 'other';

export type InputRootProps = React.HTMLAttributes<HTMLDivElement> &
  InputVariants &
  ChildrenProps & {
    isLoading?: boolean;
    error?: boolean;
    disabled?: boolean;
    hidden?: boolean;
  };

const Root = forwardRef<HTMLDivElement, InputRootProps>(
  (
    {
      variant,
      size,
      isLoading,
      children,
      className,
      error,
      hidden,
      disabled,
      ...props
    },
    ref,
  ) => {
    const status = isLoading
      ? 'isLoading'
      : disabled
        ? 'disabled'
        : error
          ? 'error'
          : undefined;

    return (
      <div
        ref={ref}
        className={cn(
          inputVariants({ variant, size, status }),
          { hidden },
          className,
        )}
        {...props}
      >
        {!isLoading && children}
      </div>
    );
  },
);

export type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        autoComplete="off"
        className={cn(
          'outline-none bg-transparent h-full w-full disabled:cursor-not-allowed placeholder-neutral-8',
          className,
        )}
        {...props}
      />
    );
  },
);

export type InputTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    minHeight?: number;
    maxHeight?: number;
  };

const Textarea = forwardRef<HTMLTextAreaElement, InputTextareaProps>(
  ({ minHeight = 100, maxHeight = 300, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        autoComplete="off"
        style={{ minHeight, maxHeight }}
        className={cn(
          'outline-none bg-transparent h-full w-full resize-none disabled:cursor-not-allowed [field-sizing:content] py-2.5 placeholder-neutral-8',
          className,
        )}
        {...props}
      />
    );
  },
);

export type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  ChildrenProps & {
    error?: boolean;
    tooltip?: React.ReactNode;
  };

const Label: React.FC<InputLabelProps> = ({
  error,
  tooltip,
  children,
  className,
  ...props
}) => {
  return (
    <label
      className={cn(
        'text-xs flex items-center gap-1 text-neutral-11',
        { 'text-danger-11': error },
        className,
      )}
      {...props}
    >
      {children}
      {tooltip && (
        <IconTooltip
          iconName="information-circle"
          side="top"
          className="text-xs text-neutral-11"
        >
          {tooltip}
        </IconTooltip>
      )}
    </label>
  );
};

export type InputIconProps = Partial<typeof IconComponent> & {
  name: IconName;
  status?: InputStatus;
  tooltip?: React.ReactNode;
};

const Icon: React.FC<InputIconProps> = ({
  status,
  name,
  tooltip,
  className,
  ...props
}) => {
  const classNames = cn(
    'text-neutral-8',
    {
      'text-danger-11': status === 'invalid',
      'text-neutral-11': status === 'validating',
      'text-success-11': status === 'valid',
    },
    className,
  );

  if (tooltip) {
    return (
      <IconTooltip side="top" iconName={name} className={classNames} {...props}>
        {tooltip}
      </IconTooltip>
    );
  }

  return <IconComponent name={name} className={classNames} {...props} />;
};

const Tag: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="flex items-center shrink-0 px-2 min-h-4 bg-neutral-3 rounded-full pointer-events-none">
      <Text className="text-[length:inherit]">{children}</Text>
    </div>
  );
};

export type InputHintProps = React.HTMLAttributes<HTMLParagraphElement> &
  ChildrenProps & {
    error?: boolean;
    icon?: IconName;
  };

const Hint: React.FC<InputHintProps> = ({
  error,
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <Text
      className={cn(
        'text-xs flex items-center gap-1 text-neutral-11',
        { 'text-danger-11': error },
        className,
      )}
      {...props}
    >
      {icon && <IconComponent name={icon} className="text-[0.625rem]" />}
      {children}
    </Text>
  );
};

export const Input = {
  Root,
  Field,
  Textarea,
  Label,
  Icon,
  Tag,
  Hint,
};
