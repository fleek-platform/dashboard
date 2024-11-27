import { routes } from '@fleek-platform/utils-routes';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useClient } from 'urql';

import { useRetryDeploymentMutation, useTriggerDeploymentMutation } from '@/generated/graphqlClient';

import { useRouter } from './useRouter';
import { useToast } from './useToast';

const SUCCESS_MESSAGE = 'Deployment created successfully';
const ERROR_MESSAGE = 'Deployment creation failed';

type RedeployArgs = {
  deploymentId: string;
  siteId: string;
};

export const useSiteRedeploy = () => {
  const client = useClient();
  const toast = useToast();
  const router = useRouter();
  const projectId = router.query.projectId!;

  const [, retryDeployment] = useRetryDeploymentMutation();

  const redeploy = useCallback(
    async (args: RedeployArgs) => {
      try {
        const resultRedeploy = await retryDeployment({ where: { deploymentId: args.deploymentId } });

        if (!resultRedeploy.data?.retryDeployment) {
          throw resultRedeploy.error || new Error(`${ERROR_MESSAGE} ${args.deploymentId}`);
        }

        toast.success({
          message: SUCCESS_MESSAGE,
          duration: 1000,
        });

        router.push(
          routes.project.site.deployments.detail({
            projectId,
            siteId: args.siteId,
            deploymentId: resultRedeploy.data?.retryDeployment.id!,
          })
        );

        return resultRedeploy.data?.retryDeployment.id;
      } catch (error) {
        toast.error({ error, log: `${ERROR_MESSAGE}` });
      }
    },
    [client, retryDeployment, toast]
  );

  return useMutation({ mutationFn: redeploy });
};

type TriggerDeployArgs = {
  siteId: string;
};

export const useTriggerSiteDeployment = () => {
  const client = useClient();
  const toast = useToast();
  const router = useRouter();
  const projectId = router.query.projectId!;

  const [, triggerDeployment] = useTriggerDeploymentMutation();

  const triggerSiteDeployment = useCallback(
    async ({ siteId }: TriggerDeployArgs) => {
      try {
        const resultTriggerDeployment = await triggerDeployment({ where: { siteId } });

        if (!resultTriggerDeployment.data?.triggerDeployment) {
          throw resultTriggerDeployment.error || new Error('Failed to trigger deployment');
        }

        toast.success({
          message: SUCCESS_MESSAGE,
          duration: 1000,
        });

        router.push(
          routes.project.site.deployments.detail({
            projectId,
            siteId,
            deploymentId: resultTriggerDeployment.data?.triggerDeployment.id!,
          })
        );

        return resultTriggerDeployment.data?.triggerDeployment.id;
      } catch (error) {
        toast.error({ error, log: 'Trigger deployment failed' });
      }
    },
    [client, router, toast, triggerDeployment]
  );

  return useMutation({ mutationFn: triggerSiteDeployment });
};
