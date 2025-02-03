import { routes } from '@fleek-platform/utils-routes';
import { useState } from 'react';

import { ExternalLink } from '@/components';
import { SiteQuotaTooltip } from '@/components/SiteQuotaTooltip/SiteQuotaTooltip';
import { constants } from '@/constants';
import { useDeploymentQuery, useSiteQuery } from '@/generated/graphqlClient';
import { useCanDeploySite } from '@/hooks/useCanDeploySite';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSiteLink } from '@/hooks/useSiteLink';
import { useSiteRedeploy } from '@/hooks/useSiteRedeploy';
import { Box, Button } from '@/ui';
import { isDeployCancelable } from '@/utils/isDeployCancelable';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';
import { getLinkForSiteSlug } from '@/utils/siteSlugLinks';

import { CancelDeploymentModal } from './CancelDeploymentModal';

export const NavButtons: React.FC = () => {
  const router = useRouter();
  const deploymentId = router.query.deploymentId!;
  const siteId = router.query.siteId!;
  const [deploymentQuery] = useDeploymentQuery({
    variables: { where: { id: deploymentId } },
  });
  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });
  const hasDeployPermission = usePermissions({
    action: [constants.PERMISSION.SITE.DEPLOY],
  });
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const siteQuota = useCanDeploySite({ siteId });

  const site = siteQuery.data?.site;
  const isSelfManaged = isSiteSelfManaged(site);

  const redeploy = useSiteRedeploy();

  const deployment = deploymentQuery.data?.deployment;

  const siteLink = useSiteLink({ siteId }) || '#';

  const deploymentURL = deployment?.previewUrlSlug
    ? getLinkForSiteSlug(deployment.previewUrlSlug)
    : siteLink;

  const parsedStatus = parseAPIDeploymentStatus(deployment?.status);

  if (!deployment) {
    // TODO add error page
    return null;
  }

  if (deploymentQuery.fetching) {
    return null;
  }

  const handleRedeploy = async () => {
    await redeploy.mutateAsync({
      siteId,
      deploymentId,
    });
  };

  const handleCancelDeploy = async () => {
    setIsCancelModalOpen(true);
  };

  const isCancelable = isDeployCancelable({ deployment });

  if (isSelfManaged && parsedStatus === 'success') {
    return (
      <Box>
        <ExternalLink href={siteLink}>
          <Button disabled={!siteLink}>Visit site</Button>
        </ExternalLink>
      </Box>
    );
  }

  const ipfsHash = site?.currentDeployment?.cid || '';

  switch (parsedStatus) {
    case 'cancelling':
    case 'loading':
    case 'created':
      return hasDeployPermission ? (
        <>
          <CancelDeploymentModal
            open={isCancelModalOpen}
            onOpenChange={setIsCancelModalOpen}
            isDeploymentCancelable={isCancelable}
            deploymentId={deploymentId}
          />
          <Button
            intent="neutral"
            disabled={!isCancelable}
            onClick={handleCancelDeploy}
          >
            Cancel deployment
          </Button>
        </>
      ) : null;
    case 'cancelled':
    case 'failed':
      return hasDeployPermission ? (
        <SiteQuotaTooltip
          canDeploy={siteQuota.canDeploy}
          isLoading={siteQuota.isFetching}
        >
          <Button
            intent="neutral"
            onClick={handleRedeploy}
            loading={redeploy.isLoading || siteQuota.isFetching}
            disabled={redeploy.isLoading || !siteQuota.canDeploy}
            iconRight="refresh"
          >
            Redeploy
          </Button>
        </SiteQuotaTooltip>
      ) : null;
    case 'success':
      return (
        <Box className="flex-row gap-2">
          {hasDeployPermission && (
            <SiteQuotaTooltip
              canDeploy={siteQuota.canDeploy}
              isLoading={siteQuota.isFetching}
            >
              <Button
                intent="neutral"
                onClick={handleRedeploy}
                loading={redeploy.isLoading || siteQuota.isFetching}
                disabled={redeploy.isLoading || !siteQuota.canDeploy}
                iconRight="refresh"
              >
                Redeploy
              </Button>
            </SiteQuotaTooltip>
          )}

          <ExternalLink
            href={routes.ipfsPropagation.withHash({ hash: ipfsHash })}
          >
            <Button intent="neutral" disabled={!ipfsHash} iconRight="bolt">
              View on IPFS
            </Button>
          </ExternalLink>
          <ExternalLink href={deploymentURL}>
            <Button disabled={!deploymentURL} iconRight="arrow-up-right">
              {deployment.previewUrlSlug ? 'Visit preview' : 'Visit site'}
            </Button>
          </ExternalLink>
        </Box>
      );
    default:
      return null;
  }
};
