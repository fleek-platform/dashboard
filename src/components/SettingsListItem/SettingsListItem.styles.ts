import { styled } from '@/theme';
import { Avatar, Box, Input, Skeleton } from '@/ui';

export const SettingsListItemStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',

    variants: {
      variant: {
        container: {
          padding: '$spacing-3 $spacing-4',
          gap: '$spacing-3',
          background: '$surface-secondary',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),

  Avatar: styled(Avatar, {
    height: 'calc($lineHeights$sm + $lineHeights$xs + $space$spacing-1)',
    width: 'calc($lineHeights$sm + $lineHeights$xs + $space$spacing-1)',
  }),

  DataWrapper: styled(Box, {
    flex: 1,
    gap: '$spacing-1',
  }),

  DataTitleSuffix: styled('span', {
    color: '$text-tertiary',
  }),

  DataSkeleton: styled(Skeleton, {
    variants: {
      variant: {
        title: {
          height: '$lineHeights$sm',
          width: '30%',
        },
        text: {
          height: '$lineHeights$xs',
          width: '50%',
        },
        avatar: {
          height: 'calc($lineHeights$sm + $lineHeights$xs + $space$spacing-1)',
          width: 'unset',
          aspectRatio: 1,
          borderRadius: '$full',
        },
      },
    },
  }),

  FlatRow: styled(Box, {
    display: 'grid',
    gridTemplateColumns: '3fr 3fr 1rem',
    gap: '$spacing-4',

    [`> ${Box}`]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '$spacing-1',
      overflow: 'hidden',
    },

    [`> ${Skeleton}`]: {
      aspectRatio: '1/1',
      alignSelf: 'center',
      skeletonTextHeight: '$lg',
    },

    [`${Input.Root}`]: {
      width: '$full',
    },

    '&:not(:last-child)': {
      paddingBottom: '$spacing-4',
      baseBorderBottom: '$border-slate',
    },

    '& > :last-child': {
      justifySelf: 'flex-end',
    },
  }),
};
