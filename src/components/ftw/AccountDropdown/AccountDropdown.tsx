import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { routes } from '@fleek-platform/utils-routes';
import { useMemo } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';

import { constants } from '@/constants';
import { MeQuery, useMeQuery } from '@/generated/graphqlClient';
import { useMediaQueryWindow } from '@/hooks/useMediaQueryWindow';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { useTheme } from '@/providers/ThemeProvider';
import {
  Avatar,
  AvatarMarble,
  Box,
  Icon,
  SidebarDropdown,
  Skeleton,
  Text,
} from '@/ui';
import { cn } from '@/utils/cn';

type AccountDropdownAvatarProps = {
  userId: MeQuery['user']['id'] | undefined;
  avatarSrc: string;
  className: string;
};

const AccountDropdownAvatar: React.FC<AccountDropdownAvatarProps> = ({
  userId,
  avatarSrc,
  className,
}) => {
  if (!avatarSrc && !userId) {
    return (
      <Box className="size-6 justify-center items-center">
        <Text size="xs">N/A</Text>
      </Box>
    );
  }

  if (!avatarSrc) {
    return <AvatarMarble name={userId} className={cn('shrink-0', className)} />;
  }

  return (
    <Avatar
      enableIcon
      icon="image"
      title={userId}
      src={avatarSrc}
      className={cn('shrink-0', className)}
    />
  );
};

export const AccountDropdown: React.FC = () => {
  const { primaryWallet } = useDynamicContext();
  const projectContext = useProjectContext();

  const { data: ensName } = useEnsName({
    address: primaryWallet?.address as `0x${string}`,
  });

  const { data: avatar, isLoading: isAvatarLoading } = useEnsAvatar({
    name: ensName,
  });

  const { theme, toggleTheme } = useTheme();
  const [meQuery] = useMeQuery();

  const session = useSessionContext();
  const projectId = session.project.id;

  const isMobile = useMediaQueryWindow('(max-width: 830px)');

  const isLoading = useMemo(
    () =>
      (meQuery.fetching && !meQuery.data) ||
      projectContext.loading ||
      isAvatarLoading,
    [meQuery, projectContext, isAvatarLoading],
  );

  if (isLoading) {
    return (
      <Box className="flex-row items-center gap-3 h-7 px-3 py-1">
        <Skeleton variant="avatar" className="size-6 rounded" />
        <Skeleton variant="text" className="w-1/2 h-2.5" />
      </Box>
    );
  }

  return (
    <SidebarDropdown.Root>
      <SidebarDropdown.Trigger className="group rounded flex justify-between items-center transition-colors px-3 py-1 focus-visible:ring-2 focus-visible:ring-neutral-8">
        <Box className="flex-row items-center gap-3 select-none">
          <AccountDropdownAvatar
            userId={meQuery.data?.user.id}
            avatarSrc={meQuery.data?.user.avatar || avatar}
            className="rounded size-6"
          />
          <Text variant="primary" weight={500}>
            {meQuery.data?.user.username}
          </Text>
        </Box>
        <Box className="group-hover:bg-neutral-3 items-center justify-center size-[1.75rem] rounded-lg transition-colors shrink-0">
          <Icon
            name={isMobile ? 'chevron-up' : 'chevron-right'}
            className="group-data-[state=open]:rotate-180 transition-all size-4"
          />
        </Box>
      </SidebarDropdown.Trigger>
      <SidebarDropdown.Content
        side={isMobile ? 'top' : 'right'}
        align={isMobile ? 'center' : 'end'}
        sideOffset={isMobile ? 6 : -6}
        className="data-[state=open]:animate-fade-in-top rounded-lg w-[14.438rem] flex flex-col gap-2.5 p-2.5 bg-neutral-1 border border-neutral-6 shadow-xl z-20"
      >
        <Box className="gap-2">
          <SidebarDropdown.Item
            href={routes.project.home({ projectId })}
            iconRight="home"
          >
            Home
          </SidebarDropdown.Item>
          <SidebarDropdown.Item
            href={routes.profile.settings.general()}
            iconRight="gear"
          >
            Account settings
          </SidebarDropdown.Item>
          <SidebarDropdown.Item
            onClick={toggleTheme}
            iconRight={theme === 'dark' ? 'moon' : 'sun'}
          >
            Toggle theme
          </SidebarDropdown.Item>
          <SidebarDropdown.Item
            href={constants.EXTERNAL_LINK.FLEEK_HOME}
            iconRight="arrow-up-right"
            isExternalLink
          >
            Fleek homepage
          </SidebarDropdown.Item>
          <SidebarDropdown.Separator />
          <SidebarDropdown.Item onClick={session.auth.logout} iconRight="exit">
            Disconnect
          </SidebarDropdown.Item>
        </Box>
      </SidebarDropdown.Content>
    </SidebarDropdown.Root>
  );
};
