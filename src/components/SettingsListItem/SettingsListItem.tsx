import { ExternalLink } from '@/components';
import type { ChildrenProps, DisabledProps, LoadingProps } from '@/types/Props';
import { AvatarMarble, Button, Icon, type IconName, Menu, Text } from '@/ui';

import { PermissionsTooltip } from '../PermissionsTooltip/PermissionsTooltip';
import { SettingsListItemStyles as S } from './SettingsListItem.styles';

export type SettingsListItemProps = ChildrenProps<
  {
    avatarSrc?: string;
    avatarIcon?: IconName;
    marbleSrc?: string;
    testId?: string;
  } & SettingsListItem.DataProps
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
}: SettingsListItemProps) => {
  return (
    <S.Container variant="container" data-testid={testId}>
      {avatarSrc || avatarIcon ? (
        <S.Avatar src={avatarSrc} icon={avatarIcon} enableIcon={true} />
      ) : (
        marbleSrc && <S.Avatar as={AvatarMarble} name={marbleSrc} />
      )}

      <SettingsListItem.Data
        title={title}
        subtitle={subtitle}
        titleSuffix={titleSuffix}
      />

      {children}
    </S.Container>
  );
};

SettingsListItem.Skeleton = ({
  enableAvatar,
  disableTitle,
  disableSubtitle,
}: SettingsListItem.SkeletonProps) => {
  return (
    <S.Container variant="container">
      {enableAvatar && <S.DataSkeleton variant="avatar" />}
      <S.DataWrapper>
        {!disableTitle && <S.DataSkeleton variant="title" />}
        {!disableSubtitle && <S.DataSkeleton variant="text" />}
      </S.DataWrapper>
    </S.Container>
  );
};

SettingsListItem.DropdownMenu = ({
  isLoading,
  isDisabled,
  hasAccess = true,
  align = 'end',
  side = 'bottom',
  children,
  ...props
}: SettingsListItem.DropdownProps) => {
  if (isLoading) {
    return (
      <Button
        intent="ghost"
        size="sm"
        loading
        disabled
        className="self-center p-1"
      />
    );
  }

  if (isDisabled) {
    return (
      <PermissionsTooltip hasAccess={hasAccess} asChild>
        <Button
          color="ghost"
          size="sm"
          disabled={isDisabled}
          className="self-center p-1"
        >
          <Icon name="ellipsis-vertical" />
        </Button>
      </PermissionsTooltip>
    );
  }

  return (
    <Menu.Root {...props}>
      <Menu.Trigger asChild>
        <Button
          intent="ghost"
          size="sm"
          loading={isLoading}
          className="self-center p-1"
        >
          <Icon name="ellipsis-vertical" />
        </Button>
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Content align={align} side={side}>
          {children}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};

SettingsListItem.DropdownMenuItem = ({
  icon,
  children,
  href,
  ...props
}: SettingsListItem.DropdownMenuItemProps) => {
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

SettingsListItem.Data = ({
  title,
  subtitle,
  titleSuffix,
}: SettingsListItem.DataProps) => (
  <S.DataWrapper>
    <Text as="h3" variant="primary" weight={500}>
      {title}
      {titleSuffix && <S.DataTitleSuffix>{titleSuffix}</S.DataTitleSuffix>}
    </Text>
    <Text size="xs" weight={500} className="flex gap-2">
      {subtitle}
    </Text>
  </S.DataWrapper>
);

SettingsListItem.DataSkeleton = () => (
  <S.DataWrapper>
    <S.DataSkeleton variant="title" />
    <S.DataSkeleton variant="text" />
  </S.DataWrapper>
);

SettingsListItem.FlatRow = S.FlatRow;

export namespace SettingsListItem {
  export type SkeletonProps = {
    enableAvatar?: boolean;
    disableTitle?: boolean;
    disableSubtitle?: boolean;
  };

  export type DropdownProps = LoadingProps &
    DisabledProps &
    Menu.RootProps &
    Pick<Menu.ContentProps, 'align' | 'side'> & { hasAccess?: boolean };

  export type DropdownMenuItemProps = ChildrenProps<{
    icon?: IconName | null;
    href?: string;
  }> &
    Omit<React.ComponentProps<typeof Menu.Item>, 'children'>;

  export type DataProps = {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    titleSuffix?: string;
  };
}
