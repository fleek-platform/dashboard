import { createApplicationSchema } from '@fleek-platform/utils-validation';
import { useMemo } from 'react';
import { useClient } from 'urql';

import { Form } from '@/components';
import { constants } from '@/constants';
import { Projects } from '@/fragments';
import { useApplicationsQuery, useCreateApplicationMutation, useDeleteApplicationMutation } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { useSessionContext } from '@/providers/SessionProvider';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const ApplicationCredentials: Page = () => {
  const session = useSessionContext();
  const toast = useToast();
  const client = useClient();

  const [applicationsQuery] = useApplicationsQuery();
  const [, createApplication] = useCreateApplicationMutation();
  const [, deleteApplication] = useDeleteApplicationMutation();

  const applicationCredentialForm = Form.useForm({
    values: {
      name: '',
      whitelistDomains: [''] as string[],
    },
    schema: createApplicationSchema.shape.data,
    extraValidations: {
      name: Form.createExtraValidation.applicationName(client),
    },
    onSubmit: async (values) => {
      try {
        const createApplicationResult = await createApplication({
          data: {
            name: values.name,
            whitelistDomains: values.whitelistDomains,
            // Warning: whiteLabelDomains is deprecated
            // although its declared here, its only use case
            // is to allow interoperability with the expected type
            // for the urql cache in the UI
            // notice that whiteLabelDomains gets its values from
            // the whitelistDomains in graphql side of things
            whiteLabelDomains: [...values.whitelistDomains],
          },
        });

        if (!createApplicationResult.data) {
          throw createApplicationResult.error || Error('Error trying to create application credentials');
        }

        return createApplicationResult.data.createApplication.clientId;
      } catch (error) {
        toast.error({ error, log: 'Error trying to create application credentials' });
      }
    },
  });

  const handleDeleteCredential = async (id: string) => {
    try {
      const result = await deleteApplication({ where: { id } });

      if (!result.data) {
        throw result.error || new Error('Error trying to delete application credential');
      }

      toast.success({ message: 'Application credential deleted.' });
    } catch (error) {
      toast.error({ error, log: 'Delete application credential failed' });
    }
  };

  const isLoading = useMemo(() => {
    return applicationsQuery.fetching || session.loading;
  }, [applicationsQuery.fetching, session.loading]);

  return (
    <>
      <Form.Provider value={applicationCredentialForm}>
        <Projects.Settings.Sections.ApplicationCredentials.Add isLoading={isLoading} />
      </Form.Provider>
      <Projects.Settings.Sections.ApplicationCredentials.Manage
        isLoading={isLoading}
        credentials={applicationsQuery.data?.applications.data || []}
        onSubmitDelete={handleDeleteCredential}
      />
    </>
  );
};

ApplicationCredentials.getLayout = (page) => <Projects.Settings.Layout>{page}</Projects.Settings.Layout>;

export default withAccess({ Component: ApplicationCredentials, requiredPermissions: [constants.PERMISSION.APPLICATION_CREDENTIALS.VIEW] });
