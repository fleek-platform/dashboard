import { styled } from '@/theme';
import { Box, Icon, Skeleton } from '@/ui';

export const DeployStyles = {
  ItemRow: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '$spacing-3',
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
