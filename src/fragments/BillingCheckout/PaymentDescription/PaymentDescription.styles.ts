import { styled } from '@/theme';
import { Box, Icon } from '@/ui';

import { BillingCheckoutStyles } from '../BillingCheckout.styles';

export const PaymentDescriptionStyles = {
  ...BillingCheckoutStyles,

  Container: styled(BillingCheckoutStyles.Container, {
    gridArea: 'paymentDescription',
  }),

  Row: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '$spacing-6',
  }),

  Price: styled('span', {
    display: 'flex',
    alignItems: 'center',
    gap: '$spacing-2',

    textCategory: '$tertiary',

    variants: {
      highlight: {
        true: {
          textSize: '$2xl',
          color: '$text-green',

          cursor: 'pointer',

          [`${Icon}`]: {
            fontSize: '0.7em',
            color: '$icon-slate-actionable',
          },

          '&:hover': {
            [`${Icon}`]: {
              color: '$icon-slate-actionable-focus',
            },
          },
        },
      },
    },
  }),
};
