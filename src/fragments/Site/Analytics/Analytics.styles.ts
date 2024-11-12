import { styled } from '@/theme';
import { Box } from '@/ui';

export const AnalyticsStyles = {
  Grid: styled('div', {
    display: 'grid',
    gridTemplateColumns: '14.75rem 1fr',
    gridTemplateAreas: '"navigation content"',
    gap: '$page-padding',
  }),

  Content: styled(Box, {
    gridArea: 'content',
    gap: '$spacing-6',
  }),
};
