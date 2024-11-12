import * as RadixAccordion from '@radix-ui/react-accordion';

import { forwardStyledRef } from '@/theme';

import { AccordionStyles as S } from './Accordion.styles';

const Header = forwardStyledRef<HTMLButtonElement, Accordion.HeaderProps>(S.Trigger, ({ children, hideChevron = false, ...props }, ref) => (
  <S.Header hideChevron={hideChevron}>
    <S.Trigger {...props} ref={ref}>
      {children}
      {!hideChevron && <S.Chevron name="chevron-right" aria-hidden />}
    </S.Trigger>
  </S.Header>
));

export const Accordion = {
  Root: S.Root,
  Item: S.Item,
  Header,
  Content: S.Content,
};

export namespace Accordion {
  export type RootProps = React.ComponentPropsWithRef<typeof S.Root>;
  export type ItemProps = React.ComponentPropsWithRef<typeof RadixAccordion.Item>;
  export type HeaderProps = { children: React.ReactNode; hideChevron?: boolean } & React.ComponentPropsWithRef<typeof S.Trigger>;
  export type ContentProps = React.ComponentPropsWithRef<typeof S.Content>;
}
