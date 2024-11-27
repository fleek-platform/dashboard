import { useArgs } from '@storybook/addons';
import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'FTW/Switch',
  component: Switch,
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Primary: Story = {
  args: {
    size: 'md',
    disabled: false,
    checked: false,
    labelOff: 'switch',
  },
  render: function StatefulSwitch(props) {
    const [, updateArgs] = useArgs();

    return (
      <Switch
        className="min-w-10"
        onCheckedChange={(checked) => updateArgs({ checked })}
        {...props}
      />
    );
  },
};

export const Loading: Story = {
  args: {
    size: 'md',
    loading: true,
    checked: true,
    labelOn: 'on with long text',
    labelOff: 'off',
  },
};
