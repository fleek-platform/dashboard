import { Meta, StoryObj } from '@storybook/react';

import { Link, LinkProps } from './Link';

const meta: Meta = {
  title: 'FTW/Link',
  component: Link,
};

export default meta;

export const Default: StoryObj<LinkProps> = {
  render: (args) => <Link {...args} />,
  args: {
    href: '',
    children: 'Use me for in-app routes',
    variant: 'neutral',
  },
};
