import { Meta, StoryObj } from '@storybook/react';

import {
  DeploymentStatus,
  SourceProvider,
  StorageType,
} from '@/generated/graphqlClient';
import { Box } from '@/ui';

import { SiteCard, SiteCardProps } from './SiteCard';

const meta: Meta = {
  title: 'Library/Fragments/Site/Card',
  component: SiteCard,
};

export default meta;

export const Default: StoryObj<SiteCardProps> = {
  args: {
    id: 'clm6eb24w0000mn08izwdr4xe',
    name: 'nextjs-template-3',
    avatar: '',
    projectId: 'cllxyrh3o0001l408vgvf3dft',
    siteLink: 'howling-worried-dentist.dev.on-fleek.app',
    deployment: {
      cid: 'bafybeifaj5oovztplnb4z4etxzbql5tmigplvuwvxleib2o4baoxuz6ple',
      id: 'clm6gtmke000lmh086f9wgfbe',
      status: DeploymentStatus.RELEASE_COMPLETED,
      createdAt: '2023-09-05T15:28:30.588Z',
      sourceProvider: SourceProvider.GITHUB,
      sourceAuthor: 'Felipe Mendes',
      sourceMessage: 'initiated deployment of fleek-platform/nextjs-template',
      sourceRepositoryName: 'nextjs-template-1',
      sourceRepositoryOwner: 'zoruka',
      previewImageUrl: null,
      storageType: StorageType.IPFS,
      sourceBranch: 'main',
      updatedAt: '2023-09-05T15:30:56.396Z',
      sourceRef: 'df12dc8c33e79abcc3c25ac7d136039edd2b749e',
      previewOnly: false,
      functionDeployments: [],
    },
  },
  decorators: [
    (Story: React.FC) => (
      <Box className="max-w-[15.125rem]">
        <Story />
      </Box>
    ),
  ],
};

export const Pending: StoryObj<SiteCardProps> = {
  args: {
    id: 'site-id',
    name: 'name',
    projectId: 'project-id',
    deployment: undefined,
  },
  decorators: [
    (Story: React.FC) => (
      <Box className="max-w-[15.125rem]">
        <Story />
      </Box>
    ),
  ],
};

export const Skeleton: StoryObj<SiteCardProps> = {
  args: {
    isLoading: true,
  },
  decorators: [
    (Story: React.FC) => (
      <Box className="max-w-[15.125rem]">
        <Story />
      </Box>
    ),
  ],
};
