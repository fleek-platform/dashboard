import { routes } from '@fleek-platform/utils-routes';

import { CustomDomainBox } from '@/components/CustomDomainBox/CustomDomainBox';
import { constants } from '@/constants';
import { useSiteQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { filterDeletedDomains } from '@/utils/filterDeletedDomains';

export const CustomDomain = () => {
  const router = useRouter();
  const hasDomainsPermissions = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_DOMAIN],
  });

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  if (siteQuery.fetching) {
    return <CustomDomainBox isLoading />;
  }

  const domains = filterDeletedDomains(siteQuery.data?.site.domains || []);

  const verifiedDomains = domains.filter((domain) => domain.isVerified);
  const isActive = verifiedDomains.length > 0;
  const addDomainRoute = routes.project.site.settings.domains({
    projectId: router.query.projectId!,
    siteId: router.query.siteId!,
  });

  return (
    <CustomDomainBox
      isActive={isActive}
      domainList={verifiedDomains}
      CTAHref={addDomainRoute}
      hasPermission={hasDomainsPermissions}
      title="Custom Domain"
      listLabel="DNS"
      emptyText="Add a DNS domain or subdomain to your site, allowing anyone to access your site via traditional https endpoint."
      CTAText="Manage custom domains"
      emptyCTAText="Add custom domain"
      emptyCTAHref={addDomainRoute}
      footer="Custom domains for your site"
      footerIcon="domain"
      footerIconLabel="DNS"
    />
  );
};
