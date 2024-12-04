import { BadgeText } from '@/components';
import { KeyFrames, styled } from '@/theme';
import { Box, Icon, Image, Skeleton, Text } from '@/ui';

export const StorageTableStyles = {
  PaginationContainer: styled(Box, {
    margin: '0 auto',
  }),
  Container: styled('div', {
    baseBorder: '$border-slate',
    backgroundColor: '$surface-primary',
    borderRadius: '$lg',

    //scroll for table
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'auto hidden',
    maxWidth: '$full',
  }),
  Table: {
    Container: styled(Box, {
      overflow: 'auto',
      minHeight: '$min-empty-height-table',
    }),
    Root: styled('table', {
      width: '$full',
      borderCollapse: 'collapse',
      position: 'relative',

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

  Sort: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-1',
    cursor: 'pointer',
  }),
  Icon: styled(Icon, {
    transition: 'transform 300ms cubic-bezier(0.87, 0, 0.13, 1)',

    variants: {
      active: {
        true: {
          transform: 'rotate(180deg)',
        },
      },
    },

    defaultVariants: {
      active: 'false',
    },
  }),
};

export const StorageRowStyles = {
  NameRow: styled(Box, {
    gap: '$spacing-2-5',
    flexDirection: 'row',
    alignItems: 'center',

    [`> ${Icon}`]: {
      color: '$icon-slate',
    },

    [`> ${Box}`]: {
      flexDirection: 'row',
      maxWidth: 'calc($sm / 2)',
      gap: 0,
    },

    [`${Image}`]: {
      width: '$fontSizes$md',
      height: '$fontSizes$md',
      padding: 0,
      borderRadius: '$min',
    },
  }),
  StorageProviders: {
    Container: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-2-5',
    }),
  },
  BadgeText: styled(BadgeText, {
    padding: '$spacing-1 ',
    height: 'fit-content',

    [`${Icon}`]: {
      fontSize: '$sm',
    },

    [`${Text}`]: {
      display: 'none',
    },

    variants: {
      hoverable: {
        true: {
          '&:hover': {
            [`${Text}`]: {
              display: 'flex',
              animation: `${KeyFrames.show} 200ms `,
            },
          },
        },
      },
    },

    defaultVariants: {
      hoverable: true,
    },
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
  RightMenu: {
    Container: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-1',
      justifyContent: 'flex-end',
    }),
  },
};

export const StorageHeaderStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textSize: '$sm',
    color: '$text-secondary',
    padding: '$spacing-4 $spacing-6',
    baseBorderBottom: '$border-slate',

    [`> ${Box}`]: {
      flexDirection: 'row',
      gap: '$spacing-3',
    },
  }),
};
