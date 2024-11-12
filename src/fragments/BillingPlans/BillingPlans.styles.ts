import { styled } from '@/theme';
import { Box } from '@/ui';

import { App } from '../App/App';

export const BillingPlansStyles = {
  BackButtonWrapper: styled(Box, {
    padding: '$spacing-6 0',
  }),

  PlanCardsWrapper: styled(Box, {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '$spacing-5',
  }),

  Content: styled(App.Content, {
    paddingBottom: '$spacing-99',
  }),
};
