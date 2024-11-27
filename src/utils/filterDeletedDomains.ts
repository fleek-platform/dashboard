import { DomainStatus } from '@/generated/graphqlClient';
import { SiteDomain } from '@/types/Site';

// util to filter the domains that are being deleted or the deletion failed
export const filterDeletedDomains = (domains: SiteDomain[]) => {
  return domains.filter(
    (domain) =>
      domain.status !== DomainStatus.DELETING &&
      domain.status !== DomainStatus.DELETING_FAILED,
  );
};
