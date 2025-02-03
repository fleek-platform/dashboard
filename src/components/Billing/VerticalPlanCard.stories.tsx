import { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/ui';

import { VerticalPlanCard, VerticalPlanCardProps } from './VerticalPlanCard';

const meta: Meta = {
  title: 'Library/Components/Billing/Vertical Plan Card',
  component: VerticalPlanCard,
};

export default meta;

type Story = StoryObj<VerticalPlanCardProps>;

export const Component: Story = {
  render: (args) => {
    return <VerticalPlanCard {...args} />;
  },

  args: {
    title: 'Basic Plan',
    description: 'Our most popular plan for hobby developers.',
    benefits: [
      'Domain/ENS not configured',
      'Domain/ENS not configured',
      'Domain/ENS not configured',
      'Domain/ENS not configured',
    ],
    price: '10',
    buttonText: 'Select plan',
    colorScheme: 'accent',
  },
};

export const Combined: Story = {
  render: () => {
    return (
      <Box
        className="flex-row gap-5 resize-x bg-transparent overflow-auto flex-wrap"
        variant="container"
      >
        <VerticalPlanCard
          title="Basic Plan"
          description="Our most popular plan for hobby developers."
          benefits={[
            'Domain/ENS not configured',
            'Domain/ENS not configured',
            'Domain/ENS not configured',
            'Domain/ENS not configured',
          ]}
          price="10"
          buttonText="Select plan"
          colorScheme="success"
          isActive
        />

        <VerticalPlanCard
          title="Basic Plan"
          description="Our most popular plan for hobby developers."
          benefits={[
            'Domain/ENS not configured',
            'Domain/ENS not configured',
            'Domain/ENS not configured',
            'Domain/ENS not configured',
          ]}
          price="20"
          buttonText="Upgrade to plan"
          colorScheme="accent"
        />

        <VerticalPlanCard
          title="Enterprise"
          description="Our most popular plan for hobby developers."
          benefits={[
            'Domain/ENS not configured',
            'Domain/ENS not configured',
            'Domain/ENS not configured',
            'Domain/ENS not configured',
          ]}
          price="Custom"
          buttonText="Contact Sales"
          colorScheme="neutral"
        />
      </Box>
    );
  },
};
