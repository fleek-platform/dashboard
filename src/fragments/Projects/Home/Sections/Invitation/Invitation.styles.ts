import { styled } from '@/theme';
import { Avatar, Box, Skeleton } from '@/ui';

export const InvitationStyles = {
  Container: styled(Box, {
    alignItems: 'center',

    variants: {
      variant: {
        container: {
          padding: '$spacing-4',
          gap: '$spacing-4',
          background: '$surface-monochrome',
          borderRadius: '$lg',
          baseBorder: '$border-slate',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  Avatar: styled(Avatar, {
    width: '$space$spacing-7',
    height: '$space$spacing-7',
  }),
  DataWrapper: styled(Box, {
    flex: 1,
    gap: '$spacing-1',
  }),

  Buttons: {
    Container: styled(Box, {
      gap: '$spacing-3',
    }),
  },

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
          width: 'auto',
          aspectRatio: '1 / 1',
          borderRadius: '$full',
        },
        button: {
          height: '$lineHeights$sm',
          minWidth: '4.25rem',
        },
      },
    },
  }),
};
