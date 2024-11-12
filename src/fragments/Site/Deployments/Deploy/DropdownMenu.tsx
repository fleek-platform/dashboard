import { routes } from '@fleek-platform/utils-routes';
import { useState } from 'react';

import { ExternalLink, Link, SettingsListItem } from '@/components';
import { SiteQuotaTooltip } from '@/components/SiteQuotaTooltip/SiteQuotaTooltip';
import { constants } from '@/constants';
import { CancelDeploymentModal } from '@/fragments/DeploymentDetail/CancelDeploymentModal';
import { useCanDeploySite } from '@/hooks/useCanDeploySite';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSiteLink } from '@/hooks/useSiteLink';
import { useToast } from '@/hooks/useToast';
import { Deployment } from '@/types/Deployment';
import { Menu } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { getDeploymentLinkForRepository } from '@/utils/deployUtils';
import { isDeployCancelable } from '@/utils/isDeployCancelable';
import { parseAPIDeploymentStatus } from '@/utils/parseAPIDeploymentStatus';
import { getLinkForSiteSlug } from '@/utils/siteSlugLinks';

export type DropdownMenuProps = {
  deployment: Deployment;
  onRedeploy: (deployId: string) => Promise<void>;
  isSelfManaged: boolean;
  canRedeploy: boolean;
};

type HandleAsyncActionProps = (id: string) => Promise<void>;

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  deployment,
  onRedeploy,
  isSelfManaged,
}) => {
  const router = useRouter();
  const siteId = router.query.siteId!;
  const projectId = router.query.projectId!;
  const status = parseAPIDeploymentStatus(deployment.status);
  const siteQuota = useCanDeploySite({ siteId });
  const hasDeployPermission = usePermissions({
    action: [constants.PERMISSION.SITE.DEPLOY],
  });
  const hasViewBuildSettings = usePermissions({
    action: [constants.PERMISSION.SITE.VIEW_BUILD_SETTINGS],
  });

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const siteLink = useSiteLink({ siteId });
  const deploymentURL = deployment.previewUrlSlug
    ? getLinkForSiteSlug(deployment.previewUrlSlug)
    : siteLink;

  const isCancelable = isDeployCancelable({ deployment });

  const toast = useToast();

  const handleAsyncAction = (action: HandleAsyncActionProps) => async () => {
    setIsLoading(true);
    await action(deployment.id);
    setIsLoading(false);
  };

  const handleCopyUrl = () => {
    try {
      copyToClipboard(
        `${window.location.origin}${routes.project.site.deployments.detail({ projectId, siteId, deploymentId: deployment.id })}`,
      );
      toast.success({ message: 'URL copied to clipboard' });
    } catch {
      toast.error({ message: 'Failed to copy URL to clipboard' });
    }
  };

  const handleCopyId = () => {
    try {
      copyToClipboard(deployment.id);
      toast.success({ message: 'Deployment ID copied to clipboard' });
    } catch {
      toast.error({ message: 'Failed to copy Deployment ID to clipboard' });
    }
  };

  const linkForRepository = getDeploymentLinkForRepository(deployment);

  const renderDeployActions = () => {
    if (isSelfManaged || !hasDeployPermission) {
      return null;
    }

    if (status === 'loading' || status === 'created') {
      return (
        <SettingsListItem.DropdownMenuItem
          icon="close"
          onClick={() => setIsCancelModalOpen(true)}
          disabled={!isCancelable}
        >
          Cancel deployment
        </SettingsListItem.DropdownMenuItem>
      );
    }

    return (
      <SiteQuotaTooltip
        canDeploy={siteQuota.canDeploy}
        isLoading={siteQuota.isFetching}
        side="left"
      >
        <SettingsListItem.DropdownMenuItem
          icon="refresh"
          onClick={handleAsyncAction(onRedeploy)}
          disabled={!siteQuota.canDeploy}
        >
          Redeploy
        </SettingsListItem.DropdownMenuItem>
      </SiteQuotaTooltip>
    );
  };

  return (
    <>
      <CancelDeploymentModal
        open={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        isDeploymentCancelable={isCancelable}
        deploymentId={deployment.id}
      />
      <SettingsListItem.DropdownMenu isLoading={isLoading}>
        {renderDeployActions()}

        <Link
          href={routes.project.site.deployments.detail({
            projectId,
            siteId,
            deploymentId: deployment.id,
          })}
        >
          <SettingsListItem.DropdownMenuItem icon="expand">
            View details
          </SettingsListItem.DropdownMenuItem>
        </Link>

        {linkForRepository && (
          <SettingsListItem.DropdownMenuItem
            href={linkForRepository}
            icon="code"
          >
            View source
          </SettingsListItem.DropdownMenuItem>
        )}

        {hasViewBuildSettings && (
          <Link
            href={routes.project.site.settings.build({ projectId, siteId })}
          >
            <SettingsListItem.DropdownMenuItem icon="gear">
              View build settings
            </SettingsListItem.DropdownMenuItem>
          </Link>
        )}

        <Menu.Separator />
        <SettingsListItem.DropdownMenuItem icon="copy" onClick={handleCopyUrl}>
          Copy deploy URL
        </SettingsListItem.DropdownMenuItem>

        <SettingsListItem.DropdownMenuItem icon="copy" onClick={handleCopyId}>
          Copy deploy ID
        </SettingsListItem.DropdownMenuItem>
        {status === 'success' && (
          <>
            <SettingsListItem.DropdownMenuSeparator />

            <ExternalLink href={deploymentURL}>
              <SettingsListItem.DropdownMenuItem icon="arrow-up-right">
                Visit
              </SettingsListItem.DropdownMenuItem>
            </ExternalLink>
          </>
        )}
      </SettingsListItem.DropdownMenu>
    </>
  );
};
