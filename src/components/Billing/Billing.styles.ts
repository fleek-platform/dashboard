import { styled } from '@/theme';
import { Box, Divider, Skeleton } from '@/ui';

export const BillingStyles = {
  Container: styled(Box, {
    minWidth: '18rem',

    variants: {
      variant: {
        container: {
          gap: 0,
          background: '$surface-content-fill',
        },
      },
      horizontal: {
        true: {
          flexDirection: 'column',
          gap: '$spacing-4',
        },
      },
    },

    defaultVariants: { variant: 'container' },
  }),
  HeaderWrapper: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '$spacing-6',
    alignItems: 'center',

    [`> ${Box}`]: {
      flex: 1,
    },
  }),
  Title: styled('h1', {
    textSize: '$lg',
    textCategory: '$secondary',
    margin: 0,

    display: 'flex',
    alignItems: 'center',
    gap: '$spacing-2-5',
  }),
  Description: styled('span', {
    textSize: '$sm',
    textCategory: '$primary',
    color: '$text-secondary',

    marginTop: '$spacing-2-5',
  }),
  Price: styled('span', {
    textSize: '$lg',
    textCategory: '$tertiary',
    color: '$text-primary',
    gap: '$spacing-1',
    display: 'flex',
    alignItems: 'baseline',

    marginTop: '$spacing-2',

    b: {
      textSize: '$3xl',
      textCategory: '$secondary',
    },
  }),
  PriceOverline: styled('span', {
    textSize: '$sm',
    textCategory: '$primary',
    color: '$text-primary',
  }),
  Divider: styled(Divider, {
    marginTop: '$spacing-4',
    marginBottom: '$spacing-6',
  }),

  BenefitsList: {
    Container: styled('ul', {
      display: 'flex',
      flexDirection: 'column',
      gap: '$spacing-4',
      padding: 0,
      margin: 0,
    }),
    Item: styled('li', {
      display: 'flex',
      alignItems: 'center',
      gap: '$spacing-2-5',
    }),
  },

  Skeleton: styled(Skeleton, {
    variants: {
      variant: {
        title: {
          width: '40%',
          skeletonTextHeight: '$xl',
        },
        description: {
          width: '60%',
          skeletonTextHeight: '$sm',
          marginTop: '$spacing-2-5',
        },
        price: {
          width: '12rem',
          height: '2.875rem',
          marginTop: '$spacing-2',
        },
      },
    },
  }),
};
