import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';

import { ComingSoon, ExternalLink } from '@/components';
import { SiteQuotaTooltip } from '@/components/SiteQuotaTooltip/SiteQuotaTooltip';
import { constants } from '@/constants';
import { GitIntegration, Site } from '@/fragments';
import { useSiteQuery } from '@/generated/graphqlClient';
import { useCanDeploySite } from '@/hooks/useCanDeploySite';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSiteLink } from '@/hooks/useSiteLink';
import {
  useSiteRedeploy,
  useTriggerSiteDeployment,
} from '@/hooks/useSiteRedeploy';
import { Page } from '@/types/App';
import { Box, Button } from '@/ui';
import { getSelfManagedFileSnippets } from '@/utils/getSelfManagedFileSnippets';
import { getSiteCurrentDeployment } from '@/utils/getSiteCurrentDeployment';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { withAccess } from '@/utils/withAccess';

const SitePage: Page = () => {
  const router = useRouter();
  const siteId = router.query.siteId!;
  const projectId = router.query.projectId!;
  const [flagForPolling, setFlagForPolling] = useState(false);

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: siteId } },
    requestPolicy: 'cache-and-network',
  });
  const redeploy = useSiteRedeploy();

  const isLoading = siteQuery.fetching;

  const site = siteQuery.data?.site;
  const isSelfManaged = isSiteSelfManaged(site);
  const currentDeployment = getSiteCurrentDeployment(site);

  const handleRedeploy = async (deploymentId: string) => {
    await redeploy.mutateAsync({ siteId, deploymentId });
  };

  const handleFlagSelfManagedSetedUp = () => {
    setFlagForPolling(true);
  };

  useEffect(() => {
    if (flagForPolling && site && site.lastDeployment) {
      const deploymentId = site.lastDeployment.id;

      router
        .prefetch(
          routes.project.site.deployments.detail({
            projectId,
            siteId,
            deploymentId,
          }),
        )
        .finally(() => {
          router.push(
            routes.project.site.deployments.detail({
              projectId,
              siteId,
              deploymentId,
            }),
          );
        });
    }
  }, [flagForPolling, site, projectId, router, siteId]);

  if (!isLoading && isSelfManaged) {
    if (flagForPolling) {
      return (
        <>
          <Site.Elements.Overview siteQuery={siteQuery} />
          <Site.Elements.SelfManaged.Polling siteId={siteId} />
        </>
      );
    }

    if (!currentDeployment) {
      return (
        <>
          <Site.Elements.Overview siteQuery={siteQuery} />
          <Site.Elements.SelfManaged.Setup
            projectId={projectId}
            title="Copy Config Files"
            description="In order to deploy your site, you will need to copy the below code snippets and add them to your project."
            codeSnippets={getSelfManagedFileSnippets(site)}
            flagSelfManagedSetedUp={handleFlagSelfManagedSetedUp}
          />
        </>
      );
    }
  }

  return (
    <>
      <GitIntegration.SiteDisconnectedAlert siteQuery={siteQuery} />
      <Site.Elements.Overview siteQuery={siteQuery} />
      <Site.Elements.RecentDeploy
        siteQuery={siteQuery}
        isSelfManaged={isSelfManaged as boolean}
        onRedeploy={handleRedeploy}
      />
      <Box className="sm:flex-row gap-5">
        <ComingSoon.Overlay
          description="Monitor the activity and changes on your application."
          className="flex-1"
        >
          <Site.Elements.Analytics />
        </ComingSoon.Overlay>
        <ComingSoon.Overlay
          description="Monitor your application's performance and user metrics."
          className="flex-1"
        >
          <Site.Elements.Performance score={99} />
        </ComingSoon.Overlay>
      </Box>
    </>
  );
};

const PageNavContent: React.FC = () => {
  const router = useRouter();
  const siteId = router.query.siteId!;
  const hasDeployPermission = usePermissions({
    action: [constants.PERMISSION.SITE.DEPLOY],
  });

  const siteQuota = useCanDeploySite({ siteId });
  const triggerDeploy = useTriggerSiteDeployment();

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: siteId } },
    requestPolicy: 'cache-and-network',
  });

  const site = siteQuery.data?.site;

  const isSelfManaged = isSiteSelfManaged(site);
  const siteLink = useSiteLink({ siteId }) || '#';

  const ipfsHash = site?.currentDeployment?.cid || '';

  const handleRedeploy = async () => {
    await triggerDeploy.mutateAsync({ siteId });
  };

  return (
    <Box className="flex-row gap-2">
      {!isSelfManaged && hasDeployPermission && (
        <SiteQuotaTooltip
          canDeploy={siteQuota.canDeploy}
          isLoading={siteQuota.isFetching}
        >
          <Button
            intent="neutral"
            onClick={handleRedeploy}
            disabled={triggerDeploy.isLoading || !siteQuota.canDeploy}
            loading={triggerDeploy.isLoading || siteQuota.isFetching}
            iconRight="refresh"
          >
            Redeploy
          </Button>
        </SiteQuotaTooltip>
      )}

      <ExternalLink href={routes.ipfsPropagation.withHash({ hash: ipfsHash })}>
        <Button intent="neutral" disabled={!ipfsHash} iconRight="bolt">
          View on IPFS
        </Button>
      </ExternalLink>
      <ExternalLink href={siteLink}>
        <Button
          disabled={!siteLink || !site?.currentDeployment}
          iconRight="arrow-up-right"
        >
          Visit site
        </Button>
      </ExternalLink>
    </Box>
  );
};

SitePage.getLayout = (page) => (
  <Site.Layout nav={<PageNavContent />}>{page}</Site.Layout>
);

export default withAccess({
  Component: SitePage,
  requiredPermissions: [constants.PERMISSION.SITE.VIEW_OVERVIEW],
});
