import { styled } from '@/theme';
import { Box } from '@/ui';

export const SelfManagedSetupStyles = {
  Container: styled(Box, {
    variants: {
      variant: {
        container: {
          gap: '$spacing-6',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  Header: styled(Box, {
    gap: '$spacing-3',

    [`${Box}`]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
  Row: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  ButtonContainer: styled(Box, {
    gap: '$spacing-3',
    display: 'flex',
    flexDirection: 'row',
  }),
  DividerContainer: styled(Box, {
    gap: '$2xs',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    [`> span`]: {
      textSize: '$sm',
      textCategory: '$tertiary',
      color: '$text-secondary',
    },
  }),
};
