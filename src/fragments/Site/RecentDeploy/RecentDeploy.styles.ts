import { styled } from '@/theme';
import { Box, Icon, Skeleton } from '@/ui';

export const RecentDeployStyles = {
  Container: styled(Box, {
    display: 'flex',
    flexDirection: 'column',
    variants: {
      variant: {
        container: {
          gap: '$spacing-6',
          background: '$surface-content-fill',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  TitleSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$lg',
      width: '25%',
    },
  }),
  ItemRow: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  Label: styled(Box, {
    display: 'flex',
    flexDirection: 'row',
    gap: '$spacing-1',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '75%',
    },
    [`${Icon}`]: {
      textSize: '$2xs',
    },
  }),
  Chip: styled('span', {
    borderRadius: '$full',
    padding: '0 $spacing-2',
    textSize: '$xs',
    textCategory: '$secondary',
    width: 'min-content',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '$full',
    },
    variants: {
      status: {
        CREATED: {
          color: '$text-amber',
          backgroundColor: '$surface-amber-light',
        },
        AVAILABLE: {
          color: '$text-green',
          backgroundColor: '$surface-green-light',
        },
        SUCCESS: {
          color: '$text-green',
          backgroundColor: '$surface-green-light',
        },
        FAILED: {
          color: '$text-red',
          backgroundColor: '$surface-red-light',
        },
        loading: {
          backgroundColor: '$surface-primary',
          width: '$full',
          padding: '0',
        },
      },
    },
  }),
  AuthorContainer: styled(Box, {
    minWidth: '10%',
    gap: '$spacing-4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    [`${Icon}`]: {
      textSize: '$xs',
    },
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xl',
      width: '$full',
    },
  }),
};
