import type { Meta, StoryObj } from '@storybook/react';

import {
  HorizontalPlanCard,
  type HorizontalPlanCardProps,
} from './HorizontalPlanCard';

const meta: Meta = {
  title: 'Library/Components/Billing/Horizontal Plan Card',
  component: HorizontalPlanCard,
};

export default meta;

type Story = StoryObj<HorizontalPlanCardProps>;

export const Component: Story = {
  render: (args: HorizontalPlanCardProps) => {
    return <HorizontalPlanCard {...args} />;
  },

  args: {
    title: 'Free Plan',
    description: 'Our most popular plan for hobby developers.',
    price: '0',
    isActive: true,
    isLoading: false,
  },
};
