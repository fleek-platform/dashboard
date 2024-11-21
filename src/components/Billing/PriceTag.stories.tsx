import { Meta, StoryObj } from '@storybook/react';

import { PriceTag, PriceTagProps } from './PriceTag';

const meta: Meta = {
  title: 'Library/Components/Billing/Price Tag',
  component: PriceTag,
};

export default meta;

type Story = StoryObj<PriceTagProps>;

export const Component: Story = {
  render: (args) => {
    return <PriceTag {...args} />;
  },

  args: {
    children: '10',
  },
};
