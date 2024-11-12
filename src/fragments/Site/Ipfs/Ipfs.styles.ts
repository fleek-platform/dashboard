import { styled } from '@/theme';
import { Box, Skeleton } from '@/ui';

export const IpfsStyles = {
  Container: styled(Box, {
    gap: '$spacing-4',
  }),
  Header: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '$spacing-2-5',
  }),
  TitleSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$lg',
      width: '30%',
    },
  }),
  Column: styled(Box, {
    gap: '$spacing-1',
  }),
  LabelSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '7%',
    },
  }),
  TextSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$md',
      width: '25%',
    },
  }),
};
