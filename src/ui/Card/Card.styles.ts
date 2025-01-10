import { styled } from '@/theme';

import { Box } from '../ftw/Box/Box';
import { Image } from '../Image/Image';

export const CardStyles = {
  Root: styled(Box, {
    overflow: 'hidden',

    variants: {
      variant: {
        container: {
          gap: '0',
          padding: '0',
        },
      },
    },

    defaultVariants: {
      variant: 'container',
    },
  }),

  Cover: styled(Image, {
    height: '10rem', // predefined value but must be set on usage
    objectFit: 'cover',
    objectPosition: 'center',
  }),

  Content: {
    Wrapper: styled(Box, {
      padding: '$spacing-4',
      gap: '$spacing-4',
      backgroundColor: '$surface-primary',
    }),
    Row: styled(Box, {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    }),
  },
};
