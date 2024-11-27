import { useMemo } from 'react';

import { constants } from '@/constants';
import { Projects, TwoFactorAuthentication } from '@/fragments';
import {
  useDeleteInvitationMutation,
  useDeleteMembershipMutation,
  useInvitationsQuery,
  useMeQuery,
  usePermissionGroupsQuery,
  useProjectMembersQuery,
  useUpdateMembershipMutation,
} from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/useToast';
import { useSessionContext } from '@/providers/SessionProvider';
import { Page } from '@/types/App';
import { HandleUpdateRoleProps } from '@/types/TeamProject';
import { withAccess } from '@/utils/withAccess';

const TeamPage: Page = () => {
  const session = useSessionContext();
  const toast = useToast();

  const [, deleteMembership] = useDeleteMembershipMutation();
  const [, refetchProjectMembersQuery] = useProjectMembersQuery({
    variables: { where: { id: session.project.id } },
    pause: !session.project.id,
  });
  const [, deleteInvitation] = useDeleteInvitationMutation();
  const [, refetchInvitationsQuery] = useInvitationsQuery();

  const [meQuery] = useMeQuery();
  const [projectMembersQuery] = useProjectMembersQuery({
    variables: { where: { id: session.project.id } },
    pause: !session.project.id,
  });
  const [permissionGroupsQuery] = usePermissionGroupsQuery();
  const [, updateMembership] = useUpdateMembershipMutation();

  const canMutate = usePermissions({
    action: [
      constants.PERMISSION.TEAM.ASSIGN_OWNER,
      constants.PERMISSION.TEAM.CHANGE_PERMISSIONS,
      constants.PERMISSION.TEAM.DELETE_EXCEPT_OWNER,
    ],
  });

  const canInvite = usePermissions({
    action: [constants.PERMISSION.TEAM.INVITE],
  });

  const isLoading = useMemo(() => {
    return (
      projectMembersQuery.fetching ||
      meQuery.fetching ||
      session.loading ||
      permissionGroupsQuery.fetching
    );
  }, [
    meQuery.fetching,
    permissionGroupsQuery.fetching,
    projectMembersQuery.fetching,
    session.loading,
  ]);

  const handleDeleteMember = async (userId: string) => {
    try {
      const result = await deleteMembership({
        where: { projectId: session.project.id, userId },
      });

      if (!result.data) {
        throw (
          result.error ||
          new Error('Error trying to delete member from project')
        );
      }

      refetchProjectMembersQuery({ requestPolicy: 'cache-and-network' });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Delete member from project failed' });
    }
  };

  const handleDeleteInvitation = async (id: string) => {
    try {
      const deleteInvitationResult = await deleteInvitation({ where: { id } });

      if (!deleteInvitationResult.data) {
        throw (
          deleteInvitationResult.error ||
          new Error('Error trying to delete invitation')
        );
      }

      refetchInvitationsQuery({ requestPolicy: 'cache-and-network' });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Delete invitation failed' });
    }
  };

  const handleUpdateRole = async ({
    user,
    permissionGroup,
  }: HandleUpdateRoleProps) => {
    try {
      const result = await updateMembership({
        where: { userId: user.id },
        data: { permissionGroupId: permissionGroup.id },
      });

      if (!result.data?.updateMembership) {
        throw result.error || new Error('Error trying to update role');
      }

      refetchProjectMembersQuery({ requestPolicy: 'network-only' });

      toast.success({
        message: `Set ${permissionGroup.name} role for user ${user.username || user.email || user.id}`,
      });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Error trying to update role' });

      return false;
    }
  };

  return (
    <>
      {canInvite && (
        <TwoFactorAuthentication.Provider>
          <Projects.Settings.Sections.Team.AddTeamMember
            isLoading={isLoading}
          />
        </TwoFactorAuthentication.Provider>
      )}
      {canMutate && (
        <Projects.Settings.Sections.Team.TeamInvitationsList
          onSubmitDelete={handleDeleteInvitation}
        />
      )}

      <Projects.Settings.Sections.Team.TeamProjectList
        isLoading={isLoading}
        userId={meQuery.data?.user.id}
        projectMembers={projectMembersQuery.data?.project?.memberships}
        onSubmitDelete={handleDeleteMember}
        onUpdateRole={handleUpdateRole}
      />
    </>
  );
};

TeamPage.getLayout = (page) => (
  <Projects.Settings.Layout>{page}</Projects.Settings.Layout>
);

export default withAccess({
  Component: TeamPage,
  requiredPermissions: [constants.PERMISSION.TEAM.VIEW],
});
