import {
  type UpdateProjectDataInput,
  type UpdateProjectMutationVariables,
  useUpdateProjectMutation,
} from '@/generated/graphqlClient';
import { useSessionContext } from '@/providers/SessionProvider';

import { useToast } from './useToast';

type UpdateArgs = {
  updateProjectArgs: UpdateProjectDataInput;
  successMessage: string;
};

export const useUpdateProject = () => {
  const toast = useToast();
  const session = useSessionContext();

  const [, updateProject] = useUpdateProjectMutation();

  const update = async ({ updateProjectArgs, successMessage }: UpdateArgs) => {
    try {
      const updateProjectVars: UpdateProjectMutationVariables = {
        where: { id: session.project.id },
        data: updateProjectArgs,
      };
      const updateProjectResult = await updateProject(updateProjectVars);

      if (!updateProjectResult.data) {
        throw (
          updateProjectResult.error || new Error('Unable to update project ')
        );
      }

      toast.success({ message: successMessage });
    } catch (error) {
      toast.error({ error, log: 'Update project settings failed' });
    }
  };

  return { update };
};
