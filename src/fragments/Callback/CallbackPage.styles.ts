import { styled } from '@/theme';
import { Box } from '@/ui';

import { App } from '../App/App';

export const CallbackPageStyles = {
  Container: styled(App.Content, {
    gap: '$spacing-4',
    alignItems: 'center',
    paddingTop: '5vh',
    textAlign: 'center',
    justifyContent: 'center',
  }),
  IconContainer: styled(Box, {
    fontSize: '4.75rem',
    color: '$icon-green',
  }),
};
