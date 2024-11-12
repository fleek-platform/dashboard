import { DeploymentStatus } from '@/types/Deployment';

type CanRedeploySiteArgs = {
  status: DeploymentStatus;
};

export const canRedeploySite = ({ status }: CanRedeploySiteArgs) => {
  if (status === 'success' || status === 'failed' || status === 'cancelled') {
    return true;
  }

  return false;
};
