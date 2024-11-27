import { amber, amberDark, gray, grayDark, green, greenDark, red, redDark, slate, slateDark, yellow, yellowDark } from '@radix-ui/colors';

import { border } from './colors/border';
import { button } from './colors/button';
import { gradient } from './colors/gradient';
import { icon } from './colors/icon';
import { surface } from './colors/surface';
import { text } from './colors/text';

const defaultColors = {
  black: '#000',
  white: '#fff',
  transparent: 'transparent',
};

export const colors = {
  light: {
    ...defaultColors,
    ...gray,
    ...slate,
    ...yellow,
    ...red,
    ...green,
    ...amber,
    background: slate.slate1,
    foreground: defaultColors.white,

    ...surface.light,
    ...border.light,
    ...icon.light,
    ...button.light,
    ...text.light,
    ...gradient.light,
  },
  dark: {
    ...defaultColors,
    ...grayDark,
    ...slateDark,
    ...yellowDark,
    ...redDark,
    ...greenDark,
    ...amberDark,
    background: defaultColors.black,
    foreground: slateDark.slate1,

    ...text.dark,
    ...surface.dark,
    ...border.dark,
    ...icon.dark,
    ...button.dark,
    ...gradient.dark,
  },
};
