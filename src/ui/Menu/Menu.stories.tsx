import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Avatar } from '../Avatar/Avatar';
import { Box } from '../ftw/Box/Box';
import { Icon } from '../Icon/Icon';
import { Menu } from './Menu';

const meta: Meta = {
  title: 'Library/Components/Menu',
};

export default meta;

type Story = StoryFn<Menu.RootProps>;

export const Default: Story = (args) => {
  return (
    <Menu.Root {...args}>
      <Menu.Trigger>
        <Avatar title="John Doe" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content align="start">
          <Menu.Item>Dashboard</Menu.Item>
          <Menu.Separator />
          <Menu.Item>New Project</Menu.Item>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Toggle Theme</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Disconnect</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

export const WithLabel: Story = (args) => {
  return (
    <Menu.Root {...args}>
      <Menu.Trigger>
        <Avatar title="John Doe" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content sideOffset={5}>
          <Menu.Label>Menu</Menu.Label>
          <Menu.Item>Dashboard</Menu.Item>
          <Menu.Separator />
          <Menu.Item>New Project</Menu.Item>
          <Menu.Item>Settings</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Toggle Theme</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Disconnect</Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

export const WithRightIcon: Story = (args) => {
  return (
    <Menu.Root {...args}>
      <Menu.Trigger>
        <Avatar title="John Doe" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content sideOffset={6}>
          <Menu.Item>
            Dashboard <Icon name="dashboard" />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            New Project <Icon name="plus-circle" />
          </Menu.Item>
          <Menu.Item>
            Settings <Icon name="gear" />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Toggle Theme <Icon name="sun" />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Disconnect <Icon name="exit" />
          </Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

export const WithDisableItem: Story = (args) => {
  return (
    <Menu.Root {...args}>
      <Menu.Trigger>
        <Avatar title="John Doe" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content sideOffset={6}>
          <Menu.Item disabled>
            Dashboard <Icon name="dashboard" />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            New Project <Icon name="plus-circle" />
          </Menu.Item>
          <Menu.Item>
            Settings <Icon name="gear" />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Toggle Theme <Icon name="sun" />
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item>
            Disconnect <Icon name="exit" />
          </Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

export const WithCheckedStatus: Story = (args) => {
  const MenuWithState = (): JSX.Element => {
    const [checked, setChecked] = useState(1);

    return (
      <Menu.Root {...args}>
        <Menu.Trigger>
          <Avatar title="John Doe" />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Content sideOffset={6}>
            <Menu.CheckboxItem checked={checked === 1} onCheckedChange={() => setChecked(1)}>
              Menu Item 1
              {checked === 1 && (
                <Menu.ItemIndicator>
                  <Icon name="check" />
                </Menu.ItemIndicator>
              )}
            </Menu.CheckboxItem>
            <Menu.CheckboxItem checked={checked === 2} onCheckedChange={() => setChecked(2)}>
              Menu Item 2
              {checked === 2 && (
                <Menu.ItemIndicator>
                  <Icon name="check" />
                </Menu.ItemIndicator>
              )}
            </Menu.CheckboxItem>
            <Menu.CheckboxItem checked={checked === 3} onCheckedChange={() => setChecked(3)}>
              Menu Item 3
              {checked === 3 && (
                <Menu.ItemIndicator>
                  <Icon name="check" />
                </Menu.ItemIndicator>
              )}
            </Menu.CheckboxItem>
          </Menu.Content>
        </Menu.Portal>
      </Menu.Root>
    );
  };

  return <MenuWithState />;
};

export const WithAvatar: Story = (args) => {
  return (
    <Menu.Root {...args}>
      <Menu.Trigger>
        <Avatar title="Royce Moroch" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content sideOffset={6}>
          <Menu.CheckboxItem checked>
            <Box className="flex-row gap-4 items-center">
              <Avatar title="Royce Moroch" css={{ fontSize: '1.25rem ' }} /> rollsmorr.eth
            </Box>
            <Menu.ItemIndicator>
              <Icon name="check" />
            </Menu.ItemIndicator>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem>
            <Box className="flex-row gap-4 items-center">
              <Avatar title="Camila Sosa" css={{ fontSize: '1.25rem ' }} /> camisosa.eth
            </Box>
          </Menu.CheckboxItem>
          <Menu.CheckboxItem>
            <Box className="flex-row gap-4 items-center">
              <Avatar title="Felipe Mendes" css={{ fontSize: '1.25rem ' }} /> zoruka.eth
            </Box>
          </Menu.CheckboxItem>
          <Menu.Separator />
          <Menu.Item>
            Create Project <Icon name="plus-circle" css={{ color: '$blue10' }} />
          </Menu.Item>
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};
