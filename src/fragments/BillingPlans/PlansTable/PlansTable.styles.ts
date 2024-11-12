import { styled } from '@/theme';
import { Box, Icon, Text } from '@/ui';

export const PlansTableStyles = {
  Container: styled('div', {
    borderRadius: '$lg',
    baseBorder: '$border-slate',
    overflow: 'auto',
    position: 'relative',
  }),

  Root: styled('table', {
    textAlign: 'left',
    borderSpacing: 0,
    overflow: 'auto',
  }),

  Head: styled('thead'),

  Body: styled('tbody'),

  VerticalHeader: styled('th', {
    padding: '$spacing-6 $spacing-4',
    backgroundColor: '$surface-monochrome',

    [`> ${Box}`]: {
      gap: '$spacing-2-5',
    },

    [`${Text}`]: {
      textCategory: '$primary',
      textSize: '$small',
    },
  }),

  SectionHeader: styled('th', {
    padding: 0,
    baseBorderTop: '$border-slate',
    baseBorderBottom: '$border-slate',
    backgroundColor: '$surface-primary !important',

    [`${Icon}`]: {
      borderRadius: '$full',
      backgroundColor: '$surface-avatar-icon',
      padding: '0.34rem',
    },

    [`> ${Box}`]: {
      padding: '$spacing-4',
      gap: '$spacing-2-5',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'sticky',
      left: 0,
      right: 0,
      width: 'fit-content',
    },
  }),

  Row: styled('tr', {
    '&:not(:last-child)': {
      'td, th': {
        borderBottom: '1px solid $border-slate',
      },
    },

    'td:not(:last-child), th:not(:last-child)': {
      borderRight: '1px solid $border-slate',
    },

    'td:first-child, th:first-child': {
      position: 'sticky',
      left: 0,

      backgroundColor: '$surface-monochrome',
      zIndex: '$docked',
    },
  }),

  Cell: styled('td', {
    padding: '$spacing-4',

    minWidth: '10.9375rem',
  }),
};
