import { SiteBuildSettings, SiteBuildSettingsData } from '@fleek-platform/utils-sites';
import { useCallback, useEffect, useMemo } from 'react';

import { Form } from '@/components';
import { useGitRepositoryBranches } from '@/hooks/useGitRepositoryBranches';
import { useGitRepositoryBuildSettings } from '@/hooks/useGitRepositoryBuildSettings';
import { useRouter } from '@/hooks/useRouter';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { GitProvider } from '@/integrations/git';
import { LoadingProps } from '@/types/Props';
import { SiteFramework } from '@/types/Site';
import { Avatar, Combobox, FormField, Stepper, Text } from '@/ui';

import { useDeploySiteContext, useStepSetup } from '../../DeploySite.context';
import { DeploySiteStepsStyles as S } from '../Steps.styles';
import { Advanced } from './Advanced';
import { ConfigureStepStyles as CS } from './Configure.styles';

export const ConfigureStep: React.FC = () => {
  const { sourceProvider, gitBranch, gitRepository, gitUser, mode, accessToken } = useDeploySiteContext();
  const stepper = Stepper.useContext();
  const router = useRouter();
  const form = Form.useContext();

  useStepSetup({
    title: 'Configure last details and get your site on Fleek!',
    handleBackClick: async () => {
      if (mode === 'self') {
        const { mode: _, ...query } = router.query;
        await router.replace({ query });
      }

      form.fields.baseDirectory.setValue('', true);

      stepper.prevStep();
    },
  });

  const gitRepositoryBuildSettings = useGitRepositoryBuildSettings({
    provider: sourceProvider as GitProvider.Name,
    repository: gitRepository?.name,
    slug: gitUser?.slug,
    ref: gitBranch,
    baseDirectory: mode === 'managed' ? form.fields.baseDirectory.value : undefined,
    accessToken: accessToken as string,
  });

  const setBuildSettings = useCallback(
    (settings: SiteBuildSettingsData) => {
      form.fields.buildCommand.setValue(settings.buildCommand, true);
      form.fields.distDirectory.setValue(settings.publishDirectory, true);

      if (mode !== 'self') {
        form.fields.dockerImage.setValue(settings.dockerImage, true);
      }
    },
    [mode, form]
  );

  useEffect(() => {
    const data = gitRepositoryBuildSettings.data;

    if (data) {
      form.fields.frameworkId.setValue(data.frameworkId);
      setBuildSettings(data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gitRepositoryBuildSettings.data, setBuildSettings]);

  useEffect(() => {
    if (gitRepository) {
      form.fields.name.setValue(gitRepository.name, true);
    }
  }, [gitRepository, form]);

  return (
    <S.Container>
      <Text as="h2" variant="primary" size="xl" weight={700} className="self-start">
        Configure Site
      </Text>

      <CS.Form.Wrapper>
        <CS.Form.Row>
          <Form.InputField name="name" label="Site Name" placeholder="Name" />
          <FrameworkField setBuildSettings={setBuildSettings} isLoading={gitRepositoryBuildSettings.isLoading} />
        </CS.Form.Row>

        {mode === 'managed' && <BranchField />}

        <Form.InputField
          name="distDirectory"
          label="Publish Directory"
          placeholder="dist"
          isLoading={gitRepositoryBuildSettings.isLoading}
          disableValidMessage
          disableValidationDebounce
        />

        <Form.InputField
          name="buildCommand"
          label="Build Command"
          placeholder="npm build"
          isLoading={gitRepositoryBuildSettings.isLoading}
          disableValidMessage
          disableValidationDebounce
        />

        {mode === 'self' && (
          <Form.InputField name="baseDirectory" label="Base Directory" placeholder="./" disableValidMessage disableValidationDebounce />
        )}

        {mode !== 'self' && <Advanced />}

        <Form.SubmitButton className="w-full">Deploy site</Form.SubmitButton>
      </CS.Form.Wrapper>
    </S.Container>
  );
};

const FrameworkItem: React.FC<SiteFramework> = ({ name, avatar }) => (
  <>
    {<Avatar src={avatar} enableIcon icon="gear" />}
    {name}
  </>
);

type FrameworkFieldProps = LoadingProps & {
  setBuildSettings: (settings: SiteBuildSettingsData) => void;
};

const FrameworkField: React.FC<FrameworkFieldProps> = ({ isLoading, setBuildSettings }) => {
  const field = Form.useField<string | null>('frameworkId');

  const siteFrameworks = useSiteFrameworks();

  const framework = useMemo(
    () => siteFrameworks.data?.find((framework) => framework.id === field.value),
    [field.value, siteFrameworks.data]
  );

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleSelect = (siteFramework?: SiteFramework) => {
    field.setValue(siteFramework?.id ?? null, true);

    if (siteFramework) {
      setBuildSettings(SiteBuildSettings.parseFramework(siteFramework));
    }
  };

  return (
    <FormField.Root>
      <FormField.Label>Framework</FormField.Label>
      <Combobox items={siteFrameworks.data || []} selected={[framework, handleSelect]} queryKey="name" isLoading={isLoading}>
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select a framework">{FrameworkItem}</Field>

            <Options disableSearch align="end" css={{ width: '$xs' }}>
              {FrameworkItem}
            </Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const BranchField: React.FC = () => {
  const { sourceProvider, gitBranch, gitRepository, gitUser, setGitBranch, accessToken } = useDeploySiteContext();

  const provider = sourceProvider as GitProvider.Name;
  const repository = gitRepository!.name;
  const slug = gitUser!.slug;

  const gitRepositoryBranches = useGitRepositoryBranches({
    provider,
    repository,
    slug,
    accessToken: accessToken as string,
  });

  const branches = gitRepositoryBranches.data || [];

  return (
    <FormField.Root>
      <FormField.Label>Branch</FormField.Label>
      <Combobox items={branches} selected={[gitBranch, setGitBranch]} isLoading={gitRepositoryBranches.isLoading}>
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select a branch">{(selected) => selected}</Field>

            <Options viewportHeight="$3xs">{(item) => item}</Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};
