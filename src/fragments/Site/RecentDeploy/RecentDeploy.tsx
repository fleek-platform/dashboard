import { useMemo } from 'react';

import { DeploymentStatus, StorageType, useSiteQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { forwardStyledRef } from '@/theme';
import { Deployment } from '@/types/Deployment';
import { Site } from '@/types/Site';
import { Skeleton, Text } from '@/ui';
import { canRedeploySite } from '@/utils/canRedeploySite';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';

import { Deploy, DeployAuthorSkeleton, DeployItemSkeleton, DeployProps, DeploySkeleton } from '../Deployments/Deploy/Deploy';
import { RecentDeployStyles as S } from './RecentDeploy.styles';

export type RecentDeployProps = Pick<DeployProps, 'onRedeploy'> & { isSelfManaged: boolean };

export const RecentDeploy = forwardStyledRef<HTMLDivElement, RecentDeployProps>(S.Container, ({ isSelfManaged, onRedeploy }, ref) => {
  const router = useRouter();
  const siteId = router.query.siteId!;
  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });

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
    <S.Container ref={ref}>
      <Text as="h3" variant="primary" size="lg" weight={700}>
        Recent Deploy
      </Text>
      <Deploy
        deployment={recentDeploy || mockedDeployment}
        onRedeploy={handleRedeploy}
        isSelfManaged={isSelfManaged}
        canRedeploy={canRedeploySite({ status: parsedStatus })}
        isMostRecentDeployment
      />
    </S.Container>
  );
});

const RecentDeploySkeleton: React.FC = () => (
  <S.Container>
    <S.TitleSkeleton>
      <Skeleton />
    </S.TitleSkeleton>
    <DeploySkeleton>
      <DeployItemSkeleton />
      <DeployItemSkeleton />
      <DeployItemSkeleton />
      <DeployAuthorSkeleton />
    </DeploySkeleton>
  </S.Container>
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
    [site]
  );
