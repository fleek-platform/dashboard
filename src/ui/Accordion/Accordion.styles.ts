import * as RadixAccordion from '@radix-ui/react-accordion';

import { KeyFrames, styled } from '@/theme';

import { Icon } from '../Icon/Icon';

const Root = styled(RadixAccordion.Root, {
  width: '$full',
  baseBorder: '$border-slate',
  borderRadius: '$lg',
  backgroundColor: '$surface-tertiary',
});

const Item = styled(RadixAccordion.Item, {
  overflow: 'hidden',
  marginTop: '1px', // needed to fit designs
  baseBorderBottom: '$border-slate',

  '&:first-child': {
    marginTop: 0,
    borderTopLeftRadius: '$lg',
    borderTopRightRadius: '$lg',
  },

  '&:last-child': {
    borderBottomLeftRadius: '$lg',
    borderBottomRightRadius: '$lg',
    borderBottom: 'none',
  },

  '&:focus-within': {
    position: 'relative',
    zIndex: 1,
    boxShadow: '$slate3',
  },
});

const Header = styled(RadixAccordion.Header, {
  all: 'unset',
  display: 'flex',

  '&:hover': {
    cursor: 'pointer',
  },

  variants: {
    hideChevron: {
      true: {
        '&:hover': {
          cursor: 'default',
        },
      },
    },
  },
});

const Trigger = styled(RadixAccordion.Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  padding: '$spacing-4 $spacing-3',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textSize: '$xs',

  backgroundColor: 'transparent',
});

const Content = styled(RadixAccordion.Content, {
  backgroundColor: '$surface-monochrome',
  padding: '$spacing-4 $spacing-3',
  overflow: 'hidden',

  '&[data-state="open"]': {
    animation: `${KeyFrames.slideDown} 100ms cubic-bezier(0.87, 0, 0.13, 1)`,
    baseBorderTop: '$border-slate',

    '&:last-child': {
      borderBottom: 'none',
    },
  },
  '&[data-state="closed"]': {
    animation: `${KeyFrames.slideUp} 100ms cubic-bezier(0.87, 0, 0.13, 1)`,
  },
});

const Chevron = styled(Icon, {
  color: '$icon-slate',
  transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',

  '[data-state=open] &': { transform: 'rotate(90deg)' },
});

export const AccordionStyles = {
  Root,
  Item,
  Header,
  Trigger,
  Chevron,
  Content,
};
