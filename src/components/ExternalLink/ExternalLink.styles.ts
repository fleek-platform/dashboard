import { styled } from '@/theme';

export const ExternalLinkElement = styled('a', {
  cursor: 'pointer',
  textCategory: '$primary',
  display: 'flex',
  flexDirection: 'row',
  gap: '$spacing-1',

  textDecoration: 'none',
  transition: '$all-200',

  '&:hover:not([disabled]), &:focus': {
    color: '$text-primary',
  },

  variants: {
    colorScheme: {
      yellow: {
        color: '$text-yellow !important',
        '&:hover:not([disabled]), &:focus': {
          color: '$text-yellow !important',
        },
      },
      slate: {
        color: '$text-secondary !important',
        '&:hover:not([disabled]), &:focus': {
          color: '$text-secondary !important',
        },
      },
      red: {
        color: '$text-red !important',
        '&:hover:not([disabled]), &:focus': {
          color: '$text-red !important',
        },
      },
    },
  },

  defaultVariants: {
    colorScheme: 'slate',
  },
});
