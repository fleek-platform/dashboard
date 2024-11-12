import { styled } from '@/theme';
import { Image, Skeleton } from '@/ui';

export const PreviewImageStyles = {
  Container: styled(Image, {
    height: '$full',
    aspectRatio: '1.75',
    borderRadius: '$md',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '$all-200',
    objectPosition: 'top',
    objectFit: 'cover',
    backgroundColor: '$surface-monochrome !important',
    color: '$text-secondary',

    [`> ${Skeleton}`]: {
      height: '$full',
      width: '$full',
      borderRadius: '$md',
    },

    width: '40%',
    '@sm!': {
      width: '$full',
    },

    variants: {
      status: {
        loading: {
          padding: 0,
        },
        building: {
          baseBorder: '$border-amber',
        },
        pending: {
          baseBorder: '$border-slate',
        },
        success: {
          baseBorder: '$border-slate',
        },
        failed: {
          baseBorder: '$border-red-actionable-focus',
        },
      },
    },
  }),
};
