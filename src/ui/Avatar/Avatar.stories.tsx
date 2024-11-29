import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, type AvatarProps } from './Avatar';

const meta: Meta<AvatarProps> = {
  title: 'Library/Molecules/Avatar',
  component: Avatar,
};

export default meta;

export const Customizable: StoryObj<AvatarProps> = {
  render: (args) => <Avatar {...args} />,
  args: {
    title: 'John Doe',
    css: { fontSize: '1rem' },
  },
  argTypes: {
    title: {
      type: { name: 'string' },
    },
    src: {
      type: { name: 'string' },
    },
    enableIcon: {
      type: { name: 'boolean' },
    },
  },
};

export const Image: StoryObj<AvatarProps> = {
  render: (args) => <Avatar {...args} />,
  args: {
    title: 'John Doe',
    src: 'https://avatars.githubusercontent.com/u/263385',
    css: { fontSize: '1rem' },
  },

  argTypes: {
    title: {
      type: { name: 'string' },
    },
    src: {
      type: { name: 'string' },
    },
    enableIcon: {
      type: { name: 'boolean' },
    },
  },
};
