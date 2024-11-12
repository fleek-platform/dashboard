import { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/ui';

import { AuditLog, AuditLogProps } from './AuditLog';

const meta: Meta = {
  title: 'Library/Fragments/Site/Audit Log',
  component: AuditLog,
};

export default meta;

export const Loading: StoryObj<AuditLogProps> = {
  render: (args: AuditLogProps) => (
    <Box css={{ maxWidth: '15.125rem' }}>
      <AuditLog {...args} />
    </Box>
  ),
  args: {
    isLoading: true,
  },
};

export const DeployActions: StoryObj<AuditLogProps> = {
  render: (args: AuditLogProps) => (
    <Box css={{ maxWidth: '15.125rem' }}>
      <AuditLog {...args} />
    </Box>
  ),
  args: {
    items: [
      {
        category: 'deploy-failed',
        url: '#',
        urlTitle: 'h7f23s',
        label: '10m ago',
      },
      {
        category: 'deploy-live',
        url: '#',
        urlTitle: 'h7f23s',
        label: '10m ago',
      },
      {
        category: 'deploy-started',
        urlTitle: 'h7f23s',
        url: '#',
        label: '23m ago',
      },
    ],
  },
};

export const SiteActions: StoryObj<AuditLogProps> = {
  render: (args: AuditLogProps) => (
    <Box css={{ maxWidth: '15.125rem' }}>
      <AuditLog {...args} />
    </Box>
  ),
  args: {
    items: [
      {
        category: 'site-healthy',
        label: '10m ago',
      },
      {
        category: 'site-unhealthy',
        label: '10m ago',
      },
    ],
  },
};
