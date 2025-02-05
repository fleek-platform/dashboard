import { styled } from '@/theme';
import { Box, Image, Skeleton } from '@/ui';

import { TemplateStyles } from '../Template.styles';

export const TemplateContentStyles = {
  ...TemplateStyles,

  Screenshot: {
    Container: styled(Box, {
      padding: '$spacing-4',
      gap: '$spacing-4',
      borderRadius: '$lg',
      baseBorder: '$border-slate',
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
