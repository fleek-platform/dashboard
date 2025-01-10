import { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

import { useProjectContext } from './ProjectProvider';
import { useAuthContext } from './AuthProvider';

export type PermissionsContext = {
  loading: boolean;
  permissions: string[];
};

const [Provider, useContext] = createContext<PermissionsContext>({
  name: 'PermissionsContext',
  hookName: 'usePermissionsContext',
  providerName: 'PermissionsProvider',
});

export const PermissionsProvider: React.FC<ChildrenProps> = ({ children }) => {
  const { project: data, loading: projectLoading } = useProjectContext();
  const { isLoading: authLoading } = useAuthContext();

  return (
    <Provider
      value={{
        loading: authLoading || projectLoading,
        permissions:
          data.currentUserMembership.permissionGroup.permissions.slice() ?? [],
      }}
    >
      {children}
    </Provider>
  );
};

export const usePermissionsContext = useContext;
