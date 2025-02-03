import { styled } from '@/theme';
import { Accordion } from '@/ui';

export const UploadWidgetStyles = {
  Accordion: {
    Root: styled(Accordion.Root, {
      borderBottomLeftRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
      borderBottom: 'none',

      maxWidth: 'calc($sm + $space$spacing-4)',
      alignSelf: 'end',

      position: 'fixed',
      right: '$spacing-6',
      bottom: 0,
      zIndex: '1',
    }),
    Item: styled(Accordion.Item, {
      borderBottomLeftRadius: '0 !important',
      borderBottomRightRadius: '0 !important',
    }),
    Header: styled(Accordion.Header, {
      fontSize: '$sm',
    }),
    Content: styled(Accordion.Content, {
      padding: '0',
      maxHeight: '19.5rem', // needs to be hardcoded to fit the files list
      overflowY: 'scroll',
    }),
  },
};
