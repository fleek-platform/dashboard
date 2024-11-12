import { styled } from '@/theme';

import { Icon } from '../Icon/Icon';

export const PaginationStyles = {
  Container: styled('div', {
    display: 'flex',
    flexDirection: 'row',
    gap: '$spacing-3',
  }),
  Button: styled('button', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    height: '2.75em', // resized based on component font-size
    width: '2.75em', // resized based on component font-size
    backgroundColor: 'transparent',
    baseBorder: '$border-slate-actionable',
    borderRadius: '$lg',

    '&:hover, &:focus': {
      color: '$text-primary',
      borderColor: '$border-yellow-actionable-focus',
    },

    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: '$surface-secondary',
      borderColor: '$border-slate',

      [`${Icon}`]: {
        color: '$icon-disabled',
      },
    },

    variants: {
      active: {
        true: {
          color: '$text-primary',
          borderColor: '$border-yellow-actionable-focus',
        },
        false: {
          color: '$text-secondary',
        },
      },
    },

    defaultVariants: {
      active: false,
    },
  }),
};
