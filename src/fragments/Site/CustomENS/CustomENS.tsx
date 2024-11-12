import { routes } from '@fleek-platform/utils-routes';

import { CustomDomainBox } from '@/components';
import { constants } from '@/constants';
import { useSiteQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { getActiveEnsList } from '@/utils/getActiveEnsList';

export const CustomENS: React.FC = () => {
  const router = useRouter();
  const hasENSPermissions = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS],
  });

  const siteId = router.query.siteId!;
  const projectId = router.query.projectId!;
  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });

  if (siteQuery.fetching) {
    return <CustomDomainBox isLoading />;
  }

  const site = siteQuery.data?.site!;

  const activeEnsList = getActiveEnsList({ site });
  const addENSRoute = routes.project.site.settings.domains({
    siteId,
    projectId,
  });
  const isActive = activeEnsList.length > 0;

  return (
    <CustomDomainBox
      isActive={isActive}
      domainList={activeEnsList}
      hasPermission={hasENSPermissions}
      title="Custom ENS"
      listLabel="ENS"
      emptyText="Add a ENS name to your site, this allows you to use your ENS name as a domain access point for the site deployed."
      CTAText="Manage ENS domains"
      CTAHref={addENSRoute}
      emptyCTAText="Add ENS domain"
      emptyCTAHref={addENSRoute}
      footer="Custom ENS for your site"
      footerIcon="ens-colored"
      footerIconLabel="ENS"
      iconContainerVariant="ens"
    />
  );
};
