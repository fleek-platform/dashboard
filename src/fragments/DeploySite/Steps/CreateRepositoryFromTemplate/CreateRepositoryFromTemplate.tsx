import { siteName } from '@fleek-platform/utils-validation';
import { useEffect, useMemo, useState } from 'react';
import { useClient } from 'urql';
import * as zod from 'zod';

import { Form, SettingsBox } from '@/components';
import {
  useCreateRepositoryFromTemplateMutation,
  useGitInstallationsQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useTemplateGitData } from '@/hooks/useTemplateGitData';
import { useTemplates } from '@/hooks/useTemplates';
import { useToast } from '@/hooks/useToast';
import { LoadingProps } from '@/types/Props';
import {
  Avatar,
  Box,
  Checkbox,
  Combobox,
  FormField,
  Icon,
  Stepper,
  Text,
} from '@/ui';
import { openPopUpWindow } from '@/utils/openPopUpWindow';
import { FLEEK_TEMPLATES_URLS } from '@/utils/template';
import { joinUrl } from '@/utils/url';

import { sourceProviderIcon } from '../../DeploySite.constants';
import {
  GitUser,
  useDeploySiteContext,
  useStepSetup,
} from '../../DeploySite.context';
import { CreateRepositoryFromTemplateStyles as S } from './CreateRepositoryFromTemplate.styles';

export const CreateTemplateFromRepositoryStep: React.FC = () => {
  const {
    gitProviderId,
    gitUser,
    gitRepository,
    templateId,
    setSourceProvider,
    setGitRepository,
  } = useDeploySiteContext();

  // this will take template(s) from website Json
  const templatesQuery = useTemplates();

  const [, createRepositoryFromTemplate] =
    useCreateRepositoryFromTemplateMutation();

  const createSiteForm = Form.useContext();
  const toast = useToast();
  const router = useRouter();
  const stepper = Stepper.useContext();
  const client = useClient();

  // in future use separate endpoint for single template /api/templates/[id].json.ts
  const template = useMemo(() => {
    return templatesQuery.data?.find((template) => template.id === templateId);
  }, [templatesQuery.data, templateId]);

  const templateGit = useTemplateGitData(template);

  const [isLoading, setIsLoading] = useState(templatesQuery.isLoading);

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
      repositoryName:
        gitProviderId && gitUser?.name
          ? Form.createExtraValidation.repositoryName(
              client,
              gitProviderId,
              gitUser.name,
            )
          : undefined,
    },
    onSubmit: async (values) => {
      try {
        if (!gitUser || !templateGit.slug || !templateGit.repository) {
          toast.error({
            message:
              'It is not possible to use this template. Please contact the support.',
          });

          return;
        }

        setIsLoading(true);

        if (!gitUser.gitIntegrationId || !gitUser.installationId) {
          toast.error({ message: 'Failed to find git provider installation' });
        }

        const createResponse = await createRepositoryFromTemplate({
          where: { gitIntegrationId: gitUser.gitIntegrationId },
          data: {
            templateOwner: templateGit.slug,
            templateRepo: templateGit.repository,
            repoOwner: gitUser.name,
            isPrivate: values.privateRepo,
            repoName: values.repositoryName,
          },
        });

        if (!createResponse.data || createResponse.error) {
          throw (
            createResponse.error ||
            new Error('Failed to create repository from template')
          );
        }

        const repository = createResponse.data.createGithubRepoFromTemplate;
        setGitRepository({
          id: repository.repositoryId.toString(),
          gitProviderId: gitProviderId as string,
          defaultBranch: repository.defaultBranch,
          name: repository.name,
          owner: gitUser.name,
        });
      } catch (error) {
        toast.error({ error, log: 'Failed to create repository' });
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (gitProviderId && gitUser?.name) {
      form.validate();
    }
  }, [form, gitProviderId, gitUser?.name]);

  useEffect(() => {
    if (templateGit.repository) {
      form.fields.repositoryName.setValue(templateGit.repository, true);
    }

    // null is not allowed as value
    createSiteForm.fields.buildCommand.setValue(
      templateGit.buildCommand ?? undefined,
      true,
    );
    createSiteForm.fields.distDirectory.setValue(
      templateGit.distDirectory ?? undefined,
      true,
    );
    createSiteForm.fields.dockerImage.setValue(
      templateGit.dockerImage ?? undefined,
      true,
    );
    createSiteForm.fields.baseDirectory.setValue(
      templateGit.baseDirectory ?? undefined,
      true,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateGit]);

  useEffect(() => {
    setIsLoading(templatesQuery.isLoading);
  }, [templatesQuery.isLoading]);

  useEffect(() => {
    // handle error on queries
    const isError = templatesQuery.isError;
    let error = templatesQuery.error;

    // handle templates.find() 404
    const noData = !templatesQuery.isLoading && !template;

    if (!isError && noData) {
      error = {
        graphQLErrors: [
          {
            message: 'Template not found.',
          },
        ],
      };
    }

    if (isError || noData) {
      toast.error({ error, log: 'Failed to load template data' });

      setIsLoading(false);

      // returns to repository selection
      const { templateId: _, ...query } = router.query;
      router.replace({ query });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    templatesQuery.isError,
    templatesQuery.error,
    templatesQuery.isLoading,
    template,
  ]);

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

  const showSkeleton = useMemo(() => {
    return isLoading && !form.isSubmitting;
  }, [form.isSubmitting, isLoading]);

  const frameworkAvatar = joinUrl(
    FLEEK_TEMPLATES_URLS.websiteBaseUrl,
    template?.framework?.avatar,
    true,
  );

  return (
    <Box variant="container">
      <Text
        as="h2"
        variant="primary"
        size="xl"
        weight={700}
        className="self-start"
      >
        Create repository for template
      </Text>

      <TitleRow
        isLoading={templatesQuery.isLoading as true}
        templateName={template?.name}
        gitUserName={templateGit?.slug}
        repository={templateGit?.repository}
        image={frameworkAvatar}
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
        {showSkeleton ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <Box className="child:w-full">
            <Form.SubmitButton>Create and deploy template</Form.SubmitButton>
          </Box>
        )}
      </Form.Provider>
    </Box>
  );
};

const AccountField: React.FC = () => {
  const toast = useToast();
  const {
    sourceProvider,
    gitUser,
    setGitUser,
    gitProviderId,
    providerState,
    refetchGitProviderRequirements,
  } = useDeploySiteContext();

  const [gitInstallationsQuery, refetchGitInstallationsQuery] =
    useGitInstallationsQuery({
      variables: { where: { gitProviderId: gitProviderId! } },
      pause: !gitProviderId,
    });

  const users = useMemo(() => {
    const data = gitInstallationsQuery.data?.gitApiInstallations;

    if (!data) {
      return [];
    }

    if (!gitUser && data.length > 0) {
      const { name, installationId, gitIntegrationId, avatar } = data[0];

      setGitUser({
        name,
        gitIntegrationId,
        installationId: installationId.toString(),
        avatar,
      });
    }

    return data.map(
      ({ name, installationId, gitIntegrationId, avatar }) =>
        ({
          name,
          installationId: installationId.toString(),
          gitIntegrationId,
          avatar,
        }) as GitUser,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitInstallationsQuery.data]);

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleUserChange = (user?: GitUser) => {
    setGitUser(user);
  };

  const handleRefetch = () => {
    refetchGitInstallationsQuery({ requestPolicy: 'network-only' });

    if (refetchGitProviderRequirements) {
      refetchGitProviderRequirements();
    }
  };

  const handleAddGHAccount = async () => {
    if (!providerState?.requirements?.installationUrl) {
      toast.error({
        message:
          'Unexpected error finding installation url, please contact support',
      });

      return;
    }

    openPopUpWindow({
      width: 1200, // special case where it opens github settings page
      url: providerState.requirements.installationUrl,
      onClose: handleRefetch,
    });
  };

  return (
    <FormField.Root>
      <FormField.Label>Account</FormField.Label>
      <Combobox
        items={users}
        selected={[gitUser, handleUserChange]}
        queryKey="name"
        isLoading={gitInstallationsQuery.fetching}
        extraItems={[
          {
            label: 'Add GitHub Organization',
            onClick: handleAddGHAccount,
            iconName: 'add-circle',
          },
        ]}
      >
        {({ Field, Options }) => (
          <>
            <Field
              placeholder={
                <>
                  {<Icon name={sourceProviderIcon[sourceProvider!]} />} Select
                </>
              }
            >
              {UserItem}
            </Field>

            <Options>{UserItem}</Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const UserItem: React.FC<GitUser> = ({ name, avatar }) => (
  <>
    <Avatar src={avatar} />
    {name}
  </>
);

const PrivateRepositoryField: React.FC = () => {
  const form = Form.useContext();

  const field = form.fields.privateRepo;

  return (
    <Box
      className="flex-row items-center gap-3 cursor-pointer"
      onClick={() => field.setValue(!field.value, true)}
    >
      <Checkbox checked={field.value} disabled={form.isSubmitting} /> Create
      private Git repository
    </Box>
  );
};

type TitleRowProps = LoadingProps<{
  image: string;
  templateName: string;
  gitUserName: string;
  repository: string;
}>;

const TitleRow: React.FC<TitleRowProps> = ({
  isLoading,
  image,
  templateName,
  gitUserName,
  repository,
}) => {
  if (isLoading) {
    return (
      <Box className="flex-row gap-4 items-center">
        <S.TemplateHeader.Skeleton variant="avatar" />
        <Box>
          <S.TemplateHeader.Skeleton variant="title" />
          <S.TemplateHeader.Skeleton variant="text" />
        </Box>
      </Box>
    );
  }

  return (
    <Box className="flex-row gap-4 items-center">
      <Avatar src={image} enableIcon icon="gear" className="text-2xl" />
      <Box>
        <Text size="md" variant="primary" as="h3">
          {templateName}
        </Text>
        <Text>
          {gitUserName}/{repository}
        </Text>
      </Box>
    </Box>
  );
};
