import type { Meta, StoryObj } from '@storybook/react';

import { PlansTable, type PlansTableProps } from './PlansTable';

const meta: Meta = {
  title: 'Library/Fragments/Billing/Plans Table',
  component: PlansTable,
};

export default meta;

type Story = StoryObj<PlansTableProps>;

export const Component: Story = {
  render: (args) => {
    return <PlansTable {...args} />;
  },

  args: {
    plans: [
      {
        name: 'Free Plan',
        color: {
          scheme: 'neutral',
        },
        isActive: true,
        buttonText: 'Select Free plan',
        values: [
          ['1', '1', '1'],
          ['1', '1', '1', '1'],
          ['1', '1', '1'],
        ],
      },
      {
        name: 'Basic Plan',
        color: {
          scheme: 'success',
        },
        isActive: false,
        buttonText: 'Upgrade to Basic',
        values: [
          ['1', '2', '4'],
          ['8', '16', '32', '64'],
          ['128', '256', '512'],
        ],
      },
      {
        name: 'Pro Plan',
        color: {
          scheme: 'accent',
        },
        isActive: false,
        buttonText: 'Upgrade to Pro',
        values: [
          ['1', '3', '9'],
          ['27', '81', '243', '729'],
          ['2187', '6561', '19683'],
        ],
      },
      {
        name: 'Enterprise Plan',
        color: {
          scheme: 'neutral',
        },
        isActive: false,
        buttonText: 'Contact Sales',
        values: [
          ['1', '4', '16'],
          ['64', '256', '1024', '4096'],
          ['16384', '65536', '262144'],
        ],
      },
    ],
    sections: [
      {
        name: 'Section 1',
        icon: 'fleek',
        rows: ['First', 'Second', 'Third'],
      },
      {
        name: 'Section 2',
        icon: 'gear',
        rows: ['Fourth', 'Fifth', 'Sixth', 'Seventh'],
      },
      {
        name: 'Section 3',
        icon: 'grid',
        rows: ['Eighth', 'Ninth', 'Tenth'],
      },
    ],
  },
};
