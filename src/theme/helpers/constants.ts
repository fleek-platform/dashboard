import { keyframes } from '../themes';

export const KeyFrames = {
  slideUpAndFade: keyframes({
    '0%': { opacity: 0, transform: 'translateY(2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  }),
  slideRightAndFade: keyframes({
    '0%': { opacity: 0, transform: 'translateX(-2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  }),
  slideDownAndFade: keyframes({
    '0%': { opacity: 0, transform: 'translateY(-2px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  }),
  slideLeftAndFade: keyframes({
    '0%': { opacity: 0, transform: 'translateX(2px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  }),
  slideCollapsibleDown: keyframes({
    from: { height: 0 },
    to: { height: 'var(--radix-collapsible-content-height)' },
  }),
  slideCollapsibleUp: keyframes({
    from: { height: 'var(--radix-collapsible-content-height)' },
    to: { height: 0 },
  }),
  slideDown: keyframes({
    from: { height: 0 },
    to: { height: 'var(--radix-accordion-content-height)' },
  }),
  slideUp: keyframes({
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: 0 },
  }),
  overlayShow: keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  }),
  contentShow: keyframes({
    '0%': { opacity: 0, transform: 'translate(0, 1rem) scale(.96)' },
    '100%': { opacity: 1, transform: 'translate(0, 0) scale(1)' },
  }),
  blink: keyframes({
    '0%': {
      opacity: '1',
    },
    '50%': {
      opacity: '0.5',
    },
    '100%': {
      opacity: '1',
    },
  }),
  hide: keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
  }),
  show: keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  }),
};
