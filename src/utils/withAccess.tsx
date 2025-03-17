import { useMemo } from 'react';

import { NotFound } from '@/fragments';
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

type WithAccessProps = {
  Component: any;
  requiredPermissions?: string[] | null;
  billingResource?: string;
};

export const withAccess = ({
  Component,
  requiredPermissions,
}: WithAccessProps) => {
  return function WithAccessWrapper(pageProps: any) {
    const session = useSessionContext();
    const permissions = session.permissions;

    const getLayout = Component.getLayout ?? ((page: any) => page);

    const hasAccess = useMemo(() => {
      const hasPermission =
        session.loading || !requiredPermissions
          ? true
          : hasRequiredPermissions({ permissions, requiredPermissions });

      return hasPermission;
    }, [permissions, session.loading]);

    if (hasAccess || session.loading) {
      return <>{getLayout(<Component {...pageProps} />)}</>;
    } else {
      return (
        <NotFound.Page.Layout>
          <NotFound.Page.Content />
        </NotFound.Page.Layout>
      );
    }
  };
};
