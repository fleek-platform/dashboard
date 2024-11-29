import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/ui';

import { ContactSalesModal, type ContactSalesModalProps } from './ContactSalesModal';

const meta: Meta = {
  title: 'Library/Fragments/Billing/Contact Sales Modal',
  component: ContactSalesModal,
};

export default meta;

type Story = StoryObj<ContactSalesModalProps>;

export const Component: Story = {
  render: (args) => {
    return <ContactSalesModal {...args} />;
  },

  args: {
    children: <Button>Open modal</Button>,
    initialEmail: 'rollsmorr@gmail.com',
  },
};
