import type { Meta, StoryObj } from '@storybook/react';

import { ExternalLink } from '../ExternalLink/ExternalLink';
import { ResourcesBox, type ResourcesBoxProps } from './ResourcesBox';

const meta: Meta = {
  title: 'Library/Components/Resources Box',
  component: ResourcesBox,
};

export default meta;

type Story = StoryObj<ResourcesBoxProps>;

export const ResourcesBoxStory: Story = {
  args: {
    title: 'Resources',
    description: 'Quick links to help you understand things clearly.',
    children: [
      <ExternalLink key="link-1" href="https://example.com">
        Read the CLI docs
      </ExternalLink>,
      <ExternalLink key="link-2" href="https://example.com" iconName="sun">
        Custom icon
      </ExternalLink>,
      <ExternalLink key="link-3" href="https://example.com" iconOrder="start">
        Custom Icon order
      </ExternalLink>,
      <ExternalLink key="link-4" href="https://example.com" colorScheme="slate">
        Custom color scheme
      </ExternalLink>,
      <ExternalLink key="link-5" href="https://example.com">
        Default Styles
      </ExternalLink>,
      <ExternalLink key="linl-6" href="https://example.com">
        Default Styles
      </ExternalLink>,
    ],
    externalLinkProps: {
      colorScheme: 'yellow',
      withIcon: true,
    },
  },
};
