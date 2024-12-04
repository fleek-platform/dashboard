import { Meta, StoryObj } from '@storybook/react';

import { StatusRadio, StatusRadioProps } from './StatusRadio';

const meta: Meta = {
  title: 'Library/Components/Satus Radio',
};

export default meta;

export const Customizable: StoryObj<StatusRadioProps> = {
  render: (args) => <StatusRadio {...args} className="text-md" />,
  args: {
    status: 'success',
  },
  argTypes: {
    status: {
      type: { name: 'enum', value: ['error', 'success', 'default'] },
    },
  },
};
