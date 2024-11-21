import type { Meta, StoryObj } from '@storybook/react';

import { TemplateReviewStatus } from '@/generated/graphqlClient';
import { Box } from '@/ui';

import {
  TemplateOverview,
  type TemplateOverviewProps,
} from './TemplateOverview';

const meta: Meta = {
  title: 'Library/Fragments/Template/Overview',
  component: TemplateOverview,
};

export default meta;

export const Default: StoryObj<TemplateOverviewProps> = {
  render: (args: TemplateOverviewProps) => (
    <Box css={{ maxWidth: '80%' }}>
      <TemplateOverview {...args} />
    </Box>
  ),
  args: {
    template: {
      id: 'template-id',
      name: 'React',
      description: 'Template description',
      banner:
        'https://ipfs.io/ipfs/bafybeiee6fyejfhcex3veoxv2d75drz2eibzynagfd6mygtnrhegimg2kq',
      siteId: 'site-id',
      siteAvatar: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
      siteSlug: 'fleek',
      category: {
        id: 'advanced-id',
        name: 'Advanced',
        slug: 'advanced-category',
        templatesCount: 10,
      },
      deployment: {
        id: 'deployment-id',
      },
      usageCount: 0,
      reviewStatus: TemplateReviewStatus.APPROVED,
      createdAt: '2023-08-24T19:24:38.916Z',
      updatedAt: '2023-08-24T19:24:38.916Z',
    },
  },
};

export const Skeleton: StoryObj<TemplateOverviewProps> = {
  render: (args: TemplateOverviewProps) => (
    <Box css={{ maxWidth: '80%' }}>
      <TemplateOverview {...args} />
    </Box>
  ),
  args: {
    isLoading: true,
  },
};
