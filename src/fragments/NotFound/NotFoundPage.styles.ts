import { styled } from '@/theme';
import { Box } from '@/ui';

import { App } from '../App/App';

export const NotFoundPageStyles = {
  Container: styled(App.Content, {
    gap: '$spacing-4',
    alignItems: 'center',
    paddingTop: '5vh',
    textAlign: 'center',
    justifyContent: 'center',
  }),
  LogoContainer: styled(Box, {
    marginBottom: '$spacing-6',
  }),
};
