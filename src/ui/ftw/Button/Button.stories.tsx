import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'FTW/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'outline'],
    },
    intent: {
      control: 'inline-radio',
      options: ['accent', 'success', 'warning', 'danger', 'neutral'],
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    intent: 'accent',
    size: 'sm',
    children: 'Primary button',
    loading: false,
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    intent: 'neutral',
    size: 'sm',
    children: 'Outline button',
    loading: false,
    disabled: false,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'primary',
    intent: 'danger',
    size: 'sm',
    children: 'Destructive button',
    loading: false,
    disabled: false,
  },
};

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    intent: 'success',
    size: 'sm',
    children: 'Button',
    iconLeft: 'add-circle',
    iconRight: 'chevron-down',
    loading: false,
    disabled: false,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'primary',
    intent: 'ghost',
    size: 'sm',
    children: 'Ghost button',
    loading: false,
    disabled: false,
  },
};

export const CustomChildren: Story = {
  args: {
    variant: 'primary',
    intent: 'neutral',
    size: 'sm',
    children: (
      <>
        Custom children
        <section className="bg-neutral-11 text-neutral-2 flex size-4 items-center justify-center rounded-full text-[10px]">1</section>
      </>
    ),
    loading: false,
    disabled: false,
  },
};
