import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { KeyFrames, css, styled } from '@/theme';

const Trigger = styled(DropdownMenu.Trigger, {
  cursor: 'pointer',
});

const Content = styled(DropdownMenu.Content, {
  minWidth: 'calc($2xs - $space$spacing-4)',
  marginTop: '$space$spacing-1',
  backgroundColor: '$surface-monochrome',
  borderRadius: '$lg',
  baseBorder: '$border-slate',
  padding: '$spacing-2-5 $spacing-3',
  display: 'flex',
  flexDirection: 'column',
  gap: '$spacing-2-5',
  zIndex: '$dropdown',

  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  boxShadow: '$menu',

  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: KeyFrames.slideDownAndFade },
    '&[data-side="bottom"]': { animationName: KeyFrames.slideUpAndFade },
  },
});

const itemStyles = css({
  all: 'unset',
  textSize: '$sm',
  color: '$text-secondary',
  borderRadius: '$lg',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  padding: '$spacing-2-5 $spacing-3',
  userSelect: 'none',
  flexDirection: 'row',
  justifyContent: 'space-between',
  cursor: 'pointer',
  width: '$full',
  boxSizing: 'border-box',

  '&[data-highlighted]': {
    backgroundColor: '$surface-tertiary',
    color: '$text-primary',
  },

  '&[data-disabled]': {
    cursor: 'not-allowed',
    color: '$text-tertiary',
  },
});

const Label = styled(DropdownMenu.Label, {
  fontSize: '$xs',
  fontWeight: '$tertiary',
  color: '$text-secondary',
  marginTop: '$spacing-2',
});

const Item = styled(DropdownMenu.Item, itemStyles);

const CheckboxItem = styled(DropdownMenu.CheckboxItem, itemStyles, {
  '&[data-state="checked"]': {
    backgroundColor: '$surface-tertiary',
    color: '$text-primary',
  },
});

const Separator = styled(DropdownMenu.Separator, {
  width: '$full',
  baseBorderBottom: '$border-slate',
});

const ItemIndicator = styled(DropdownMenu.ItemIndicator, {
  color: '$icon-slate-actionable-focus',
});

export const MenuStyles = {
  Content,
  Trigger,
  Label,
  Item,
  Separator,
  CheckboxItem,
  ItemIndicator,
};
