import { styled } from '@/theme';
import { Skeleton } from '@/ui';

export const ComingSoonStyles = {
  Skeleton: {
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
  },
};
