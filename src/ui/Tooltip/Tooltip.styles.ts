import * as Tooltip from '@radix-ui/react-tooltip';

import { KeyFrames, styled } from '@/theme';

export const TooltipStyles = {
  Content: styled(Tooltip.Content, {
    borderRadius: '$lg',
    padding: '$sizes$inline-component-height-sm $sizes$inline-component-height-md',
    textSize: '$inline-component-font-size',
    textCategory: '$primary',
    textAlign: 'center',
    color: '$text-primary',
    backgroundColor: '$surface-tertiary',
    userSelect: 'none',
    animationDuration: '10ms',
    maxWidth: '18rem',
    willChange: 'transform, opacity',
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': { animationName: KeyFrames.slideDownAndFade },
      '&[data-side="right"]': { animationName: KeyFrames.slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: KeyFrames.slideUpAndFade },
      '&[data-side="left"]': { animationName: KeyFrames.slideRightAndFade },
    },
    zIndex: '$tooltip',
  }),

  Trigger: styled(Tooltip.Trigger, {
    cursor: 'default !important',
  }),

  Arrow: styled(Tooltip.Arrow, {
    fill: '$surface-tertiary',
    width: '$inline-component-height-md',
    height: '0.5625em', // to fit designs
  }),
};
