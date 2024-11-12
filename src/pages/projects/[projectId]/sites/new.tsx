import { routes } from '@fleek-platform/utils-routes';
import { createSiteSchema } from '@fleek-platform/utils-validation';
import { MouseEventHandler, useMemo, useState } from 'react';
import { useClient } from 'urql';

import { Form } from '@/components';
import { constants } from '@/constants';
import { DeploySite } from '@/fragments';
import { GitRepository, GitUser } from '@/fragments/DeploySite/Revamp/DeploySite.context';
import {
  GitIntegrationDocument,
  GitIntegrationQuery,
  GitIntegrationQueryVariables,
  SecretVisibility,
  useCountSitesWithSourceProviderQuery,
  useCreateSecretMutation,
  useCreateSiteMutation,
  useTriggerDeploymentMutation,
} from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import type { GitProvider } from '@/integrations/git';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Page } from '@/types/App';
import { SiteNewSecret, SiteSourceProvider } from '@/types/Site';
import { Stepper } from '@/ui';
import { getAPISourceProvider } from '@/utils/getSourceProvider';
import { Log } from '@/utils/log';
import { withAccess } from '@/utils/withAccess';

const NewSitePage: Page = () => {
  const flags = useFeatureFlags();

  // Pre-fetch sites count for adding GH orgs
  useCountSitesWithSourceProviderQuery();

  if (flags.enableBackendGitIntegration) {
    return <NewSite />;
  }

  return <LegacyNewSite />;
};

const NewSite = () => {
  const [title, setTitle] = useState<string>();
  const [sourceProvider, setSourceProvider] = useState<SiteSourceProvider>();
  const [handleBackClick, setHandleBackClick] = useState<MouseEventHandler<HTMLButtonElement>>();
  const [gitUser, setGitUser] = useState<GitUser>();
  const [gitBranch, setGitBranch] = useState<string>();
  const [gitRepository, setGitRepository] = useState<GitRepository>();
  const [gitProviderId, setGitProviderId] = useState<string>();

  const router = useRouter();
  const session = useSessionContext();
  const client = useClient();

  const [, createSite] = useCreateSiteMutation();
  const [, triggerDeployment] = useTriggerDeploymentMutation();
  const [, createSecret] = useCreateSecretMutation();
  const toast = useToast();

  const createSiteForm = Form.useForm({
    options: { partial: true },
    values: {
      name: '',
      buildCommand: '',
      distDirectory: '',
      dockerImage: undefined as unknown as string,
      secrets: [] as SiteNewSecret[],
      baseDirectory: '',
      templateId: router.query.templateId,
      frameworkId: undefined as unknown as string,
    },
    schema: createSiteSchema.shape.data.omit({ frameworkId: true }),
    extraValidations: {
      name: Form.createExtraValidation.siteName(client),
    },
    onSubmit: async (values) => {
      try {
        let gitIntegrationId;

        if (mode !== 'self') {
          if (!gitProviderId) {
            // eslint-disable-next-line fleek-custom/no-default-error
            throw new Error('Failed to find git provider installation');
          }

          if (!gitUser?.installationId) {
            // eslint-disable-next-line fleek-custom/no-default-error
            throw new Error('Failed to find installation id');
          }

          const gitIntegrationResult = await client.query<GitIntegrationQuery, GitIntegrationQueryVariables>(GitIntegrationDocument, {
            where: { gitProviderId },
          });

          gitIntegrationId = gitIntegrationResult.data?.gitIntegration.id;

          if (!gitIntegrationId) {
            // eslint-disable-next-line fleek-custom/no-default-error
            throw new Error('Failed to find git integration id');
          }
        }

        const createResult = await createSite({
          data: {
            name: values.name,
            buildCommand: values.buildCommand,
            distDirectory: values.distDirectory,
            baseDirectory: values.baseDirectory,

            // git source
            sourceProvider: sourceProvider,
            sourceRepositoryId: gitRepository?.id,
            sourceRepositoryName: gitRepository?.name,
            sourceRepositoryOwner: gitRepository?.owner,
            sourceBranch: gitBranch ?? gitRepository?.defaultBranch,
            githubInstallationId: mode === 'self' ? undefined : parseInt(gitUser?.installationId as string),
            dockerImage: values?.dockerImage,

            frameworkId: values.frameworkId ?? undefined,
            templateId: values.templateId,
            gitIntegrationId,
          },
        });

        if (createResult.error || !createResult.data?.createSite.id) {
          throw createResult.error || new Error('Unable to create site');
        }

        const secretGroupId = createResult.data.createSite.secretGroup?.id;

        // create secrets if present
        if (values.secrets.length > 0 && secretGroupId) {
          const createSecretPromises = (values.secrets as SiteNewSecret[]).map(async (newSecret: SiteNewSecret) =>
            createSecret({
              data: {
                groupId: secretGroupId,
                key: newSecret.key,
                value: newSecret.value,
                visibility: newSecret.encrypted ? SecretVisibility.ENCRYPTED : SecretVisibility.PUBLIC,
              },
            })
          );

          await Promise.all(createSecretPromises).catch((error) => {
            // should not stop the process if create a secret fails
            Log.error('Failed to create secret', error);
          });
        }

        await triggerDeployment({ where: { siteId: createResult.data.createSite.id } }).catch((error) => {
          // should not stop the process if trigger deployment fails
          Log.error('Failed to trigger deployment', error);
        });

        await router.push(routes.project.site.overview({ projectId: session.project.id, siteId: createResult.data.createSite.id }));
      } catch (error) {
        toast.error({ error, log: 'Create site failed' });
      }
    },
  });

  const mode = useMemo(() => {
    if (router.query.templateId) {
      delete router.query.mode;

      return 'template';
    }

    if (router.query.mode !== 'self') {
      return 'managed';
    }

    return 'self';
  }, [router.query]);

  return (
    <Stepper.Root>
      <DeploySite.Revamp.Provider
        value={{
          mode,
          title,
          setTitle,
          handleBackClick,
          setHandleBackClick,
          sourceProvider,
          setSourceProvider,
          gitUser,
          setGitUser,
          gitBranch,
          setGitBranch,
          gitRepository,
          setGitRepository,
          gitProviderId,
          setGitProviderId,

          templateId: router.query.templateId,
        }}
      >
        <Form.Provider value={createSiteForm}>
          <DeploySite.Grid.Wrapper>
            <DeploySite.Revamp.ProjectChangeGuard />

            <DeploySite.Grid.Aside>
              <DeploySite.Revamp.BackButton />
              <DeploySite.Revamp.AsideContent />
            </DeploySite.Grid.Aside>

            <DeploySite.Grid.Content>
              <Stepper.Container>
                <Stepper.Step>
                  <DeploySite.Revamp.Steps.GitProvider />
                </Stepper.Step>

                {mode === 'managed' && (
                  <Stepper.Step>
                    <DeploySite.Revamp.Steps.Repository />
                  </Stepper.Step>
                )}

                {mode === 'template' && (
                  <Stepper.Step>
                    <DeploySite.Revamp.Steps.CreateRepositoryFromTemplate />
                  </Stepper.Step>
                )}

                {mode !== 'template' && (
                  <Stepper.Step>
                    <DeploySite.Revamp.Steps.Configure />
                  </Stepper.Step>
                )}
              </Stepper.Container>
            </DeploySite.Grid.Content>
          </DeploySite.Grid.Wrapper>
        </Form.Provider>
      </DeploySite.Revamp.Provider>
    </Stepper.Root>
  );
};

/*
 * @deprecated Should use BE enabled git integration
 */
const LegacyNewSite = () => {
  const [title, setTitle] = useState<string>();

  const [sourceProvider, setSourceProvider] = useState<SiteSourceProvider>();
  const [gitUser, setGitUser] = useState<GitProvider.User>();
  const [gitProviderId, setGitProviderId] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();
  const [gitRepository, setGitRepository] = useState<GitProvider.Repository>();
  const [gitBranch, setGitBranch] = useState<string>();
  const [handleBackClick, setHandleBackClick] = useState<MouseEventHandler<HTMLButtonElement>>();

  const [, createSite] = useCreateSiteMutation();
  const [, triggerDeployment] = useTriggerDeploymentMutation();
  const [, createSecret] = useCreateSecretMutation();
  const toast = useToast();

  const router = useRouter();
  const session = useSessionContext();
  const client = useClient();

  const createSiteForm = Form.useForm({
    options: { partial: true },
    values: {
      name: '',
      buildCommand: '',
      distDirectory: '',
      dockerImage: undefined as unknown as string,
      secrets: [] as SiteNewSecret[],
      baseDirectory: '',
      templateId: router.query.templateId,
      frameworkId: undefined as unknown as string,
    },
    schema: createSiteSchema.shape.data.omit({ frameworkId: true }),
    extraValidations: {
      name: Form.createExtraValidation.siteName(client),
    },
    onSubmit: async (values) => {
      try {
        let gitIntegrationId;

        if (mode !== 'self') {
          if (!gitProviderId) {
            // eslint-disable-next-line fleek-custom/no-default-error
            throw new Error('Failed to find git provider installation');
          }

          const gitIntegrationResult = await client.query<GitIntegrationQuery, GitIntegrationQueryVariables>(GitIntegrationDocument, {
            where: { gitProviderId },
          });

          gitIntegrationId = gitIntegrationResult.data?.gitIntegration.id;

          if (!gitIntegrationId) {
            // eslint-disable-next-line fleek-custom/no-default-error
            throw new Error('Failed to find git integration id');
          }
        }

        const createResult = await createSite({
          data: {
            name: values.name,
            buildCommand: values.buildCommand,
            distDirectory: values.distDirectory,
            baseDirectory: values.baseDirectory,

            // git source
            sourceProvider: getAPISourceProvider(sourceProvider),
            sourceRepositoryId: gitRepository?.id.toString(),
            sourceRepositoryName: gitRepository?.name,
            sourceRepositoryOwner: gitUser?.slug,
            sourceBranch: gitBranch ?? gitRepository?.defaultBranch,
            githubInstallationId: gitRepository?.installationId,
            dockerImage: values?.dockerImage,

            frameworkId: values.frameworkId ?? undefined,
            templateId: values.templateId,
            gitIntegrationId,
          },
        });

        if (createResult.error || !createResult.data?.createSite.id) {
          throw createResult.error || new Error('Unable to create site');
        }

        const secretGroupId = createResult.data.createSite.secretGroup?.id;

        // create secrets if present
        if (values.secrets.length > 0 && secretGroupId) {
          const createSecretPromises = (values.secrets as SiteNewSecret[]).map(async (newSecret: SiteNewSecret) =>
            createSecret({
              data: {
                groupId: secretGroupId,
                key: newSecret.key,
                value: newSecret.value,
                visibility: newSecret.encrypted ? SecretVisibility.ENCRYPTED : SecretVisibility.PUBLIC,
              },
            })
          );

          await Promise.all(createSecretPromises).catch((error) => {
            // should not stop the process if create a secret fails
            Log.error('Failed to create secret', error);
          });
        }

        await triggerDeployment({ where: { siteId: createResult.data.createSite.id } }).catch((error) => {
          // should not stop the process if trigger deployment fails
          Log.error('Failed to trigger deployment', error);
        });

        await router.push(routes.project.site.overview({ projectId: session.project.id, siteId: createResult.data.createSite.id }));
      } catch (error) {
        toast.error({ error, log: 'Create site failed' });
      }
    },
  });

  const mode = useMemo(() => {
    if (router.query.templateId) {
      delete router.query.mode;

      return 'template';
    }

    if (router.query.mode !== 'self') {
      return 'managed';
    }

    return 'self';
  }, [router.query]);

  return (
    <DeploySite.Provider
      value={{
        mode,
        title,
        setTitle,
        handleBackClick,
        setHandleBackClick,

        sourceProvider,
        setSourceProvider,
        gitUser,
        setGitUser,
        gitRepository,
        setGitRepository,
        gitBranch,
        setGitBranch,
        gitProviderId,
        setGitProviderId,
        accessToken,
        setAccessToken,

        templateId: router.query.templateId,
      }}
    >
      <Form.Provider value={createSiteForm}>
        <DeploySite.BackButton />
        <DeploySite.Grid.Wrapper>
          <Stepper.Root>
            <DeploySite.ProjectChangeGuard />

            <DeploySite.Grid.Aside>
              <DeploySite.AsideContent />
            </DeploySite.Grid.Aside>

            <DeploySite.Grid.Content>
              <Stepper.Container>
                <Stepper.Step>
                  <DeploySite.Steps.GitProvider />
                </Stepper.Step>

                {mode === 'managed' && (
                  <Stepper.Step>
                    <DeploySite.Steps.Repository />
                  </Stepper.Step>
                )}

                {mode === 'template' && (
                  <Stepper.Step>
                    <DeploySite.Steps.CreateRepositoryFromTemplate />
                  </Stepper.Step>
                )}

                {mode !== 'template' && (
                  <Stepper.Step>
                    <DeploySite.Steps.Configure />
                  </Stepper.Step>
                )}
              </Stepper.Container>
            </DeploySite.Grid.Content>
          </Stepper.Root>
        </DeploySite.Grid.Wrapper>
      </Form.Provider>
    </DeploySite.Provider>
  );
};

NewSitePage.getLayout = (page) => <DeploySite.Layout>{page}</DeploySite.Layout>;

export default withAccess({ Component: NewSitePage, requiredPermissions: [constants.PERMISSION.SITE.CREATE] });
