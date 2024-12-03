import { ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Text } from '@/ui';

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

      TitleWrapper: styled(Box, {
        flexDirection: 'row',
        justifyContent: 'space-between',

        [`> ${Text}`]: {
          textCategory: '$secondary',
          color: '$text-primary',
        },
      }),

      Message: styled(Text, {
        textSize: '$sm',
        display: 'inline-block',

        [`${ExternalLink}`]: {
          textSize: 'inherit',
          display: 'inherit',
          color: '$text-yellow',
        },
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
