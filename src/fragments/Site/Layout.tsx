import { routes } from '@fleek-platform/utils-routes';
import { useMemo } from 'react';

import { BreadcrumbItem, NavigationItem, ProjectGoBack, RootLayout } from '@/components';
import { constants } from '@/constants';
import { useSiteQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';

export type SiteLayoutProps = ChildrenProps<{
  nav?: React.ReactNode | React.ReactNode[];
}>;

export const SiteLayout: React.FC<SiteLayoutProps> = ({ children, nav: pageNavContent }) => {
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

  const hasSiteSettingsPermission =
    hasGeneralSettingsPermission ||
    hasBuildSettingsPermission ||
    hasDomainsPermissions ||
    hasEditEnvVariablesPermission ||
    hasGitPermissions;

  const projectId = session.project.id;
  const siteId = router.query.siteId!;
  const [siteQuery] = useSiteQuery({ variables: { where: { id: siteId } } });

  const siteSettingsURL = useMemo(() => {
    if (hasGeneralSettingsPermission) {
      return routes.project.site.settings.general({ projectId, siteId });
    }

    if (hasBuildSettingsPermission) {
      return routes.project.site.settings.build({ projectId, siteId });
    }

    if (hasDomainsPermissions) {
      return routes.project.site.settings.domains({ projectId, siteId });
    }

    if (hasEditEnvVariablesPermission && (!siteQuery.data || !isSiteSelfManaged(siteQuery.data?.site))) {
      return routes.project.site.settings.environment({ projectId, siteId });
    }

    if (hasGitPermissions && (!siteQuery.data || !isSiteSelfManaged(siteQuery.data?.site))) {
      return routes.project.site.settings.git({ projectId, siteId });
    }

    return '';
  }, [
    hasGeneralSettingsPermission,
    hasBuildSettingsPermission,
    hasDomainsPermissions,
    hasEditEnvVariablesPermission,
    hasGitPermissions,
    projectId,
    siteId,
    siteQuery.data,
  ]);

  const hasSiteFunctions = Boolean(siteQuery.data?.site.currentDeployment?.functionDeployments.length);

  const navigation: NavigationItem[] = [
    {
      icon: 'browser',
      label: 'Overview',
      path: routes.project.site.overview({ projectId, siteId }),
      hasAccess: true,
    },
    {
      icon: 'code-working',
      label: 'Deploys',
      path: routes.project.site.deployments.list({ projectId, siteId }),
      hasAccess: usePermissions({ action: [constants.PERMISSION.SITE.VIEW_DEPLOYMENTS] }),
    },
    {
      icon: 'pulse',
      label: 'Audit Log',
      path: routes.project.site.logs({ projectId, siteId }),
      hasAccess: true,
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      path: routes.project.site.analytics({ projectId, siteId }),
      hasAccess: usePermissions({ action: [constants.PERMISSION.SITE.VIEW_ANALYTICS] }),
    },
    {
      icon: 'globe-filled',
      label: 'Functions',
      path: routes.project.site.functions.list({ projectId, siteId }),
      hasAccess: hasSiteFunctions,
    },
    {
      icon: 'gear',
      label: 'Settings',
      path: siteSettingsURL,
      hasAccess: hasSiteSettingsPermission,
    },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: 'Hosting',
      icon: 'browser',
      url: routes.project.site.list({ projectId }),
    },
    {
      id: siteQuery.data?.site.id || '',
      name: siteQuery.data?.site.name || '',
      avatar: siteQuery.data?.site.avatar,
      url: routes.project.site.overview({ projectId, siteId }),
    },
  ];

  if (siteQuery.error) {
    router.replace(routes.project.site.list({ projectId }));

    return null;
  }

  return (
    <RootLayout.Container>
      <RootLayout.Head title={RootLayout.Head.titles.site(siteQuery.data?.site.name)} />
      <RootLayout.Page
        slotSidebar={
          <ProjectGoBack
            projectName={session.project.name}
            goBackUrl={routes.project.site.list({ projectId })}
            isLoading={session.loading}
          />
        }
        slotPage={pageNavContent}
        navigation={navigation}
        isNavigationLoading={session.loading}
        breadcrumbs={breadcrumbs}
      >
        {children}
      </RootLayout.Page>
    </RootLayout.Container>
  );
};
