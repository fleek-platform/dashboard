import {
  SiteBuildSettings,
  SiteBuildSettingsData,
} from '@fleek-platform/sites';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { Form } from '@/components';
import {
  type SiteFramework,
  useGitSiteBuildSettingsQuery,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { LoadingProps } from '@/types/Props';
import { Avatar, Combobox, FormField, Stepper, Text } from '@/ui';

import { useDeploySiteContext, useStepSetup } from '../../DeploySite.context';
import { DeploySiteStepsStyles as S } from '../Steps.styles';
import { Advanced } from './Advanced';
import { BranchField } from './BranchField';
import { ConfigureStepStyles as CS } from './Configure.styles';

export const ConfigureStep: React.FC = () => {
  const { mode, gitProviderId, gitRepository, gitBranch } =
    useDeploySiteContext();
  const stepper = Stepper.useContext();
  const router = useRouter();
  const form = Form.useContext();
  const effect = useRef(false);

  const [gitSiteBuildSettingsQuery] = useGitSiteBuildSettingsQuery({
    variables: {
      where: {
        gitProviderId: gitProviderId as string,
        sourceBranch: gitBranch || (gitRepository?.defaultBranch as string),
        baseDirectory:
          mode === 'managed' ? form.fields.baseDirectory.value : '',
        sourceRepositoryName: gitRepository?.name as string,
        sourceRepositoryOwner: gitRepository?.owner as string,
      },
    },
    pause:
      !gitProviderId ||
      !gitBranch ||
      !gitRepository?.defaultBranch ||
      !mode ||
      !gitRepository.owner ||
      !gitRepository.name,
  });

  useStepSetup({
    title: 'Configure last details and get your site on Fleek!',
    handleBackClick: async () => {
      if (mode === 'self') {
        const { mode: _, ...query } = router.query;
        await router.replace({ query });
      }

      form.fields.baseDirectory.setValue('', true);
      form.fields.buildCommand.setValue('', true);
      form.fields.distDirectory.setValue('', true);
      form.fields.dockerImage.setValue('', true);
      form.fields.frameworkId.setValue('', true);

      stepper.prevStep();
    },
  });

  const setBuildSettings = useCallback(
    (settings: SiteBuildSettingsData) => {
      form.fields.frameworkId.setValue(settings.frameworkId, true);
      form.fields.buildCommand.setValue(settings.buildCommand, true);
      form.fields.distDirectory.setValue(settings.publishDirectory, true);

      if (mode !== 'self') {
        form.fields.dockerImage.setValue(settings.dockerImage, true);
      }
    },
    [mode, form],
  );

  useEffect(() => {
    if (gitRepository) {
      form.fields.name.setValue(gitRepository.name, true);
    }
  }, [gitRepository, form]);

  useEffect(() => {
    if (gitSiteBuildSettingsQuery.data?.siteBuildSettings) {
      setBuildSettings(
        gitSiteBuildSettingsQuery.data
          .siteBuildSettings as SiteBuildSettingsData,
      );
    } else if (gitSiteBuildSettingsQuery.error) {
      console.error(
        'Error fetching site build settings:',
        gitSiteBuildSettingsQuery.error,
      );
    }
  }, [
    gitSiteBuildSettingsQuery.data?.siteBuildSettings,
    gitSiteBuildSettingsQuery.error,
    setBuildSettings,
  ]);

  return (
    <S.Container>
      <Text
        as="h2"
        variant="primary"
        size="xl"
        weight={700}
        className="self-start"
      >
        Configure Site
      </Text>

      <CS.Form.Wrapper>
        <CS.Form.Row>
          <FormField.Root className="flex-1">
            <Form.InputField name="name" label="Site Name" placeholder="Name" />
          </FormField.Root>
          <FrameworkField
            setBuildSettings={setBuildSettings}
            isLoading={effect.current}
          />
        </CS.Form.Row>

        {mode === 'managed' && <BranchField />}

        <Form.InputField
          name="distDirectory"
          label="Publish Directory"
          placeholder="dist"
          isLoading={effect.current}
          disableValidMessage
          disableValidationDebounce
        />

        <Form.InputField
          name="buildCommand"
          label="Build Command"
          placeholder="npm build"
          isLoading={effect.current}
          disableValidMessage
          disableValidationDebounce
        />

        {mode === 'self' && (
          <Form.InputField
            name="baseDirectory"
            label="Base Directory"
            placeholder="./"
            disableValidMessage
            disableValidationDebounce
          />
        )}

        {mode !== 'self' && <Advanced />}

        <Form.SubmitButton className="w-full">Deploy site</Form.SubmitButton>
      </CS.Form.Wrapper>
    </S.Container>
  );
};

type FrameworkFieldProps = LoadingProps & {
  setBuildSettings: (settings: SiteBuildSettingsData) => void;
};

const FrameworkField: React.FC<FrameworkFieldProps> = ({
  isLoading,
  setBuildSettings,
}) => {
  const field = Form.useField<string | null>('frameworkId');

  const siteFrameworks = useSiteFrameworks();

  const framework = useMemo(
    () =>
      siteFrameworks.data?.find((framework) => framework.id === field.value),
    [field.value, siteFrameworks.data],
  );

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleSelect = (siteFramework?: SiteFramework) => {
    field.setValue(siteFramework?.id ?? null, true);

    if (siteFramework) {
      setBuildSettings(SiteBuildSettings.parseFramework(siteFramework));
    }
  };

  const items = (siteFrameworks.data || []) as SiteFramework[];

  return (
    <FormField.Root className="flex-1">
      <FormField.Label>Framework</FormField.Label>
      <Combobox
        items={items}
        selected={[framework as SiteFramework, handleSelect]}
        queryKey="name"
        isLoading={isLoading}
      >
        {({ Field, Options }) => (
          <>
            <Field
              placeholder="Select a framework"
              css={{ minHeight: '2rem', borderRadius: '0.5rem' }}
            >
              {FrameworkItem}
            </Field>

            <Options disableSearch align="end" css={{ width: '$xs' }}>
              {FrameworkItem}
            </Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const FrameworkItem: React.FC<SiteFramework> = ({ name, avatar }) => (
  <>
    {<Avatar src={avatar} enableIcon icon="gear" />}
    {name}
  </>
);
