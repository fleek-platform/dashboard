import type { Meta, StoryObj } from '@storybook/react';

import { StatusChip, type StatusChipProps } from './StatusChip';

const meta: Meta = {
  title: 'Library/Components/Satus Chip',
};

export default meta;

export const Customizable: StoryObj<StatusChipProps> = {
  render: (args) => <StatusChip {...args} />,
};
