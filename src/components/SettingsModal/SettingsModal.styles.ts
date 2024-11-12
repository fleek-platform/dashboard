import { styled } from '@/theme';
import { Box, Dialog, FormField, Icon, Skeleton } from '@/ui';

export const SettingsModalStyles = {
  Modal: {
    Content: styled(Dialog.Content, {
      width: '$modal-width',
      maxWidth: 'calc($full - 2 * $space$page-padding)',
      gap: '$spacing-6',
      textSize: '$sm',

      b: {
        color: '$text-primary',
      },
    }),

    CTARow: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-4',
    }),

    Inner: {
      Container: styled(Box, {
        [`${FormField.Root}`]: {
          flex: 1,
        },

        variants: {
          variant: {
            container: {
              padding: '$spacing-3 $spacing-4',
              gap: '$spacing-3',
            },
          },
        },
        defaultVariants: { variant: 'container' },
      }),
      Row: styled(Box, {
        flexDirection: 'row',
        gap: '$spacing-2',
      }),
      TextSkeleton: styled(Skeleton, {
        height: '$lineHeights$sm',
      }),
    },
  },

  Table: {
    Root: styled('table', {
      width: '$full',
      position: 'relative',

      borderRadius: '$lg',
      overflow: 'hidden',
      baseBorder: '$border-slate',

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
    Body: styled('tbody', {}),
    Row: styled('tr', {
      cursor: 'pointer',
      '&:last-child > td': {
        border: 'none',
      },
    }),
    Cell: styled('td', {
      baseBorderBottom: '$border-slate',
      color: '$text-primary',
      padding: '0 $spacing-6',
      textSize: '$sm',
      height: '$space$spacing-8',
      maxWidth: '4rem', // matches the width of checkbox cell the other columns rely on flex
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      [`${Skeleton}`]: {
        height: '$inline-component-height-md',
        width: '$full',
        minWidth: '$inline-component-height-md',
      },

      variants: {
        empty: {
          true: {
            color: '$text-secondary',
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
};
