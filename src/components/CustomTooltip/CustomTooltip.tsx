import type { TooltipTriggerProps } from '@radix-ui/react-tooltip';

import { forwardStyledRef } from '@/theme';
import type { ChildrenProps } from '@/types/Props';
import { Tooltip } from '@/ui';

import { CustomTooltipStyles as S } from './CustomTooltip.styles';

export type CustomTooltipProps = ChildrenProps<
  {
    side?: Tooltip.Content['side'];
    delayDuration?: Tooltip.Provider['delayDuration'];
    skipDelayDuration?: Tooltip.Provider['skipDelayDuration'];
    content: string;
    asChild?: boolean;
  } & TooltipTriggerProps
>;

export const CustomTooltip = forwardStyledRef<
  HTMLButtonElement,
  CustomTooltipProps
>(
  Tooltip.Trigger,
  (
    {
      children,
      content,
      side = 'top',
      delayDuration,
      skipDelayDuration,
      asChild = false,
      ...props
    },
    ref,
  ) => (
    <Tooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <Tooltip.Root>
        <Tooltip.Trigger asChild={asChild} ref={ref} {...props}>
          {children}
        </Tooltip.Trigger>
        <S.TooltipContent side={side}>{content}</S.TooltipContent>
      </Tooltip.Root>
    </Tooltip.Provider>
  ),
);
