import { styled } from '@/theme';
import { Icon } from '@/ui';

export const StatusRadioStyles = {
  Container: styled('div', {
    borderRadius: '$full',
    width: 'fit-content',
    height: 'fit-content',

    [`${Icon}`]: {
      color: '$border-slate-actionable',
    },

    variants: {
      status: {
        error: {
          backgroundColor: '$text-red',

          [`${Icon}`]: {
            color: '$icon-slate',
          },
        },
        success: {
          backgroundColor: '$text-green',

          [`${Icon}`]: {
            color: '$icon-slate',
          },
        },
        spinner: {
          padding: '0 !important',
        },
      },
    },
  }),
};
