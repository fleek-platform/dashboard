import { styled } from '@/theme';
import { typography } from '@/theme/foundations';
import { Box, Icon } from '@/ui';

import { AppImage } from '../AppImage/AppImage';

type FontSizeKeys = keyof typeof typography.fontSizes;
type SizeVariantsType = Record<FontSizeKeys, { fontSize: string }>;

const sizeVariants: SizeVariantsType = Object.keys(typography.fontSizes).reduce((acc, key) => {
  acc[key as FontSizeKeys] = { fontSize: typography.fontSizes[key as FontSizeKeys] };

  return acc;
}, {} as SizeVariantsType);

export const FleekLogoStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    color: '$text-primary',
    alignItems: 'center',
    gap: '8%',

    variants: {
      size: sizeVariants,
    },
  }),
  Typography: styled(Icon, {
    svg: {
      width: '3.85em',
      height: 'auto',
    },
  }),
  Bolt: styled(AppImage, {
    height: '1.7em',
    width: 'auto',
  }),
};
