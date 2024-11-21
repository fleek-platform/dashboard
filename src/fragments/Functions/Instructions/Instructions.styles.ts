import { ActionBox, ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Box } from '@/ui';

export const InstructionsStyles = {
  OutsideLinks: {
    Container: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-6',

      [`> ${ActionBox}`]: {
        width: '$full',
      },
    }),
  },
  MainContainer: styled(Box, {
    padding: '$spacing-6',
    gap: '$spacing-6',
  }),
  DividerContainer: styled(Box, {
    gap: '$2xs',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '> span': {
      textSize: '$sm',
      textCategory: '$tertiary',
      color: '$text-secondary',
    },
  }),
  StepContainer: styled(Box, {
    gap: '$spacing-6',
  }),
  LearnMoreRow: styled(Box, {
    flexDirection: '$row',
    justifyContent: 'space-between',
  }),
  ButtonContainer: styled(Box, {
    flexDirection: '$row',
    gap: '$spacing-3',
  }),
  DocsText: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',

    [`> ${ExternalLink}`]: {
      color: '$text-yellow',
    },
  }),
};
