import { styled } from '@/theme';
import { Box, Skeleton } from '@/ui';

export const CurrentUsageStyles = {
  Grid: styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridGap: '$spacing-4',

    '@xs': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    '@md': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  }),

  GridItem: {
    Container: styled(Box, {
      display: 'flex',
      flexDirection: 'column',
      padding: '$spacing-2-5  $spacing-3',
      gap: '$spacing-1',

      baseBorder: '$border-slate',
      background: '$surface-secondary',
      borderRadius: '$md',

      '&[data-link]:hover': {
        baseBorder: '$border-slate-actionable-focus',
      },
    }),

    Skeleton: styled(Skeleton, {
      variants: {
        variant: {
          title: {
            width: '80%',
            skeletonTextHeight: '$sm',
          },
          value: {
            width: '100%',
            skeletonTextHeight: '$sm',
          },
        },
      },
    }),
  },
};
