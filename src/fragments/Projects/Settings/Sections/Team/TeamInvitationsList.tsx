import { useState } from 'react';

import { BadgeText, SettingsListItem } from '@/components';
import { SettingsBox } from '@/components/SettingsBox/SettingsBox';
import { useInvitationsQuery } from '@/generated/graphqlClient';
import { useSessionContext } from '@/providers/SessionProvider';
import { Invitation } from '@/types/TeamProject';
import { Box, Icon, Text } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import { TeamProjectContext, TeamProjectProvider, useTeamProjectContext } from './TeamProject.context';

export type TeamInvitationsListProps = Pick<TeamProjectContext, 'onSubmitDelete'>;

export const TeamInvitationsList: React.FC<TeamInvitationsListProps> = ({ onSubmitDelete }) => {
  const session = useSessionContext();

  const [invitationsQuery] = useInvitationsQuery();

  const invitations = invitationsQuery.data?.invitations.data || [];

  if (invitations.filter((invitation) => invitation.email).length === 0) {
    return null;
  }

  return (
    <TeamProjectProvider onSubmitDelete={onSubmitDelete}>
      <SettingsBox.Container>
        <SettingsBox.Title>Manage Invitations</SettingsBox.Title>
        <SettingsBox.Text>Manage pending invitations for this project.</SettingsBox.Text>
        {!session.loading &&
          invitations
            .filter((invitation) => invitation.email)
            .map((invitation) => (
              <Box key={invitation.id} className="border-b border-neutral-6 pb-4 last:pb-0 last:border-none">
                <MemberItem invitation={invitation} />
              </Box>
            ))}
      </SettingsBox.Container>
    </TeamProjectProvider>
  );
};

type MemberItemProps = {
  invitation: Invitation;
};

const MemberItem: React.FC<MemberItemProps> = ({ invitation }) => {
  return (
    <Box className="flex-row justify-between items-center">
      <Box className="gap-1">
        <Text variant="primary">{invitation.email || ''}</Text>
        <Text size="xs">Invited {getDurationUntilNow({ isoDateString: invitation.createdAt, shortFormat: true })}</Text>
      </Box>
      <Box className="flex-row items-center gap-3">
        <BadgeText colorScheme="slate">Pending invite</BadgeText>
        <DropdownMenu invitationId={invitation.id} />
      </Box>
    </Box>
  );
};

type DropdownMenuProps = {
  invitationId: string;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ invitationId }) => {
  const { onSubmitDelete } = useTeamProjectContext();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    // needed cause the forwardStyledRef
    return <Icon name="spinner" />;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    await onSubmitDelete(invitationId);

    setIsLoading(false);
  };

  return (
    <SettingsListItem.DropdownMenu isLoading={isLoading}>
      <SettingsListItem.DropdownMenuItem icon="trash" onClick={handleDelete}>
        Delete
      </SettingsListItem.DropdownMenuItem>
    </SettingsListItem.DropdownMenu>
  );
};
