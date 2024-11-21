import type { Meta, StoryObj } from '@storybook/react';

import { Filecoin, type FilecoinProps } from './Filecoin';

const meta: Meta = {
  title: 'Library/Fragments/Site/Filecoin',
  component: Filecoin,
};

export default meta;

export const Ready: StoryObj<FilecoinProps> = {
  args: {
    dealID: 'fg9sf09nfsdff',
  },
};

export const Pending: StoryObj<FilecoinProps> = {
  args: {},
};
