import { forwardStyledRef } from '@/theme';

import { ScrollableStyles as S } from './Scrollable.styles';

const Root = forwardStyledRef<HTMLDivElement, Scrollable.RootProps>(S.Root, ({ children, ...props }, ref) => (
  <S.Root {...props} ref={ref}>
    {children}
    <S.Corner />
  </S.Root>
));

const HorizontalBar = forwardStyledRef<HTMLDivElement, Scrollable.BarProps>(S.Scrollbar, (props, ref) => (
  <S.Scrollbar orientation="horizontal" {...props} ref={ref}>
    <S.Thumb />
  </S.Scrollbar>
));

const VerticalBar = forwardStyledRef<HTMLDivElement, Scrollable.BarProps>(S.Scrollbar, (props, ref) => (
  <S.Scrollbar orientation="vertical" {...props} ref={ref}>
    <S.Thumb />
  </S.Scrollbar>
));

export const Scrollable = {
  Root,
  Viewport: S.Viewport,
  HorizontalBar,
  VerticalBar,
};

export namespace Scrollable {
  export type RootProps = React.ComponentPropsWithRef<typeof S.Root>;

  export type BarProps = Omit<React.ComponentPropsWithRef<typeof S.Scrollbar>, 'orientation' | 'children'>;
}
