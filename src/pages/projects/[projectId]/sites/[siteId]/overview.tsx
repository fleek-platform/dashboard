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
import { useSiteRedeploy, useTriggerSiteDeployment } from '@/hooks/useSiteRedeploy';
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

  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } }, requestPolicy: 'cache-and-network' });
  const redeploy = useSiteRedeploy();

  const isLoading = siteQuery.fetching;

  const site = siteQuery.data?.site;
  const ipnsRecords = site?.ipnsRecords || [];
  const ipnsName = ipnsRecords[ipnsRecords.length - 1]?.name;
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

      router.prefetch(routes.project.site.deployments.detail({ projectId, siteId, deploymentId })).finally(() => {
        router.push(routes.project.site.deployments.detail({ projectId, siteId, deploymentId }));
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
      <Site.Elements.RecentDeploy isSelfManaged={isSelfManaged as boolean} onRedeploy={handleRedeploy} />
      <Site.Containers.Row>
        <Site.Containers.MainColumn>
          <Site.Elements.Ipfs
            cid={currentDeployment?.cid}
            ipns={ipnsName}
            active={Boolean(currentDeployment?.cid || ipnsName)}
            isLoading={isLoading}
            isFn={Boolean(site?.currentDeployment?.functionDeployments?.length)}
          />
          <Site.Elements.CustomENS />
          <Site.Elements.CustomDomain />
        </Site.Containers.MainColumn>
        <Site.Containers.RightColumn>
          <ComingSoon.Overlay description="Monitor your application's performance and user metrics." isLoading={isLoading}>
            <Site.Elements.Performance score={99} isLoading={isLoading} />
          </ComingSoon.Overlay>
          <ComingSoon.Overlay description="Monitor the activity and changes on your application." isLoading={isLoading}>
            <Site.Elements.AuditLog
              items={[
                { category: 'deploy-live', label: '5m ago', urlTitle: 'asdv', url: '#' },
                { category: 'deploy-started', label: '10m ago', urlTitle: 'hzcs', url: '#' },
                { category: 'site-healthy', label: '15m ago' },
              ]}
              isLoading={isLoading}
            />
          </ComingSoon.Overlay>
        </Site.Containers.RightColumn>
      </Site.Containers.Row>
    </>
  );
};

const PageNavContent: React.FC = () => {
  const router = useRouter();
  const siteId = router.query.siteId!;
  const hasDeployPermission = usePermissions({ action: [constants.PERMISSION.SITE.DEPLOY] });

  const siteQuota = useCanDeploySite({ siteId });
  const triggerDeploy = useTriggerSiteDeployment();

  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } }, requestPolicy: 'cache-and-network' });

  const site = siteQuery.data?.site;

  const isSelfManaged = isSiteSelfManaged(site);
  const siteLink = useSiteLink({ siteId });

  const handleRedeploy = async () => {
    await triggerDeploy.mutateAsync({ siteId });
  };

  return (
    <Box className="flex-row gap-3">
      {!isSelfManaged && hasDeployPermission && (
        <SiteQuotaTooltip canDeploy={siteQuota.canDeploy} isLoading={siteQuota.isFetching}>
          <Button
            intent="neutral"
            onClick={handleRedeploy}
            disabled={triggerDeploy.isLoading || !siteQuota.canDeploy}
            loading={triggerDeploy.isLoading || siteQuota.isFetching}
          >
            Redeploy
          </Button>
        </SiteQuotaTooltip>
      )}
      <ExternalLink href={siteLink}>
        <Button disabled={!siteLink || !site?.currentDeployment}>Visit site</Button>
      </ExternalLink>
    </Box>
  );
};

SitePage.getLayout = (page) => <Site.Layout nav={<PageNavContent />}>{page}</Site.Layout>;

export default withAccess({ Component: SitePage, requiredPermissions: [constants.PERMISSION.SITE.VIEW_OVERVIEW] });
