import {
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import { useGitBranchesQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { DisabledProps } from '@/types/Props';
import { Site } from '@/types/Site';
import { Combobox, FormField } from '@/ui';
import { parseAPISourceProvider } from '@/utils/parseAPISourceProvider';

export type DeployContextsProps = {
  site: Site;
  sourceRepositoryOwner?: string;
  sourceRepositoryName?: string;
};

export const DeployContexts: React.FC<DeployContextsProps> = ({
  site,
  sourceRepositoryOwner,
  sourceRepositoryName,
}) => {
  const provider = parseAPISourceProvider(site.sourceProvider);

  const gitIntegration = site.gitIntegration;

  const [gitBranchesQuery] = useGitBranchesQuery({
    variables: {
      where: {
        gitProviderId: gitIntegration?.gitProvider?.id as string,
        sourceRepositoryOwner: sourceRepositoryOwner as string,
        sourceRepositoryName: sourceRepositoryName as string,
      },
    },
    pause:
      !gitIntegration?.gitProvider?.id ||
      !sourceRepositoryName ||
      !sourceRepositoryOwner,
  });
  const hasBuildSettingsPermission = usePermissions({
    action: [constants.PERMISSION.SITE.EDIT_BUILD_SETTINGS],
  });

  return (
    <SettingsBox.Container>
      <SettingsBox.Column>
        <SettingsBox.Title>Deploy settings</SettingsBox.Title>
        <SettingsBox.Text>
          Select the branch Fleek should use to deploy your project.
        </SettingsBox.Text>
      </SettingsBox.Column>

      {provider && site.sourceRepositoryOwner && site.sourceRepositoryName && (
        <PermissionsTooltip hasAccess={hasBuildSettingsPermission}>
          <ProductionBranchField
            branches={gitBranchesQuery.data?.gitApiBranches}
            isLoading={!gitBranchesQuery.data || gitBranchesQuery.fetching}
          />
        </PermissionsTooltip>
      )}

      <PermissionsTooltip hasAccess={hasBuildSettingsPermission}>
        <Form.InputField
          name="dockerImage"
          label="Docker Image"
          labelTooltip="The docker image and tag that will be used to build your application. Automatically detected by Fleek, but you can use any image published on Docker Hub (e.g. node:lts)."
          disableValidMessage
          disableValidationDebounce
          isDisabled={!hasBuildSettingsPermission}
        />
      </PermissionsTooltip>

      <PermissionsTooltip hasAccess={hasBuildSettingsPermission}>
        <DeployPreviewsField isDisabled={!hasBuildSettingsPermission} />
      </PermissionsTooltip>

      <SettingsBox.ActionRow>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_DEPLOY_CONTEXTS}
        >
          deploy settings
        </LearnMoreMessage>

        <Form.SubmitButton>Save changes</Form.SubmitButton>
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

type ProductionBranchFieldProps = DisabledProps<{
  branches?: { name: string }[];
  isLoading: boolean;
}>;

const ProductionBranchField: React.FC<ProductionBranchFieldProps> = ({
  isDisabled,
  branches,
  isLoading,
}) => {
  const field = Form.useField<string>('sourceBranch');

  const handleBranchSelect = (value?: string) => {
    field.setValue(value || '', true);
  };

  return (
    <FormField.Root error={field.status === 'invalid'}>
      <FormField.Label>Production Branch</FormField.Label>
      <Combobox
        items={branches?.map((branch) => branch.name) || []}
        selected={[field.value, handleBranchSelect]}
        isLoading={isLoading || !branches}
        isDisabled={isDisabled}
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select a branch">
              {(selected) => selected}
            </Field>

            <Options>{(selected) => selected}</Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const DeployPreviewsField: React.FC<DisabledProps> = ({ isDisabled }) => {
  const field = Form.useField<boolean>('enablePreviews');

  const handleSelect = (value = false) => {
    field.setValue(value, true);
  };

  return (
    <FormField.Root error={field.status === 'invalid'}>
      <FormField.Label tooltip="When it's enabled, Fleek will build a preview when a pull request is opened to the production branch.">
        Deploy Previews
      </FormField.Label>
      <Combobox
        items={[true, false]}
        selected={[field.value, handleSelect]}
        isDisabled={isDisabled}
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">{DeployPreviewsOption}</Field>

            <Options disableSearch>{DeployPreviewsOption}</Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const DeployPreviewsOption = (isEnabled: boolean) => {
  if (isEnabled) {
    return 'Build previews for all pull requests';
  }

  return "Don't build previews";
};
