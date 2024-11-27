import { styled } from '@/theme';
import { Tooltip } from '@/ui';

export type ColorScheme = keyof typeof colorSchemes;

const colorSchemes = {
  yellow: {},
  slate: {},
  green: {},
  amber: {},
  red: {},
};

const buildColorScheme = (color: ColorScheme, hoverable: boolean): any => {
  if (color === 'slate') {
    return {
      backgroundColor: '$surface-tertiary',
      color: '$text-secondary',
      ...(hoverable
        ? {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: `$surface-actionable`,
            },
          }
        : {
            cursor: 'default',
          }),
    };
  } else {
    return {
      backgroundColor: `$surface-${color}-light`,
      color: `$text-${color}`,
      ...(hoverable
        ? {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: `$surface-${color}-actionable`,
            },
          }
        : {
            cursor: 'default',
          }),
    };
  }
};

const compoundVariants = (() => {
  const accumulator = [];

  for (const color in colorSchemes) {
    accumulator.push(
      {
        colorScheme: color,
        hoverable: true,
        css: buildColorScheme(color as ColorScheme, true),
      },
      {
        colorScheme: color,
        hoverable: false,
        css: buildColorScheme(color as ColorScheme, false),
      }
    );
  }

  return accumulator;
})();

export const BadgeTextStyles = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: 'fit-content',
  padding: '0.125rem $spacing-2',
  borderRadius: '$full',
  gap: '$spacing-1',
  textSize: '$xs',
  textCategory: '$primary',
  fontWeight: '$tertiary',

  variants: {
    colorScheme: colorSchemes,
    hoverable: {
      true: {},
      false: {},
    },
  },

  [`${Tooltip.Trigger}`]: {
    padding: 0,
  },

  compoundVariants,

  defaultVariants: {
    hoverable: false,
  },
});
