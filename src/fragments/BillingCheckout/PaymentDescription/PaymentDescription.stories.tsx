import type { Meta, StoryObj } from '@storybook/react';

import { Form } from '@/components';
import type { BillingPlan } from '@/types/Billing';

import { BillingCheckoutProvider } from '../Context';
import { PaymentDescription } from './PaymentDescription';

const meta: Meta = {
  title: 'Library/Fragments/Billing Checkout/PaymentDescription',
  component: PaymentDescription,
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

export const Crypto: Story = {
  render: (args) => {
    return <PaymentDescription {...args} />;
  },

  decorators: [
    (Story) => (
      <BillingCheckoutProvider initialMethod="crypto" plan={plan}>
        <Form.Provider
          value={Form.useForm({
            values: { promoCode: '' },
            onSubmit: async () => {},
          })}
        >
          <Story />
        </Form.Provider>
      </BillingCheckoutProvider>
    ),
  ],
};

export const Fiat: Story = {
  render: (args) => {
    return <PaymentDescription {...args} />;
  },

  decorators: [
    (Story) => (
      <BillingCheckoutProvider initialMethod="fiat" plan={plan}>
        <Form.Provider
          value={Form.useForm({
            values: { promoCode: '' },
            onSubmit: async () => {},
          })}
        >
          <Story />
        </Form.Provider>
      </BillingCheckoutProvider>
    ),
  ],
};
