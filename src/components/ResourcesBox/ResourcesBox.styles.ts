import { styled } from '@/theme';
import { Box } from '@/ui';

import { ExternalLink } from '../ExternalLink/ExternalLink';

export const BoxStyles = {
  Container: styled(Box, {
    variants: {
      variant: {
        container: {
          gap: '$spacing-2',
          background: '$surface-primary',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  Links: {
    Container: styled('div', {
      display: 'grid',
      marginTop: '$spacing-2',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, auto)',
      gridRowGap: '$spacing-4',

      [`${ExternalLink}`]: {
        textCategory: '$sm',
      },
    }),
  },
};
