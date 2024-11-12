import * as Checkbox from '@radix-ui/react-checkbox';

import { styled } from '@/theme';

import { Icon } from '../Icon/Icon';

export const CheckBoxStyles = {
  Root: styled(Checkbox.Root, {
    all: 'unset',
    width: '$inline-component-height-md',
    height: '$inline-component-height-md',
    backgroundColor: 'transparent',
    borderRadius: '$sm',
    baseBorder: '$border-slate-actionable',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '$all-75',

    '&:hover': {
      borderColor: '$border-slate-actionable-focus',
      cursor: 'pointer',
    },

    '&[data-state="checked"]': {
      backgroundColor: '$button-yellow-primary',
      borderColor: 'transparent',
    },

    '&[data-disabled]': {
      borderColor: '$border-slate-actionable',
      backgroundColor: '$transparent',
      cursor: 'not-allowed',
    },
  }),
  Indicator: styled(Checkbox.Indicator, {
    color: '$black',

    '&[data-disabled]': {
      color: '$icon-slate',
    },

    [`${Icon}`]: {
      fontSize: '0.625em',
    },
  }),
};
