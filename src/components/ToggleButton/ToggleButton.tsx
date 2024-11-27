import { forwardRef, MouseEventHandler } from 'react';

import { DisabledProps, LoadingProps } from '@/types/Props';
import { Button, ButtonProps, IconName } from '@/ui';
import { cn } from '@/utils/cn';

import { ToggleButtonStyles as S } from './ToggleButton.styles';

export type ToggleButtonProps = DisabledProps<
  LoadingProps<
    {
      value?: boolean;

      activeIcon?: IconName;
      activeColorScheme?: ButtonProps['intent'];
      activeText?: string;

      inactiveIcon?: IconName;
      inactiveColorScheme?: ButtonProps['intent'];
      inactiveText?: string;

      onChange?: (value: boolean) => void;
    } & Omit<ButtonProps, 'children' | 'onChange' | 'value'>
  >
>;

export const ToggleButton: React.FC<ToggleButtonProps> = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      value,
      activeColorScheme = 'success',
      inactiveColorScheme = 'neutral',
      activeIcon = 'lock-closed',
      inactiveIcon = 'lock-open',
      activeText = 'Yes',
      inactiveText = 'No',
      onClick,
      onChange,
      isLoading,
      isDisabled,
      className,
      size = 'sm',
    },

    ref
  ) => {
    const handleToggle: MouseEventHandler<HTMLButtonElement> = (event) => {
      onClick?.(event);
      onChange?.(!value);
    };

    const { color, icon, text } = value
      ? { color: activeColorScheme, icon: activeIcon, text: activeText }
      : { color: inactiveColorScheme, icon: inactiveIcon, text: inactiveText };

    if (isLoading) {
      return <S.Skeleton className={className} />;
    }

    return (
      <Button
        size={size}
        iconLeft={icon}
        ref={ref}
        intent={color}
        onClick={handleToggle}
        disabled={isDisabled}
        className={cn('min-w-[4rem]', className)}
      >
        {text}
      </Button>
    );
  }
);
