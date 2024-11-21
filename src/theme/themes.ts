import { type PropertyValue, createStitches } from '@stitches/react';

import { borderWidths } from './foundations/borderWidths';
import { colors } from './foundations/colors';
import { media } from './foundations/media';
import { radii } from './foundations/radii';
import { shadows } from './foundations/shadows';
import { sizes } from './foundations/sizes';
import { space } from './foundations/space';
import { transitions } from './foundations/transitions';
import { typography } from './foundations/typography';
import { zIndices } from './foundations/zIndices';

const stitches = createStitches({
  prefix: 'flk',
  media,
  theme: {
    colors: colors.light,
    borderWidths,
    space,
    sizes,
    fontWeights: typography.fontWeights,
    fonts: typography.fonts,
    letterSpacings: typography.letterSpacings,
    lineHeights: typography.lineHeights,
    fontSizes: typography.fontSizes,
    radii,
    shadows,
    zIndices,
    transitions,
  },
  utils: {
    textSize: (value: PropertyValue<'fontSize' | 'lineHeight'>) => ({
      fontSize: value,
      lineHeight: value,
    }),
    textCategory: (value: PropertyValue<'fontWeight'>) => ({
      fontWeight: value,
    }),
    baseBorder: (value: PropertyValue<'borderColor'>) => ({
      borderWidth: '$base',
      borderStyle: 'solid',
      borderColor: value,
    }),
    baseBorderTop: (value: PropertyValue<'borderColor'>) => ({
      borderTopWidth: '$base',
      borderTopStyle: 'solid',
      borderTopColor: value,
    }),
    baseBorderBottom: (value: PropertyValue<'borderColor'>) => ({
      borderBottomWidth: '$base',
      borderBottomStyle: 'solid',
      borderBottomColor: value,
    }),
    skeletonTextHeight: (value: `$${keyof typeof typography.fontSizes}`) => ({
      height: `$fontSizes${value}`,
      margin: `calc(($lineHeights${value} - $fontSizes${value}) / 2) 0`,
    }),
  },
});

const darkTheme = stitches.createTheme({
  colors: colors.dark,
});

export const themes = {
  light: stitches.theme,
  dark: darkTheme,
};

export const { css, globalCss, keyframes, config, getCssText } = stitches;

export const styled = ((...args: any[]) => {
  const base: any = { defaultProps: {} };

  for (const arg of args) {
    // forward default props
    if (typeof arg === 'object' && 'defaultProps' in arg) {
      base.defaultProps = Object.assign(
        base.defaultProps || {},
        arg.defaultProps,
      );
    }

    // override with default variants
    if (typeof arg === 'object' && 'defaultVariants' in arg) {
      base.defaultProps = Object.assign(
        base.defaultProps || {},
        arg.defaultVariants,
      );
      arg.defaultVariants = undefined;
    }
  }

  const component = stitches.styled(args[0], ...args.slice(1));

  return Object.assign(component, base);
}) as typeof stitches.styled;
