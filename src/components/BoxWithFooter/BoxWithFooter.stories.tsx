import type { Meta, StoryObj } from '@storybook/react';

import { BoxWithFooter, type BoxWithFooterProps } from './BoxWithFooter';

const meta: Meta = {
  title: 'Library/Components/Box with Footer',
  component: BoxWithFooter,
};

export default meta;

export const Skeleton: StoryObj<BoxWithFooterProps> = {
  args: {
    isLoading: true,
  },
};

export const Customizable: StoryObj<BoxWithFooterProps> = {
  args: {
    children: 'Main Box Content',
    footer: 'Footer Content',
    footerIconLabel: 'Icon Label',
    footerIcon: 'domain',
  },
};

export const IconBackground: StoryObj<BoxWithFooterProps> = {
  args: {
    children: 'Main Box Content',
    footer: 'Footer Content',
    footerIconLabel: 'Icon Label',
    footerIcon: 'domain',
  },
};
