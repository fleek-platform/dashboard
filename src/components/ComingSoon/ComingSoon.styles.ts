import { styled } from '@/theme';
import { Box, Image, Skeleton } from '@/ui';

export const ComingSoonStyles = {
  Overlay: {
    Wrapper: styled(Box, {
      display: 'block',
      position: 'relative',
    }),
    Overlay: styled(Box, {
      textAlign: 'center',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '$spacing-6 $spacing-5',
      gap: '$spacing-1',
      position: 'absolute',
      top: '0',
      left: '0',
      height: '$full',
      width: '$full',
      zIndex: 2,
      borderRadius: '$lg',
      background: '$coming-soon-overlay',
      baseBorder: '$border-slate',
    }),
  },

  Modal: {
    Wrapper: styled(Box, {
      display: 'block',
      position: 'relative',
    }),
    ChildrenWrapper: styled(Box, {
      opacity: '0.5',
    }),
    Backdrop: styled(Box, {
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, $background 100%)',
      width: '$full',
      height: '16.125rem',
    }),
    Container: styled(Box, {
      position: 'absolute',
      top: '$spacing-9',
      left: '0',
      right: '0',
      margin: '0 auto',
      zIndex: 2,
      gap: '$spacing-6',
      padding: '$spacing-6',
      width: '$modal-width',
    }),
    Image: styled(Image, {
      borderRadius: '$lg',
      aspectRatio: '23.75 / 7.75',
      width: '$full',
    }),
  },

  Skeleton: {
    Container: styled(Box, {
      gap: '$spacing-6',
    }),
    TextSkeleton: styled(Skeleton, {
      height: '$lineHeights$lg',
      width: '$full',

      variants: {
        variant: {
          large: {
            height: '$lineHeights$3xl',
          },
        },
      },
    }),
    BigSkeleton: styled(Skeleton, {
      height: 'calc($space$spacing-6-5 * 4)',
      width: '$full',

      variants: {
        variant: {
          circle: {
            aspectRatio: '1 / 1',
            borderRadius: '$full',
            margin: '0 auto',
          },
          medium: {
            height: '4.75rem',
          },
        },
      },
    }),
    Row: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-6',

      variants: {
        variant: {
          small: { gap: '$spacing-4' },
        },
      },
    }),
    Box: styled(Box, {
      gap: '$spacing-4',
      width: '$full',

      variants: {
        variant: {
          container: {},
        },
        width: {
          column: {
            width: '13.75rem',
          },
        },
      },
      defaultVariants: { variant: 'container' },
    }),
  },
};
