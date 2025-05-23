import { routes } from '@fleek-platform/utils-routes';
import React, { useState } from 'react';

import { DropdownItem, RestrictionModal } from '@/components';
import { constants } from '@/constants';
import { useSiteRestriction } from '@/hooks/useBillingRestriction';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionContext } from '@/providers/SessionProvider';
import { Button, Menu } from '@/ui';

import { FLEEK_TEMPLATES_URLS } from '../../../utils/template';
import { getAgentsUrl } from '@/utils/url';

const agentsUrl = getAgentsUrl();

export const AddNewDropdown: React.FC = () => {
  const session = useSessionContext();
  const hasDeployPermissions = usePermissions({
    action: [constants.PERMISSION.SITE.DEPLOY],
  });
  const hasUploadStoragePermission = usePermissions({
    action: [constants.PERMISSION.STORAGE.UPLOAD],
  });
  const hasManageBillingPermission = usePermissions({
    action: [constants.PERMISSION.BILLING.MANAGE],
  });
  const hasCreateAgentPermission = usePermissions({
    action: [constants.PERMISSION.AGENTS_AI.CREATE],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const billingRestriction = useSiteRestriction();

  if (
    !hasDeployPermissions &&
    !hasUploadStoragePermission &&
    !hasCreateAgentPermission
  ) {
    return null;
  }

  return (
    <>
      <RestrictionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        shouldShowUpgradePlan={hasManageBillingPermission}
      />
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button iconRight="chevron-down" iconLeft="plus">
            Create new
          </Button>
        </Menu.Trigger>

        <Menu.Content align="end">
          {hasDeployPermissions && (
            <>
              <DropdownItem
                text="Site"
                icon="deploy"
                href={routes.project.site.new({
                  projectId: session.project.id,
                })}
                isBillingRestricted={billingRestriction.hasReachedLimit}
                openRestrictionModal={() => setIsModalOpen(true)}
              />
              <Menu.Separator />
            </>
          )}
          {hasCreateAgentPermission && (
            <>
              <DropdownItem
                isExternalLink
                text="AI agent"
                icon="robot"
                href={agentsUrl}
              />
              <Menu.Separator />
            </>
          )}
          {hasDeployPermissions && (
            <>
              <DropdownItem
                text="Template site"
                icon="dashboard"
                href={FLEEK_TEMPLATES_URLS.templatesUrl}
                isBillingRestricted={billingRestriction.hasReachedLimit}
                openRestrictionModal={() => setIsModalOpen(true)}
              />
              <Menu.Separator />
            </>
          )}
          {hasUploadStoragePermission && (
            <>
              <DropdownItem
                text="Storage file"
                icon="archive"
                href={routes.project.storage({ projectId: session.project.id })}
              />
            </>
          )}
        </Menu.Content>
      </Menu.Root>
    </>
  );
};
