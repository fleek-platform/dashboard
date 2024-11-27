import { useState } from 'react';

import { AvatarMarble, Button, Text } from '@/ui';

import { InvitationStyles as S } from './Invitation.styles';

export type InvitationProps = {
  isLoading: boolean;
  projectName: string | undefined;
  invitationHash: string | undefined;
  avatarSrc?: string | undefined;
  projectId?: string;
  onAcceptInvitation: (invitationHash: string) => void;
  onDeclineInvitation: (invitationHash: string) => void;
};

export const Invitation: React.FC<InvitationProps> = ({
  isLoading,
  projectName,
  invitationHash,
  avatarSrc,
  projectId,
  onAcceptInvitation,
  onDeclineInvitation,
}) => {
  const [isAcceptingInvitation, setIsAcceptingInvitation] = useState(false);
  const [isDecliningInvitation, setIsDecliningInvitation] = useState(false);

  if (isLoading) {
    return <InvitationSkeleton />;
  }

  // TODO show error message
  if (!projectName) {
    return null;
  }

  const handleAcceptInvitation = async () => {
    if (invitationHash) {
      setIsAcceptingInvitation(true);
      await onAcceptInvitation(invitationHash);
      setIsAcceptingInvitation(false);
    }
  };

  const handleDeclineInvitation = async () => {
    if (invitationHash) {
      setIsDecliningInvitation(true);
      await onDeclineInvitation(invitationHash);
      setIsDecliningInvitation(false);
    }
  };

  return (
    <S.Container>
      {avatarSrc ? (
        <S.Avatar src={avatarSrc} icon="image" enableIcon />
      ) : (
        <AvatarMarble name={projectId} rounded />
      )}
      <S.DataWrapper>
        <Text as="h3" variant="primary" weight={700}>
          Join the {projectName} project
        </Text>
        <Text>You’ve been invited to join an existing project.</Text>
      </S.DataWrapper>
      <S.Buttons.Container>
        <Button
          onClick={handleAcceptInvitation}
          loading={isAcceptingInvitation}
        >
          Accept
        </Button>
        <Button
          intent="neutral"
          onClick={handleDeclineInvitation}
          loading={isDecliningInvitation}
        >
          Decline
        </Button>
      </S.Buttons.Container>
    </S.Container>
  );
};

const InvitationSkeleton: React.FC = () => (
  <S.Container>
    <S.DataSkeleton variant="avatar" />
    <S.DataWrapper>
      <S.DataSkeleton variant="title" />
      <S.DataSkeleton variant="text" />
    </S.DataWrapper>
    <S.Buttons.Container>
      <S.DataSkeleton variant="button" />
      <S.DataSkeleton variant="button" />
    </S.Buttons.Container>
  </S.Container>
);
