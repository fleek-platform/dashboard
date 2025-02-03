import { styled } from '@/theme';
import { Icon } from '@/ui';

import { AppImage } from '../AppImage/AppImage';

export const FleekLogoStyles = {
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
