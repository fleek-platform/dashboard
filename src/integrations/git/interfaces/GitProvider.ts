import { SiteBuildSettingsData, SiteBuildSettingsOptions } from '@fleek-platform/utils-sites';

export type GitProvider = {
  getUserAndOrganizations: () => Promise<GitProvider.UserData>;
  getUserRepositories: (args: GitProvider.GetUserRepositoriesArgs) => Promise<GitProvider.Repository[]>;
  getBranches: (args: GitProvider.GetRepositoryBranchesArgs) => Promise<GitProvider.BranchesData>;
  getRepositoryBuildSettings: (args: GitProvider.GetRepositoryBuildSettingsArgs) => Promise<SiteBuildSettingsData>;
  /**
  /* @deprecated Usage is discouraged use BE method instead
  */
  createRepositoryFromTemplate: (args: GitProvider.CreateRepositoryFromTemplate) => Promise<GitProvider.Repository>;
  getTree: (args: GitProvider.GetTreeArgs) => Promise<GitProvider.Tree>;
  isRepositoryNameAvailable: (args: GitProvider.CheckRepositoryNameAvailabilityArgs) => Promise<boolean>;
  getInstallationId: (args: GitProvider.GetInstallationIdArgs) => Promise<number>;
};

export namespace GitProvider {
  export type Name = 'github' | 'gitlab' | 'bitbucket';

  export type Repository = {
    id: number | string;
    name: string;
    defaultBranch: string;
    installationId: number;
  };

  export type CheckRepositoryNameAvailabilityArgs = {
    repositoryName: string;
  };

  export type User = {
    slug: string;
    avatar: string;
    installationId: number;
    isOrganization: boolean;
  };

  export type UserData = {
    user: User;
    organizations: User[];
  };

  export type BranchesData = string[];

  export type GetRepositoryBuildSettingsArgs = {
    slug: string;
    repository: string;
    ref?: string;
    baseDirectory?: string;
  } & Pick<SiteBuildSettingsOptions, 'frameworks'>;

  export type GetUserRepositoriesArgs = {
    installationId: number;
  };

  export type GetRepositoryBranchesArgs = {
    slug: string;
    repository: string;
  };

  export type CreateRepositoryFromTemplate = {
    templateOwner: string;
    templateRepository: string;

    slug: string;
    repositoryName: string;
    privateRepo: boolean;
    initialCommitMessage?: string;
  };

  export type GetTreeArgs = {
    slug: string;
    repository: string;
    ref: string;
  };

  export type GetInstallationIdArgs = {
    slug: string;
  };

  export type TreeItem = {
    path: string;
    type: 'tree' | 'blob';
  };

  export type Tree = TreeItem[];
}
