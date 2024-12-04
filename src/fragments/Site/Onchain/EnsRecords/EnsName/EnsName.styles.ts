import { styled } from '@/theme';
import { Box, Text } from '@/ui';

export const EnsNameStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 'fit-content',
    textSize: '$sm',
    textCategory: '$primary',
    width: '$full',

    variants: {
      variant: {
        container: {
          padding: '$spacing-1 $spacing-2-5',
          gap: '$spacing-2',

          backgroundColor: '$surface-tertiary',
          borderRadius: '$md',
          border: 'none',
        },
      },
    },
  }),

  EnsName: styled(Text, {
    maxWidth: '$max',
    color: '$text-green',
  }),
};
