import { styled } from '@/theme';

export const HomeStyles = {
  Grid: styled('div', {
    display: 'grid',
    gridGap: '$spacing-7',

    gridTemplateColumns: '1fr',
    gridTemplateAreas:
      '"main" "local" "sites" "outside-links" "articles" "templates"',

    '@sm': {
      gridTemplateColumns: '2fr 1fr',
      gridTemplateAreas:
        '"main local" "sites sites" "outside-links articles" "templates templates"',
    },
  }),
};
