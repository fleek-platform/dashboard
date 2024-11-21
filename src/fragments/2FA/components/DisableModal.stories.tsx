import type { Meta, StoryObj } from '@storybook/react';

import { DisableModal, type DisableModalProps } from './DisableModal';

const meta: Meta = {
  title: 'Library/Fragments/2FA/Modals/Disable',
  component: DisableModal,
};

export default meta;

type Story = StoryObj<DisableModalProps>;

export const Default: Story = {
  render: (args: DisableModalProps) => <DisableModal {...args} />,
  args: {
    open: true,
    onConfirmDelete: () => console.log('ConfirmedDelete'),
  },
};
