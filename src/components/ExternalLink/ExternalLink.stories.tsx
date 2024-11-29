import type { Meta, StoryObj } from '@storybook/react';

import { ExternalLink, type ExternalLinkProps } from './ExternalLink';

const meta: Meta = {
  title: 'Library/Components/External Link',
  component: ExternalLink,
};

export default meta;

export const Customizable: StoryObj<ExternalLinkProps> = {
  render: (args) => <ExternalLink {...args} />,
  args: {
    children: 'Customizable External Link',
    css: { fontSize: '1rem' },
    withIcon: true,
    iconOrder: 'end',
  },
  argTypes: {
    withIcon: {
      defaultValue: false,
      type: { name: 'boolean' },
    },
    iconOrder: {
      defaultValue: 'end',
      type: { name: 'enum', value: ['start', 'end'] },
    },
  },
};
