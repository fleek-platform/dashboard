import { styled } from '@/theme';

import { Box } from '../Box/Box';

export const StepperStyles = {
  Container: styled(Box, {
    gap: '$spacing-3',
  }),
  Rail: styled('div', {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$spacing-3',
    width: '$full',
  }),
  RailDivision: styled('div', {
    flex: 1,
    maxWidth: 'calc($space$spacing-8 + $space$spacing-1 * 0.5)',
    height: 'calc($space$spacing-2-5 + $space$spacing-1 * 0.5)',
    borderRadius: '$full',
    backgroundColor: '$button-slate-secondary',
    '&[data-active="true"]': {
      backgroundColor: '$button-yellow-primary',
    },
  }),
  RailDivisionLabel: styled('span', {
    color: '$text-yellow',
  }),
};
