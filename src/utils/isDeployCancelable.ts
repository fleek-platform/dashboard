import { DeploymentStatus } from '@/generated/graphqlClient';
import type { Deployment } from '@/types/Deployment';

type IsDeployCancelableArgs = {
  deployment: Deployment;
};

export const isDeployCancelable = ({ deployment }: IsDeployCancelableArgs) =>
  deployment.status === DeploymentStatus.BUILD_IN_PROGRESS ||
  deployment.status === DeploymentStatus.CREATED; // for now we can only cancel deployments that are in BUILD_IN_PROGRESS or CREATED (aka queued)
