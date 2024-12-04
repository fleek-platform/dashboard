import { Meta, StoryObj } from '@storybook/react';

import { IpfsBox, IpfsBoxProps } from './IpfsBox';

const meta: Meta = {
  title: 'Library/Fragments/Site/Ipfs',
  component: IpfsBox,
};

export default meta;

export const Skeleton: StoryObj<IpfsBoxProps> = {
  args: {
    isLoading: true,
  },
};

export const Ready: StoryObj<IpfsBoxProps> = {
  args: {
    cid: 'QmUMZ71w5PfGwBxbDBXoDhD72Wciftg2JC8WuUJeTZTZrA',
    ipns: 'bsdjmgiaetfn.ipns',
  },
};

export const Pending: StoryObj<IpfsBoxProps> = {
  args: {},
};
