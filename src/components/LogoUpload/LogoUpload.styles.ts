import { styled } from '@/theme';
import { AvatarMarble, Box, Image } from '@/ui';

export const LogoUploadStyles = {
  Container: styled('div', {
    position: 'relative',
    borderRadius: '$lg',
    minWidth: '4rem',
    width: '4rem',
    height: '4rem',
    display: 'flex',
    overflow: 'hidden',
    fontSize: '$2xl',

    [`${AvatarMarble}`]: {
      width: '$full',
      height: '$full',
    },

    variants: {
      disabled: {
        true: {
          cursor: 'not-allowed',
        },
      },
    },
  }),
  HoverContainer: styled(Box, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    borderRadius: '$lg',
    width: '$full',
    height: '$full',
    baseBorder: '$border-yellow-actionable-focus',
    color: '$icon-yellow',
    opacity: 0,
    cursor: 'pointer',
    transition: '$all-200',

    variants: {
      rounded: {
        true: {
          borderRadius: '$full',
        },
      },
    },

    '&:hover': {
      backgroundColor: 'color-mix(in srgb, $surface-primary 80%, transparent)',
      opacity: 1,
    },
  }),
  Logo: styled(Image, {
    width: '$full',
    height: '$full',
    color: '$icon-slate',
    backgroundColor: '$surface-avatar-icon',
    objectFit: 'cover',
  }),
  SpinnerContainer: styled(Box, {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '$icon-slate',
  }),
};
