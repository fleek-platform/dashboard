import type { Meta, StoryObj } from '@storybook/react';

import { Ipfs, type IpfsProps } from './Ipfs';

const meta: Meta = {
  title: 'Library/Fragments/Site/Ipfs',
  component: Ipfs,
};

export default meta;

export const Skeleton: StoryObj<IpfsProps> = {
  args: {
    isLoading: true,
  },
};

export const Ready: StoryObj<IpfsProps> = {
  args: {
    cid: 'QmUMZ71w5PfGwBxbDBXoDhD72Wciftg2JC8WuUJeTZTZrA',
    ipns: 'bsdjmgiaetfn.ipns',
    active: true,
  },
};

export const Pending: StoryObj<IpfsProps> = {
  args: {},
};
