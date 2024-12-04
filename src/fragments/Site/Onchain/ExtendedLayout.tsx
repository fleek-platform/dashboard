import { routes } from '@fleek-platform/utils-routes';

import { SubNavigationItem, SubNavigationLayout } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';

import { SiteLayout } from '../Layout';

export type ExtendedLayoutProps = ChildrenProps;

export const ExtendedLayout: React.FC<ExtendedLayoutProps> = ({ children }) => {
  const session = useSessionContext();
  const router = useRouter();

  const hasEnsDomainsPermissions = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS],
  });

  const hasGeneralPermisions = usePermissions({
    action: [constants.PERMISSION.SITE.VIEW_OVERVIEW],
  });

  const projectId = session.project.id;
  const siteId = router.query.siteId!;

  const navigation: SubNavigationItem[] = [
    {
      label: 'General',
      path: routes.project.site.onchain.general({ projectId, siteId }),
      hasAccess: hasGeneralPermisions,
    },
    {
      label: 'Domains',
      path: routes.project.site.onchain.domains({ projectId, siteId }),
      hasAccess: hasEnsDomainsPermissions,
    },
  ];

  return (
    <SiteLayout>
      <SubNavigationLayout
        navigation={navigation}
        isNavigationLoading={session.loading}
      >
        {children}
      </SubNavigationLayout>
    </SiteLayout>
  );
};
