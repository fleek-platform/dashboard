import { styled } from '@/theme';
import { Box, Icon } from '@/ui';

import { App } from '../App/App';

export const LoginStyles = {
  Wrapper: styled(App.Content, {
    alignItems: 'center',
    justifyContent: 'center',
  }),
  Container: styled(Box, {
    width: '$modal-width',
    maxWidth: '$full',
    variants: {
      variant: { container: { gap: '$spacing-6', borderRadius: '$xl' } },
    },
    defaultVariants: { variant: 'container' },
  }),
  ContentWrapper: styled(Box, {
    gap: '$spacing-3',
  }),
  Spinner: styled(Icon, {
    fontSize: '$3xl',
  }),
};
