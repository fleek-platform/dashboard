import React, { forwardRef } from 'react';

import { ExternalLink, SettingsBox } from '@/components';
import { ChildrenProps, DisabledProps, LoadingProps } from '@/types/Props';
import { Avatar, AvatarMarble, Box, BoxProps, Button, Icon, IconName, Menu, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { PermissionsTooltip } from '../PermissionsTooltip/PermissionsTooltip';

export type SettingsListItemProps = ChildrenProps<
  {
    avatarSrc?: string;
    avatarIcon?: IconName;
    marbleSrc?: string;
    testId?: string;
    className?: string;
  } & DataProps
>;

export const SettingsListItem = ({
  children,
  title,
  titleSuffix,
  subtitle,
  avatarSrc,
  avatarIcon,
  testId,
  marbleSrc,
  className,
}: SettingsListItemProps) => {
  return (
    <Container className={className} data-testid={testId}>
      <Box className="flex-row gap-4">
        {avatarSrc || avatarIcon ? (
          <Avatar src={avatarSrc} icon={avatarIcon} enableIcon={true} className="bg-neutral-5 text-lg" />
        ) : (
          marbleSrc && <Avatar as={AvatarMarble} name={marbleSrc} className="bg-neutral-5 text-lg rounded-full" />
        )}
        <SettingsListItem.Data title={title} subtitle={subtitle} titleSuffix={titleSuffix} />
      </Box>
      {children}
    </Container>
  );
};

const Container = forwardRef<HTMLDivElement, BoxProps>(({ children, className, ...props }, ref) => (
  <Box variant="container" ref={ref} className={cn('flex-row justify-between items-center gap-3 p-4 bg-transparent', className)} {...props}>
    {children}
  </Box>
));

type SkeletonProps = { enableAvatar?: boolean; disableTitle?: boolean; disableSubtitle?: boolean };

SettingsListItem.Skeleton = ({ enableAvatar, disableTitle, disableSubtitle }: SkeletonProps) => {
  return (
    <Container>
      {enableAvatar && <SettingsBox.Skeleton variant="avatar" className="size-7" />}
      <Box className="flex-1 gap-1">
        {!disableTitle && <SettingsBox.Skeleton variant="title" className="w-1/3" />}
        {!disableSubtitle && <SettingsBox.Skeleton variant="text" className="w-1/2" />}
      </Box>
    </Container>
  );
};

type DropdownMenuProps = LoadingProps &
  DisabledProps &
  Menu.RootProps &
  Pick<Menu.ContentProps, 'align' | 'side'> & { hasAccess?: boolean };

SettingsListItem.DropdownMenu = ({
  isLoading,
  isDisabled,
  hasAccess = true,
  align = 'end',
  side = 'bottom',
  children,
  ...props
}: DropdownMenuProps) => {
  if (isLoading) {
    return <Button intent="ghost" size="sm" loading disabled className="self-center p-1" />;
  }

  if (isDisabled) {
    return (
      <PermissionsTooltip hasAccess={hasAccess} asChild>
        <Button color="ghost" size="sm" disabled={isDisabled} className="self-center p-1">
          <Icon name="ellipsis-vertical" />
        </Button>
      </PermissionsTooltip>
    );
  }

  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        <Button intent="ghost" size="sm" loading={isLoading} className="self-center p-1">
          <Icon name="ellipsis-vertical" />
        </Button>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Content align={align} side={side} className="w-10">
          {children}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

type DropdownMenuItemProps = ChildrenProps<{
  icon?: IconName | null;
  href?: string;
}> &
  Omit<React.ComponentProps<typeof Menu.Item>, 'children'>;

SettingsListItem.DropdownMenuItem = ({ icon, children, href, ...props }: DropdownMenuItemProps) => {
  const content = (
    <Menu.Item {...props}>
      {children}
      {icon && <Icon name={icon} />}
    </Menu.Item>
  );

  if (href) {
    return <ExternalLink href={href}>{content}</ExternalLink>;
  }

  return content;
};

SettingsListItem.DropdownMenuSeparator = Menu.Separator;

type DataProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  titleSuffix?: string;
  className?: string;
};

SettingsListItem.Data = ({ title, subtitle, titleSuffix, className }: DataProps) => (
  <Box className={cn('gap-1', className)}>
    <Text as="h3" variant="primary" weight={500}>
      {title}
      {titleSuffix && <Text as="span">{titleSuffix}</Text>}
    </Text>
    {subtitle && (
      <Text size="xs" weight={500} className="flex gap-2">
        {subtitle}
      </Text>
    )}
  </Box>
);

SettingsListItem.DataSkeleton = () => (
  <Box className="flex-1 gap-1">
    <SettingsBox.Skeleton variant="title" className="w-1/3" />
    <SettingsBox.Skeleton variant="text" className="w-1/2" />
  </Box>
);

SettingsListItem.FlatRow = ({ children, className, testId }: BoxProps & { testId?: string }) => (
  <Box
    className={cn('grid grid-cols-[3fr_3fr_1rem] gap-4 p-4 items-center [&:not(:last-child)]:border-b-[1px] border-b-neutral-6', className)}
    data-testid={testId}
  >
    {children}
  </Box>
);
