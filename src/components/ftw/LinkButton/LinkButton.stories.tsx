import type { Meta, StoryObj } from '@storybook/react';

import { LinkButton, type LinkButtonProps } from './LinkButton';

const meta: Meta = {
  title: 'FTW/LinkButton',
  component: LinkButton,
};

export default meta;

export const Default: StoryObj<LinkButtonProps> = {
  render: (args) => <LinkButton {...args} />,
  args: {
    href: 'https://fleek.xyz',
    children: 'I am a link with button styling',
    variant: 'primary',
    intent: 'accent',
    isExternalLink: false,
  },
};
