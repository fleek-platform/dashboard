import { styled } from '@/theme';
import { Box } from '@/ui';

export const SettingsLayoutStyles = {
  Grid: styled('div', {
    display: 'grid',
    gap: '$page-padding',

    gridTemplateColumns: '14.75rem minmax(0,1fr)',
    gridTemplateAreas: '"navigation content"',

    '@sm!': {
      gridTemplateColumns: '1fr',
      gridTemplateAreas: '"navigation" "content"',
    },
  }),

  Content: styled(Box, {
    gridArea: 'content',
    gap: '$spacing-6',
  }),
};
