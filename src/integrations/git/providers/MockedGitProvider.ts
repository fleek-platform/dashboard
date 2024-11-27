import {
  SiteBuildSettings,
  SiteBuildSettingsFramework,
} from '@fleek-platform/utils-sites';

import { GitProvider } from '../interfaces/GitProvider';

export class MockedGitProvider implements GitProvider {
  public async getUserAndOrganizations() {
    return mockedGitUserAndOrganizations;
  }

  public async getRepositoryBuildSettings() {
    const readFile = async (): Promise<string> => {
      return '';
    };

    const readPath = async (): Promise<string[]> => {
      return [];
    };

    const frameworks: SiteBuildSettingsFramework[] = [];

    return new SiteBuildSettings({ readFile, readPath, frameworks }).get();
  }

  public async getUserRepositories() {
    return [];
  }

  public async getBranches() {
    return [];
  }

  public async createRepositoryFromTemplate() {
    return {
      id: 1,
      installationId: 100,
      name: 'your-repo-1',
      defaultBranch: 'main',
    };
  }

  public async getTree() {
    return [];
  }

  public async isRepositoryNameAvailable() {
    return true;
  }

  public async getInstallationId(): Promise<number> {
    return Promise.resolve(0);
  }
}

const mockedGitUserAndOrganizations: GitProvider.UserData = {
  user: {
    slug: 'rollsmorr',
    avatar: 'https://avatars.githubusercontent.com/u/40076490?v=4',
    installationId: 100,
    isOrganization: false,
  },
  organizations: [
    {
      slug: 'fleek-platform',
      avatar: 'https://avatars.githubusercontent.com/u/118954101?s=200&v=4',
      installationId: 200,
      isOrganization: true,
    },
    {
      slug: 'fleekhq',
      avatar: 'https://avatars.githubusercontent.com/u/43047399?s=200&v=4',
      installationId: 300,
      isOrganization: true,
    },
    {
      slug: 'empty',
      avatar: 'https://picsum.photos/300/300?3',
      installationId: 400,
      isOrganization: true,
    },
  ],
};
