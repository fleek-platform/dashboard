import type { Meta, StoryObj } from '@storybook/react';

import { ExternalLink, type ExternalLinkProps } from './ExternalLink';

const meta: Meta = {
  title: 'FTW/External Link',
  component: ExternalLink,
};

export default meta;

export const Default: StoryObj<ExternalLinkProps> = {
  render: (args) => <ExternalLink {...args} />,
  args: {
    href: 'https://fleek.xyz',
    children: 'Click me! I will open in a new tab',
    variant: 'neutral',
  },
};
