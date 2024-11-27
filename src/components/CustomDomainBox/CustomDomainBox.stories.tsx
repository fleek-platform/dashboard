import { Meta, StoryObj } from '@storybook/react';

import { DomainStatus } from '@/generated/graphqlClient';

import { CustomDomainBox, CustomDomainBoxProps } from './CustomDomainBox';

const meta: Meta = {
  title: 'Library/Components/Custom Domain Box',
  component: CustomDomainBox,
};

export default meta;

export const Skeleton: StoryObj<CustomDomainBoxProps> = {
  args: {
    isLoading: true,
  },
};

export const ActiveList: StoryObj<CustomDomainBoxProps> = {
  args: {
    title: 'Custom Domains',
    isActive: true,
    domainList: [
      {
        __typename: 'Domain',
        id: 'clkt7usmj0003mo08gawqkidt',
        createdAt: '2023-08-02T04:16:45.931Z',
        hostname: 'example.com',
        status: DomainStatus.ACTIVE,
        errorMessage: null,
      },
    ],
    listLabel: 'DNS',
    emptyText: 'Add a ENS name to your site, this allows you to use your ENS name as a domain access point for the site deployed.',
    CTAHref: '#',
    CTAText: 'Manage domains',
    emptyCTAText: 'Add custom domain',
    emptyCTAHref: '#',
    footer: 'Custom domains for your site',
    footerIcon: 'domain',
    footerIconLabel: 'DNS',
  },
};

export const EmptyList: StoryObj<CustomDomainBoxProps> = {
  args: {
    title: 'Custom Domains',
    isActive: false,
    domainList: [],
    listLabel: 'DNS',
    emptyText: 'Add a ENS name to your site, this allows you to use your ENS name as a domain access point for the site deployed.',
    CTAHref: ' ',
    CTAText: 'Manage domains',
    emptyCTAText: 'Add custom domain',
    emptyCTAHref: '#',
    footer: 'Custom domains for your site',
    footerIcon: 'domain',
    footerIconLabel: 'DNS',
  },
};
