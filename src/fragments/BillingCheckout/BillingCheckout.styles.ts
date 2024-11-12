import { styled } from '@/theme';
import { Box } from '@/ui';

import { App } from '../App/App';

export const BillingCheckoutStyles = {
  LayoutGrid: styled(App.Content, {
    display: 'grid',
    gridTemplateRows: 'min-content',
    gap: '$spacing-6',

    gridTemplateAreas: '"plan" "paymentDescription" "paymentMethods"',
    gridTemplateColumns: '1fr',

    '@md': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: '"plan plan" "paymentDescription paymentMethods"',
    },
  }),

  Container: styled(Box, {
    minWidth: '$sm',
    height: 'fit-content',

    variants: {
      variant: {
        container: {
          gap: '$spacing-6',
        },
      },
    },

    defaultVariants: {
      variant: 'container',
    },
  }),

  GapWrapper: styled(Box, {
    gap: '$spacing-3',
  }),

  Title: styled('h2', {
    textSize: '$lg',
    textCategory: '$secondary',
    margin: 0,

    display: 'flex',
    alignItems: 'center',
    gap: '$spacing-2-5',
  }),

  Text: styled('span', {
    textCategory: '$primary',
    textSize: '$sm',
    color: '$text-secondary',
  }),
};
