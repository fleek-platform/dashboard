import { useEffect } from 'react';

import { SettingsBox, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { SiteDomain } from '@/types/Site';
import { Box } from '@/ui';
import { isActiveDomain } from '@/utils/isActiveDomain';

import { useSettingsItemContext } from '../../Elements/SettingsItem.context';
import { DomainsListItem } from './DomainsListItem';

type DomainsListProps = {
  isLoading: boolean;
  domains?: SiteDomain[];
  primaryDomainId?: string;
  siteName: string;
};

export const DomainsList: React.FC<DomainsListProps> = ({ isLoading, domains = [], primaryDomainId, siteName }) => {
  const { setActiveDomains } = useSettingsItemContext();

  const hasVerifyDomainPermission = usePermissions({ action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_DOMAIN] });
  const hasRemoveDomainPermission = usePermissions({ action: [constants.PERMISSION.SITE.DELETE_DOMAIN] });
  const hasChangePrimaryDomainPermission = usePermissions({ action: [constants.PERMISSION.SITE.CHANGE_PRIMARY_DOMAIN] });

  useEffect(() => {
    setActiveDomains(domains.filter((domain) => isActiveDomain({ domain, primaryDomainId })) || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains]);

  if (isLoading) {
    return (
      <SettingsListItem.FlatRow>
        <SettingsListItem.DataSkeleton />
        <SettingsListItem.DataSkeleton />
        <Box />
      </SettingsListItem.FlatRow>
    );
  }

  if (domains.length === 0) {
    return <SettingsBox.EmptyContent title="No Domains" description="Once you add domains, they will appear here." />;
  }

  return (
    <>
      {domains.map((domain) => (
        <DomainsListItem
          key={domain.id}
          {...domain}
          resourceName={siteName}
          isPrimaryDomain={domain.id === primaryDomainId}
          primaryDomainTooltipContent="Used as the URL to open this site, only one Domain can be set as Primary."
          primaryDomainSubtitle="Used as the URL to open this site."
          hasVerifyDomainPermission={hasVerifyDomainPermission}
          hasRemoveDomainPermission={hasRemoveDomainPermission}
          hasChangePrimaryDomainPermission={hasChangePrimaryDomainPermission}
        />
      ))}
    </>
  );
};
