import { Site } from '@/types/Site';

type GetSiteCurrentDeploymentArgs = Site | undefined;

export const getSiteCurrentDeployment = (site?: GetSiteCurrentDeploymentArgs) => {
  if (!site) {
    return;
  }

  const currentDeployment = site.currentDeployment || site.lastDeployment;

  return currentDeployment;
};
