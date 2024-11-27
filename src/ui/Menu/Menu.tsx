import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { forwardStyledRef } from '@/theme';

import { MenuStyles as S } from './Menu.styles';

const Item = forwardStyledRef<HTMLDivElement, Menu.ItemProps>(S.Item, ({ children, disabled, onClick, ...props }, ref) => {
  // TODO use onSelect for dropdown menu instead
  const handleOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !onClick) {
      return;
    }

    onClick(event);
  };

  return (
    <S.Item onClick={handleOnClick} disabled={disabled} {...props} ref={ref}>
      {children}
    </S.Item>
  );
});

export const Menu = {
  Root: DropdownMenu.Root,
  Trigger: S.Trigger,
  Portal: DropdownMenu.Portal,
  Content: S.Content,
  Label: S.Label,
  Item,
  CheckboxItem: S.CheckboxItem,
  ItemIndicator: S.ItemIndicator,
  Separator: S.Separator,
};

export namespace Menu {
  export type RootProps = React.ComponentPropsWithRef<typeof DropdownMenu.Root>;
  export type TriggerProps = { children: React.ReactElement } & React.ComponentPropsWithRef<typeof S.Trigger>;
  export type PortalProps = React.ComponentPropsWithRef<typeof DropdownMenu.Portal>;
  export type ContentProps = React.ComponentPropsWithRef<typeof S.Content>;
  export type LabelProps = React.ComponentPropsWithRef<typeof S.Label>;
  export type ItemProps = React.ComponentPropsWithRef<typeof S.Item>;
  export type CheckboxItemProps = React.ComponentPropsWithRef<typeof S.CheckboxItem>;
  export type ItemIndicatorProps = React.ComponentPropsWithRef<typeof S.ItemIndicator>;
  export type SeparatorProps = React.ComponentPropsWithRef<typeof S.Separator>;
}
