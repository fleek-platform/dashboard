import { useMutation } from '@tanstack/react-query';
import { useClient, gql } from 'urql';

import { useMeQuery } from '@/generated/graphqlClient';
import { useLogout } from '@/hooks/useLogout';

type UseDeleteAccountReturn = {
  deleteAccount: () => Promise<void>;
  isDeleting: boolean;
  error: string | null;
};

export const useDeleteAccount = (): UseDeleteAccountReturn => {
  const client = useClient();
  const [meQuery] = useMeQuery();
  const { logout } = useLogout();

  // TODO: Make gql follow graphql client convention
  // which at time of writing relies on a generator from monorepo
  // that dumps into `src/generated`. The process has to be replaced.
  const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($where: DeleteUserWhereInput!) {
      deleteUser(where: $where) {
        id
      }
    }
  `;

  const deleteUserMutation = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: async () => {
      const userId = meQuery.data?.user.id;
      if (!userId) {
        throw new Error('Could not identify user to delete.');
      }

      const result = await client
        .mutation(DELETE_USER_MUTATION, { where: { id: userId } })
        .toPromise();

      if (result.data?.deleteUser) {
        return result.data.deleteUser;
      }

      if (result.error) {
        throw new Error(
          result.error.graphQLErrors[0]?.message ||
            result.error.message ||
            'Failed to delete account. Please try again.',
        );
      }

      throw new Error('Failed to delete account. Unexpected response.');
    },
    onSuccess: () => {
      logout();
    },
  });

  return {
    deleteAccount: () => deleteUserMutation.mutateAsync(),
    isDeleting: deleteUserMutation.isLoading,
    error: deleteUserMutation.error
      ? (deleteUserMutation.error as Error).message
      : null,
  };
};
