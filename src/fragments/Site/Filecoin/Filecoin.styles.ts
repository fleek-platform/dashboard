import { styled } from '@/theme';
import { Box } from '@/ui';

export const FilecoinStyles = {
  Container: styled(Box, {
    gap: '$spacing-4',
  }),
  Header: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '$spacing-2-5',
  }),

  Main: styled(Box, {
    gap: '$spacing-1',
  }),
};
