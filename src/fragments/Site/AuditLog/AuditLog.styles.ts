import { ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Skeleton } from '@/ui';

export const AuditLogStyles = {
  Container: styled(Box, {
    gap: '$spacing-4',

    variants: {
      variant: {
        container: {
          padding: '$spacing-5 $spacing-6',
        },
      },
      isLoading: {
        true: {
          backgroundColor: '$surface-primary !important',
        },
        false: {
          backgroundColor: '$surface-monochrome !important',
        },
      },
    },
    defaultVariants: { variant: 'container', isLoading: false },

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$lg',
      width: '80%',
    },
  }),
  AuditContent: styled(Box, {
    gap: '$spacing-2-5',
  }),
  ButtonSkeleton: styled(Skeleton, {
    width: '$full',
    height: 'calc((2 * $space$inline-component-padding) + $lineHeights$sm)',
    borderRadius: '$inline-component-radii',
  }),
  Divider: styled('hr', {
    backgroundColor: '$border-slate',
    border: 'none',
    height: '$small-divider-height',
    margin: '$spacing-1 0',
  }),

  Item: {
    Container: styled(Box, {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '$spacing-2-5',

      [`${Box}`]: {
        gap: '$spacing-1',
        width: '$full',
      },

      [`${Icon}`]: {
        fontSize: '$sm',
      },

      variants: {
        iconColor: {
          slate: {
            color: '$icon-slate',
          },
          failed: {
            color: '$icon-red',
          },
          success: {
            color: '$icon-green',
          },
        },
      },
    }),
    IconSkeleton: styled(Skeleton, {
      height: '1.125rem',
      minWidth: '1.125rem',
    }),
    MainTextSkeleton: styled(Box, {
      gap: '$fontSizes$sm',
      width: '$full',

      [`${ExternalLink}`]: {
        textCategory: '$tertiary',
        textSize: '$xs',
        marginLeft: '$texSizes$sm',
        color: '$text-yellow',
      },

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$xs',
        width: '60%',
      },
    }),
    LabelSkeleton: styled(Box, {
      width: '$full',

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$xs',
        width: '30%',
      },
    }),
  },
};
