import { Link } from '@/components';
import { styled } from '@/theme';
import { Avatar, Box, Card, Image, Skeleton } from '@/ui';

export const TemplateCardStyles = {
  Root: styled(Card.Root, {
    transition: '$all-200',
    color: '$text-primary',
    textDecoration: 'none',
    baseBorder: '$border-slate-actionable',
    height: '$full',

    '&:hover': {
      baseBorder: '$border-slate-actionable-focus',
    },
  }),

  RootLink: styled(Link, {
    overflow: 'hidden',
  }),

  Cover: styled(Card.Cover, {
    maxHeight: '8rem',
    width: '$full',
    objectFit: 'cover',
    aspectRatio: '16 / 9',
    padding: '0 !important',
    height: '$full',

    [`> ${Skeleton}`]: {
      width: '$full',
      height: '$full',
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
    },
  }),

  HeadingSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$md',
      width: '50%',
    },
  }),

  Icon: styled(Image, {
    width: '1.75em',
    height: '1.75em',
    aspectRatio: '1',
    borderRadius: '$md',

    variants: {
      isLoading: {
        true: {
          padding: '0',
        },
      },
    },

    [`> ${Skeleton}`]: {
      width: '$full',
      height: '$full',
    },
  }),

  DescriptionSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$sm',
    },
  }),

  HeadingContainer: styled(Box, {
    flex: 1,
    gap: '$spacing-2',
  }),

  ContentWrapper: styled(Card.Content.Wrapper, {
    height: '$full',
    gap: '$spacing-3',
  }),

  AuthorLabel: styled(Box, {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$spacing-2',

    variants: {
      fleek: {
        true: {
          [`> ${Avatar}`]: {
            backgroundColor: '$surface-logo !important',
            fontSize: '$2xs',

            '> span': {
              color: '$surface-monochrome !important',
            },
          },
        },
      },
    },
  }),

  Footer: styled(Box, {
    textSize: '$xs',
    alignItems: 'center',
    flexDirection: 'row',
    textCategory: '$primary',
    color: '$text-secondary',
    gap: '$spacing-2',
    width: '$full',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '30%',
    },
  }),
};
