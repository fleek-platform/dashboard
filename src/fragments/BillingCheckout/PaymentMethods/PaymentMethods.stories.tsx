import { Meta, StoryObj } from '@storybook/react';

import { BillingPlan } from '@/types/Billing';

import { BillingCheckoutProvider } from '../Context';
import { PaymentMethods } from './PaymentMethods';

const meta: Meta = {
  title: 'Library/Fragments/Billing Checkout/Payment Methods',
  component: PaymentMethods,
};

export default meta;

type Story = StoryObj;

const plan: BillingPlan = {
  id: 'plan-id',
  name: 'Pro Plan',
  description: 'Our most popular plan for hobby developers.',
  benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
  price: 20,
  stripePriceId: 'prod_PgmGjgQqFIDRxC',
};

export const Component: Story = {
  render: (args) => {
    return <PaymentMethods {...args} />;
  },

  decorators: [
    (Story) => {
      return (
        <BillingCheckoutProvider initialMethod="crypto" plan={plan}>
          <Story />
        </BillingCheckoutProvider>
      );
    },
  ],
};
