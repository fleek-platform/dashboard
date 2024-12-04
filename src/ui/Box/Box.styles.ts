import { styled } from '@/theme';

export const BoxElement = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  variants: {
    variant: {
      container: {
        padding: '$spacing-4',
        gap: '$spacing-4',

        backgroundColor: '$surface-primary',
        borderRadius: '$lg',
        baseBorder: '$border-slate',
      },
    },
  },
});
