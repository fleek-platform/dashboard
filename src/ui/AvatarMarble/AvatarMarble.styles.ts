import { styled } from '@/theme';

export const AvatarMarbleStyles = {
  Container: styled('svg', {
    width: '$inline-component-height-lg',
    height: '$inline-component-height-lg',

    variants: {
      rounded: {
        true: {
          borderRadius: '$full',
        },
      },
    },
  }),
};
