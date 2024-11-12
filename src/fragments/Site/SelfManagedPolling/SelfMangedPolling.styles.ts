import { styled } from '@/theme';
import { Box, Icon } from '@/ui';

export const SelfManagedPollingStyles = {
  Container: styled(Box, {
    gap: '$spacing-6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '$spacing-9 0 !important',

    variants: { variant: { container: {} } },
    defaultVariants: { variant: 'container' },
  }),
  Icon: styled(Icon, {
    textSize: '$3xl',
    color: '$text-primary',
  }),
};
