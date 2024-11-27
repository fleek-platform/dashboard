import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';

import { Link } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { Icon, IconProps } from '@/ui/Icon/Icon';
import { cn } from '@/utils/cn';

const DropdownSeparator = () => <DropdownMenu.Separator className="h-[1px] bg-neutral-6" />;

const DropdownContent: React.FC<ChildrenProps & DropdownMenu.DropdownMenuContentProps> = ({ children, className, ...props }) => (
  <DropdownMenu.Portal>
    <DropdownMenu.Content {...props} className={cn(className)}>
      {children}
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
);

type DropdownItemProps = ChildrenProps &
  DropdownMenu.DropdownMenuItemProps & {
    onClick?: (e?: React.MouseEventHandler<HTMLDivElement>) => void;
    href?: string;
    isExternalLink?: boolean;
    iconLeft?: IconProps['name'];
    iconRight?: IconProps['name'];
  };

const DropdownItem = ({ children, onClick, href, isExternalLink, iconLeft, iconRight, className, ...props }: DropdownItemProps) => {
  const classNames = cn(
    'flex items-center gap-2.5 p-2 ring-0 outline-none focus-visible:bg-neutral-3 hover:bg-neutral-3 cursor-pointer rounded active:bg-neutral-4 outline-0 text-sm text-neutral-11 font-medium',
    { 'justify-between': iconRight },
    className
  );

  const Content = () => (
    <>
      {iconLeft && <Icon name={iconLeft} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </>
  );

  if (href && !isExternalLink) {
    return (
      <DropdownMenu.Item className={classNames} asChild>
        <Link href={href}>
          <Content />
        </Link>
      </DropdownMenu.Item>
    );
  }

  if (href && isExternalLink) {
    return (
      <DropdownMenu.Item className={classNames} asChild>
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Content />
        </a>
      </DropdownMenu.Item>
    );
  }

  return (
    <DropdownMenu.Item onClick={onClick} className={classNames} {...props}>
      <Content />
    </DropdownMenu.Item>
  );
};

class SidebarDropdownError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SidebarDropdownError';
  }
}

export const SidebarDropdown = () => {
  throw new SidebarDropdownError('Dropdown cannot be used as a standalone component. Please use one of the subcomponents instead.');
};

SidebarDropdown.Root = DropdownMenu.Root;
SidebarDropdown.Trigger = DropdownMenu.Trigger;
SidebarDropdown.Separator = DropdownSeparator;
SidebarDropdown.Content = DropdownContent;
SidebarDropdown.Item = DropdownItem;
