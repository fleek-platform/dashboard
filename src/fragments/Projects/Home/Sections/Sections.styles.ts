import { ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Image, Skeleton } from '@/ui';

const DEFAULT_GAP = '$spacing-5';

const GridCell = styled(Box, {
  gap: DEFAULT_GAP,
});

export const SectionsStyles = {
  RightArrow: styled(Icon, {
    alignSelf: 'start',
    marginLeft: 'auto',
    color: '$icon-slate',
  }),

  OutsideLink: styled(ExternalLink, {
    display: 'flex',
    flexDirection: 'row',
    textSize: '$sm',
    gap: '$spacing-2',
    alignItems: 'center',
    cursor: 'pointer',
    textDecoration: 'none',

    [`${Icon}`]: {
      fontSize: '$md',
    },

    '&:hover': {
      [`${Icon}`]: {
        color: '$icon-slate-actionable-focus',
      },
    },

    variants: {
      colorScheme: { slate: {} },
      withExternalIcon: { true: {} },
    },

    defaultVariants: { colorScheme: 'slate', withExternalIcon: 'true' },
  }),

  LinkArrow: styled(Icon, {
    fontSize: '$lg',
    color: '$icon-slate',
  }),

  Main: {
    GridArea: styled(GridCell, {
      gridArea: 'main',
    }),

    ListWrapper: styled(Box, {
      flex: 1,
      justifyContent: 'space-between',
      gap: DEFAULT_GAP,
    }),
  },

  Local: {
    GridArea: styled(GridCell, {
      gridArea: 'local',
    }),

    Container: styled(Box, {
      flex: 1,

      variants: {
        variant: {
          container: {
            padding: '$spacing-6',
            gap: DEFAULT_GAP,
            background: '$surface-content-fill',
          },
        },
      },

      defaultVariants: { variant: 'container' },
    }),
  },

  OutsideLinks: {
    GridArea: styled(GridCell, {
      gridArea: 'outside-links',
    }),

    Grid: styled('div', {
      display: 'grid',
      gridGap: DEFAULT_GAP,

      gridTemplateColumns: '1fr',

      '@xs': {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
      },
    }),

    BoxLink: styled(ExternalLink, Box, {
      flexDirection: 'column',
      padding: '$spacing-6',

      variants: {
        variant: {
          container: {
            gap: '$spacing-2',
            background: '$surface-content-fill',

            '&:hover, &:focus': {
              borderColor: '$border-slate-actionable-focus',
            },
          },
        },
      },

      defaultVariants: { variant: 'container' },
    }),

    Box: styled(Box, {
      flexDirection: 'column',
      padding: '$spacing-6',
      cursor: 'pointer',

      variants: {
        variant: {
          container: {
            gap: '$spacing-2',
            background: '$surface-content-fill',

            '&:hover, &:focus': {
              borderColor: '$border-slate-actionable-focus',
            },
          },
        },
      },

      defaultVariants: { variant: 'container' },
    }),

    Header: styled(Box, {
      width: '$full',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }),
  },
  Articles: {
    Wrapper: styled(GridCell, {
      gridArea: 'articles',
      overflow: 'hidden',
    }),

    List: styled(Box, {
      gap: '$spacing-4',
      justifyContent: 'space-between',
    }),
  },
  ArticleItem: {
    Wrapper: styled(ExternalLink, {
      display: 'flex',
      gap: '$spacing-3',
    }),

    Preview: styled(Image, {
      baseBorder: '$border-slate',
      borderRadius: '$md',
      height: '2.625rem', // hardcoded for the size of the preview
      aspectRatio: '16/9',
    }),

    Description: styled(Box, {
      [`> ${Skeleton}`]: {
        width: '$full',
        skeletonTextHeight: '$xs',
      },
    }),

    TextContainer: styled(Box, {
      gap: '$2xs',
      flex: 1,
      maxWidth: 'calc($full - 4.67rem - $space$spacing-3)', // must follow the height of the preview
      width: '$full',

      [`> ${Skeleton}`]: {
        width: '$full',
        skeletonTextHeight: '$sm',
      },
    }),

    Title: styled(Box, {
      [`> ${Skeleton}`]: {
        width: '40%',
        skeletonTextHeight: '$sm',
      },
    }),
  },
};
