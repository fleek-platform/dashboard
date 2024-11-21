import { Meta, StoryObj } from '@storybook/react';

import { Box } from '@/ui';

import { Performance, PerformanceProps } from './Performance';

const meta: Meta = {
  title: 'Library/Fragments/Site/Performance',
  component: Performance,
};

export default meta;

export const Pending: StoryObj<PerformanceProps> = {
  render: (args: PerformanceProps) => (
    <Box css={{ maxWidth: '15.125rem' }}>
      <Performance {...args} />
    </Box>
  ),
  args: {},
};

export const Red: StoryObj<PerformanceProps> = {
  render: (args: PerformanceProps) => (
    <Box css={{ maxWidth: '15.125rem' }}>
      <Performance {...args} />
    </Box>
  ),
  args: {
    score: 10,
  },
};

export const Yellow: StoryObj<PerformanceProps> = {
  render: (args: PerformanceProps) => (
    <Box css={{ maxWidth: '15.125rem' }}>
      <Performance {...args} />
    </Box>
  ),
  args: {
    score: 50,
  },
};

export const Green: StoryObj<PerformanceProps> = {
  render: (args: PerformanceProps) => (
    <Box css={{ maxWidth: '15.125rem' }}>
      <Performance {...args} />
    </Box>
  ),
  args: {
    score: 99,
  },
};
