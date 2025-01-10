import { Meta, StoryObj } from '@storybook/react';

import { Text } from '../Text/Text';
import { Box, BoxProps } from './Box';

const meta: Meta = {
  title: 'FTW/Box',
  component: Box,
};

export default meta;

type Story = StoryObj<BoxProps>;

export const Customizable: Story = {
  render: (args) => <Box {...args} />,
  args: {
    children: 'Box component',
  },
  argTypes: {
    variant: {
      type: { name: 'enum', value: ['', 'container'] },
    },
  },
};

export const Container: Story = {
  ...Customizable,
  render: (args) => <Box {...args} />,
  args: {
    children: (
      <>
        <Text as="h2">Heading</Text>
        <Text>Lorem ipsum</Text>
      </>
    ),
    variant: 'container',
  },
};
