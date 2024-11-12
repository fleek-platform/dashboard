import { styled } from '@/theme';
import { Icon, Tooltip } from '@/ui';

export const colorScheme = {
  primary: {
    color: '$text-primary',
  },
  secondary: {
    color: '$text-secondary',
  },
};

export type colorScheme = keyof typeof colorScheme;

export const IconTooltipStyles = {
  Icon: styled(Icon, {
    variants: {
      colorScheme,
    },
  }),
  TooltipContent: styled(Tooltip.Content, {
    fontSize: '$xs',
  }),
};
