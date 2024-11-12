import { styled } from '@/theme';

export const AppStyles = {
  Container: styled('div', {
    minHeight: '$min-page-height',
    position: 'relative',
  }),
  Content: styled('main', {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',

    width: '$full',
    minHeight: '$min-content-height',
    maxWidth: '$page-content',
    padding: '$page-padding',
    gap: '$page-padding',
    margin: '0 auto',

    variants: {
      disableGap: {
        true: {
          gap: '0',
        },
      },
    },
  }),
};
