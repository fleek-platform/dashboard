import { envVarName, envVarValue } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';
import * as zod from 'zod';

import { Form } from '@/components';
import { constants } from '@/constants';
import { Site } from '@/fragments';
import {
  SecretVisibility,
  type UpdateSecretMutationVariables,
  useCreateSecretMutation,
  useDeleteSecretMutation,
  useSiteQuery,
  useUpdateSecretMutation,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import type { Page } from '@/types/App';
import { Log } from '@/utils/log';
import { withAccess } from '@/utils/withAccess';

const EnvironmentSettingsPage: Page = () => {
  const router = useRouter();
  const client = useClient();
  const [siteQuery, refetchSiteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });
  const toast = useToast();

  const [, createSecret] = useCreateSecretMutation();
  const [, updateSecret] = useUpdateSecretMutation();
  const [, deleteSecret] = useDeleteSecretMutation();

  const addForm = Form.useForm({
    options: { validateNotDirty: true, partial: true },
    values: {
      key: '',
      value: '',
      encrypted: false,
    },
    schema: zod.object({
      key: envVarName,
      value: envVarValue,
      encrypted: zod.boolean(),
    }),
    extraValidations: {
      key: Form.createExtraValidation.siteSecret(
        client,
        siteQuery.data?.site.id,
      ),
    },
    onSubmit: async (values) => {
      try {
        const site = siteQuery.data?.site;

        if (!site) {
          throw new CreateSecretError('Site not found');
        }

        if (!site.secretGroup) {
          throw new CreateSecretError('Secret group not found');
        }

        const createResult = await createSecret({
          data: {
            groupId: site.secretGroup.id,
            key: values.key,
            value: values.value,
            visibility: values.encrypted
              ? SecretVisibility.ENCRYPTED
              : SecretVisibility.PUBLIC,
          },
        });

        if (!createResult.data) {
          throw createResult.error;
        }

        refetchSiteQuery({ requestPolicy: 'network-only' });
        addForm.resetForm();
      } catch (error) {
        toast.error({ error, log: 'Failed to create secret' });
      }
    },
  });

  const handleSubmitUpdate = async (args: HandleSubmitUpdateProps) => {
    try {
      const updateResult = await updateSecret(args);

      if (!updateResult.data) {
        throw updateResult.error;
      }

      refetchSiteQuery({ requestPolicy: 'network-only' });
    } catch (error) {
      toast.error({ error, log: 'Failed to update secret' });
    }
  };

  const handleSubmitDelete = async (id: string) => {
    try {
      const deleteResult = await deleteSecret({ where: { id } });

      if (!deleteResult.data) {
        throw deleteResult.error;
      }

      refetchSiteQuery({ requestPolicy: 'network-only' });
    } catch (error) {
      Log.error('Failed to delete secret', error);
    }
  };

  return (
    <>
      <Form.Provider value={addForm}>
        <Site.Settings.Sections.AddEnvironmentVariable
          isLoading={siteQuery.fetching}
        />
      </Form.Provider>

      <Site.Settings.Sections.ManageEnvironmentVariables
        isLoading={siteQuery.fetching}
        secrets={siteQuery.data?.site.secretGroup?.secrets || []}
        onSubmitDelete={handleSubmitDelete}
        onSubmitUpdate={handleSubmitUpdate}
      />
    </>
  );
};

EnvironmentSettingsPage.getLayout = (page) => (
  <Site.Settings.Layout>{page}</Site.Settings.Layout>
);

export default withAccess({
  Component: EnvironmentSettingsPage,
  requiredPermissions: [
    constants.PERMISSION.SITE.VIEW_ENV_VARIABLES,
    constants.PERMISSION.SITE.EDIT_ENV_VARIABLES,
  ],
});

class CreateSecretError extends Error {}

type HandleSubmitUpdateProps = UpdateSecretMutationVariables;
