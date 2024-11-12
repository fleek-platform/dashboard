import { styled } from '@/theme';
import { Box, Icon, Image } from '@/ui';

export const DeploySiteStyles = {
  Grid: {
    Wrapper: styled('div', {
      flex: 1,
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `"aside content"`,
      gap: 'calc(4 * $page-padding)',
      padding: '0 $spacing-7',

      '@md!': {
        gridTemplateColumns: '1fr',
        gridTemplateAreas: `"aside" "content"`,
        gridTemplateRows: 'min-content min-content',
        gap: '$spacing-9',
        padding: '$spacing-4',
      },
    }),

    Aside: styled('div', {
      gridArea: 'aside',
      position: 'sticky',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap: '$spacing-7',
      top: 'calc($page-padding + $spacing-9)',
      maxHeight: 'calc($min-page-height - 2 * $space$page-padding - $space$spacing-9)',

      '@md!': {
        position: 'static',
      },
    }),

    Content: styled('div', {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      gridArea: 'content',
      gap: '$page-padding',
    }),
  },

  StatusBox: {
    Container: styled(Box, {
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      flexDirection: 'row',

      variants: {
        variant: {
          container: {
            borderRadius: '$xl',
            padding: '$spacing-4',
          },
        },
        wrapped: {
          true: {
            width: '70%',
          },
        },
      },
      defaultVariants: { variant: 'container' },

      '@md!': {
        display: 'none',
      },
    }),

    Item: styled(Box, {
      textSize: '$xs',
      gap: '$spacing-2',
      flex: 1,

      [`> ${Box}`]: {
        flexDirection: 'row',
        gap: '$spacing-2',
        alignItems: 'center',
      },

      [`${Image}`]: {
        padding: '$spacing-1',
        width: '$space$spacing-5',
        height: '$space$spacing-5',
        borderRadius: '$full',
        color: '$text-secondary',
        backgroundColor: '$button-slate-secondary',
        textSize: '$2xs',

        svg: {
          padding: '0',
        },
      },

      variants: {
        fullSize: {
          true: {
            [`${Image}`]: {
              padding: '0 !important',
            },
          },
        },
      },
    }),

    Separator: styled(Icon, {
      fontSize: '$md',
      color: '$icon-slate',
      display: 'none',

      '@md': { display: 'flex' },
    }),
  },
};
