import { SiteQuotaTooltip } from '@/components/SiteQuotaTooltip/SiteQuotaTooltip';
import { constants } from '@/constants';
import { Site } from '@/fragments';
import { useSiteQuery } from '@/generated/graphqlClient';
import { useCanDeploySite } from '@/hooks/useCanDeploySite';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useTriggerSiteDeployment } from '@/hooks/useSiteRedeploy';
import { Page } from '@/types/App';
import { Button } from '@/ui';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { withAccess } from '@/utils/withAccess';

const DeploymentsPage: Page = () => {
  return <Site.Deployments />;
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

  const handleRedeploy = async () => {
    await triggerDeploy.mutateAsync({ siteId });
  };

  if (!isSelfManaged && hasDeployPermission) {
    return (
      <SiteQuotaTooltip canDeploy={siteQuota.canDeploy} isLoading={siteQuota.isFetching}>
        <Button
          intent="neutral"
          onClick={handleRedeploy}
          loading={triggerDeploy.isLoading || siteQuota.isFetching}
          disabled={triggerDeploy.isLoading || !siteQuota.canDeploy}
        >
          Redeploy
        </Button>
      </SiteQuotaTooltip>
    );
  }

  return null;
};

DeploymentsPage.getLayout = (page) => <Site.Layout nav={<PageNavContent />}>{page}</Site.Layout>;

export default withAccess({ Component: DeploymentsPage, requiredPermissions: [constants.PERMISSION.SITE.VIEW_DEPLOYMENTS] });
