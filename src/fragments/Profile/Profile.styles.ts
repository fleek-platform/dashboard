import { Link } from '@/components';
import { styled } from '@/theme';
import { Box, Dialog, FormField, Skeleton } from '@/ui';

export const ProfileStyles = {
  Settings: {
    BackButton: styled(Link, {
      width: 'fit-content',
      textSize: '$sm',

      variants: {
        colorScheme: { slate: {} },
        isSecondary: { true: {} },
      },

      defaultVariants: { colorScheme: 'slate', isSecondary: true },
    }),

    Modal: {
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
    },
  },
};
