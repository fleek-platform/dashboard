import { Meta, StoryObj } from '@storybook/react';

import { Invitation, InvitationProps } from './Invitation';

const meta: Meta = {
  title: 'Library/Components/Invitation',
  component: Invitation,
};

export default meta;

type Story = StoryObj<InvitationProps>;

export const Default: Story = {
  args: {
    projectName: 'Uniswap',
  },
};
