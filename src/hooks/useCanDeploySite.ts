import { constants } from '@/constants';
import { useSiteQuotaQuery } from '@/generated/graphqlClient';

import { usePermissions } from './usePermissions';

export const useCanDeploySite = ({ siteId }: { siteId: string }) => {
  const hasDeployPermission = usePermissions({
    action: [constants.PERMISSION.SITE.DEPLOY],
  });
  const [siteQuotaQuery, refetchSiteQuotaQuery] = useSiteQuotaQuery({
    variables: { where: { id: siteId } },
    requestPolicy: 'network-only',
    pause: !siteId,
  });

  if (!siteId || siteQuotaQuery.fetching) {
    return { isFetching: true, canDeploy: false };
  }

  if (siteQuotaQuery.error || !siteQuotaQuery.data?.siteQuota) {
    return { isFetching: false, isError: true, canDeploy: false };
  }

  const { siteQuota } = siteQuotaQuery.data;
  const canDeploy =
    siteQuota.maxDeploymentQueue.remaining > 0 && hasDeployPermission;

  return {
    total: siteQuota.maxDeploymentQueue.total,
    refetch: refetchSiteQuotaQuery,
    isFetching: false,
    canDeploy,
  };
};
