import { styled } from '@/theme';
import { Box, Skeleton } from '@/ui';

export const PerformanceStyles = {
  Container: styled(Box, {
    padding: '$spacing-5 $spacing-6',
    gap: '$spacing-4',
    alignItems: 'center',
    borderRadius: '$lg',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$lg',
      width: '50%',
    },

    variants: {
      variant: {
        container: {},
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
  }),
  Row: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-3',
    width: '$full',
    borderRadius: '$3xl',
    padding: '$spacing-2-5 0',
    justifyContent: 'space-around',
    baseBorder: '$border-slate',

    [`> ${Box}`]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '$spacing-2',
      textCategory: '$primary',
      textSize: '$2xs',
    },
  }),
  SkeletonRow: styled(Skeleton, {
    height: 'calc((2 * $space$spacing-2-5) + $lineHeights$2xs)',
    width: '$full',
    borderRadius: '$3xl',
  }),
  ButtonSkeleton: styled(Skeleton, {
    width: '$full',
    height: 'calc((2 * $space$inline-component-padding) + $lineHeights$sm)',
    borderRadius: '$inline-component-radii',
  }),
  CircleDecoration: styled('span', {
    aspectRatio: '1 / 1',
    width: '$fontSizes$2xs',
    borderRadius: '$full',

    variants: {
      variant: {
        red: { background: '$icon-red' },
        yellow: { background: '$icon-amber' },
        green: { background: '$icon-green' },
      },
    },
  }),
  ScoreCircle: styled(Box, {
    aspectRatio: '1/1',
    borderRadius: '$full',
    width: '4.25rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '3px',
    borderStyle: 'solid',
    textCategory: '$tertiary',
    textSize: '$2xl',

    [`> ${Skeleton}`]: {
      width: '$full',
      borderRadius: '$full',
      height: '$full',
    },

    variants: {
      variant: {
        green: {
          borderColor: '$border-green-actionable-focus',
          color: '$border-green-actionable-focus',
          background: '$surface-green-lighter',
        },
        yellow: {
          borderColor: '$border-amber-actionable-focus',
          color: '$border-amber-actionable-focus',
          background: '$surface-amber-lighter',
        },
        red: {
          borderColor: '$border-red-actionable-focus',
          color: '$border-red-actionable-focus',
          background: '$surface-red-lighter',
        },
        pending: {
          textCategory: '$secondary',
          fontSize: '$xs',
          borderColor: '$border-slate-actionable-focus',
          color: '$border-slate-actionable-focus',
        },
        loading: {
          width: '4.315rem',
          border: 'none',
        },
      },
    },
  }),
};
