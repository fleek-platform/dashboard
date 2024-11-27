import { updateProjectSchema } from '@fleek-platform/utils-validation';
import { useMemo } from 'react';
import { useClient } from 'urql';

import { Form } from '@/components';
import { constants } from '@/constants';
import { Projects, TwoFactorAuthentication } from '@/fragments';
import { UpdateProjectDataInput, useProjectQuery, useProjectsQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useUpdateProject } from '@/hooks/useUpdateProject';
import { useSessionContext } from '@/providers/SessionProvider';
import { Page } from '@/types/App';
import { HandleLogoUploadProps } from '@/types/Logo';
import { withAccess } from '@/utils/withAccess';

const Settings: Page = () => {
  const session = useSessionContext();
  const projectName = session.project.name;
  const router = useRouter();
  const { update: updateProject } = useUpdateProject();

  const client = useClient();
  const [projectsQuery] = useProjectsQuery();
  const [projectQuery] = useProjectQuery({ variables: { where: { id: router.query.projectId! } }, pause: !router.query.projectId });
  const [, refetchProjectsQuery] = useProjectsQuery();

  const isLoading = useMemo(() => {
    return session.loading || projectQuery.fetching || projectsQuery.fetching;
  }, [projectQuery.fetching, session.loading, projectsQuery.fetching]);

  const renameForm = Form.useForm({
    values: {
      name: projectName,
    },
    schema: updateProjectSchema.shape.data,
    extraValidations: {
      name: Form.createExtraValidation.projectName(client),
    },
    onSubmit: async (values) => {
      await updateProject({ updateProjectArgs: { name: values.name }, successMessage: 'Project renamed successfully' });
    },
  });

  const handleBlockOfacCountries = async (allowAccessFromOfacCountries: boolean) => {
    await updateProject({
      updateProjectArgs: { allowAccessFromOfacCountries },
      successMessage: `Access for users from OFAC countries ${allowAccessFromOfacCountries ? 'allowed' : 'blocked'}.`,
    });
    refetchProjectsQuery({ requestPolicy: 'network-only' });
  };

  const handleLogoUpload = async ({ image }: HandleLogoUploadProps) => {
    const data: UpdateProjectDataInput = { avatar: image };

    await updateProject({ updateProjectArgs: data, successMessage: 'Project logo uploaded successfully' });
    refetchProjectsQuery({ requestPolicy: 'network-only' });
  };

  return (
    <>
      <Form.Provider value={renameForm}>
        <Projects.Settings.Sections.RenameProject isLoading={isLoading} />
      </Form.Provider>

      <Projects.Settings.Sections.AllowAccessFromOfacCountriesSwitch
        onChange={handleBlockOfacCountries}
        value={projectQuery.data?.project.allowAccessFromOfacCountries}
        isLoading={isLoading}
        title={'Allow OFAC country access'}
        text={'Can users from OFAC-blocked countries access sites and private gateways from this project?'}
        permissions={[constants.PERMISSION.PROJECT.EDIT_ACCESS_FROM_OFAC_COUNTRIES]}
      />

      <Projects.Settings.Sections.ProjectLogo
        onSubmit={handleLogoUpload}
        isLoading={isLoading}
        initialImage={projectQuery.data?.project.avatar}
      />

      <TwoFactorAuthentication.Provider>
        <Projects.Settings.Sections.DeleteProject
          projectName={projectQuery.data?.project.name}
          isLoading={isLoading}
          isOnlyProject={projectsQuery.data?.projects.data.length === 1}
        />
      </TwoFactorAuthentication.Provider>
    </>
  );
};

Settings.getLayout = (page) => <Projects.Settings.Layout>{page}</Projects.Settings.Layout>;

export default withAccess({
  Component: Settings,
  requiredPermissions: [
    constants.PERMISSION.PROJECT.EDIT_NAME,
    constants.PERMISSION.PROJECT.DELETE,
    constants.PERMISSION.PROJECT.EDIT_AVATAR,
  ],
});
