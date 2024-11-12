import { styled } from '@/theme';
import { Box, Input, Scrollable, Skeleton } from '@/ui';

export const BaseDirectoryFieldStyles = {
  Trigger: {
    RowWrapper: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-3',

      [`${Input.Root}`]: { flex: 1 },
    }),
  },

  ScrollableViewport: styled(Scrollable.Viewport, {
    maxHeight: '30vh',
  }),

  RecursiveFolders: {
    Wrapper: styled(Box, { gap: '$spacing-3' }),

    Row: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-2-5',
      alignItems: 'center',
      cursor: 'pointer',

      variants: {
        root: { true: { baseBorderBottom: '$border-slate', baseBorderTop: '$border-slate', padding: '$spacing-3 0' } },
      },
    }),

    Indicator: styled(Box, {
      transition: '$all-75',

      variants: {
        hasNested: {
          false: { opacity: 0.1 },
        },

        showNested: {
          true: { transform: 'rotate(90deg)' },
        },
      },
    }),

    Nested: styled(Box, { padding: '$spacing-3 0 $spacing-3 $spacing-6' }),

    Skeleton: styled(Skeleton, {
      variants: {
        variant: {
          radio: {
            skeletonTextHeight: '$md',
            aspectRatio: 1,
            borderRadius: '$full',
          },
          text: {
            width: '10em',
            skeletonTextHeight: '$md',
          },
        },
      },
    }),
  },
};
