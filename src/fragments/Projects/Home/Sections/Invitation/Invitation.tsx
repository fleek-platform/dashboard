import { useState } from 'react';

import { AvatarMarble, Button, Text } from '@/ui';

import { InvitationStyles as S } from './Invitation.styles';

export type InvitationProps = {
  isLoading: boolean;
  projectName: string | undefined;
  avatarSrc?: string | undefined;
  projectId?: string;
  onAcceptInvitation: () => void;
  onDeclineInvitation: () => void;
};

export const Invitation: React.FC<InvitationProps> = ({
  isLoading,
  projectName,
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

  const handleAcceptInvitation = async () => {
    setIsAcceptingInvitation(true);
    await onAcceptInvitation();
    setIsAcceptingInvitation(false);
  };

  const handleDeclineInvitation = async () => {
    setIsDecliningInvitation(true);
    await onDeclineInvitation();
    setIsDecliningInvitation(false);
  };

  return (
    <S.Container className="flex-row">
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
      <S.Buttons.Container className="flex-row">
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
  <S.Container className="flex-row">
    <S.DataSkeleton variant="avatar" />
    <S.DataWrapper>
      <S.DataSkeleton variant="title" />
      <S.DataSkeleton variant="text" />
    </S.DataWrapper>
    <S.Buttons.Container className="flex-row">
      <S.DataSkeleton variant="button" />
      <S.DataSkeleton variant="button" />
    </S.Buttons.Container>
  </S.Container>
);
