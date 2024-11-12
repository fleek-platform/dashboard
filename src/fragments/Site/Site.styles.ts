import { styled } from '@/theme';
import { Box } from '@/ui';

export const SiteStyles = {
  Container: styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$page-padding',
    flex: 1,
  }),
  Row: styled(Box, {
    flexDirection: 'row',
    gap: '$page-padding',

    '@sm!': {
      flexDirection: 'column',
    },
  }),
  RightColumn: styled(Box, {
    gap: '$page-padding',
    minWidth: '15.125rem',

    '@sm!': {
      width: '$full',
    },
  }),
  MainColumn: styled(Box, {
    gap: '$page-padding',
    width: '$full',
  }),
};
