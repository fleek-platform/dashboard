import { Meta, StoryObj } from '@storybook/react';

import { Box, IconLibrary } from '@/ui';

import { IconTooltip, IconTooltipProps } from './IconTooltip';

const meta: Meta = {
  title: 'Library/Components/Icon Tooltip',
  component: IconTooltip,
};

export default meta;

export const Customizable: StoryObj<IconTooltipProps> = {
  render: (args) => (
    <Box className="h-[200px] items-center justify-center">
      <IconTooltip {...args} />
    </Box>
  ),
  args: {
    children: 'Custom icon tooltip',
    iconName: 'question',
    side: 'right',
  },
  argTypes: {
    iconName: {
      type: { name: 'enum', value: Object.keys(IconLibrary) },
    },
    side: {
      type: { name: 'enum', value: ['top', 'right', 'bottom', 'left'] },
    },
  },
};
