import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { updateUserSchema } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';

import { Form } from '@/components';
import { Profile } from '@/fragments';
import type { UpdateUserDataInput } from '@/generated/graphqlClient';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import type { Page } from '@/types/App';

const ProjectSettingsPage: Page = () => {
  const { update: updateUser } = useUpdateUser();
  const { user } = useDynamicContext();
  const client = useClient();

  const changeEmailForm = Form.useForm({
    values: {
      email: user?.email || '',
    },
    schema: updateUserSchema.shape.data,
    extraValidations: {
      email: Form.createExtraValidation.email(client),
    },
    onSubmit: async (values) => {
      const data: UpdateUserDataInput = {
        email: values.email,
      };

      await updateUser({
        updateUserArgs: data,
        successMessage: 'Updated email successfully',
      });
    },
  });

  return (
    <Form.Provider value={changeEmailForm}>
      <Profile.Settings.Sections.LoginConnections />
      <Profile.Settings.Sections.ManageConnections />
    </Form.Provider>
  );
};

ProjectSettingsPage.getLayout = (page) => (
  <Profile.Settings.Layout>{page}</Profile.Settings.Layout>
);

export default ProjectSettingsPage;
