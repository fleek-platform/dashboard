import * as Popover from '@radix-ui/react-popover';

import { KeyFrames, styled } from '@/theme';

import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { Icon } from '../Icon/Icon';
import { Scrollable } from '../Scrollable/Scrollable';

export const ComboboxStyles = {
  Root: Popover.Root,
  Portal: Popover.Portal,
  Close: Popover.Close,

  Wrapper: styled('div', {
    [`& ${Avatar}`]: {
      fontSize: '0.625em',
    },
  }),

  Anchor: styled(Popover.Anchor, {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
  }),

  CompoundOption: {
    Container: styled(Box, {
      gap: '$spacing-1',
    }),
    Header: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-2-5',
      textSize: '$sm',
      textCategory: '$tertiary',
      color: '$text-primary',
    }),
    Content: styled(Box, {
      textSize: '$sm',
      textCategory: '$primary',
      color: '$text-secondary',
    }),
  },

  Option: styled('li', {
    width: '$full',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '$spacing-4',
    cursor: 'pointer',
    padding: '$spacing-2-5 $spacing-3',
    borderRadius: '$inline-component-radii',
    color: '$text-secondary',
    transition: '$all-200',

    '&:first-child, &:text': {
      flex: 1,
    },

    '&[data-state*="selected"]': {
      backgroundColor: '$surface-tertiary',
    },

    '&:hover, &:focus': {
      backgroundColor: '$surface-tertiary',
      color: '$text-primary',
    },
  }),

  ExtraOption: styled('li', {
    width: '$full',
    display: 'flex',
    alignItems: 'center',
    gap: '$spacing-2-5',
    cursor: 'pointer',
    padding: '$spacing-2-5 $spacing-3',
    borderRadius: '$inline-component-radii',
    color: '$text-secondary',
    transition: '$all-200',

    '&:first-child, &:text': {
      flex: 1,
    },

    '&[data-state*="selected"]': {
      backgroundColor: '$surface-tertiary',
    },

    '&:hover, &:focus': {
      backgroundColor: '$surface-tertiary',
      color: '$text-primary',
    },

    [`> ${Icon}`]: {
      width: '1.8rem',
      height: '1.8rem',
    },

    variants: {
      disabled: {
        true: {
          cursor: 'not-allowed',
          color: '$text-tertiary',

          '&:hover, &:focus': {
            backgroundColor: '$surface-secondary',
            color: '$text-secondary',
          },
        },
      },
    },
  }),

  ContentWrapper: styled('div', {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '$spacing-2-5',
    flex: 1,

    variants: {
      placeholder: {
        true: {
          color: '$text-secondary',
        },
      },
    },
  }),

  Options: styled(Popover.Content, {
    display: 'flex',
    flexDirection: 'column',
    baseBorder: '$border-slate',
    backgroundColor: '$surface-monochrome',
    boxSizing: 'border-box',
    left: 0,
    right: 0,
    padding: '$spacing-2-5 $spacing-3',
    gap: '$spacing-2-5',
    borderRadius: '$lg',
    zIndex: '$popover',
    width: 'var(--radix-popover-trigger-width)',

    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',

    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: KeyFrames.slideDownAndFade, marginBottom: '$sizes$inline-component-height-sm' },
      '&[data-side="right"]': { animationName: KeyFrames.slideLeftAndFade, marginLeft: '$sizes$inline-component-height-sm' },
      '&[data-side="bottom"]': { animationName: KeyFrames.slideUpAndFade, marginTop: '$sizes$inline-component-height-sm' },
      '&[data-side="left"]': { animationName: KeyFrames.slideRightAndFade, marginRight: '$sizes$inline-component-height-sm' },
    },
  }),

  Scrollable: {
    Root: styled(Scrollable.Root),
    Viewport: styled(Scrollable.Viewport, {
      maxHeight: 'calc(var(--radix-popover-content-available-height) - $inline-component-height-sm * 2)',
      margin: '-$spacing-2-5 0',
      padding: '$spacing-2-5 0',

      '&[data-attribute="search"]': {
        maxHeight: 'calc(var(--radix-popover-content-available-height) - $inline-component-height-sm - $space$spacing-9)',
      },
    }),
    Bar: styled(Scrollable.VerticalBar, {
      right: '-$spacing-2 !important',

      [`&[data-state="visible"] ~ ${Scrollable.Viewport}`]: {
        paddingRight: '$spacing-4',
      },
    }),
    Content: styled(Box, { gap: '$spacing-3' }),
  },

  Field: styled(Popover.Trigger, {
    width: '$full',

    '&[data-state="open"]': {
      borderColor: '$border-slate-actionable-focus',
      outlineColor: '$border-slate-actionable-focus',
    },

    variants: {
      isLoading: {
        true: {
          animation: `${KeyFrames.blink} 1s ease-in-out infinite`,
          backgroundColor: '$surface-skeleton',
          borderRadius: '$lg',
        },
      },
      disabled: {
        true: {
          div: {
            color: '$text-tertiary',

            '&::placeholder': {
              color: '$text-tertiary',
            },
          },

          [` ${Icon}`]: {
            color: '$text-tertiary',
          },
        },
        false: {
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
    },
  }),

  SearchIcon: styled(Icon, {
    color: '$icon-slate',
  }),

  Icon: styled(Icon, {
    color: '$icon-slate-actionable-focus',
  }),

  Message: styled('span', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$spacing-3',
    color: '$text-tertiary',
    fontStyle: 'italic',
  }),

  InnerSearchContainer: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: '$docked',
    gap: '$spacing-2-5',
    padding: '$spacing-2-5 $spacing-3',
    baseBorderBottom: '$border-slate',
    backgroundColor: '$surface-monochrome',
  }),
};

export namespace ComboboxStyles {
  export type RootProps = React.ComponentPropsWithRef<typeof ComboboxStyles.Root>;
  export type OptionsProps = React.ComponentPropsWithRef<typeof ComboboxStyles.Options>;
  export type FieldProps = React.ComponentPropsWithRef<typeof ComboboxStyles.Field>;
  export type WrapperProps = React.ComponentPropsWithRef<typeof ComboboxStyles.Wrapper>;
}
