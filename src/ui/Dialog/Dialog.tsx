import * as DialogRadix from '@radix-ui/react-dialog';

import { DialogStyles as S } from './Dialog.styles';

export const Dialog = {
  Root: DialogRadix.Root,
  Trigger: DialogRadix.Trigger,
  Portal: DialogRadix.Portal,
  Overlay: S.Overlay,
  Content: S.Content,
  Close: DialogRadix.Close,
  Title: DialogRadix.Title,
  Description: DialogRadix.Description,
};

export namespace Dialog {
  export type RootProps = React.ComponentPropsWithRef<typeof DialogRadix.Root>;
  export type TriggerProps = React.ComponentPropsWithRef<typeof DialogRadix.Trigger>;
}
