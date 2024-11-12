import { styled } from '@/theme';
import { Icon } from '@/ui';

export const AlertBoxStyles = {
  Container: styled('span', {
    display: 'flex',
    gap: '$spacing-2-5',
    borderRadius: '$lg',
    alignItems: 'center',

    variants: {
      variant: {
        primary: {
          color: '$text-yellow',
          baseBorder: '$border-yellow',
          backgroundColor: '$surface-yellow-light',
        },
        tertiary: {
          color: '$text-secondary',
          baseBorder: '$border-slate',
          backgroundColor: '$surface-tertiary',
        },
        lightGhost: {
          color: '$text-secondary',
          baseBorder: '$border-slate',
          backgroundColor: '$surface-tertiary',
        },
        ghost: {
          color: '$text-secondary',
          baseBorder: '$border-slate',
          backgroundColor: '$surface-primary',
        },
        success: {
          color: '$text-green',
          baseBorder: '$border-green',
          backgroundColor: '$surface-green-light',
        },
        danger: {
          color: '$text-red',
          baseBorder: '$border-red',
          backgroundColor: '$surface-red-light',
        },
        warning: {
          color: '$text-amber',
          baseBorder: '$border-amber',
          backgroundColor: '$surface-amber-light',
        },
        bulb: {
          color: '$text-secondary',
          baseBorder: '$border-slate',
          backgroundColor: '$surface-tertiary',
        },
      },

      size: {
        xs: {
          padding: '$spacing-2-5 $spacing-3',
        },
        sm: {
          padding: '$spacing-3',
          textSize: '$sm',
        },
        lg: {
          textSize: '$md',
          padding: '$spacing-4 $spacing-5',
        },
      },

      outline: { true: {} },
    },

    compoundVariants: [
      {
        outline: 'true',
        css: {
          background: 'none !important',
        },
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  }),
  ContentWrapper: styled('div', {
    flex: 1,
  }),
  CloseIcon: styled(Icon, {
    cursor: 'pointer',
    transition: '$all-200',

    '&:hover': {
      opacity: 0.6,
    },
  }),
};
