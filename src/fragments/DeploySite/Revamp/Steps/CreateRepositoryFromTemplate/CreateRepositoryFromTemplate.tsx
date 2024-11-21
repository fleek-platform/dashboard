import { siteName } from '@fleek-platform/utils-validation';
import { useEffect, useMemo, useState } from 'react';
import { useClient } from 'urql';
import * as zod from 'zod';

import { Form, SettingsBox } from '@/components';
import {
  useCountSitesWithSourceProviderQuery,
  useCreateRepositoryFromTemplateMutation,
  useGitInstallationsQuery,
  useGitIntegrationQuery,
  useTemplateDeployQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useTemplateGitData } from '@/hooks/useTemplateGitData';
import { useToast } from '@/hooks/useToast';
import type { LoadingProps } from '@/types/Props';
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

import { sourceProviderIcon } from '../../DeploySite.constants';
import {
  type GitUser,
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

  const [templateDeployQuery] = useTemplateDeployQuery({
    variables: { where: { id: templateId! } },
    requestPolicy: 'network-only',
  });
  const [, createRepositoryFromTemplate] =
    useCreateRepositoryFromTemplateMutation();

  const [gitIntegrationQuery] = useGitIntegrationQuery({
    variables: { where: { gitProviderId: gitProviderId! } },
    pause: !gitProviderId,
  });

  const createSiteForm = Form.useContext();
  const toast = useToast();
  const router = useRouter();
  const stepper = Stepper.useContext();
  const client = useClient();

  const template = templateDeployQuery.data?.template;

  const templateGit = useTemplateGitData(template);

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
      repositoryName: Form.createExtraValidation.siteName(client),
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

        const gitIntegrationId = gitIntegrationQuery.data?.gitIntegration.id;

        if (!gitIntegrationId || !gitUser.installationId) {
          toast.error({ message: 'Failed to find git provider installation' });
        }

        const createResponse = await createRepositoryFromTemplate({
          where: { gitIntegrationId: gitIntegrationId! },
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
    if (templateGit.repository) {
      form.fields.repositoryName.setValue(templateGit.repository, true);
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
      <Text
        as="h2"
        variant="primary"
        size="xl"
        weight={700}
        className="self-start"
      >
        Create Repository For Template
      </Text>

      <TitleRow
        isLoading={templateDeployQuery.fetching as true}
        templateName={template?.name}
        gitUserName={templateGit?.slug}
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
        {showSkeleton ? (
          <SettingsBox.Skeleton />
        ) : (
          <S.SubmitButton>Create and deploy template</S.SubmitButton>
        )}
      </Form.Provider>
    </S.Container>
  );
};

const AccountField: React.FC = () => {
  const { sourceProvider, gitUser, setGitUser, gitProviderId } =
    useDeploySiteContext();

  const [countSitesWithSourceProviderQuery] =
    useCountSitesWithSourceProviderQuery();
  const [gitInstallationsQuery] = useGitInstallationsQuery({
    variables: { where: { gitProviderId: gitProviderId! } },
    pause: !gitProviderId,
  });

  const shouldDisableAddOrganization =
    countSitesWithSourceProviderQuery.fetching ||
    (countSitesWithSourceProviderQuery.data?.sites?.totalCount ?? 0) > 1;

  const users = useMemo(() => {
    const data = gitInstallationsQuery.data?.gitApiInstallations;

    if (!data) {
      return [];
    }

    if (!gitUser && data.length > 0) {
      const { name, installationId, avatar } = data[0];

      setGitUser({
        name,
        installationId: installationId.toString(),
        avatar,
      });
    }

    return data.map(
      ({ name, installationId, avatar }) =>
        ({
          name,
          installationId: installationId.toString(),
          avatar,
        }) as GitUser,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitInstallationsQuery.data]);

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleUserChange = (user?: GitUser) => {
    setGitUser(user);
  };

  const handleAddGHAccount = async () => {
    // TODO: handle add acount
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
            disabled: shouldDisableAddOrganization,
            tooltip: shouldDisableAddOrganization
              ? {
                  content:
                    'You already have sites that depend on the current GitHub installation.',
                  side: 'left',
                }
              : undefined,
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
    <S.CheckboxWrapper onClick={() => field.setValue(!field.value, true)}>
      <Checkbox checked={field.value} disabled={form.isSubmitting} /> Create
      private Git repository
    </S.CheckboxWrapper>
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
        <Text as="h3">{templateName}</Text>
        <S.TemplateHeader.OwnerText>
          {gitUserName}/{repository}
        </S.TemplateHeader.OwnerText>
      </Box>
    </S.TemplateHeader.TitleRow>
  );
};
