import * as DialogRadix from '@radix-ui/react-dialog';

import { KeyFrames, styled } from '@/theme';

export const DialogStyles = {
  Overlay: styled(DialogRadix.Overlay, {
    backgroundColor: '$background',
    opacity: 0.7,
    position: 'fixed',
    inset: 0,
    zIndex: '$overlay',
  }),
  Content: styled(DialogRadix.Content, {
    baseBorder: '$border-slate',
    borderRadius: '$xl',
    backgroundColor: '$surface-primary',
    padding: '$spacing-6',
    // maxWidth: 'calc($sm + $space$spacing-7)',
    maxHeight: 'calc(100vh - $space$page-padding * 2)',
    position: 'fixed',
    margin: 'auto',
    inset: 0,
    height: 'fit-content',
    width: '90vw',
    animation: `${KeyFrames.contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    '&:focus': { outline: 'none' },
    zIndex: '$modal',

    display: 'flex',
    flexDirection: 'column',
    gap: '$spacing-6',

    overflow: 'hidden auto',
  }),
};
