import { styled } from '@/theme';
import { Box } from '@/ui';

export const SiteListStyles = {
  SitesGrid: styled(Box, {
    display: 'grid',
    columnGap: '$spacing-4',
    rowGap: '$spacing-4',
    minHeight: '$min-empty-height',

    gridTemplateColumns: 'repeat(1, 1fr)',

    '@xs': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    '@md': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  }),
  PaginationContainer: styled(Box, {
    margin: '0 auto',
  }),
};
