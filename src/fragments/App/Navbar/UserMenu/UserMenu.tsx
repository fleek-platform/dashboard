import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { routes } from '@fleek-platform/utils-routes';
import { useMemo } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';

import { ExternalLink, Link } from '@/components';
import { constants } from '@/constants';
import { useMeQuery } from '@/generated/graphqlClient';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { LoadingProps } from '@/types/Props';
import { Avatar, AvatarMarble, AvatarProps, Icon, Menu, Skeleton } from '@/ui';

import { UserMenuStyles as S } from './UserMenu.styles';

export const UserMenu: React.FC = () => {
  const { primaryWallet } = useDynamicContext();
  const projectContext = useProjectContext();

  const { data: ensName } = useEnsName({
    address: primaryWallet?.address as `0x${string}`,
  });

  const { data: avatar, isLoading: isAvatarLoading } = useEnsAvatar({
    name: ensName,
  });

  const { theme, toggleTheme } = useTheme();
  const session = useSessionContext();
  const projectId = session.project.id;
  const [meQuery] = useMeQuery();

  const handleCreateProjectClick = (): void => {
    projectContext.setIsCreateProjectModalOpen(true);
  };

  const isLoading = useMemo(
    () => (meQuery.fetching && !meQuery.data) || projectContext.loading || isAvatarLoading,
    [meQuery, projectContext, isAvatarLoading]
  );

  return (
    <S.Menu.Root>
      <S.Menu.Trigger>
        <MenuAvatar isLoading={isLoading as true} avatarSrc={meQuery.data?.user.avatar || avatar} userId={meQuery?.data?.user.id} />
      </S.Menu.Trigger>
      <Menu.Content align="end">
        <Link href={routes.project.home({ projectId })}>
          <Menu.Item>
            Home <Icon name="home" />
          </Menu.Item>
        </Link>
        <Menu.Separator />
        <Menu.Item onClick={handleCreateProjectClick}>
          Create project <Icon name="plus-circle" />
        </Menu.Item>
        <Link href={routes.profile.settings.general()}>
          <Menu.Item>
            Account settings <Icon name="gear" />
          </Menu.Item>
        </Link>
        <Menu.Separator />
        <Menu.Item onClick={toggleTheme}>
          Toggle theme <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
        </Menu.Item>
        <Menu.Separator />
        <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_HOME}>
          <Menu.Item>
            Fleek homepage <Icon name="arrow-up-right" />
          </Menu.Item>
        </ExternalLink>
        <Menu.Separator />
        <Menu.Item onClick={session.auth.logout}>
          Disconnect <Icon name="exit" />
        </Menu.Item>
      </Menu.Content>
    </S.Menu.Root>
  );
};

type MenuAvatarProps = LoadingProps<{
  avatarSrc: AvatarProps['src'];
  userId: string;
}>;

const MenuAvatar: React.FC<MenuAvatarProps> = ({ isLoading, avatarSrc, userId }) => {
  if (isLoading) {
    return <Skeleton variant="avatar" />;
  }

  if (avatarSrc) {
    return <Avatar enableIcon src={avatarSrc} />;
  }

  return <AvatarMarble name={userId} rounded />;
};
