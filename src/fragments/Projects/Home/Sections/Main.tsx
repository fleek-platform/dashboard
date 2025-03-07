import { routes } from '@fleek-platform/utils-routes';
import { useState } from 'react';

import { ActionBox, PermissionsTooltip, RestrictionModal } from '@/components';
import { constants } from '@/constants';
import { useSiteRestriction } from '@/hooks/useBillingRestriction';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionContext } from '@/providers/SessionProvider';
import { secrets } from '@/secrets';
import { Text } from '@/ui';

import { SectionsStyles as S } from './Sections.styles';

const WEBSITE_ELIZA_URL = `${secrets.NEXT_PUBLIC_WEBSITE_URL}/eliza/`;

export const Main: React.FC = () => {
  const session = useSessionContext();
  const hasCreateSitePermission = usePermissions({
    action: [constants.PERMISSION.SITE.CREATE],
  });
  const hasStoragePermissions = usePermissions({
    action: [constants.PERMISSION.STORAGE.UPLOAD],
  });
  const hasReachedSitesLimit = useSiteRestriction().hasReachedLimit;
  const hasManageBillingPermission = usePermissions({
    action: [constants.PERMISSION.BILLING.MANAGE],
  });
  const hasCreateAgentPermission = usePermissions({
    action: [constants.PERMISSION.AGENTS_AI.CREATE],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onActionBoxClick = () => {
    if (hasReachedSitesLimit) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <RestrictionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        shouldShowUpgradePlan={hasManageBillingPermission}
      />
      <S.Main.GridArea>
        <Text as="h2" size="xl" weight={500}>
          Get on Fleek!
        </Text>
        <S.Main.ListWrapper>
          <PermissionsTooltip hasAccess={hasCreateSitePermission}>
            <ActionBox
              onClick={onActionBoxClick}
              href={routes.project.site.list({ projectId: session.project.id })}
              icon="browser"
              title="Deploy your site"
              description="Connect your Git Provider or use the Fleek CLI."
              isDisabled={!hasCreateSitePermission}
              isRestricted={hasReachedSitesLimit}
            />
          </PermissionsTooltip>
          <PermissionsTooltip hasAccess={hasCreateAgentPermission}>
            <ActionBox
              isExternalLink
              href={WEBSITE_ELIZA_URL}
              icon="robot"
              title="Create an AI agent"
              description="Build an AI agent using the Eliza framework."
              isDisabled={!hasCreateAgentPermission}
            />
          </PermissionsTooltip>
          <PermissionsTooltip hasAccess={hasStoragePermissions} side="bottom">
            <ActionBox
              href={routes.project.storage({ projectId: session.project.id })}
              icon="archive"
              title="Store your files"
              description="Add files to Fleek and use IPFS, Arweave, and Filecoin for storage."
              isDisabled={!hasStoragePermissions}
            />
          </PermissionsTooltip>
        </S.Main.ListWrapper>
      </S.Main.GridArea>
    </>
  );
};
