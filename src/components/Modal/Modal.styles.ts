import { styled } from '@/theme';
import { Box, Dialog, RadioGroup, Skeleton } from '@/ui';

import { BadgeText } from '../BadgeText/BadgeText';

export const ModalStyles = {
  Content: styled(Dialog.Content, {
    width: '$modal-width',
    gap: '$spacing-6',
    textSize: '$sm',

    b: {
      color: '$text-primary',
    },
  }),

  Inner: {
    TextSkeleton: styled(Skeleton, {
      height: '$lineHeights$sm',
    }),
  },

  RadioGroup: {
    Root: styled(RadioGroup.Root, {
      textSize: '$sm',
      gap: '$spacing-6',
    }),
    ItemContainer: styled(Box, {
      gap: '$spacing-2-5',

      [`> ${Box}`]: {
        flexDirection: 'row',
        gap: '$spacing-2-5',

        [`> ${BadgeText}`]: {
          paddingTop: '0',
          paddingBottom: '0',
        },
      },

      '&[aria-disabled="true"]': {
        opacity: '0.3',
        pointerEvents: 'none',
      },
    }),
  },
};
