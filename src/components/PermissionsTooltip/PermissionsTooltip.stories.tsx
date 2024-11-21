import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/ui';

import {
  PermissionsTooltip,
  type PermissionsTooltipProps,
} from './PermissionsTooltip';

const meta: Meta = {
  title: 'Library/Components/Permissions Tooltip',
  component: PermissionsTooltip,
};

export default meta;

export const Customizable: StoryObj<PermissionsTooltipProps> = {
  render: (args: PermissionsTooltipProps) => (
    <PermissionsTooltip {...args}>
      <Input.Root disabled={!args.hasAccess}>
        <Input.Icon name="magnify" />
        <Input.Field placeholder="Search or jump to..." disabled />
        <Input.Tag>ctrl+k</Input.Tag>
      </Input.Root>
    </PermissionsTooltip>
  ),
  args: {
    hasAccess: false,
    side: 'top',
    delayDuration: 1000,
    skipDelayDuration: 100,
  },
};
