import { Meta, StoryObj } from '@storybook/react';

import { TemplateReviewStatus } from '@/generated/graphqlClient';
import { Box } from '@/ui';

import { TemplateDetails, TemplateDetailsProps } from './TemplateDetails';

const meta: Meta = {
  title: 'Library/Fragments/Template/Details',
  component: TemplateDetails,
};

export default meta;

export const Default: StoryObj<TemplateDetailsProps> = {
  decorators: [
    (Story: React.FC) => (
      <Box className="max-w-[15.125rem]">
        <Story />
      </Box>
    ),
  ],
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
        name: 'Advanced',
        slug: 'advanced-category',
        id: 'advanced',
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
    isLoading: false,
  },
};

export const Skeleton: StoryObj<TemplateDetailsProps> = {
  decorators: [
    (Story: React.FC) => (
      <Box className="max-w-[15.125rem]">
        <Story />
      </Box>
    ),
  ],
  args: {
    isLoading: true,
  },
};
