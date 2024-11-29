import { useMemo } from 'react';

import { NotFound } from '@/fragments';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useSessionContext } from '@/providers/SessionProvider';

type HasRequiredPermissionsProps = {
  permissions: string[];
  requiredPermissions: string[];
};

export const hasRequiredPermissions = ({
  permissions,
  requiredPermissions,
}: HasRequiredPermissionsProps): boolean => {
  if (!permissions) {
    return false;
  }

  return requiredPermissions.some((requiredPermission) =>
    permissions.find((userPermission) => userPermission === requiredPermission),
  );
};

// biome-ignore lint/suspicious/noExplicitAny: Allowing flexible component types
type ComponentWithLayout = React.ComponentType<any> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type WithAccessProps = {
  Component: ComponentWithLayout;
  requiredPermissions?: string[] | null;
  billingResource?: string;
  featureFlagName?: string;
};

interface PageProps {
  // biome-ignore lint/suspicious/noExplicitAny: Allow any for flexible props
  [key: string]: any;
}

export const withAccess = ({
  Component,
  requiredPermissions,
  featureFlagName,
}: WithAccessProps) => {
  return function WithAccessWrapper(pageProps: PageProps) {
    const session = useSessionContext();
    const featureFlags = useFeatureFlags();
    const permissions = session.permissions;

    const getLayout = Component.getLayout ?? ((page) => page);

    const hasAccess = useMemo(() => {
      const hasPermission =
        session.loading || !requiredPermissions
          ? true
          : hasRequiredPermissions({ permissions, requiredPermissions });
      const featureFlag = featureFlagName
        ? featureFlags[featureFlagName as keyof typeof featureFlags]
        : null;

      if (featureFlag !== null) {
        if (featureFlag) {
          //check if user has required permissions
          return hasPermission;
        }

        return featureFlag;
      }
      
      return hasPermission;
    }, [featureFlags, featureFlagName, permissions, session.loading, requiredPermissions]);

    if (hasAccess || session.loading) {
      return <>{getLayout(<Component {...pageProps} />)}</>;
    }

    return (
      <NotFound.Page.Layout>
        <NotFound.Page.Content />
      </NotFound.Page.Layout>
    );
  };
};
