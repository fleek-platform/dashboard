import { Meta, StoryObj } from '@storybook/react';

import { BenefitsList, BenefitsListProps } from './BenefitsList';

const meta: Meta = {
  title: 'Library/Components/Billing/Benefits List',
  component: BenefitsList,
};

export default meta;

type Story = StoryObj<BenefitsListProps>;

export const Component: Story = {
  render: (args) => {
    return <BenefitsList {...args} />;
  },

  args: {
    benefits: ['Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured', 'Domain/ENS not configured'],
  },
};
