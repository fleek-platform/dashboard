import {
  InvitationsQuery,
  PermissionGroupsQuery,
  ProjectMembersQuery,
} from '@/generated/graphqlClient';

export type Invitation = InvitationsQuery['invitations']['data'][0];

export type ProjectMember = ProjectMembersQuery['project']['memberships'][0];

export type PermissionGroup =
  PermissionGroupsQuery['permissionGroups']['data'][0];

export type HandleUpdateRoleProps = {
  membershipId?: string;
  user: ProjectMember['user'];
  permissionGroup: PermissionGroup;
};

export type CreateInvitationModalState = {
  isOpen: boolean;
  invitationLink?: string;
};
