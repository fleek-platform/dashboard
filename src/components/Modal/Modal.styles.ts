import { styled } from '@/theme';
import { Box, Button, Dialog, FormField, RadioGroup, Skeleton } from '@/ui';

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

  CTARow: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-4',

    [`${Button}`]: {
      flex: 1,
    },
  }),

  Inner: {
    Container: styled(Box, {
      [`${FormField.Root}`]: {
        flex: 1,
      },

      variants: {
        variant: {
          container: {
            padding: '$spacing-3 $spacing-4',
            gap: '$spacing-3',
          },
        },
      },
      defaultVariants: { variant: 'container' },
    }),
    Row: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-2',
    }),
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
