import { Text } from '@/ui';
import { withProps } from '@/utils/withProps';

import { ModalStyles as S } from './Modal.styles';

const Heading = withProps(Text, { as: 'h1', variant: 'primary', size: 'xl', weight: 700 });

export const Modal = {
  Content: S.Content,
  Heading,
  CTARow: S.CTARow,
  RadioGroup: {
    Root: S.RadioGroup.Root,
    ItemContainer: S.RadioGroup.ItemContainer,
  },
  Inner: {
    Container: S.Inner.Container,
    Row: S.Inner.Row,
    TextSkeleton: S.Inner.TextSkeleton,
  },
};

export namespace Modal {
  export type Content = React.ComponentPropsWithRef<typeof S.Content>;
  export type Heading = React.ComponentPropsWithRef<typeof Heading>;
  export type CTARow = React.ComponentPropsWithRef<typeof S.CTARow>;
  export type RadioGroup = {
    Root: React.ComponentPropsWithRef<typeof S.RadioGroup.Root>;
    ItemContainer: React.ComponentPropsWithRef<typeof S.RadioGroup.ItemContainer>;
  };
  export type Inner = {
    Container: React.ComponentPropsWithRef<typeof S.Inner.Container>;
    Row: React.ComponentPropsWithRef<typeof S.Inner.Row>;
    TextSkeleton: React.ComponentPropsWithRef<typeof S.Inner.TextSkeleton>;
  };
}
