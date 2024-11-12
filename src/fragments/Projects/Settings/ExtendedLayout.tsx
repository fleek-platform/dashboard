import { routes } from '@fleek-platform/utils-routes';

import { SubNavigationItem, SubNavigationLayout } from '@/components';
import { constants } from '@/constants';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';

import { Layout as ProjectLayout } from '../Layout';

export type ExtendedLayoutProps = ChildrenProps;

export const ExtendedLayout: React.FC<ExtendedLayoutProps> = ({ children }) => {
  const session = useSessionContext();
  const featureFlags = useFeatureFlags();

  const projectId = session.project.id;

  const navigation: SubNavigationItem[] = [
    {
      label: 'General',
      path: routes.project.settings.general({ projectId }),
      hasAccess: usePermissions({
        action: [
          constants.PERMISSION.PROJECT.EDIT_NAME,
          constants.PERMISSION.PROJECT.DELETE,
          constants.PERMISSION.PROJECT.EDIT_AVATAR,
        ],
      }),
    },
    {
      label: 'Storage',
      path: routes.project.settings.storage({ projectId }),
      hasAccess: usePermissions({
        action: [constants.PERMISSION.STORAGE.EDIT_SETTINGS],
      }),
    },
    {
      label: 'Private gateways',
      path: routes.project.settings.privateGateways({ projectId }),
      hasAccess: usePermissions({
        action: [constants.PERMISSION.PRIVATE_GATEWAY.VIEW],
      }),
    },
    {
      label: 'Application credentials',
      path: routes.project.settings.applicationCredentials({ projectId }),
      hasAccess: usePermissions({
        action: [constants.PERMISSION.APPLICATION_CREDENTIALS.VIEW],
      }),
    },
    {
      label: 'Git integrations',
      path: routes.project.settings.gitIntegrations({ projectId }),
      hasAccess: featureFlags.enableGitIntegrationsView,
    },
    {
      label: 'Team',
      path: routes.project.settings.team({ projectId }),
      hasAccess: usePermissions({ action: [constants.PERMISSION.TEAM.VIEW] }),
    },
    {
      label: 'Billing',
      path: routes.project.settings.billing({ projectId }),
      hasAccess: usePermissions({
        action: [
          constants.PERMISSION.BILLING.MANAGE,
          constants.PERMISSION.BILLING.VIEW,
        ],
      }),
    },
  ];

  return (
    <ProjectLayout>
      <SubNavigationLayout
        navigation={navigation}
        isNavigationLoading={session.loading}
      >
        {children}
      </SubNavigationLayout>
    </ProjectLayout>
  );
};
