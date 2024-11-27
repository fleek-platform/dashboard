import { useSessionContext } from '@/providers/SessionProvider';
import { hasRequiredPermissions } from '@/utils/withAccess';

type UsePermissionsArgs = {
  action: string[];
};

export const usePermissions = ({ action }: UsePermissionsArgs) => {
  const session = useSessionContext(true);

  const permissions = session.permissions;

  if (!permissions) {
    return false;
  }

  const hasPermission = hasRequiredPermissions({ permissions, requiredPermissions: action });

  return hasPermission;
};
