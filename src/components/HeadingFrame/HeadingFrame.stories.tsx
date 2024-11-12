import { Meta, StoryObj } from '@storybook/react';

import { HeadingFrame, HeadingFrameProps } from './HeadingFrame';

const meta: Meta = {
  title: 'Library/Components/Heading Frame',
  component: HeadingFrame,
};

export default meta;

export const Customizable: StoryObj<HeadingFrameProps> = {
  render: (args) => <HeadingFrame {...args} />,
  args: {
    children: 'Heading Frame ⚡⚡⚡',
  },
};
