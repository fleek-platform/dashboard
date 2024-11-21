import type { Meta, StoryObj } from '@storybook/react';

import {
  LearnMoreMessage,
  type LearnMoreMessageProps,
} from './LearnMoreMessage';

const meta: Meta = {
  title: 'Library/Components/Learn More Message',
};

export default meta;

export const Customizable: StoryObj<LearnMoreMessageProps> = {
  render: (args) => <LearnMoreMessage {...args} />,
  args: {
    prefix: 'Learn more about',
    children: 'Example Link',
    href: 'https://fleek.xyz/docs',
  },
};
