import { styled } from '@/theme';
import { Avatar, Box, Image, Skeleton } from '@/ui';

export const TemplateOverviewStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    gridArea: 'overview',
    overflow: 'hidden',
    flexWrap: 'wrap',
    baseBorder: '$border-slate',
    borderRadius: '$lg',
    padding: '$spacing-4',
    backgroundColor: '$surface-primary',

    variants: {
      variant: {
        container: {
          gap: '$spacing-6',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  Header: styled(Box, {
    gap: '$spacing-3',
  }),
  TitleRow: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    [`> ${Skeleton}`]: {
      borderRadius: '$full',
      aspectRatio: '1 / 1',
      height: '$fontSizes$3xl',
    },
    [`> ${Image}`]: {
      borderRadius: '$full',
      height: '$fontSizes$3xl',
      width: '$fontSizes$3xl',
    },
  }),
  Wrapper: styled(Box, {
    flex: 0.57,
    maxWidth: '57%',
    overflow: 'hidden',
    gap: '$spacing-6',

    '@xs!': {
      minWidth: '$full',
    },
  }),
  TitleSkeleton: styled(Box, {
    width: '$full',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$2xl',
      width: '40%',
    },
  }),
  ImagePreview: styled(Image, {
    flex: 0.43,
    maxWidth: '43%',
    borderRadius: '$md',
    aspectRatio: '16 / 9',
    padding: '0 !important',

    [`> ${Skeleton}`]: {
      borderRadius: '$md',
      aspectRatio: '16 / 9',
      width: '$full',
      height: '$full',
    },

    '@xs!': {
      minWidth: '$full',
    },
  }),
  Property: {
    Container: styled(Box, {
      color: '$text-primary',
      textSize: '$md',
      textCategory: '$primary',
      gap: '$spacing-4',
    }),
    Skeleton: styled(Skeleton, {
      variants: {
        variant: {
          avatar: {
            borderRadius: '$full',
            height: '$lineHeights$lg !important',
            width: '$lineHeights$lg !important',
            margin: '0 $spacing-2-5 0 0 !important',
          },
          line: {
            skeletonTextHeight: '$md',
            width: '30%',
          },
        },
      },
    }),
    Item: styled(Box, {
      flexDirection: 'row',
      alignItems: 'center',
      textSize: '$md',
      width: '$full',

      '&:hover': {
        textDecoration: 'none',
      },

      [`> span`]: {
        color: '$text-secondary',
      },
      [`> ${Avatar}`]: {
        fontSize: '$xs',
        background: '$surface-avatar-icon',
        marginRight: '$spacing-2-5',
        [`> span`]: { color: '$icon-slate' },
      },
      variants: {
        variant: {
          monochrome: {
            [`> ${Avatar}`]: {
              background: '$surface-logo',
              [`> span`]: { color: '$surface-monochrome' },
            },
          },
        },
      },
    }),
  },
};
