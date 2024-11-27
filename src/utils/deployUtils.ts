import { BadgeTextColor, PreviewImageProps } from '@/components';
import { Deployment, DeploymentStatus } from '@/types/Deployment';
import { IconName, IconProps } from '@/ui';
import { getLinkForRepository } from '@/utils/getLinkForRepository';
import { parseAPISourceProvider } from '@/utils/parseAPISourceProvider';

export type StatusData = {
  label: string;
  icon: IconName;
  animation?: IconProps['animated'];
  color: BadgeTextColor;
  imageStatus: PreviewImageProps['status'];
  imageText?: string;
};

export const statusDataMap: Record<DeploymentStatus, StatusData> = {
  created: {
    label: 'Queued',
    icon: 'hour-glass',
    color: 'slate',
    imageStatus: 'pending',
    imageText: 'Waiting for build to start...',
  },
  cancelling: {
    label: 'Cancelling',
    icon: 'close-circle',
    color: 'slate',
    imageStatus: 'pending',
    imageText: 'Cancelling deployment',
  },
  cancelled: {
    label: 'Canceled',
    icon: 'close-circle',
    color: 'slate',
    imageStatus: 'pending',
    imageText: 'Deployment was canceled',
  },
  loading: {
    label: 'Building',
    icon: 'gear',
    color: 'amber',
    animation: 'spin',
    imageStatus: 'building',
    imageText: 'Waiting for deploy to finish...',
  },
  success: {
    label: 'Ready',
    icon: 'check-circled',
    color: 'green',
    imageStatus: 'success',
  },
  failed: {
    label: 'Failed',
    icon: 'close-circle',
    color: 'red',
    imageStatus: 'failed',
    imageText: 'Deployment failed',
  },
};

type GetDeploymentLinkForRepositoryArgs = Deployment;

export const getDeploymentLinkForRepository = (deployment: GetDeploymentLinkForRepositoryArgs) => {
  const { sourceProvider, sourceRepositoryOwner: slug, sourceRepositoryName: name, sourceRef } = deployment;
  const provider = parseAPISourceProvider(sourceProvider);

  if (!provider || !name || !slug || !name || !sourceRef) {
    return;
  }

  return getLinkForRepository({ provider, slug, name, sourceRef });
};
