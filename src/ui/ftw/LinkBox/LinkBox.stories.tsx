import { Meta, StoryObj } from '@storybook/react';

import { LinkBox } from './LinkBox';

const meta: Meta = {
  title: 'FTW/LinkBox',
  component: LinkBox,
};

export default meta;

type Story = StoryObj<typeof LinkBox>;

export const Default: Story = {
  render: (args) => <LinkBox {...args} />,
  args: {
    children: 'Box component',
    href: '/',
    isExternalLink: true,
  },
};
