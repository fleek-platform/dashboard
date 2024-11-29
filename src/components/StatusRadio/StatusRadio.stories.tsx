import type { Meta, StoryObj } from '@storybook/react';

import { StatusRadio, type StatusRadioProps } from './StatusRadio';

const meta: Meta = {
  title: 'Library/Components/Satus Radio',
};

export default meta;

export const Customizable: StoryObj<StatusRadioProps> = {
  render: (args) => <StatusRadio {...args} />,
  args: {
    status: 'success',
    css: { fontSize: '1rem' },
  },
  argTypes: {
    status: {
      type: { name: 'enum', value: ['error', 'success', 'default'] },
    },
  },
};
