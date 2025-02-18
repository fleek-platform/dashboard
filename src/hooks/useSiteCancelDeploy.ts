import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useClient } from 'urql';

import { useStopDeploymentMutation } from '@/generated/graphqlClient';

import { useToast } from './useToast';

type CancelDeployArgs = {
  deploymentId: string;
  siteId: string;
  onSuccess?: () => void;
};

// TODO: This action doesn't reflect into the status
// of deployment encountered in usePolling > deployment.status
export const useSiteStopDeploy = () => {
  const client = useClient();
  const toast = useToast();

  const [, stopDeployment] = useStopDeploymentMutation();

  const cancelDeploy = useCallback(
    async (args: CancelDeployArgs) => {
      try {
        const resultRedeploy = await stopDeployment({ where: { deploymentId: args.deploymentId } });

        if (!resultRedeploy.data?.stopDeployment) {
          throw resultRedeploy.error || new Error(`Error cancelling deployment ${args.deploymentId}`);
        }

        toast.success({ message: 'The deployment has been canceled' });

        if (args.onSuccess) {
          args.onSuccess();
        }

        return true;
      } catch (error) {
        toast.error({ error, log: 'Failed to cancel deploy' });
      }
    },
    [client, stopDeployment, toast]
  );

  return useMutation({ mutationFn: cancelDeploy });
};
