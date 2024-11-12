import { styled } from '@/theme';
import { Box, Icon } from '@/ui';

import { DeploySiteStepsStyles } from '../Steps.styles';

export const GitProviderStyles = {
  ...DeploySiteStepsStyles,

  Container: styled(DeploySiteStepsStyles.Container, {
    height: '19.875rem',
    alignItems: 'center',
  }),

  StepsBox: {
    Item: {
      Wrapper: styled(Box, {
        gap: '$spacing-2',
      }),
    },
  },

  InstallProviderMessage: styled(Box, {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '$spacing-3',
    flex: 1,
    textSize: '$sm',

    [`${Icon}`]: {
      fontSize: '$md',
    },
  }),
};
