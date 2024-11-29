import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '../Box/Box';
import { Text } from '../ftw/Text/Text';
import { Scrollable } from './Scrollable';

const meta: Meta = {
  title: 'Library/Atoms/Scrollable',
  component: Scrollable.Root,
};

export default meta;

type Story = StoryObj<Scrollable.RootProps>;

const Tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export const Customizable: Story = {
  render: (args) => (
    <Scrollable.Root {...args}>
      <Scrollable.Viewport>
        <Box variant="container" css={{ border: 'none' }}>
          <Text as="h2">Tags</Text>
          {Tags.map((tag) => (
            <Box variant="container" key={tag}>
              {tag}
            </Box>
          ))}
        </Box>
      </Scrollable.Viewport>

      <Scrollable.HorizontalBar />
      <Scrollable.VerticalBar />
    </Scrollable.Root>
  ),
  args: {
    css: {
      width: '400px',
      height: '200px',
      borderRadius: '$spacing-8',
      border: '1px solid $slate6',
      backgroundColor: '$foreground',
    },
  },
  argTypes: {
    type: {
      type: { name: 'enum', value: ['hover', 'always', 'auto', 'scroll'] },
      defaultValue: 'hover',
    },
  },
};
