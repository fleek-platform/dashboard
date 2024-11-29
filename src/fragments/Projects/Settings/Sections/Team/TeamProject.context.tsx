import type { ChildrenProps } from '@/types/Props';
import type { HandleUpdateRoleProps } from '@/types/TeamProject';
import { createContext } from '@/utils/createContext';

export type TeamProjectContext = {
  onUpdateRole?: ({
    membershipId,
    user,
    permissionGroup,
  }: HandleUpdateRoleProps) => Promise<boolean | undefined>;
  onSubmitDelete: (id: string) => Promise<boolean | undefined>;
};

export type TeamProjectProviderProps = ChildrenProps<
  Pick<TeamProjectContext, 'onUpdateRole' | 'onSubmitDelete'>
>;

const [Provider, useContext] = createContext<TeamProjectContext>({
  hookName: 'useTeamProjectContext',
  name: 'TeamProjectContext',
  providerName: 'TeamProjectProvider',
});

export const TeamProjectProvider: React.FC<TeamProjectProviderProps> = ({
  children,
  onUpdateRole,
  onSubmitDelete,
}) => {
  return (
    <Provider
      value={{
        onUpdateRole,
        onSubmitDelete,
      }}
    >
      {children}
    </Provider>
  );
};

export const useTeamProjectContext = useContext;
