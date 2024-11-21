import { Meta, StoryFn } from '@storybook/react';

import { Box, Icon } from '@/ui';

import { Tooltip } from './Tooltip';

const meta: Meta = {
  title: 'Library/Atoms/Tooltip',
};

export default meta;

export const Customizable: StoryFn<
  React.ComponentPropsWithRef<typeof Tooltip.Content>
> = (args) => (
  <Box
    css={{ height: '300px', alignItems: 'center', justifyContent: 'center' }}
  >
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Icon name="question" />
        </Tooltip.Trigger>
        <Tooltip.Content {...args}>Tooltip</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  </Box>
);

Customizable.args = {
  css: {
    fontSize: '1rem',
  },
};

Customizable.argTypes = {
  side: {
    type: { name: 'enum', value: ['top', 'bottom', 'left', 'right'] },
  },
};
