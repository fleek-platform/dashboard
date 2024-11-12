import { styled } from '@/theme';
import { Box } from '@/ui';

import { BillingCheckoutStyles } from '../BillingCheckout.styles';

export const PaymentMethodsStyles = {
  ...BillingCheckoutStyles,

  Container: styled(BillingCheckoutStyles.Container, {
    gridArea: 'paymentMethods',
  }),

  Selector: {
    Wrapper: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-4',
    }),
  },
};
