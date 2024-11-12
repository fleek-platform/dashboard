import { siteName } from '@fleek-platform/utils-validation';
import { useEffect, useMemo, useState } from 'react';
import { useClient } from 'urql';
import * as zod from 'zod';

import { Form, SettingsBox } from '@/components';
import {
  CreateGithubAppInstallationUrlDocument,
  CreateGithubAppInstallationUrlMutation,
  CreateGithubAppInstallationUrlMutationVariables,
  useCountSitesWithSourceProviderQuery,
  useCreateRepositoryFromTemplateMutation,
  useGitIntegrationQuery,
  useTemplateDeployQuery,
} from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useGitProvider } from '@/hooks/useGitProvider';
import { useGitUserAndOrganizations } from '@/hooks/useGitUserAndOrganizations';
import { useRouter } from '@/hooks/useRouter';
import { useTemplateGitData } from '@/hooks/useTemplateGitData';
import { useToast } from '@/hooks/useToast';
import { GitProvider } from '@/integrations/git';
import { LoadingProps } from '@/types/Props';
import { Avatar, Box, Checkbox, Combobox, FormField, Icon, Stepper, Text } from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';

import { sourceProviderIcon } from '../../DeploySite.constants';
import { useDeploySiteContext, useStepSetup } from '../../DeploySite.context';
import { CreateRepositoryFromTemplateStyles as S } from './CreateRepositoryFromTemplate.styles';

export const CreateTemplateFromRepositoryStep: React.FC = () => {
  const featureFlags = useFeatureFlags();
  const { gitProviderId, sourceProvider, gitUser, setGitRepository, gitRepository, templateId, setSourceProvider, accessToken } =
    useDeploySiteContext();
  const [templateDeployQuery] = useTemplateDeployQuery({ variables: { where: { id: templateId! } }, requestPolicy: 'network-only' });
  const [, createRepositoryFromTemplate] = useCreateRepositoryFromTemplateMutation();
  const [gitIntegrationQuery] = useGitIntegrationQuery({ variables: { where: { gitProviderId: gitProviderId! } }, pause: !gitProviderId });
  const createSiteForm = Form.useContext();
  const toast = useToast();
  const router = useRouter();
  const stepper = Stepper.useContext();
  const client = useClient();

  const provider = sourceProvider as GitProvider.Name;

  const template = templateDeployQuery.data?.template;

  const templateGit = useTemplateGitData(template);

  const git = useGitProvider({ provider, accessToken });

  const [isLoading, setIsLoading] = useState(templateDeployQuery.fetching);

  useStepSetup({
    title: 'Create Git Repository and deploy the template!',
    handleBackClick: () => {
      setSourceProvider(undefined);
      stepper.prevStep();
    },
  });

  const form = Form.useForm({
    values: {
      repositoryName: '',
      privateRepo: true,
    },
    schema: zod.object({ repositoryName: siteName }),
    extraValidations: {
      repositoryName: Form.createExtraValidation.siteName(client, git),
    },
    onSubmit: async (values) => {
      try {
        if (!git || !gitUser || !templateGit.slug || !templateGit.repository) {
          toast.error({ message: 'It is not possible to use this template. Please contact the support.' });

          return;
        }

        setIsLoading(true);

        if (featureFlags.enableBackendGitIntegration) {
          const gitIntegrationId = gitIntegrationQuery.data?.gitIntegration.id;
          const installationId = await git.getInstallationId({ slug: gitUser.slug });

          if (!gitIntegrationId || !installationId) {
            toast.error({ message: 'Failed to find git provider installation' });
          }

          const createResponse = await createRepositoryFromTemplate({
            where: { gitIntegrationId: gitIntegrationId! },
            data: {
              templateOwner: templateGit.slug,
              templateRepo: templateGit.repository,
              repoOwner: gitUser.slug,
              isPrivate: values.privateRepo,
              repoName: values.repositoryName,
            },
          });

          if (!createResponse.data || createResponse.error) {
            throw createResponse.error || new Error('Failed to create repository from template');
          }

          const repository = createResponse.data.createGithubRepoFromTemplate;

          setGitRepository({
            id: repository.repositoryId,
            installationId,
            name: repository.name,
            defaultBranch: repository.defaultBranch,
          });
        } else {
          const repository = await git.createRepositoryFromTemplate({
            templateOwner: templateGit.slug,
            templateRepository: templateGit.repository,
            slug: gitUser.slug,
            repositoryName: values.repositoryName,
            privateRepo: values.privateRepo,
            initialCommitMessage: `initiated deployment of ${templateGit.slug}/${templateGit.repository}`,
          });

          setGitRepository(repository);
        }
      } catch (error) {
        toast.error({ error, log: 'Failed to create repository' });
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (templateGit.repository) {
      form.fields.repositoryName.setValue(templateGit.repository, true);
      form.fields.repositoryName.setValue(templateGit.repository, true);
    }

    // null is not allowed as value
    createSiteForm.fields.buildCommand.setValue(templateGit.buildCommand ?? undefined, true);
    createSiteForm.fields.distDirectory.setValue(templateGit.distDirectory ?? undefined, true);
    createSiteForm.fields.dockerImage.setValue(templateGit.dockerImage ?? undefined, true);
    createSiteForm.fields.baseDirectory.setValue(templateGit.baseDirectory ?? undefined, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateGit]);

  useEffect(() => {
    setIsLoading(templateDeployQuery.fetching);
  }, [templateDeployQuery]);

  useEffect(() => {
    // handle error on queries
    const error = templateDeployQuery.error;

    if (error) {
      toast.error({ error, log: 'Failed to load template data' });
      setIsLoading(false);

      // returns to repository selection
      const { templateId: _, ...query } = router.query;
      router.replace({ query });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateDeployQuery.error]);

  useEffect(() => {
    // set the repository name from the create site form
    createSiteForm.fields.name.setValue(form.values.repositoryName, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.repositoryName]);

  useEffect(() => {
    // submit the form when the repository is created
    if (gitRepository && !createSiteForm.isSubmitting) {
      createSiteForm.submit().finally(() => setIsLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitRepository]);

  useEffect(() => {
    // set the framework from the template
    createSiteForm.fields.frameworkId.setValue(template?.framework?.id, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template?.framework?.id]);

  const showSkeleton = useMemo(() => {
    return isLoading && !form.isSubmitting;
  }, [form.isSubmitting, isLoading]);

  return (
    <S.Container>
      <Text>Create Repository For Template</Text>

      <TitleRow
        isLoading={templateDeployQuery.fetching as true}
        name={template?.name}
        slug={templateGit?.slug}
        repository={templateGit?.repository}
        image={template?.framework?.avatar}
      />

      <Form.Provider value={form}>
        <AccountField />
        <Form.InputField
          name="repositoryName"
          label="Repository Name"
          placeholder="Your repository name"
          autoFocus
          isLoading={showSkeleton}
        />
        <PrivateRepositoryField />
        {showSkeleton ? <SettingsBox.Skeleton /> : <S.SubmitButton>Create and deploy template</S.SubmitButton>}
      </Form.Provider>
    </S.Container>
  );
};

const AccountField: React.FC = () => {
  const router = useRouter();
  const toast = useToast();
  const client = useClient();
  const { sourceProvider, gitUser, setGitUser, gitProviderId, accessToken } = useDeploySiteContext();

  const gitUsersAndOrganizations = useGitUserAndOrganizations({
    provider: sourceProvider as GitProvider.Name,
    accessToken: accessToken as string,
  });
  const [countSitesWithSourceProviderQuery] = useCountSitesWithSourceProviderQuery();

  const shouldDisableAddOrganization =
    countSitesWithSourceProviderQuery.fetching || (countSitesWithSourceProviderQuery.data?.sites?.totalCount ?? 0) > 1;
  const users = useMemo(() => {
    const { data } = gitUsersAndOrganizations;

    if (!data) {
      return [];
    }

    if (!gitUser) {
      setGitUser(data.user);
    }

    return [data.user, ...data.organizations.filter((organization) => organization.isOrganization)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitUsersAndOrganizations.data]);

  const handleUserChange = (user?: GitProvider.User) => {
    setGitUser(user);
  };

  const handleAddGHAccount = async () => {
    const projectId = router.query.projectId!;

    if (!projectId || !gitProviderId) {
      toast.error({ message: 'Unexpected error when generating url, please try again' });

      return null;
    }

    try {
      const createInstallationUrlResult = await client.mutation<
        CreateGithubAppInstallationUrlMutation,
        CreateGithubAppInstallationUrlMutationVariables
      >(CreateGithubAppInstallationUrlDocument, { where: { projectId, gitProviderId } });

      if (createInstallationUrlResult.error || !createInstallationUrlResult.data?.createGithubAppInstallationUrl) {
        throw createInstallationUrlResult.error || new Error('Failed to create GithubApp Installation Url');
      }

      openPopUpWindow({
        url: createInstallationUrlResult.data.createGithubAppInstallationUrl,
        onClose: () => gitUsersAndOrganizations.refetch(),
      });
    } catch (error) {
      toast.error({ error, log: 'Failed to create GithubApp Installation Url' });
    }
  };

  return (
    <FormField.Root>
      <FormField.Label>Account</FormField.Label>
      <Combobox
        items={users}
        selected={[gitUser, handleUserChange]}
        queryKey="slug"
        isLoading={gitUsersAndOrganizations.isFetching}
        extraItems={[
          {
            label: 'Add GitHub Organization',
            onClick: handleAddGHAccount,
            iconName: 'add-circle',
            disabled: shouldDisableAddOrganization,
            tooltip: shouldDisableAddOrganization
              ? {
                  content: 'You already have sites that depend on the current GitHub installation.',
                  side: 'left',
                }
              : undefined,
          },
        ]}
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder={<>{<Icon name={sourceProviderIcon[sourceProvider!]} />} Select</>}>{UserItem}</Field>

            <Options>{UserItem}</Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const UserItem: React.FC<GitProvider.User> = ({ slug, avatar }) => (
  <>
    <Avatar src={avatar} />
    {slug}
  </>
);

const PrivateRepositoryField: React.FC = () => {
  const form = Form.useContext();

  const field = form.fields.privateRepo;

  return (
    <S.CheckboxWrapper onClick={() => field.setValue(!field.value, true)}>
      <Checkbox checked={field.value} disabled={form.isSubmitting} /> Create private Git repository
    </S.CheckboxWrapper>
  );
};

type TitleRowProps = LoadingProps<{
  image: string;
  name: string;
  slug: string;
  repository: string;
}>;

const TitleRow: React.FC<TitleRowProps> = ({ isLoading, image, name, slug, repository }) => {
  if (isLoading) {
    return (
      <S.TemplateHeader.TitleRow>
        <S.TemplateHeader.Skeleton variant="avatar" />
        <Box>
          <S.TemplateHeader.Skeleton variant="title" />
          <S.TemplateHeader.Skeleton variant="text" />
        </Box>
      </S.TemplateHeader.TitleRow>
    );
  }

  return (
    <S.TemplateHeader.TitleRow>
      <S.TemplateHeader.Avatar src={image} enableIcon icon="gear" />
      <Box>
        <Text as="h3">{name}</Text>
        <Text size="xs">
          {slug}/{repository}
        </Text>
      </Box>
    </S.TemplateHeader.TitleRow>
  );
};
