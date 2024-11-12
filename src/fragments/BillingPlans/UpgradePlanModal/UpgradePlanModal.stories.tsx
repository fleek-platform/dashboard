import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/ui';

import { UpgradePlanModal, UpgradePlanModalProps } from './UpgradePlanModal';

const meta: Meta = {
  title: 'Library/Fragments/Billing/Upgrade Plan Modal',
  component: UpgradePlanModal,
};

export default meta;

type Story = StoryObj<UpgradePlanModalProps>;

export const Component: Story = {
  render: (args) => {
    return <UpgradePlanModal {...args} />;
  },

  args: {
    children: <Button>Open modal</Button>,
  },
};
