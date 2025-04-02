import { createTemplateSchema } from '@fleek-platform/utils-validation';
import { useState } from 'react';

import { BannerField, ExternalLink, Form, SettingsModal } from '@/components';
import {
  TemplateCategoriesQuery,
  useProjectsQuery,
  useSitesQuery,
  useTemplateCategoriesQuery,
} from '@/generated/graphqlClient';
import { useSessionContext } from '@/providers/SessionProvider';
import { Project } from '@/types/Project';
import { ChildrenProps } from '@/types/Props';
import { SiteListItem } from '@/types/Site';
import { Avatar, Box, Button, Combobox, FormField, Stepper, Text } from '@/ui';
import { secrets } from '@/secrets';

export type CreateTemplateModalProps = ChildrenProps;

const dashboardUrl = `${secrets.NEXT_PUBLIC_WEBSITE_URL}/${secrets.NEXT_PUBLIC_DASHBOARD_BASE_PATH}`;

export const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  children,
}) => {
  const form = Form.useContext();

  const handleOpenChange = () => {
    form.resetForm();
  };

  return (
    <SettingsModal trigger={children} onOpenChange={handleOpenChange}>
      <Stepper.Root>
        <Stepper.Indicator />

        <Stepper.Container>
          <Stepper.Step>
            <Step1 />
          </Stepper.Step>

          <Stepper.Step>
            <Step2 />
          </Stepper.Step>

          <Stepper.Step>
            <Step3 />
          </Stepper.Step>
        </Stepper.Container>
      </Stepper.Root>
    </SettingsModal>
  );
};

const Step1: React.FC = () => {
  const stepper = Stepper.useContext();
  const siteField = Form.useField<SiteListItem | undefined>('site');

  const handleConfirm = () => {
    stepper.nextStep();
  };

  return (
    <>
      <SettingsModal.Heading>Select site for template</SettingsModal.Heading>

      <Text>
        The sites that can be used as templates are listed below. Please select
        one to continue.
      </Text>

      <Box className="gap-2">
        <Text variant="primary"> To be used as a template, a site must:</Text>
        <ul className="list-disc pl-4 text-neutral-11">
          <li>Be successfully deployed</li>
          <li>Have a Git provider</li>
          <li>Not be an existing template</li>
        </ul>
      </Box>

      <SelectProjectField />

      <SelectSiteField />

      <SettingsModal.Footer>
        <SettingsModal.Close asChild>
          <Button intent="neutral" className="flex-1" autoFocus>
            Cancel
          </Button>
        </SettingsModal.Close>

        <Button
          onClick={handleConfirm}
          disabled={!siteField.value}
          className="flex-1"
        >
          Continue
        </Button>
      </SettingsModal.Footer>
    </>
  );
};

const Step2: React.FC = () => {
  const stepper = Stepper.useContext();
  const siteName =
    Form.useField<SiteListItem | undefined>('site').value?.name || '';

  const handleBack = () => {
    stepper.prevStep();
  };

  return (
    <>
      <SettingsModal.Heading>Add template details</SettingsModal.Heading>
      <Text>
        Finalize the details for your template below. These will be visible in
        the from the{' '}
        <ExternalLink
          className="inline-flex"
          variant="accent"
          href={`${dashboardUrl}/templates`}
        >
          Templates
        </ExternalLink>{' '}
        gallery.
      </Text>
      <Text>
        NOTE: We recommend having a filled out Readme.md for the repository that
        you are submitting, this will help users understand what your Template
        is.
      </Text>

      <Form.InputField
        name="name"
        placeholder={`${siteName} template`}
        label="Name"
        autoFocus
      />

      <SelectTemplateCategoryField />

      <Form.InputField
        label="Description"
        fieldType="Textarea"
        name="description"
        placeholder="Describe your template in 500 characters or less. This will be public."
        charactersCounter={
          createTemplateSchema.shape.data.shape.description.maxLength ??
          undefined
        }
        disableValidMessage
      />

      <BannerField name="banner" />

      <SettingsModal.Footer>
        <Button intent="neutral" onClick={handleBack} className="flex-1">
          Go back
        </Button>

        <SubmitButton />
      </SettingsModal.Footer>
    </>
  );
};

const Step3: React.FC = () => {
  return (
    <>
      <SettingsModal.Heading>Template in Review</SettingsModal.Heading>

      <Text>
        The Template you submitted is in review, if accepted you will be
        notified and the Template will be put in the Fleek Template Gallery.
      </Text>

      <Text>
        If we have an issue with the review of your Template, you will be
        notified with the reasonings it was not accepted.
      </Text>

      <SettingsModal.Footer>
        <SettingsModal.Close asChild>
          <Button className="flex-1">Done</Button>
        </SettingsModal.Close>
      </SettingsModal.Footer>
    </>
  );
};

const SelectProjectField: React.FC = () => {
  const [projectsQuery] = useProjectsQuery();
  const session = useSessionContext();

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const handleProjectChange = (project?: Project): void => {
    if (project) {
      session.setProject(project.id);
    }
  };

  // TODO filter projects based on permissions
  const projects = projectsQuery.data?.projects.data || [];

  return (
    <FormField.Root>
      <FormField.Label>Project</FormField.Label>
      <Combobox
        items={projects}
        selected={[session.project, handleProjectChange]}
        queryKey="name"
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select">{ProjectSelectItem}</Field>

            <Options viewportHeight="$4xs" side="bottom" disableSearch>
              {ProjectSelectItem}
            </Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const ProjectSelectItem: React.FC<Project> = (project) => (
  <>
    <Avatar enableIcon icon="image" src={project.avatar} />
    {project.name}
  </>
);

const SelectSiteField: React.FC = () => {
  const field = Form.useField<SiteListItem | undefined>('site');

  const [query, setQuery] = useState<string>();
  const session = useSessionContext();
  const [sitesQuery] = useSitesQuery({
    variables: {
      where: {
        hasSourceProvider: true,
        isDeployed: true,
        isTemplate: false,
        name: query,
      },
    },
    requestPolicy: 'network-only',
  });

  // TODO create query to filter sites by projectId cause now we're only fetching sites by project connected
  const sites = sitesQuery.data?.sites.data || [];

  const handleRefetch = async (query: string) => {
    setQuery(query);
  };

  return (
    <FormField.Root>
      <FormField.Label>Site</FormField.Label>
      <Combobox
        items={sites}
        selected={[field.value, field.setValue]}
        queryKey="name"
        isLoading={
          (sitesQuery.fetching && !sitesQuery.data?.sites.data) ||
          session.loading
        }
        isSearching={sitesQuery.fetching}
        onQueryChange={handleRefetch}
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select">{SiteSelectItem}</Field>

            <Options viewportHeight="$4xs" side="bottom">
              {SiteSelectItem}
            </Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const SiteSelectItem: React.FC<SiteListItem> = (site) => (
  <>
    <Avatar enableIcon icon="image" src={site.avatar} />
    {site.name}
  </>
);

const SelectTemplateCategoryField: React.FC = () => {
  const field = Form.useField<
    TemplateCategoriesQuery['templateCategories']['data'][0] | undefined
  >('category');

  const [templateCategoriesQuery] = useTemplateCategoriesQuery();

  const categories =
    templateCategoriesQuery.data?.templateCategories.data || [];

  return (
    <FormField.Root>
      <FormField.Label>Category</FormField.Label>
      <Combobox
        items={categories}
        selected={[field.value, field.setValue]}
        queryKey="name"
        isLoading={templateCategoriesQuery.fetching}
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select a category">
              {(selected) => selected.name}
            </Field>

            <Options viewportHeight="$4xs">{(item) => item.name}</Options>
          </>
        )}
      </Combobox>
    </FormField.Root>
  );
};

const SubmitButton: React.FC = () => {
  const { submit, isSubmitting, shouldDisableSubmit } = Form.useContext();
  const stepper = Stepper.useContext();

  const handleSubmit = async () => {
    const templateId = await submit();

    if (typeof templateId === 'string') {
      stepper.nextStep();
    }
  };

  return (
    <Button
      type="submit"
      loading={isSubmitting}
      disabled={shouldDisableSubmit}
      onClick={handleSubmit}
      className="flex-1"
    >
      Create Template
    </Button>
  );
};
