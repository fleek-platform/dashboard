import * as TooltipRadix from '@radix-ui/react-tooltip';

import { forwardStyledRef } from '@/theme';
import { ChildrenProps } from '@/types/Props';

import { TooltipStyles as S } from './Tooltip.styles';

const Content = forwardStyledRef<HTMLDivElement, Tooltip.Content>(S.Content, ({ children, ...props }, _ref) => (
  <S.Content {...props}>
    {children}
    <S.Arrow />
  </S.Content>
));

export const Tooltip = {
  Provider: TooltipRadix.Provider,
  Root: TooltipRadix.Root,
  Trigger: S.Trigger,
  Portal: TooltipRadix.Portal,
  Content,
};

export namespace Tooltip {
  export type Provider = React.ComponentPropsWithRef<typeof TooltipRadix.Provider>;
  export type Root = React.ComponentPropsWithRef<typeof TooltipRadix.Root>;
  export type Trigger = React.ComponentPropsWithRef<typeof TooltipRadix.Trigger>;
  export type Portal = React.ComponentPropsWithRef<typeof TooltipRadix.Portal>;
  export type Content = ChildrenProps<React.ComponentPropsWithRef<typeof S.Content>>;
}
