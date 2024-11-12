import { styled } from '@/theme';
import { Box } from '@/ui';

export const StepStyles = {
  Container: styled(Box, {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '$full',
  }),
  Indicator: styled(Box, {
    flexDirection: 'column',
    justifyContent: 'center',
  }),
};
