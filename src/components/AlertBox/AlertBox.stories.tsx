import { Meta, StoryObj } from '@storybook/react';

import { AlertBox, AlertBoxProps } from './AlertBox';

const meta: Meta = {
  title: 'Library/Components/Alert Box',
  component: AlertBox,
};

export default meta;

export const Customizable: StoryObj<AlertBoxProps> = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a ullamcorper sem. Sed mollis augue ut orci vehicula, in euismod sem placerat. Interdum et malesuada fames ac ante ipsum primis in faucibus. In blandit eget tortor sit amet ultrices. Nullam a elit ornare, volutpat purus a, eleifend dolor.',
    variant: 'warning',
    onClose: undefined,
    size: 'lg',
  },
  argTypes: {
    variant: {
      type: { name: 'enum', value: ['primary', 'tertiary', 'ghost', 'success', 'danger', 'warning'] },
    },
    size: {
      type: { name: 'enum', value: ['sm', 'lg'] },
    },
  },
};

export const WithClose: StoryObj<AlertBoxProps> = {
  ...Customizable,
  args: {
    ...Customizable.args,
    onClose: () => {},
  },
};
