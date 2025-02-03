import * as ToastLib from '@radix-ui/react-toast';

import { KeyFrames, styled } from '@/theme';

export const ViewportPadding = '$md';
export const DismissTimeout = 200;

export const ToastStyles = {
  Provider: ToastLib.Provider,

  Root: styled(ToastLib.Root, {
    padding: '$spacing-4',
    borderRadius: '$lg',
    width: '$sm',
    backgroundColor: '$surface-primary',

    '@media (prefers-reduced-motion: no-preference)': {
      '&[data-state="open"]': {
        animation: `${KeyFrames.show} 750ms `,
      },
      '&[data-state="closed"]': {
        animation: `${KeyFrames.hide} ${DismissTimeout}ms ease-in`,
      },
    },

    variants: {
      variant: {
        default: {
          baseBorder: '$border-slate',
        },
        warning: {
          baseBorder: '$border-amber-actionable-focus',
        },
        error: {
          baseBorder: '$border-red-actionable-focus',
        },
        success: {
          baseBorder: '$border-green-actionable-focus',
        },
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }),
  Body: styled(ToastLib.Description, {
    textSize: '$sm',
    textCategory: '$primary',
  }),
  Close: ToastLib.Close,
  Viewport: styled(ToastLib.Viewport, {
    listStyleType: 'none',
    position: 'fixed',
    bottom: '1em',
    right: '1em',
    display: 'flex',
    flexDirection: 'column',
    gap: '$spacing-6',
    zIndex: '$toast',
    minWidth: '$2xs',
  }),
};
