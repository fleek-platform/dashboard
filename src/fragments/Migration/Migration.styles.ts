import { Link } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Image, Skeleton } from '@/ui';

export const MigrationStyles = {
  Aside: {
    FunFacts: {
      Container: styled(Box, {
        padding: '$spacing-4 $spacing-5',
        baseBorder: '$border-slate',
        borderRadius: '$xl',
        background: '$surface-primary',
        gap: '$spacing-2-5',
      }),
    },
  },
  Grid: {
    Wrapper: styled('div', {
      flex: 1,
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: `"aside content"`,
      gap: 'calc(4 * $page-padding)',

      '@md!': {
        gridTemplateColumns: '1fr',
        gridTemplateAreas: `"aside" "content"`,
        gridTemplateRows: 'min-content min-content',
        gap: '$spacing-9',
        paddingTop: '$spacing-9',
      },
    }),

    Aside: styled('div', {
      gridArea: 'aside',
      position: 'sticky',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      gap: '$spacing-7',
      top: 'calc($page-padding + $spacing-9)',
      maxHeight: 'calc($min-page-height - 2 * $space$page-padding - $space$spacing-9)',

      '@md!': {
        position: 'static',
      },
    }),

    Content: styled('div', {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      gridArea: 'content',
      gap: '$page-padding',
    }),
  },
  Layout: {
    BackButton: styled(Link, {
      width: 'fit-content',
      textSize: '$sm',

      variants: {
        colorScheme: { slate: {} },
        isSecondary: { true: {} },
      },

      defaultVariants: { colorScheme: 'slate', isSecondary: true },
    }),
  },
  Content: {
    Container: styled(Box, {
      padding: '$spacing-6',
      gap: '$spacing-6',
      alignItems: 'start',
      background: '$surface-primary',
      border: '1px solid $border-slate',
      borderRadius: '$lg',
    }),
    ButtonRow: styled(Box, {
      flexDirection: 'row',
      width: '$full',
      gap: '1rem',
    }),
    BannerImage: styled(Image, {
      width: '$full',
      aspectRatio: '94 / 31',
    }),
    MigrationStatus: {
      Container: styled(Box, {
        padding: '$spacing-3',
        gap: '$spacing-3',
        border: '1px solid $border-slate',
        borderRadius: '$lg',
        background: '$surface-secondary',
        width: '$full',
      }),
      Row: styled(Box, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '$spacing-3',
        width: '$full',
      }),
    },
    Table: {
      LoadingContainer: styled(Box, {
        position: 'absolute',
        alignItems: 'center',
        padding: '$spacing-6',
        gap: '$spacing-4',
        width: '$full',

        [`${Icon}`]: {
          fontSize: '$2xl',
          color: '$text-primary',
        },
      }),
      Container: styled(Box, {
        width: '$full',
        border: '1px solid $border-slate',
        borderRadius: '$lg',
        overflow: 'hidden',
      }),
      IconContainer: styled(Box, {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '$full',
        padding: '$spacing-1',
        background: '$surface-logo',
        width: '1.25rem',
        height: '1.25rem',
      }),
      Root: styled('table', {
        width: '$full',
        position: 'relative',
        borderCollapse: 'collapse',

        borderSpacing: 0,
      }),
      Header: styled('thead', {
        position: 'sticky',
        top: 0,
        backgroundColor: '$surface-secondary',
        zIndex: 1,

        '&:after': {
          position: 'absolute',
          content: '""',
          bottom: 0,
          left: 0,
          right: 0,
          baseBorderBottom: '$border-slate',
        },
      }),
      Body: styled('tbody', {
        variants: {
          isLoading: {
            true: {
              position: 'relative',
              height: '7rem',
            },
          },
        },
      }),
      Row: styled('tr'),
      Cell: styled('td', {
        baseBorderTop: '$border-slate',
        color: '$text-primary',
        padding: '0 $spacing-6',
        textSize: '$sm',
        height: '$space$spacing-8',
        maxWidth: 'calc($sm / 2)',

        [`${Skeleton}`]: {
          skeletonTextHeight: '$md',
        },

        variants: {
          isLoading: {
            true: {
              [`${Icon}`]: {
                fontSize: '$2xl',
                color: '$icon-slate',
              },
            },
          },
          status: {
            red: {
              color: '$button-red-primary',
            },
            green: {
              color: '$button-green-primary',
            },
            white: {
              color: '$text-primary',
            },
          },
        },
      }),
      HeaderCell: styled('th', {
        padding: '0 $spacing-6',
        color: '$text-secondary',
        fontWeight: '$tertiary',
        textSize: '$sm',
        height: '$space$spacing-8',
        textAlign: 'left',
        cursor: 'default',

        [`${Icon}`]: {
          textSize: '$sm',
        },
      }),
    },
  },
};
