import {
  type UpdateUserDataInput,
  type UpdateUserMutationVariables,
  useUpdateUserMutation,
} from '@/generated/graphqlClient';

import { useToast } from './useToast';

type UpdateArgs = {
  updateUserArgs: UpdateUserDataInput;
  successMessage: string;
};

export const useUpdateUser = () => {
  const toast = useToast();
  const [, updateUser] = useUpdateUserMutation();

  const update = async ({ updateUserArgs, successMessage }: UpdateArgs) => {
    try {
      const updateUserVars: UpdateUserMutationVariables = {
        data: updateUserArgs,
      };
      const updateUserResult = await updateUser(updateUserVars);

      if (!updateUserResult.data) {
        throw updateUserResult.error || new Error('Unable to update user ');
      }

      toast.success({ message: successMessage });
    } catch (error) {
      toast.error({ error, log: 'Update user settings failed' });
    }
  };

  return { update };
};
