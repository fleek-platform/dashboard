import { Meta, StoryObj } from '@storybook/react';

import { Hero } from './Hero';

const meta: Meta = {
  title: 'Library/Fragments/Billing/Hero',
  component: Hero,
};

export default meta;

type Story = StoryObj;

export const Component: Story = {
  render: (args) => {
    return <Hero {...args} />;
  },
};
