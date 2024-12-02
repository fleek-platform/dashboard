import { useMutation } from '@tanstack/react-query';

import {
  UpdateUserDocument,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from '@/generated/graphqlClient';
import { GraphqlApiClient } from '@/integrations/graphql/GraphqlApi';

import { useAuthCookie } from './useAuthCookie';

export const useUpdateUserMutation = () => {
  const [accessToken] = useAuthCookie();
  const graphqlApi = new GraphqlApiClient({ accessToken });

  return useMutation(async (data: UpdateUserMutationVariables) => {
    return graphqlApi.fetch<UpdateUserMutation, UpdateUserMutationVariables>({
      document: UpdateUserDocument.loc.source.body,
      variables: data,
    });
  });
};
