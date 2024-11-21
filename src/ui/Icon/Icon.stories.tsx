import { Meta, StoryObj } from '@storybook/react';

import { Icon, IconProps } from './Icon';
import { IconLibrary } from './IconLibrary';

const meta: Meta = {
  title: 'Library/Atoms/Icon',
  component: Icon,
};

export default meta;

type Story = StoryObj<IconProps>;

export const Customizable: Story = {
  render: (args) => <Icon {...args} />,
  args: {
    name: 'fleek',
    css: { fontSize: '10rem', color: '$blue9' },
  },
  argTypes: {
    name: {
      type: { name: 'enum', value: Object.keys(IconLibrary) },
    },
    rotate: {
      type: { name: 'boolean' },
    },
  },
};
