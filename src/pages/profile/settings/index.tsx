import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { updateUserSchema } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';
import { useEnsAvatar, useEnsName } from 'wagmi';
import zod from 'zod';

import { Form } from '@/components';
import { Profile } from '@/fragments';
import { useMeQuery } from '@/generated/graphqlClient';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { Page } from '@/types/App';
import { HandleLogoUploadProps } from '@/types/Logo';

const GeneralSettingsPage: Page = () => {
  const [meQuery] = useMeQuery();
  const { primaryWallet } = useDynamicContext();

  const { data: ensName } = useEnsName({
    address: primaryWallet?.address as `0x${string}`,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
  });

  const { update: updateUser } = useUpdateUser();

  const user = meQuery.data?.user;
  const client = useClient();

  const renameForm = Form.useForm({
    values: {
      username: user?.username || '',
    },
    schema: updateUserSchema.shape.data,
    extraValidations: {
      username: Form.createExtraValidation.username(client),
    },
    onSubmit: async (values) => {
      await updateUser({
        updateUserArgs: {
          username: values.username,
        },
        successMessage: 'Updated username successfully',
      });
    },
  });

  const handleLogoUpload = async ({ image }: HandleLogoUploadProps) => {
    await updateUser({
      updateUserArgs: {
        avatar: image,
      },
      successMessage: 'Avatar uploaded successfully',
    });
  };

  const deleteForm = Form.useForm({
    values: {
      username: '',
    },
    schema: zod.object({
      username: zod.literal(user?.username, { errorMap: () => ({ message: 'Incorrect username' }) }),
    }),
    // TODO: add validation
    onSubmit: async () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    },
  });

  return (
    <>
      <Form.Provider value={renameForm}>
        <Profile.Settings.Sections.RenameUser isLoading={meQuery.fetching} />
      </Form.Provider>

      <Profile.Settings.Sections.ChangeAvatar
        onSubmit={handleLogoUpload}
        initialImage={meQuery.data?.user.avatar || ensAvatar}
        isLoading={meQuery.fetching}
      />

      <Form.Provider value={deleteForm}>
        <Profile.Settings.Sections.DeleteUser username={user?.username || ''} isLoading={meQuery.fetching} />
      </Form.Provider>
    </>
  );
};

GeneralSettingsPage.getLayout = (page) => <Profile.Settings.Layout>{page}</Profile.Settings.Layout>;

export default GeneralSettingsPage;
