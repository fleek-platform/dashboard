import { styled } from '@/theme';
import { Box, Icon, Skeleton } from '@/ui';

import { SettingsModalStyles } from '../SettingsModal/SettingsModal.styles';

export const SettingsDeleteModalStyles = {
  ...SettingsModalStyles,

  Modal: {
    ...SettingsModalStyles.Modal,
  },

  Table: {
    Container: styled(Box, {
      gap: '$spacing-2-5',
    }),
    Root: styled('table', {
      width: '$full',
      position: 'relative',

      borderRadius: '$lg',
      overflow: 'hidden',
      baseBorder: '$border-slate',

      borderCollapse: 'separate',
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

      variants: {
        empty: {
          true: {
            cursor: 'default !important',
          },
        },
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
