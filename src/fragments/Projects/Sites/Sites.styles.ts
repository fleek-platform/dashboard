import { styled } from '@/theme';
import { Box } from '@/ui';

export const SitesStyles = {
  Templates: {
    Wrapper: styled(Box, {
      gap: '$page-padding',
    }),

    Heading: {
      Wrapper: styled(Box, {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '$page-padding',
      }),
    },

    CardsGrid: styled('div', {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '$page-padding',

      '@xs': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },

      '@md': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    }),
  },
};
