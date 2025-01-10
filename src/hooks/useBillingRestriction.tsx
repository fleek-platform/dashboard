import { constants } from '@/constants';
import {
  useProjectMembersQuery,
  useSiteQuery,
  useSitesQuery,
} from '@/generated/graphqlClient';
import { useBillingContext } from '@/providers/BillingProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { filterDeletedDomains } from '@/utils/filterDeletedDomains';

import { useRouter } from './useRouter';

export const useSiteRestriction = () => {
  const session = useSessionContext();
  const billing = useBillingContext();

  const [sitesQuery] = useSitesQuery({
    variables: {
      where: {},
      filter: { take: constants.SITES_PAGE_SIZE, page: 1 },
    },
    pause: !session.accesTokenProjectId,
  });

  return billing.hasReachedLimit(
    'sites',
    sitesQuery.data?.sites.totalCount ?? 0,
  );
};

export const useTeamRestriction = () => {
  const session = useSessionContext();
  const billing = useBillingContext();

  const [projectMembersQuery] = useProjectMembersQuery({
    variables: { where: { id: session.accesTokenProjectId! } },
    pause: !session.accesTokenProjectId,
  });

  return billing.hasReachedLimit(
    'members',
    projectMembersQuery.data?.project.memberships.length ?? 0,
  );
};

export const useDomainsRestriction = () => {
  const billing = useBillingContext();
  const router = useRouter();

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  const domains = filterDeletedDomains(siteQuery.data?.site.domains || []);

  return billing.hasReachedLimit('customDomains', domains.length);
};
