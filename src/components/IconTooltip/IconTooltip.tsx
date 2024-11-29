import type { ChildrenProps } from '@/types/Props';
import { type IconName, Tooltip } from '@/ui';

import { type colorScheme, IconTooltipStyles as S } from './IconTooltip.styles';

export type IconTooltipProps = ChildrenProps<{
  side: Tooltip.Content['side'];
  iconName?: IconName;
  colorScheme?: colorScheme;
  className?: string;
}>;

export const IconTooltip: React.FC<IconTooltipProps> = ({
  children,
  iconName = 'question',
  className,
  side,
  colorScheme,
}) => (
  <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <S.Icon
          name={iconName}
          colorScheme={colorScheme}
          className={className}
        />
      </Tooltip.Trigger>
      <S.TooltipContent side={side}>{children}</S.TooltipContent>
    </Tooltip.Root>
  </Tooltip.Provider>
);
