import { ActionBox } from '@/components';
import { styled } from '@/theme';
import { Box } from '@/ui';

export const StorageStyles = {
  ButtonsContainer: {
    Wrapper: styled(Box, {
      gap: '$spacing-6',

      '@sm': {
        flexDirection: 'row',
      },
    }),
    ActionBox: styled(ActionBox, {
      flex: 1,
    }),
  },
};
