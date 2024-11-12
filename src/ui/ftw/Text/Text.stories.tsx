import type { Meta, StoryObj } from '@storybook/react';

import { Text, validTextElement } from './Text';

const meta: Meta<typeof Text> = {
  title: 'FTW/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'inline-radio',
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
    weight: {
      control: 'inline-radio',
      options: [400, 500, 700],
    },
    as: {
      control: 'inline-radio',
      options: validTextElement,
    },
    className: {
      control: 'none',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    weight: 500,
    as: 'p',
    children: 'Get on Fleek!',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'sm',
    weight: 400,
    as: 'p',
    children: 'Connect your Git Provider or use the Fleek CLI.',
  },
};
