import { styled } from '@/theme';
import { Box, Icon, Menu, Skeleton } from '@/ui';

export const TemplateStyles = {
  Details: {
    Content: styled(Box, {
      gridArea: 'content',
      gap: '$spacing-6',
      maxWidth: '$full',
      overflow: 'hidden',
    }),
    DescriptionSkeleton: styled(Box, {
      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$lg',
        width: '70%',
      },
    }),
    ReadmeLoadingContainer: styled(Box, {
      gridArea: 'content',
      height: '$full',
      variants: {
        variant: {
          container: {
            backgroundColor: '$transparent',
          },
        },
      },
      defaultVariants: {
        variant: 'container',
      },
    }),
    ReadmeErrorContainer: styled(Box, {
      gridArea: 'content',
      baseBorder: '$border-slate',
      padding: '$spacing-5',
      borderRadius: '$lg',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '$spacing-2-5',

      [`> ${Icon}`]: {
        color: '$text-secondary',
        fontSize: '$md',
      },
    }),
    ReadmeContainer: styled(Box, {
      baseBorder: '$border-slate',
      padding: '$spacing-5',
      borderRadius: '$lg',

      img: {
        width: '$full',
      },
    }),
    Layout: styled('main', {
      display: 'grid',
      width: '$full',
      gridTemplateColumns: '1fr 15.125rem',
      gap: '$page-padding',

      gridTemplateAreas:
        '"overview overview" "content details" "spacer spacer" "similar similar"',

      '@sm!': {
        gridTemplateColumns: '1fr',
        gridTemplateAreas: '"overview" "content" "details" "spacer" "similar"',
      },
    }),
    Spacer: styled(Box, {
      gridArea: 'spacer',
      margin: '$page-padding 0',
      height: '$small-divider-height',
      background: '$border-slate',
    }),
    SimilarTemplates: {
      Container: styled(Box, {
        gap: '$spacing-5',
        gridArea: 'similar',
      }),
      Header: styled(Box, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }),
      Grid: styled(Box, {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '$page-padding',

        '@xs!': {
          gridTemplateColumns: '1fr',
        },
      }),
    },
  },
  List: {
    Explorer: {
      MenuItem: styled(Menu.Item, {
        variants: {
          selected: {
            true: {
              background: '$surface-secondary',

              '&:hover': {
                background: '$surface-secondary',
                color: '$text-secondary',
              },
            },
          },
        },
      }),
    },
  },
};
