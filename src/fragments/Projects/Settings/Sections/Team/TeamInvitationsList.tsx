import { useState } from 'react';

import { BadgeText, SettingsListItem } from '@/components';
import { SettingsBox } from '@/components/SettingsBox/SettingsBox';
import { useInvitationsQuery } from '@/generated/graphqlClient';
import { useSessionContext } from '@/providers/SessionProvider';
import { Invitation } from '@/types/TeamProject';
import { Box, Icon } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import {
  TeamProjectContext,
  TeamProjectProvider,
  useTeamProjectContext,
} from './TeamProject.context';
import { TeamSettingsStyles as S } from './TeamSettings.styles';

export type TeamInvitationsListProps = Pick<
  TeamProjectContext,
  'onSubmitDelete'
>;

export const TeamInvitationsList: React.FC<TeamInvitationsListProps> = ({
  onSubmitDelete,
}) => {
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
        <SettingsBox.Text>
          Manage pending invitations for this project.
        </SettingsBox.Text>
        {!session.loading &&
          invitations
            .filter((invitation) => invitation.email)
            .map((invitation) => (
              <Box
                key={invitation.id}
                className="border-b border-neutral-6 pb-4 last:pb-0 last:border-none"
              >
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
    <S.Item.Container>
      <Box>
        <S.Item.Text>{invitation.email || ''}</S.Item.Text>
        <S.Item.Label>
          Invited{' '}
          {getDurationUntilNow({
            isoDateString: invitation.createdAt,
            shortFormat: true,
          })}
        </S.Item.Label>
      </Box>
      <BadgeText colorScheme="amber">Pending Invite</BadgeText>
      <DropdownMenu invitationId={invitation.id} />
    </S.Item.Container>
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
