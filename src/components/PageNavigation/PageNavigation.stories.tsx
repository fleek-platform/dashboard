import { routes } from '@fleek-platform/utils-routes';
import { Meta, StoryObj } from '@storybook/react';

import { Button, Icon } from '@/ui';

import { PageNavigation, PageNavigationProps } from './PageNavigation';

const meta: Meta = {
  title: 'Library/Components/Page Nav',
  component: PageNavigation,
};

export default meta;

type Story = StoryObj<PageNavigationProps>;

export const Project: Story = {
  render: (args: PageNavigationProps) => {
    window.location.hash = 'sites';

    return <PageNavigation {...args} />;
  },
  args: {
    items: [
      {
        icon: 'home',
        label: 'Home',
        path: routes.project.home({ projectId: 'project-id' }),
      },
      {
        icon: 'browser',
        label: 'Sites',
        path: routes.project.site.list({ projectId: 'project-id' }),
      },
      {
        icon: 'archive',
        label: 'Files',
        path: routes.project.storage({ projectId: 'project-id' }),
      },
      {
        icon: 'domain',
        label: 'Domains',
        path: routes.project.domains({ projectId: 'project-id' }),
      },
      {
        icon: 'gear',
        label: 'Settings',
        path: routes.project.settings.general({ projectId: 'project-id' }),
      },
    ],
    children: (
      <Button>
        Add new site
        <Icon name="chevron-down" />
      </Button>
    ),
  },
};

export const Site: Story = {
  render: (args: PageNavigationProps) => {
    window.location.hash = 'deploy';

    return <PageNavigation {...args} />;
  },
  args: {
    items: [
      {
        icon: 'desktop',
        label: 'Home',
        path: routes.project.site.overview({
          projectId: 'project-id',
          siteId: 'site-id',
        }),
      },
      {
        icon: 'deploy',
        label: 'Deploys',
        path: routes.project.site.deployments.list({
          projectId: 'project-id',
          siteId: 'site-id',
        }),
      },
      {
        icon: 'analytics',
        label: 'Analytics',
        path: routes.project.site.analytics({
          projectId: 'project-id',
          siteId: 'site-id',
        }),
      },
      {
        icon: 'gear',
        label: 'Settings',
        path: routes.project.site.settings.general({
          projectId: 'project-id',
          siteId: 'site-id',
        }),
      },
    ],
    children: (
      <>
        <Button intent="neutral">View git repo</Button>
        <Button>Visit site</Button>
      </>
    ),
  },
};
