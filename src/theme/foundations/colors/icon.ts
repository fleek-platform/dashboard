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

export const icon = {
  dark: {
    'icon-disabled': grayDark.gray8,

    'icon-slate': grayDark.gray11,
    'icon-slate-actionable': grayDark.gray8,
    'icon-slate-actionable-focus': grayDark.gray12,

    'icon-yellow': yellowDark.yellow11,
    'icon-yellow-actionable': yellowDark.yellow8,
    'icon-yellow-actionable-focus': yellowDark.yellow12,

    'icon-amber': amberDark.amber11,
    'icon-amber-actionable': amberDark.amber8,
    'icon-amber-actionable-focus': amberDark.amber12,

    'icon-red': redDark.red11,
    'icon-red-actionable': redDark.red8,
    'icon-red-actionable-focus': redDark.red12,

    'icon-green': greenDark.green11,
    'icon-green-actionable': greenDark.green8,
    'icon-green-actionable-focus': greenDark.green12,

    'icon-monochrome': '$black',
  },
  light: {
    'icon-disabled': gray.gray8,

    'icon-slate': gray.gray11,
    'icon-slate-actionable': gray.gray8,
    'icon-slate-actionable-focus': gray.gray12,

    'icon-yellow': yellow.yellow11,
    'icon-yellow-actionable': yellow.yellow8,
    'icon-yellow-actionable-focus': yellow.yellow12,

    'icon-amber': amber.amber11,
    'icon-amber-actionable': amber.amber8,
    'icon-amber-actionable-focus': amber.amber12,

    'icon-red': red.red11,
    'icon-red-actionable': red.red8,
    'icon-red-actionable-focus': red.red12,

    'icon-green': green.green11,
    'icon-green-actionable': green.green8,
    'icon-green-actionable-focus': green.green12,

    'icon-monochrome': '$white',
  },
};
