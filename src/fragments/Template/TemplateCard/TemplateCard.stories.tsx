import { Meta, StoryObj } from '@storybook/react';

import { TemplateReviewStatus } from '@/generated/graphqlClient';
import { Box } from '@/ui';

import { TemplateCard, TemplateCardProps } from './TemplateCard';

const meta: Meta = {
  title: 'Library/Fragments/Template/Card',
  component: TemplateCard,
};

export default meta;

type Story = StoryObj<TemplateCardProps>;

export const Customizable: Story = {
  render: (args: TemplateCardProps) => <TemplateCard {...args} />,
  decorators: [
    (Story: React.FC) => (
      <Box css={{ maxWidth: '17.875rem' }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    template: {
      id: 'template-id',
      name: 'React',
      description: 'This is the template description',
      banner:
        'https://ipfs.io/ipfs/bafybeiee6fyejfhcex3veoxv2d75drz2eibzynagfd6mygtnrhegimg2kq',
      siteId: 'site-id',
      siteAvatar: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
      siteSlug: 'fleek',
      category: {
        id: 'advanced-id',
        name: 'Advanced',
        slug: 'advanced-category',
      },
      deployment: {
        id: 'deployment-id',
        previewImageUrl:
          'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
      },
      usageCount: 0,
      createdAt: '2023-08-24T19:24:38.916Z',
      updatedAt: '2023-08-24T19:24:38.916Z',
      reviewStatus: TemplateReviewStatus.PENDING,
    },
  },
};

export const Skeleton: Story = {
  render: (args: TemplateCardProps) => <TemplateCard {...args} />,
  decorators: [
    (Story: React.FC) => (
      <Box css={{ maxWidth: '17.875rem' }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    isLoading: true,
  },
};
