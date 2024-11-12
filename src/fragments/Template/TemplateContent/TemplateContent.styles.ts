import { styled } from '@/theme';
import { Box, Image, Skeleton } from '@/ui';

import { TemplateStyles } from '../Template.styles';

export const TemplateContentStyles = {
  ...TemplateStyles,

  Screenshot: {
    Container: styled(Box, {
      [`> ${Image}, > ${Skeleton}`]: {
        aspectRatio: '4 / 3',
        maxWidth: '$full',
        borderRadius: 'inherit',
        baseBorder: '$border-slate',
      },

      variants: {
        variant: {
          container: {
            backgroundColor: '$transparent',
          },
        },
      },

      defaultVariants: { variant: 'container' },
    }),
  },
};
