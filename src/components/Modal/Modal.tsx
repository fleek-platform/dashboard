import { Box, Dialog, Text } from '@/ui';
import { withProps } from '@/utils/withProps';

import { ModalStyles as S } from './Modal.styles';

const Content = withProps(Dialog.Content, {
  className: 'gap-6 text-sm w-[26.5rem]',
});
const Heading = withProps(Text, {
  as: 'h1',
  variant: 'primary',
  size: 'xl',
  weight: 700,
});
const CTARow = withProps(Box, { className: 'flex-row gap-4 child:flex-1' });
const Row = withProps(Box, { className: 'flex-row gap-2' });
const Container = withProps(Box, {
  variant: 'container',
  className: 'gap-3 py-3 px-4',
});

export const Modal = {
  Content,
  Heading,
  CTARow,
  RadioGroup: {
    Root: S.RadioGroup.Root,
    ItemContainer: S.RadioGroup.ItemContainer,
  },
  Inner: {
    Container,
    Row,
    TextSkeleton: S.Inner.TextSkeleton,
  },
};

export namespace Modal {
  export type Content = React.ComponentPropsWithRef<typeof S.Content>;
  export type Heading = React.ComponentPropsWithRef<typeof Heading>;
  export type CTARow = React.ComponentPropsWithRef<typeof CTARow>;
  export type RadioGroup = {
    Root: React.ComponentPropsWithRef<typeof S.RadioGroup.Root>;
    ItemContainer: React.ComponentPropsWithRef<
      typeof S.RadioGroup.ItemContainer
    >;
  };
  export type Inner = {
    Container: React.ComponentPropsWithRef<typeof Container>;
    Row: React.ComponentPropsWithRef<typeof Row>;
    TextSkeleton: React.ComponentPropsWithRef<typeof S.Inner.TextSkeleton>;
  };
}
