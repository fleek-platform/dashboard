import { styled } from '@/theme';
import { Box, Icon, Text } from '@/ui';

export const DeploymentsStyles = {
  Container: styled(Box, {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,

    gap: '$spacing-6',
  }),
  Table: styled(Box, {
    display: 'flex',
    flexDirection: 'column',
    width: '$full',

    variants: {
      variant: {
        container: {
          padding: 0,
          gap: 0,
          background: '$surface-content-fill',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  EmptyContent: {
    Container: styled(Box, {
      padding: '$spacing-9 0',
      alignItems: 'center',
      gap: '$spacing-2-5',
      backgroundColor: '$surface-primary',
      borderRadius: '$lg',
      baseBorder: '$border-slate',
      width: '$full',
      height: '17.125rem',
      justifyContent: 'center',

      [`> ${Icon}`]: {
        color: '$text-secondary',
        fontSize: '$lg',
      },
    }),
    Title: styled(Text, {
      textCategory: '$secondary',
      color: '$text-primary',
    }),
  },
};
