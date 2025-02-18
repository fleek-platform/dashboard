import { Meta, StoryObj } from '@storybook/react';

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
      <Box className="max-w-[15.125rem]">
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
      siteSlug: 'fleek',
      creator: {
        username: 'Kanishk Khurana',
        avatar: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
      },
      framework: {
        name: 'Next.js',
        avatar: 'https://avatars.githubusercontent.com/u/44036562?s=200&v=4',
      },
    },
  },
};

export const Skeleton: Story = {
  render: (args: TemplateCardProps) => <TemplateCard {...args} />,
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
