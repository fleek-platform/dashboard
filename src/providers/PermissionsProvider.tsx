import { ChildrenProps } from '@/types/Props';
import { createContext } from '@/utils/createContext';

import { useProjectContext } from './ProjectProvider';

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
  const { project: data, loading } = useProjectContext();

  if (!data || loading) {
    console.log('[debug] PermissionsProvider: !data || loading')
    return;
  }

  return (
    <Provider
      value={{
        loading,
        permissions:
          data.currentUserMembership.permissionGroup.permissions.slice() ?? [],
      }}
    >
      {children}
    </Provider>
  );
};

export const usePermissionsContext = useContext;
