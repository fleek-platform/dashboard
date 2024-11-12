import { patName } from '@fleek-platform/utils-validation';
import { useState } from 'react';
import { useClient } from 'urql';
import { uuid } from 'uuidv4';
import * as zod from 'zod';

import { Form } from '@/components';
import { Profile } from '@/fragments';
import {
  useCreateLoginVerificationSessionMutation,
  useCreatePersonalAccessTokenFromVerificationSessionMutation,
  useDeletePersonalAccessTokenMutation,
  usePersonalAccessTokensQuery,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Page } from '@/types/App';
import { Log } from '@/utils/log';

const PersonalAccessTokensPage: Page = () => {
  const toast = useToast();

  const [createPATModalState, setCreatePATModalState] =
    useState<CreatePATModalState>({ isOpen: false });
  const [, createLoginVerificationSession] =
    useCreateLoginVerificationSessionMutation();
  const [, createPersonalAccessTokenFromVerificationSession] =
    useCreatePersonalAccessTokenFromVerificationSessionMutation();

  const [personalAccessTokensQuery] = usePersonalAccessTokensQuery();

  const client = useClient();

  const createPATForm = Form.useForm({
    values: {
      patName: '',
    },
    schema: zod.object({
      patName,
    }),
    extraValidations: {
      patName: Form.createExtraValidation.patName(client),
    },
    onSubmit: async (values) => {
      try {
        const verificationSessionId = uuid();
        await createLoginVerificationSession({
          where: { id: verificationSessionId },
        });
        const createPATResult =
          await createPersonalAccessTokenFromVerificationSession({
            where: { id: verificationSessionId },
            data: { name: values.patName },
          });

        if (!createPATResult.data) {
          throw (
            createPATResult.error ||
            new Error('There was an error creating your Personal Access Token')
          );
        }

        const patValue =
          createPATResult.data.createPersonalAccessTokenFromVerificationSession;

        setCreatePATModalState({ isOpen: true, patValue: patValue });
        createPATForm.resetForm();
      } catch (error) {
        toast.error({ error, log: 'Failed to create Personal Access Token' });
      }
    },
  });

  const closeCreatePATModal = () => setCreatePATModalState({ isOpen: false });

  const [, deletePersonalAccessToken] = useDeletePersonalAccessTokenMutation();

  const deletePATForm = Form.useForm({
    values: {
      id: '',
      patName: '',
      name: '',
    },
    schema: zod.object({}),
    extraValidations: {
      name: async (name: string) => {
        if (name === deletePATForm.values.patName) {
          return { status: 'valid' as const };
        }

        return { status: 'invalid' as const, message: 'Name does not match' };
      },
    },
    onSubmit: async (values) => {
      try {
        return deletePersonalAccessToken({ where: { id: values.id } });
      } catch (error) {
        Log.error('Failed to delete Personal Access Token', error);
      }
    },
  });

  return (
    <>
      <Form.Provider value={createPATForm}>
        <Profile.Settings.Sections.CreatePAT
          modalState={createPATModalState}
          closeModal={closeCreatePATModal}
          isLoading={personalAccessTokensQuery.fetching}
        />
      </Form.Provider>

      <Form.Provider value={deletePATForm}>
        <Profile.Settings.Sections.ManagePAT
          isLoading={personalAccessTokensQuery.fetching}
          patList={
            personalAccessTokensQuery.data?.personalAccessTokens.data || []
          }
        />
      </Form.Provider>
    </>
  );
};

PersonalAccessTokensPage.getLayout = (page) => (
  <Profile.Settings.Layout>{page}</Profile.Settings.Layout>
);

type CreatePATModalState = {
  isOpen: boolean;
  patValue?: string;
};

export default PersonalAccessTokensPage;
