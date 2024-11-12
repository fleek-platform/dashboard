import { routes } from '@fleek-platform/utils-routes';
import { useEffect } from 'react';

import { constants } from '@/constants';
import { useDeploymentsQuery, useSiteQuery } from '@/generated/graphqlClient';
import { useQueryPagination } from '@/hooks/useQueryPagination';
import { useRouter } from '@/hooks/useRouter';
import { useSiteRedeploy } from '@/hooks/useSiteRedeploy';
import { Box, Divider, Icon, Pagination, Text } from '@/ui';
import { canRedeploySite } from '@/utils/canRedeploySite';
import { getSiteCurrentDeployment } from '@/utils/getSiteCurrentDeployment';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';

import {
  Deploy,
  DeployAuthorSkeleton,
  DeployItemSkeleton,
  DeploySkeleton,
} from './Deploy/Deploy';
import { DeploymentsStyles as S } from './Deployments.styles';

export const Deployments: React.FC = () => {
  const router = useRouter();
  const projectId = router.query.projectId!;
  const siteId = router.query.siteId!;

  const { page, handlePageChange, setPageCount } = useQueryPagination({
    pathname: routes.project.site.deployments.list({ projectId, siteId }),
  });

  const redeploy = useSiteRedeploy();

  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });
  const [deploymentsQuery] = useDeploymentsQuery({
    variables: {
      where: { siteId },
      filter: { page: page, take: constants.DEPLOYMENTS_PAGE_SIZE },
    },
    requestPolicy: 'cache-and-network',
  });

  const pageCount = deploymentsQuery.data?.deployments.pageCount;

  useEffect(() => {
    if (deploymentsQuery.data?.deployments.pageCount) {
      setPageCount(deploymentsQuery.data.deployments.pageCount);
    }
  }, [deploymentsQuery.data, setPageCount]);

  const deployments = deploymentsQuery.data?.deployments.data || [];

  const isSelfManaged = isSiteSelfManaged(siteQuery.data?.site);

  const handleRedeploy = async (deploymentId: string) => {
    await redeploy.mutateAsync({ siteId, deploymentId });
  };

  if (
    !siteQuery.fetching &&
    !deploymentsQuery.fetching &&
    deployments.length === 0
  ) {
    return <EmptyDeployments />;
  }

  const currentDeployment = getSiteCurrentDeployment(siteQuery.data?.site!);

  const lastDeploymentParsedStatus = parseAPIDeploymentStatus(
    siteQuery.data?.site?.lastDeployment?.status,
  );

  return (
    <S.Container>
      <>
        {deploymentsQuery.fetching && deployments.length === 0 ? (
          <TableSkeleton />
        ) : (
          <S.Table>
            {deploymentsQuery.fetching && (
              <>
                <RowSkeleton /> <Divider />
              </>
            )}
            {deployments.map((deployment, index) => (
              <Box key={deployment.id}>
                <Deploy
                  className="p-4"
                  deployment={deployment}
                  onRedeploy={handleRedeploy}
                  isSelfManaged={isSelfManaged ?? false}
                  canRedeploy={canRedeploySite({
                    status: lastDeploymentParsedStatus,
                  })}
                  isMostRecentDeployment={
                    currentDeployment?.id === deployment.id
                  }
                />
                {index < deployments.length - 1 && <Divider />}
              </Box>
            ))}
          </S.Table>
        )}
        {pageCount && pageCount > 1 && (
          <Pagination
            totalPages={pageCount}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        )}
      </>
    </S.Container>
  );
};

const EmptyDeployments: React.FC = () => (
  <S.EmptyContent.Container>
    <Icon name="question" />
    <S.EmptyContent.Title>No deployments yet</S.EmptyContent.Title>
    <Text>Deploy your site to see your deployments here</Text>
  </S.EmptyContent.Container>
);

const TableSkeleton: React.FC = () => (
  <S.Table>
    <RowSkeleton />
    <Divider />
    <RowSkeleton />
    <Divider />
    <RowSkeleton />
  </S.Table>
);

const RowSkeleton: React.FC = () => (
  <DeploySkeleton className="p-4">
    <DeployItemSkeleton />
    <DeployItemSkeleton />
    <DeployItemSkeleton />
    <DeployAuthorSkeleton />
  </DeploySkeleton>
);
