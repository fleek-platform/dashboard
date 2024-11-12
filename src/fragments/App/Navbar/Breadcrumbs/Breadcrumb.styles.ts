import { Link } from '@/components';
import { styled } from '@/theme';
import { AvatarMarble, Box, Image, Text } from '@/ui';

export const BreadcrumbStyle = {
  Container: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-3',
    alignItems: 'center',
    textSize: '$sm',

    [`${Image}`]: {
      width: '$fontSizes$md',
      height: '$fontSizes$md',
      padding: 0,
      borderRadius: '$min',
    },
  }),
  Name: styled(Box, {
    color: '$text-primary',
  }),
  DeployStatus: styled('span', {
    width: '$inline-component-height-xs',
    height: '$inline-component-height-xs',
    borderRadius: '$full',

    variants: {
      color: {
        failed: {
          backgroundColor: '$text-red',
        },
        success: {
          backgroundColor: '$text-green',
        },
        loading: {
          backgroundColor: '$text-amber',
        },
        created: {
          backgroundColor: '$text-tertiary',
        },
        cancelled: {
          backgroundColor: '$text-tertiary',
        },
        cancelling: {
          backgroundColor: '$text-tertiary',
        },
      },
    },
  }),
  Divider: styled(Text, {
    textSize: '$lg',
    color: '$text-tertiary',
  }),
  Link: styled(Link, {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$spacing-2',

    [`> ${Image}`]: {
      borderRadius: '$sm',
    },

    [`>${AvatarMarble}`]: {
      width: '1rem',
      height: '1rem',
      borderRadius: '$sm',
    },
  }),
};
