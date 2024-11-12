import { styled } from '@/theme';
import { Box } from '@/ui';

export const StatusChipStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '17.5em',
    textSize: '$sm',
    textCategory: '$primary',
    width: '$full',

    variants: {
      variant: {
        container: {
          padding: '$spacing-2 $spacing-2-5',
          gap: '$spacing-2',

          backgroundColor: '$surface-secondary',
          borderRadius: '$lg',
          border: 'none',
        },
      },
    },
  }),
  StatusContainer: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$spacing-2',
  }),
};
