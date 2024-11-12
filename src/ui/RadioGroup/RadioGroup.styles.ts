import * as RadioGroup from '@radix-ui/react-radio-group';

import { styled } from '@/theme';

export const RadioGroupStyles = {
  Root: styled(RadioGroup.Root, {
    display: 'flex',
    flexDirection: 'column',
    gap: '$spacing-2-5',
  }),
  Item: styled(RadioGroup.Item, {
    borderRadius: '$full',
    backgroundColor: '$transparent',
    baseBorder: '$border-slate-actionable',
    width: '1.25rem',
    height: '1.25rem',

    '&:hover': {
      baseBorder: '$border-slate-actionable-focus',
    },

    '&[data-state="checked"]': {
      baseBorder: '$border-yellow-actionable-focus',
    },
  }),
  Indicator: styled(RadioGroup.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '$full',
    height: '$full',
    padding: '0.25rem',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: '0.625rem',
      height: '0.625rem',
      borderRadius: '50%',
      backgroundColor: '$border-yellow-actionable-focus',
    },
  }),
};
