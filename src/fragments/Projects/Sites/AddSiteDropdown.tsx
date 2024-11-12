import { routes } from '@fleek-platform/utils-routes';
import { useState } from 'react';

import { DropdownItem, RestrictionModal } from '@/components';
import { constants } from '@/constants';
import { useSitesQuery } from '@/generated/graphqlClient';
import { useSiteRestriction } from '@/hooks/useBillingRestriction';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionContext } from '@/providers/SessionProvider';
import { Button, Menu, Skeleton } from '@/ui';

export const AddSiteDropdown: React.FC = () => {
  const session = useSessionContext();
  const hasDeployPermissions = usePermissions({
    action: [constants.PERMISSION.SITE.CREATE],
  });
  const hasManageBillingPermission = usePermissions({
    action: [constants.PERMISSION.BILLING.MANAGE],
  });

  const billingRestriction = useSiteRestriction();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sitesQuery] = useSitesQuery({
    variables: {
      where: {},
      filter: { take: constants.SITES_PAGE_SIZE, page: 1 },
    },
  });

  if (sitesQuery.fetching) {
    return <Skeleton variant="button" className="w-1/6 h-[2.75rem] shrink-0" />;
  }

  if (!hasDeployPermissions) {
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
          <Button iconRight="chevron-down">Add new</Button>
        </Menu.Trigger>

        <Menu.Content align="end">
          <DropdownItem
            text="Deploy my site"
            icon="deploy"
            href={routes.project.site.new({ projectId: session.project.id })}
            isBillingRestricted={billingRestriction.hasReachedLimit}
            openRestrictionModal={() => setIsModalOpen(true)}
          />
          <Menu.Separator />
          <DropdownItem
            text="Use a template"
            icon="dashboard"
            href={routes.template.list()}
            isBillingRestricted={billingRestriction.hasReachedLimit}
            openRestrictionModal={() => setIsModalOpen(true)}
          />
        </Menu.Content>
      </Menu.Root>
    </>
  );
};
