import { styled } from '@/theme';
import { Box, Icon } from '@/ui';

import { Link } from '../Link/Link';

export const ActionBoxStyles = {
  Root: styled(Link, Box, {
    color: 'inherit',
    textDecoration: 'none',
    flexDirection: 'row',

    [`${Box}`]: {
      gap: '$spacing-2',
    },

    variants: {
      variant: {
        container: {
          padding: '$spacing-4',
          background: '$surface-content-fill',

          '&:hover': {
            borderColor: '$border-slate-actionable-focus',
          },
        },
      },
      disabled: {
        true: {
          cursor: 'not-allowed',
          backgroundColor: '$button-disabled',
          color: '$text-tertiary',
          borderColor: '$border-slate',
          opacity: '0.8',

          '&:hover': {
            background: '$button-disabled !important',
            borderColor: '$border-slate !important',
          },
        },
      },
      transparent: {
        true: {
          backgroundColor: '$transparent',
        },
      },
    },

    defaultVariants: { variant: 'container', transparent: false },
  }),
  Icon: styled(Icon, {
    alignSelf: 'center',
    textSize: '$2xl',
    color: '$icon-slate',
  }),
  RightArrow: styled(Icon, {
    alignSelf: 'start',
    marginLeft: 'auto',
    color: '$icon-slate',
  }),
};
