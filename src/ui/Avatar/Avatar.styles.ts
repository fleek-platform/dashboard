import { styled } from '@/theme';

import { Icon } from '../Icon/Icon';
import { Image } from '../Image/Image';

export const AvatarStyles = {
  Wrapper: styled(Image, {
    borderRadius: '$full',
    lineHeight: '$none',
    width: '$inline-component-height-lg',
    height: '$inline-component-height-lg',
    padding: '0 !important',

    '> *': {
      fontSize: 'calc($sizes$inline-component-height-lg * 0.4)',
    },

    variants: {
      withIcon: {
        true: {
          backgroundColor: '$surface-avatar-icon',
          color: '$text-secondary',

          [`${Icon}`]: {
            color: '$icon-slate',
          },
        },
        false: {
          color: '$icon-slate-actionable-focus',
          backgroundColor: '$surface-monochrome',
        },
      },
    },

    defaultVariants: {
      withIcon: false,
    },
  }),
};
