import { useState } from 'react';
import * as zod from 'zod';

import { Form } from '@/components';
import { Profile } from '@/fragments';
import {
  type ApiToken,
  useCreateApiToken,
  useDeleteApiToken,
  useGetApiTokens,
} from '@/fragments/Profile/Settings/Sections/ApiTokens/useApiTokens';
import { useToast } from '@/hooks/useToast';
import type { Page } from '@/types/App';
import { isUniqueName } from '@/utils/isUniqueName';

type CreateApiTokenModalState = {
  isOpen: boolean;
  apiTokenValue?: string;
};

const ApiKeysPage: Page = () => {
  const toast = useToast();
  const apiTokensQuery = useGetApiTokens();

  const [createApiTokenModalState, setCreateApiTokenModalState] = useState<CreateApiTokenModalState>({ isOpen: false });
  const closeCreateApiTokenModal = () => setCreateApiTokenModalState({ isOpen: false });

  const createApiTokenMutation = useCreateApiToken({
    onSuccess: (value?: ApiToken) => {
      setCreateApiTokenModalState({ isOpen: true, apiTokenValue: value?.token ?? '' });
      createApiTokenForm.resetForm();
    },
    onError: () => toast.error({ message: 'Failed to create API Token!' }),
  });
  const createApiTokenForm = Form.useForm({
    values: {
      apiTokenName: '',
    },
    schema: zod.object({
      apiTokenName: zod.string().min(3, { message: 'Minimum of 3 characters' }).max(50, { message: 'Maximum of 50 characters' }),
    }),
    extraValidations: {
      apiTokenName: async (apiTokenName: string) => {
        const isUnique = isUniqueName({ name: apiTokenName, list: apiTokensQuery?.data || [] });

        return { status: isUnique ? 'valid' : 'invalid' };
      },
    },
    onSubmit: async (values) => {
      await createApiTokenMutation.mutate({
        name: values.apiTokenName,
      });
    },
  });

  const deleteApiTokenMutation = useDeleteApiToken({
    onSuccess: () => toast.success({ message: 'API Token deleted!' }),
    onError: () => toast.error({ message: 'Failed to delete API Token!' }),
  });
  const deleteApiTokenForm = Form.useForm({
    values: {
      id: '',
      name: '',
    },
    schema: zod.object({}),
    extraValidations: {
      name: async (name: string) => {
        if (name === deleteApiTokenForm.values.name) {
          return { status: 'valid' as const };
        }

        return { status: 'invalid' as const, message: 'Name does not match' };
      },
    },
    onSubmit: async (values) => {
      await deleteApiTokenMutation.mutate(values.id);
    },
  });

  return (
    <section className="flex flex-col gap-5">
      <Form.Provider value={createApiTokenForm}>
        <Profile.Settings.Sections.CreateApiToken
          modalState={createApiTokenModalState}
          closeModal={closeCreateApiTokenModal}
          isLoading={apiTokensQuery.isFetching}
        />
      </Form.Provider>

      <Form.Provider value={deleteApiTokenForm} data-testid="api-tokens-list">
        <Profile.Settings.Sections.ManageApiTokens
          isError={!!apiTokensQuery.error}
          isLoading={apiTokensQuery.isFetching}
          apiTokenList={apiTokensQuery.data}
        />
      </Form.Provider>
    </section>
  );
};

ApiKeysPage.getLayout = (page) => <Profile.Settings.Layout>{page}</Profile.Settings.Layout>;

export default ApiKeysPage;
