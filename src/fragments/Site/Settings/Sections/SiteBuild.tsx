import { useMemo } from 'react';

import { Form, LearnMoreMessage, PermissionsTooltip, SettingsBox } from '@/components';
import { BaseDirectoryField } from '@/components/BaseDirectoryField/BaseDirectoryField';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { LoadingProps } from '@/types/Props';
import { SiteFramework } from '@/types/Site';
import { Avatar, Combobox, FormField } from '@/ui';

export type SiteBuildProps = LoadingProps<{
  gitProviderId: string;
  sourceRepositoryOwner: string;
  sourceRepositoryName: string;
  sourceBranch: string;
  isSelfManaged?: boolean;
}>;

export const SiteBuild: React.FC<SiteBuildProps> = ({
  gitProviderId,
  isLoading,
  sourceRepositoryOwner,
  sourceRepositoryName,
  sourceBranch,
  isSelfManaged,
}) => {
  const hasBuildSettingsPermission = usePermissions({ action: [constants.PERMISSION.SITE.EDIT_BUILD_SETTINGS] });

  return (
    <SettingsBox.Container>
      <SettingsBox.Column>
        <SettingsBox.Title>Build settings</SettingsBox.Title>
        <SettingsBox.Text>
          Fleek will attempt to autodetect the site&apos;s framework and apply the correct build parameters. In some cases, you might need
          to input the parameters manually here.
        </SettingsBox.Text>
      </SettingsBox.Column>

      <FrameworkField isLoading={isLoading} />

      <PermissionsTooltip hasAccess={hasBuildSettingsPermission} isLoading={isLoading}>
        <Form.InputField
          name="distDirectory"
          label="Publish Directory"
          isLoading={isLoading}
          disableValidMessage
          disableValidationDebounce
          isDisabled={!hasBuildSettingsPermission}
        />
      </PermissionsTooltip>

      <PermissionsTooltip hasAccess={hasBuildSettingsPermission} isLoading={isLoading}>
        <Form.InputField
          name="buildCommand"
          label="Build Command"
          isLoading={isLoading}
          disableValidMessage
          disableValidationDebounce
          isDisabled={!hasBuildSettingsPermission}
        />
      </PermissionsTooltip>

      <PermissionsTooltip hasAccess={hasBuildSettingsPermission} isLoading={isLoading}>
        {isSelfManaged ? (
          <Form.InputField
            name="baseDirectory"
            label="Base Directory"
            isLoading={isLoading}
            disableValidMessage
            disableValidationDebounce
            isDisabled={!hasBuildSettingsPermission}
          />
        ) : (
          <BaseDirectoryField
            fieldName="baseDirectory"
            gitProviderId={gitProviderId as string}
            sourceRepositoryOwner={sourceRepositoryOwner as string}
            sourceRepositoryName={sourceRepositoryName as string}
            sourceBranch={sourceBranch as string}
          />
        )}
      </PermissionsTooltip>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_BUILD_SETTINGS}>build settings</LearnMoreMessage>
        {isLoading ? <SettingsBox.Skeleton variant="button" /> : <Form.SubmitButton>Save changes</Form.SubmitButton>}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

const FrameworkField: React.FC<LoadingProps> = ({ isLoading: loading }) => {
  const field = Form.useField<string | undefined>('frameworkId');
  const hasBuildSettingsPermission = usePermissions({ action: [constants.PERMISSION.SITE.EDIT_BUILD_SETTINGS] });

  const siteFrameworks = useSiteFrameworks();

  const framework = useMemo(
    () => siteFrameworks.data?.find((framework) => framework.id === field.value),
    [field.value, siteFrameworks.data]
  );

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleSelect = (siteFramework?: SiteFramework) => {
    field.setValue(siteFramework?.id, true);
  };

  const isLoading = loading || siteFrameworks.isLoading;

  return (
    <PermissionsTooltip hasAccess={hasBuildSettingsPermission} isLoading={isLoading}>
      <FormField.Root>
        <FormField.Label>Framework</FormField.Label>
        <Combobox
          items={siteFrameworks.data || []}
          selected={[framework, handleSelect]}
          queryKey="name"
          isLoading={isLoading}
          isDisabled={!hasBuildSettingsPermission}
        >
          {({ Field, Options }) => (
            <>
              <Field placeholder="Select a framework">{FrameworkItem}</Field>

              <Options disableSearch>{FrameworkItem}</Options>
            </>
          )}
        </Combobox>
      </FormField.Root>
    </PermissionsTooltip>
  );
};

const FrameworkItem: React.FC<SiteFramework> = ({ name, avatar }) => (
  <>
    {<Avatar src={avatar} enableIcon icon="gear" />}
    {name}
  </>
);
