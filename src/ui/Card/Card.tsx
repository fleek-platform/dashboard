import { CardStyles as S } from './Card.styles';

export const Card = {
  Root: S.Root,
  Content: S.Content,
  Cover: S.Cover,
};

export namespace Card {
  export type RootProps = React.ComponentProps<typeof S.Root>;
  export type CoverProps = React.ComponentProps<typeof S.Cover>;

  export namespace Content {
    export type WrapperProps = React.ComponentProps<typeof S.Content.Wrapper>;
    export type RowProps = React.ComponentProps<typeof S.Content.Row>;
  }
}
