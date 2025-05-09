import { styled } from '@/theme';
import { Box, Skeleton, Text } from '@/ui';

export const CreateRepositoryFromTemplateStyles = {
  TemplateHeader: {
    OwnerText: styled(Text, {
      fontSize: '$xs',
      lineHeight: '$lg',
    }),
    Skeleton: styled(Skeleton, {
      variants: {
        variant: {
          avatar: {
            width: '3.25rem',
            height: '3.25rem',
            borderRadius: '$full',
          },
          title: {
            width: '10rem',
            height: '$lineHeights$lg',
          },
          text: {
            width: '12rem',
            height: '$lineHeights$xs',
            margin: 'calc($lineHeights$lg / 2 - $lineHeights$xs / 2) 0',
          },
        },
      },
    }),
  },

  CheckboxWrapper: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$spacing-3',
    cursor: 'pointer',
  }),
};
