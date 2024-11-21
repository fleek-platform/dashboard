import { SiteBuildSettings } from '@fleek-platform/utils-sites';
import { DateTime } from 'luxon';
import { Octokit } from 'octokit';

import type { GitProvider } from '../interfaces/GitProvider';

export class GitHub implements GitProvider {
  private octokit: Octokit;

  constructor(auth: string) {
    this.octokit = new Octokit({ auth });
  }

  public static testAuth(auth: string) {
    return new Octokit({ auth }).rest.users.getAuthenticated({
      headers: {
        'If-None-Match': '', // this remove default browser caching of 60 seconds
      },
    });
  }

  public async someAppsInstalled(installationIds: string[]) {
    const { installations } =
      await this.getInstalledApplicationsForAuthenticatedUser();

    return installations.some((installation) =>
      installationIds.includes(installation.id.toString()),
    );
  }

  public async getUserAndOrganizations() {
    const githubUser = await this.octokit.rest.users.getAuthenticated();
    const installations = await this.octokit.paginate<any>(
      this.octokit.rest.apps.listInstallationsForAuthenticatedUser.endpoint.merge(
        {
          per_page: 100,
          v: DateTime.now().toJSDate(),
          headers: {
            'If-None-Match': '', // this remove default browser caching of 60 seconds
          },
        },
      ),
    );

    return {
      user: {
        slug: githubUser.data.login,
        avatar: githubUser.data.avatar_url,
        installationId: installations.find(
          (installation) =>
            installation.account.login === githubUser.data.login,
        )?.id,
        isOrganization: githubUser.data.type === 'Organization',
      },
      organizations: installations
        .map((installation) => ({
          slug: installation.account.login,
          avatar: installation.account.avatar_url,
          installationId: installation.id,
          isOrganization: installation.account.type === 'Organization',
        }))
        .filter((organization) => organization.slug !== githubUser.data.login),
    };
  }

  public async getUserRepositories(args: GitProvider.GetUserRepositoriesArgs) {
    const repositories = await this.octokit.paginate<any>(
      this.octokit.rest.apps.listInstallationReposForAuthenticatedUser.endpoint.merge(
        {
          installation_id: args.installationId,
          per_page: 100,
          v: DateTime.now().toJSDate(),
          headers: {
            'If-None-Match': '', // this remove default browser caching of 60 seconds
          },
        },
      ),
    );

    return repositories.map((repository) => ({
      id: repository.id,
      name: repository.name,
      defaultBranch: repository.default_branch,
      installationId: args.installationId,
    }));
  }

  public async getInstalledApplicationsForAuthenticatedUser() {
    const { data } =
      await this.octokit.rest.apps.listInstallationsForAuthenticatedUser({
        headers: {
          'If-None-Match': '', // Remove browser caching of 60 seconds
        },
      });

    return data;
  }

  public async getRepositoryBuildSettings({
    slug: owner,
    repository: repo,
    ref,
    frameworks,
    baseDirectory,
  }: GitProvider.GetRepositoryBuildSettingsArgs) {
    const concatBaseDirectory = (path: string) => {
      return `${baseDirectory ? `${baseDirectory}/` : ''}${path}`.replace(
        /\/$/g,
        '',
      );
    };

    const readFile = async (path: string): Promise<string> => {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path: concatBaseDirectory(path),
        ref,
      });

      if ('content' in data) {
        return Buffer.from(data.content, 'base64').toString();
      }

      return '';
    };

    const readPath = async (path: string): Promise<string[]> => {
      const { data } = await this.octokit.rest.repos.getContent({
        owner,
        repo,
        path: concatBaseDirectory(path),
        ref,
      });

      if (Array.isArray(data)) {
        return data.map((item) => item.name);
      }

      return [];
    };

    return new SiteBuildSettings({ readFile, readPath, frameworks }).get();
  }

  public async getBranches({
    slug: owner,
    repository: repo,
  }: GitProvider.GetRepositoryBranchesArgs) {
    const data = await this.octokit.paginate<any>(
      this.octokit.rest.repos.listBranches.endpoint.merge({
        owner,
        repo,
        per_page: 100,
        v: DateTime.now().toJSDate(),
      }),
    );

    return data.map((branch) => branch.name);
  }

  public async getInstallationId({ slug }: GitProvider.GetInstallationIdArgs) {
    const { data } =
      await this.octokit.rest.apps.listInstallationsForAuthenticatedUser();

    if (Array.isArray(data.installations)) {
      const installation = data.installations.find((installation) => {
        if (installation.account) {
          if ('login' in installation.account) {
            return installation.account.login === slug;
          }

          return installation.account.slug === slug;
        }
      });

      if (installation) {
        return installation.id;
      }
    }

    throw new GitHubError(`No installation found for ${slug}`);
  }

  public async createRepositoryFromTemplate({
    templateOwner,
    templateRepository,
    slug: owner,
    repositoryName,
    privateRepo,
    initialCommitMessage = 'Initial commit',
  }: GitProvider.CreateRepositoryFromTemplate) {
    const readFolder = async (path: string): Promise<GitFileMeta[]> => {
      const { data } = await this.octokit.rest.repos.getContent({
        owner: templateOwner,
        repo: templateRepository,
        path,
      });

      const files: GitFileMeta[] = [];

      if (Array.isArray(data)) {
        const subFolderPromises: Promise<GitFileMeta[]>[] = [];

        for (const item of data) {
          if (item.type === 'dir') {
            subFolderPromises.push(readFolder(item.path));
          } else {
            files.push({ path: item.path, sha: item.sha });
          }
        }

        const subFolderResults = await Promise.all(subFolderPromises);

        for (const subFiles of subFolderResults) {
          files.push(...subFiles);
        }
      }

      return files;
    };

    const createRepository = async (): Promise<
      ReturnType<Octokit['rest']['repos']['createForAuthenticatedUser']>
    > => {
      try {
        const user = await this.octokit.rest.users.getAuthenticated();

        const isOwner = user.data.login === owner;

        const promise = isOwner
          ? this.octokit.rest.repos.createForAuthenticatedUser({
              name: repositoryName,
              private: privateRepo,
              auto_init: true,
            })
          : this.octokit.rest.repos.createInOrg({
              name: repositoryName,
              private: privateRepo,
              org: owner,
              auto_init: true,
            });

        return await promise;
      } catch (error: any) {
        if (error.status === 422) {
          throw new GitHubError(
            `Repository "${repositoryName}" already exists in your GitHub account.`,
          );
        }
        throw error;
      }
    };

    const pushFilesToCreatedRepo = async (paths: GitFileMeta[]) => {
      try {
        const fileContents = (
          await Promise.all(
            paths.map(async (path) => {
              const { data } = await this.octokit.rest.git.getBlob({
                owner: templateOwner,
                repo: templateRepository,
                file_sha: path.sha,
              });

              if ('content' in data) {
                return {
                  path: path.path,
                  content: data.content,
                };
              }
            }),
          )
        ).filter((file) => typeof file !== 'undefined') as GitFileContent[];

        const tree = await this.octokit.rest.git.createTree({
          owner,
          repo: repositoryName,
          tree: fileContents.map((file) => ({
            path: file.path,
            mode: '100644', // Regular file mode
            type: 'blob', // Blob type
            content: Buffer.from(file.content, 'base64').toString('utf-8'),
          })),
        });

        const commit = await this.octokit.rest.git.createCommit({
          owner,
          repo: repositoryName,
          message: initialCommitMessage,
          tree: tree.data.sha,
        });

        return this.octokit.rest.git.updateRef({
          owner,
          repo: repositoryName,
          ref: 'heads/main',
          sha: commit.data.sha,
          force: true,
        });
      } catch (error: any) {
        throw new GitHubError('Failed pushing files to created repository.');
      }
    };

    // Execution
    const listOfFiles = await readFolder('');

    const repository = await createRepository();

    await pushFilesToCreatedRepo(listOfFiles);

    const installationId = await this.getInstallationId({ slug: owner });

    return {
      id: repository.data.id,
      name: repository.data.name,
      defaultBranch: repository.data.default_branch,
      installationId,
    };
  }

  public async getTree({
    slug,
    repository,
    ref,
  }: GitProvider.GetTreeArgs): Promise<any> {
    const { data } = await this.octokit.rest.git.getTree({
      owner: slug,
      repo: repository,
      tree_sha: ref,
      recursive: 'true',
    });

    return data.tree;
  }

  public async isRepositoryNameAvailable({
    repositoryName,
  }: GitProvider.CheckRepositoryNameAvailabilityArgs): Promise<boolean> {
    try {
      const { data } = await this.octokit.rest.users.getAuthenticated();

      if (!data.name) {
        throw new GitHubError('Failed to get Authenticated user');
      }

      await this.octokit.rest.repos.get({
        owner: data.name,
        repo: repositoryName,
      });

      return false;
    } catch {
      return true;
    }
  }
}

type GitFileMeta = { path: string; sha: string };
type GitFileContent = { path: string; content: string };

class GitHubError extends Error {}
