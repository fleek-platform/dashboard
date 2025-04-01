import { routes } from '@fleek-platform/utils-routes';

import { NavigationItem } from '@/components';
import { constants } from '@/constants';
import { useSessionContext } from '@/providers/SessionProvider';

import { usePermissions } from './usePermissions';
import { secrets } from '@/secrets';
import { joinUrl } from '@/utils/url';

export const useMainNavigationItems = () => {
  const session = useSessionContext();

  const hasGeneralSettingsPermission = usePermissions({
    action: [
      constants.PERMISSION.PROJECT.EDIT_NAME,
      constants.PERMISSION.PROJECT.DELETE,
      constants.PERMISSION.PROJECT.EDIT_AVATAR,
    ],
  });
  const hasStorageSettingsPermission = usePermissions({
    action: [constants.PERMISSION.STORAGE.EDIT_SETTINGS],
  });
  const hasPrivateGatewaysPermission = usePermissions({
    action: [constants.PERMISSION.PRIVATE_GATEWAY.VIEW],
  });
  const hasApplicationCredentialsPermission = usePermissions({
    action: [constants.PERMISSION.APPLICATION_CREDENTIALS.VIEW],
  });
  const hasTeamMembersPermission = usePermissions({
    action: [
      constants.PERMISSION.TEAM.ASSIGN_OWNER,
      constants.PERMISSION.TEAM.CHANGE_PERMISSIONS,
      constants.PERMISSION.TEAM.DELETE_EXCEPT_OWNER,
      constants.PERMISSION.TEAM.INVITE,
    ],
  });
  const hasBillingPermission = usePermissions({
    action: [
      constants.PERMISSION.BILLING.MANAGE,
      constants.PERMISSION.BILLING.VIEW,
    ],
  });

  const hasProjectSettingsPermission =
    hasGeneralSettingsPermission ||
    hasStorageSettingsPermission ||
    hasPrivateGatewaysPermission ||
    hasApplicationCredentialsPermission ||
    hasTeamMembersPermission;

  const projectId = session.project?.id;

  const getProjectSettingsURL = () => {
    if (hasGeneralSettingsPermission) {
      return routes.project.settings.general({ projectId });
    }

    if (hasStorageSettingsPermission) {
      return routes.project.settings.storage({ projectId });
    }

    if (hasPrivateGatewaysPermission) {
      return routes.project.settings.privateGateways({ projectId });
    }

    if (hasApplicationCredentialsPermission) {
      return routes.project.settings.applicationCredentials({ projectId });
    }

    if (hasTeamMembersPermission) {
      return routes.project.settings.team({ projectId });
    }

    return '';
  };

  const navigation: NavigationItem[] = [
    {
      icon: 'home',
      label: 'Dashboard',
      path: routes.project.home({ projectId }),
      hasAccess: true,
    },
    {
      icon: 'browser',
      label: 'Hosting',
      path: routes.project.site.list({ projectId }),
      hasAccess: usePermissions({
        action: [constants.PERMISSION.SITE.VIEW_OVERVIEW],
      }),
    },
    {
      icon: 'archive',
      label: 'Storage',
      path: routes.project.storage({ projectId }),
      hasAccess: usePermissions({
        action: [constants.PERMISSION.STORAGE.VIEW_LIST],
      }),
    },
    {
      icon: 'globe-filled',
      label: 'Functions',
      path: routes.project.function.list({ projectId }),
      hasAccess: true,
    },
    {
      icon: 'robot',
      label: 'AI Agents',
      path: joinUrl(secrets.NEXT_PUBLIC_WEBSITE_URL, secrets.NEXT_PUBLIC_AGENTS_AI_PATH, true),
      hasAccess: true,
      showNewTag: true,
      isExternal: true,
      target: '_self',
    },
    {
      icon: 'credit-card',
      label: 'Billing',
      path: routes.project.billing({ projectId }),
      hasAccess: hasBillingPermission,
    },
    {
      icon: 'gear',
      label: 'Settings',
      path: getProjectSettingsURL(),
      hasAccess: hasProjectSettingsPermission,
    },
  ];

  return navigation;
};
