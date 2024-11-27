import {
  amber,
  amberDark,
  gray,
  grayDark,
  green,
  greenDark,
  red,
  redDark,
  yellow,
  yellowDark,
} from '@radix-ui/colors';

export const text = {
  dark: {
    'text-primary': grayDark.gray12,
    'text-secondary': grayDark.gray11,
    'text-tertiary': grayDark.gray8,

    'text-yellow': yellowDark.yellow11,
    'text-amber': amberDark.amber11,
    'text-red': redDark.red11,
    'text-green': greenDark.green11,
    'text-monochrome': '$white',
  },
  light: {
    'text-primary': gray.gray12,
    'text-secondary': gray.gray11,
    'text-tertiary': gray.gray8,

    'text-yellow': yellow.yellow11,
    'text-amber': amber.amber11,
    'text-red': red.red11,
    'text-green': green.green11,
    'text-monochrome': '$black',
  },
};
