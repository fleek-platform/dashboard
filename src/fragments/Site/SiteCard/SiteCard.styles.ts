import { styled } from '@/theme';
import { Avatar, AvatarMarble, Box, Icon, Image, Skeleton, Text } from '@/ui';

export const SiteCardStyles = {
  Container: styled(Box, {
    borderRadius: '$lg',
    baseBorder: '$border-slate-actionable',
    overflow: 'hidden',

    '&:hover': {
      baseBorder: '$border-slate-actionable-focus',
    },

    variants: {
      variant: {
        container: {
          height: 'fit-content',
          padding: '0',
          gap: '0',
        },
      },
      isLoading: {
        true: {
          '&:hover': {
            borderColor: '$border-slate-actionable !important',
          },
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  Details: styled(Box, {
    padding: '$spacing-4',
    gap: '$spacing-4',
    background: '$surface-content-fill',
    borderBottomLeftRadius: '$lg',
    borderBottomRightRadius: '$lg',
  }),
  SiteIconWrapper: styled(Box, {
    background: '$button-slate-secondary',
    borderRadius: '$md',
    color: '$icon-slate',

    [`> ${Image}`]: {
      borderRadius: '$md',
      width: '1.75rem',
      height: '1.75rem',
    },

    [`>${AvatarMarble}`]: {
      width: '1.75rem',
      height: '1.75rem',
      borderRadius: '$md',
    },

    variants: {
      isLoading: {
        true: {
          padding: '0',
        },
      },
    },

    [`> ${Skeleton}`]: {
      height: '$lineHeights$xl',
      aspectRatio: '1/1',
    },
  }),
  SiteName: styled(Box, {
    [`${Skeleton}`]: {
      skeletonTextHeight: '$md',
      width: '6rem',
    },
  }),
  SiteUrl: styled(Box, {
    [`${Skeleton}`]: {
      skeletonTextHeight: '$sm',
      width: '15rem',
    },
  }),
  TextContainer: styled(Box, {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    width: '85%',
  }),
  DetailsRow: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  DetailsFooter: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '$spacing-1',

    [`> ${Text}`]: {
      textCategory: '$primary',
      textSize: '$xs',
      color: '$text-secondary',
    },
    [`> ${Avatar}`]: {
      fontSize: '$2xs',
    },
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '45%',
    },
  }),
  Image: styled(Image, {
    maxHeight: '6.125rem',
    width: '$full',
    objectFit: 'cover',
    objectPosition: 'top',
    aspectRatio: '4.4083 / 1.225',
    borderTopLeftRadius: '$lg',
    borderTopRightRadius: '$lg',
    background: '$surface-secondary',
    padding: '0 !important',

    [`${Skeleton}`]: {
      width: '$full',
      height: '$full',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    [`> ${Icon}`]: {
      color: '$icon-disabled',
    },
    [`> ${Text}`]: {
      color: '$text-tertiary',
      textCategory: '$tertiary',
      textSize: '$sm',
    },
  }),
};
