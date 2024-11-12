import { Link } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Skeleton } from '@/ui';

export const DeployStyles = {
  ItemRow: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '$spacing-3',

    variants: {
      isSelfManaged: {
        true: {
          [`${Link}`]: {
            gridTemplateColumns: '2fr 2.5fr 0.5fr ',
          },
        },
      },
    },

    [`${Link}`]: {
      width: '$full',
      display: 'grid',
      gridTemplateColumns: '1.5fr 1.5fr 2.5fr 1fr',
      gap: '$spacing-8',
      justifyContent: 'space-between',

      '@sm!': {
        gridTemplateColumns: '1fr',
        gap: '$spacing-4',
      },
    },
  }),
  ItemContainer: styled(Box, {
    justifyContent: 'space-between',
    gap: '$spacing-2',
    minWidth: '10%',
  }),
  TextSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$sm',
      width: '$full',
    },
  }),
  LabelSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '75%',
    },
  }),
  AuthorContainer: styled(Box, {
    minWidth: '10%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',

    // '@sm!': {
    //   flexDirection: 'column',
    //   alignItems: 'flex-start',
    // },

    [`${Icon}`]: {
      color: '$icon-slate',
      textSize: '$xs',
    },
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xl',
      width: '$full',
    },
  }),
};
