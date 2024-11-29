import type { Meta, StoryObj } from '@storybook/react';

import { Invitation, type InvitationProps } from './Invitation';

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
