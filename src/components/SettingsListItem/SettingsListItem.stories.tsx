import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/ui';

import { BadgeText } from '../BadgeText/BadgeText';
import {
  SettingsListItem,
  type SettingsListItemProps,
} from './SettingsListItem';

const meta: Meta = {
  title: 'Library/Components/Settings List Item',
  component: SettingsListItem,
};

export default meta;

type Story = StoryObj<SettingsListItemProps>;

export const Default: Story = {
  args: {
    title: 'This is a cool title',
    subtitle: 'Created 2 days ago',
  },
};

export const WithDropdown: Story = {
  args: {
    ...(Default.args as any),
    subtitle: 'Now I have a dropdown',
    children: (
      <SettingsListItem.DropdownMenu>
        <SettingsListItem.DropdownMenuItem icon="refresh">
          Refresh
        </SettingsListItem.DropdownMenuItem>
        <SettingsListItem.DropdownMenuSeparator />
        <SettingsListItem.DropdownMenuItem icon="trash">
          Delete
        </SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    ...(WithDropdown.args as any),
    subtitle: 'Now I have a badge and dropdown',
    children: (
      <>
        <BadgeText colorScheme="green">Active</BadgeText>
        <SettingsListItem.DropdownMenu>
          <SettingsListItem.DropdownMenuItem icon="refresh">
            Refresh
          </SettingsListItem.DropdownMenuItem>
          <SettingsListItem.DropdownMenuSeparator />
          <SettingsListItem.DropdownMenuItem icon="trash">
            Delete
          </SettingsListItem.DropdownMenuItem>
        </SettingsListItem.DropdownMenu>
      </>
    ),
  },
};

export const WithAvatar: Story = {
  args: {
    ...(WithBadge.args as any),
    subtitle: 'Now I have an avatar, badge and dropdown',
    avatarSrc: 'https://avatars.githubusercontent.com/u/263385',
  },
};

export const WithIconAvatar: Story = {
  args: {
    ...(WithBadge.args as any),
    subtitle: 'Now I have an avatar, badge and dropdown',
    avatarIcon: 'github',
  },
};

export const WithLoading: Story = {
  render: () => (
    <Box css={{ gap: '$spacing-3' }}>
      <SettingsListItem.Skeleton />
      <SettingsListItem.Skeleton enableAvatar />
    </Box>
  ),
};
