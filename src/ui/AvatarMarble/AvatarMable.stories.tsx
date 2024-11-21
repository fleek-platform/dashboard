import type { Meta, StoryObj } from '@storybook/react';

import { AvatarMarble, type AvatarMarbleProps } from './AvatarMarble';

const meta: Meta<AvatarMarbleProps> = {
  title: 'Library/Molecules/Avatar Marble',
  component: AvatarMarble,
};

export default meta;

export const Customizable: StoryObj<AvatarMarbleProps> = {
  render: (args) => <AvatarMarble {...args} />,
  args: {
    name: 'John Doe',
    css: { fontSize: '1rem' },
  },
  argTypes: {
    name: {
      type: { name: 'string' },
    },
    rounded: {
      type: { name: 'boolean' },
    },
  },
};
