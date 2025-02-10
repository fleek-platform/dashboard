import { useMemo } from 'react';
import { UseQueryState } from 'urql';

import { AlertBox } from '@/components';
import { DeploymentStatus, StorageType } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { Deployment } from '@/types/Deployment';
import { ChildrenProps } from '@/types/Props';
import { Site } from '@/types/Site';
import { Box, Skeleton, Text } from '@/ui';
import { canRedeploySite } from '@/utils/canRedeploySite';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';

import {
  Deploy,
  DeployAuthorSkeleton,
  DeployItemSkeleton,
  DeployProps,
  DeploySkeleton,
} from '../Deployments/Deploy/Deploy';

export type RecentDeployProps = Pick<DeployProps, 'onRedeploy'> & {
  isSelfManaged: boolean;
  siteQuery: UseQueryState<{ site: Site }, { where: { id: string } }>;
};

export const RecentDeploy: React.FC<RecentDeployProps> = ({
  isSelfManaged,
  siteQuery,
  onRedeploy,
}) => {
  const router = useRouter();

  const siteId = router.query.siteId!;
  const projectId = router.query.projectId!;

  const mockedDeployment = useMockedDeployment(siteQuery.data?.site);

  const recentDeploy = siteQuery.data?.site.lastDeployment;
  const parsedStatus = parseAPIDeploymentStatus(recentDeploy?.status);

  const handleRedeploy = async (deploymentId: string) => {
    await onRedeploy(deploymentId);
  };

  if (siteQuery.fetching) {
    return <RecentDeploySkeleton />;
  }

  return (
    <BaseBox>
      <Text as="h3" variant="primary" size="md" weight={700}>
        Recent Deployment
      </Text>
      <Deploy
        projectId={projectId}
        siteId={siteId}
        deployment={recentDeploy || mockedDeployment}
        onRedeploy={handleRedeploy}
        isSelfManaged={isSelfManaged}
        canRedeploy={canRedeploySite({ status: parsedStatus })}
        isMostRecentDeployment
      />
      <AlertBox size="xs" variant="ghost" className="bg-transparent">
        To update your production deployment, push to the &quot;main&quot;
        branch.
      </AlertBox>
    </BaseBox>
  );
};

const BaseBox: React.FC<ChildrenProps> = ({ children }) => (
  <Box
    variant="container"
    className="bg-surface-content gap-5 min-h-[11.0625rem]"
  >
    {children}
  </Box>
);

const RecentDeploySkeleton: React.FC = () => (
  <BaseBox>
    <Box>
      <Skeleton className="w-1/4 h-[1.375rem]" />
    </Box>
    <DeploySkeleton>
      <DeployItemSkeleton />
      <DeployItemSkeleton />
      <DeployItemSkeleton />
      <DeployAuthorSkeleton />
    </DeploySkeleton>
    <AlertBox size="xs" variant="ghost" className="bg-transparent">
      To update your production deployment, push to the &quot;main&quot; branch.
    </AlertBox>
  </BaseBox>
);

type UseMockedDeploymentProps = Site;

const useMockedDeployment = (site?: UseMockedDeploymentProps): Deployment =>
  useMemo(
    () => ({
      id: '',
      status: DeploymentStatus.BUILD_IN_PROGRESS,
      createdAt: '',
      updatedAt: '',
      storageType: StorageType.IPFS,
      sourceProvider: site?.sourceProvider,
      sourceRepositoryOwner: site?.sourceRepositoryOwner,
      sourceRepositoryName: site?.sourceRepositoryName,
      sourceBranch: site?.sourceBranch,
      sourceMessage: '-',
      sourceAuthor: '-',
      sourceRef: '-',
      previewOnly: false,
    }),
    [site],
  );
