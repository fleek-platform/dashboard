import { styled } from '@/theme';
import { Box } from '@/ui';

export const PageNavStyles = {
  Wrapper: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-3',
    alignItems: 'center',
    justifyContent: 'space-between',
    textCategory: '$tertiary',
    textSize: '$sm',
    flexWrap: 'wrap',
    maxWidth: '$full',
  }),

  Content: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-3',
    flex: 1,

    overflow: 'auto',
    whiteSpace: 'nowrap',
    minWidth: 'fit-content',

    '@sm!': {
      margin: '0 -$page-padding',
      padding: '0 $page-padding',
      minWidth: 'calc($full + $space$page-padding * 2)',
    },
  }),

  SpacedContent: styled(Box, {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '$spacing-3',
    flex: 1,
    minWidth: 'fit-content',
  }),
};
