import { DeploymentQuery } from '@/generated/graphqlClient';

export type DeploymentStatus =
  | 'created'
  | 'success'
  | 'failed'
  | 'loading'
  | 'cancelled'
  | 'cancelling';

export type Deployment = DeploymentQuery['deployment'];

export type DeploymentBuild = DeploymentQuery['deployment']['build'];
