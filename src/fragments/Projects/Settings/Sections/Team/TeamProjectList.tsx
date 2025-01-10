import { useState } from 'react';

import { BadgeText, PermissionsTooltip, SettingsListItem } from '@/components';
import { SettingsBox } from '@/components/SettingsBox/SettingsBox';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';
import { PermissionGroup, ProjectMember } from '@/types/TeamProject';
import { Box, Icon, Skeleton, Text } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import { RoleCombobox } from './AddTeamMember';
import {
  TeamProjectContext,
  TeamProjectProvider,
  useTeamProjectContext,
} from './TeamProject.context';

export type TeamProjectListProps = LoadingProps<
  {
    userId?: string;
    projectMembers?: ProjectMember[];
  } & Pick<TeamProjectContext, 'onUpdateRole' | 'onSubmitDelete'>
>;

export const TeamProjectList: React.FC<TeamProjectListProps> = ({
  isLoading,
  userId,
  projectMembers = [],
  onUpdateRole,
  onSubmitDelete,
}) => {
  const hasEditRolePermission = usePermissions({
    action: [constants.PERMISSION.TEAM.CHANGE_PERMISSIONS],
  });

  if (isLoading) {
    return (
      <SettingsBox.Container>
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-1/2" />
        <MembersSkeleton />
      </SettingsBox.Container>
    );
  }

  const hasOtherMembers =
    projectMembers.filter((member) => member.user.id !== userId).length > 0;

  return (
    <TeamProjectProvider
      onSubmitDelete={onSubmitDelete}
      onUpdateRole={onUpdateRole}
    >
      <SettingsBox.Container>
        {hasEditRolePermission ? (
          <>
            <SettingsBox.Title>Manage Members</SettingsBox.Title>
            <SettingsBox.Text>
              Edit roles or remove members from this project.
            </SettingsBox.Text>
          </>
        ) : (
          <>
            <SettingsBox.Title>Team Members</SettingsBox.Title>
            <SettingsBox.Text>
              View roles and membership of this project.
            </SettingsBox.Text>
          </>
        )}
        {hasOtherMembers ? (
          projectMembers.map((projectMember) => (
            <Box
              key={projectMember.id}
              className="border-b border-neutral-6 pb-4 last:pb-0 last:border-none"
            >
              <MemberItem
                projectMember={projectMember}
                onUpdateRole={onUpdateRole}
                isCurrentUser={projectMember.user.id === userId}
              />
            </Box>
          ))
        ) : (
          <SettingsBox.EmptyContent
            title="No Members"
            description="Once members are added, they will appear here."
          />
        )}
      </SettingsBox.Container>
    </TeamProjectProvider>
  );
};

const MembersSkeleton: React.FC = () => <Skeleton variant="text" />;

type MemberItemProps = {
  projectMember: ProjectMember;
  isCurrentUser: boolean;
} & Pick<TeamProjectContext, 'onUpdateRole'>;

const MemberItem: React.FC<MemberItemProps> = ({
  projectMember,
  isCurrentUser,
  onUpdateRole,
}) => {
  const [selectedRole, setSelectedRole] = useState(
    projectMember.permissionGroup,
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const hasEditRolePermission = usePermissions({
    action: [constants.PERMISSION.TEAM.CHANGE_PERMISSIONS],
  });

  const handleRoleChange = async (
    selectedRole: PermissionGroup | undefined,
  ) => {
    if (selectedRole && onUpdateRole) {
      setSelectedRole(selectedRole);
      setIsUpdating(true);
      const updateResponse = await onUpdateRole({
        user: projectMember.user,
        permissionGroup: selectedRole,
      });

      if (!updateResponse) {
        setSelectedRole(projectMember.permissionGroup);
      }

      setIsUpdating(false);
    }
  };

  return (
    <Box className="flex-row justify-between items-center">
      <Box className="gap-1">
        <Box className="flex-row items-center gap-2">
          <Text variant="primary">
            {projectMember.user.username ||
              projectMember.user.email ||
              projectMember.user.id}
          </Text>
          {isCurrentUser && <BadgeText colorScheme="slate">You</BadgeText>}
        </Box>
        <Text size="xs">
          Added{' '}
          {getDurationUntilNow({
            isoDateString: projectMember.createdAt,
            shortFormat: true,
          })}
        </Text>
      </Box>

      <Box className="flex-row gap-3">
        <PermissionsTooltip hasAccess={hasEditRolePermission} side="top">
          <RoleCombobox
            selectedRole={selectedRole}
            onChange={handleRoleChange}
            isDisabled={!hasEditRolePermission || isUpdating}
          />
        </PermissionsTooltip>
        <DropdownMenu memberId={projectMember.user.id} />
      </Box>
    </Box>
  );
};

type DropdownMenuProps = {
  memberId: string;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ memberId }) => {
  const { onSubmitDelete } = useTeamProjectContext();
  const [isLoading, setIsLoading] = useState(false);

  const hasDeleteMemberPermission = usePermissions({
    action: [constants.PERMISSION.TEAM.DELETE_EXCEPT_OWNER],
  });

  if (isLoading) {
    // needed cause the forwardStyledRef
    return <Icon name="spinner" />;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    await onSubmitDelete(memberId);
    setIsLoading(false);
  };

  return (
    <SettingsListItem.DropdownMenu
      isLoading={isLoading}
      isDisabled={!hasDeleteMemberPermission}
      hasAccess={hasDeleteMemberPermission}
    >
      <SettingsListItem.DropdownMenuItem icon="trash" onClick={handleDelete}>
        Delete
      </SettingsListItem.DropdownMenuItem>
    </SettingsListItem.DropdownMenu>
  );
};
