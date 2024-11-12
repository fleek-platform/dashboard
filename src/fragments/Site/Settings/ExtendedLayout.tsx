import { routes } from '@fleek-platform/utils-routes';
import { useMemo } from 'react';

import { SubNavigationItem, SubNavigationLayout } from '@/components';
import { constants } from '@/constants';
import { useSiteQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';

import { SiteLayout } from '../Layout';

export type ExtendedLayoutProps = ChildrenProps;

export const ExtendedLayout: React.FC<ExtendedLayoutProps> = ({ children }) => {
  const session = useSessionContext();
  const router = useRouter();
  const hasGeneralSettingsPermission = usePermissions({
    action: [
      constants.PERMISSION.SITE.EDIT_NAME,
      constants.PERMISSION.SITE.EDIT_SLUG,
      constants.PERMISSION.SITE.EDIT_AVATAR,
      constants.PERMISSION.SITE.PURGE_CACHE,
      constants.PERMISSION.SITE.DELETE,
    ],
  });
  const hasBuildSettingsPermission = usePermissions({ action: [constants.PERMISSION.SITE.VIEW_BUILD_SETTINGS] });
  const hasDomainsPermissions = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_DOMAIN, constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS],
  });
  const hasGitPermissions = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_GIT_INTEGRATION, constants.PERMISSION.SITE.REMOVE_GIT_INTEGRATION],
  });
  const hasEditEnvVariablesPermission = usePermissions({
    action: [constants.PERMISSION.SITE.VIEW_ENV_VARIABLES, constants.PERMISSION.SITE.EDIT_ENV_VARIABLES],
  });

  const projectId = session.project.id;
  const siteId = router.query.siteId!;

  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });

  const navigation: SubNavigationItem[] = useMemo(() => {
    const defaultItems = [
      { label: 'General', path: routes.project.site.settings.general({ projectId, siteId }), hasAccess: hasGeneralSettingsPermission },
      {
        label: 'Build & Deploy',
        path: routes.project.site.settings.build({ projectId, siteId }),
        hasAccess: hasBuildSettingsPermission,
      },
      { label: 'Domains', path: routes.project.site.settings.domains({ projectId, siteId }), hasAccess: hasDomainsPermissions },
    ];

    if (!siteQuery.data || !isSiteSelfManaged(siteQuery.data?.site)) {
      defaultItems.splice(2, 0, {
        label: 'Environment Variables',
        path: routes.project.site.settings.environment({ projectId, siteId }),
        hasAccess: hasEditEnvVariablesPermission,
      });
      defaultItems.push({ label: 'Git', path: routes.project.site.settings.git({ projectId, siteId }), hasAccess: hasGitPermissions });
    } else {
      const managedPaths = [
        routes.project.site.settings.environment({ projectId, siteId }),
        routes.project.site.settings.git({ projectId, siteId }),
      ];

      for (const path of managedPaths) {
        if (router.asPath.includes(path)) {
          router.replace(routes.project.site.settings.general({ projectId, siteId }));
        }
      }
    }

    return defaultItems;
  }, [
    siteQuery.data,
    projectId,
    siteId,
    router,
    hasBuildSettingsPermission,
    hasGeneralSettingsPermission,
    hasDomainsPermissions,
    hasGitPermissions,
    hasEditEnvVariablesPermission,
  ]);

  return (
    <SiteLayout>
      <SubNavigationLayout navigation={navigation} isNavigationLoading={session.loading}>
        {children}
      </SubNavigationLayout>
    </SiteLayout>
  );
};
