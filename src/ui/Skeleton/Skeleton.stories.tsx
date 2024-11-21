import { Meta, StoryObj } from '@storybook/react';

import { Skeleton, SkeletonProps } from './Skeleton';

const meta: Meta = {
  title: 'Library/Atoms/Skeleton',
  component: Skeleton,
};

export default meta;

type Story = StoryObj<SkeletonProps>;

export const Customizable: Story = {
  render: (args) => <Skeleton {...args} />,
  args: {
    css: { width: '300px', height: '200px' },
  },
};
