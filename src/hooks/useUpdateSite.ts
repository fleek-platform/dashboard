import {
  type UpdateSiteDataInput,
  type UpdateSiteMutationVariables,
  useUpdateSiteMutation,
} from '@/generated/graphqlClient';

import { useRouter } from './useRouter';
import { useToast } from './useToast';

type UpdateArgs = {
  updateSiteArgs: UpdateSiteDataInput;
  successMessage: string;
};

export const useUpdateSite = () => {
  const toast = useToast();
  const router = useRouter();

  const siteId = router.query.siteId!;
  const [, updateSite] = useUpdateSiteMutation();

  const update = async ({ updateSiteArgs, successMessage }: UpdateArgs) => {
    try {
      if (siteId === undefined) {
        throw new UpdateSiteBuildError('Site id is undefined');
      }

      const updateSiteVars: UpdateSiteMutationVariables = {
        where: { id: siteId },
        data: updateSiteArgs,
      };
      const updateSiteResult = await updateSite(updateSiteVars);

      if (!updateSiteResult.data) {
        throw updateSiteResult.error || new Error('Unable to update site ');
      }

      toast.success({ message: successMessage });
    } catch (error) {
      toast.error({ error, log: 'Update site settings failed' });
    }
  };

  return { update };
};

class UpdateSiteBuildError extends Error {}
