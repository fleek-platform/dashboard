import { KeyFrames, styled } from '@/theme';

export const SkeletonElement = styled('div', {
  animation: `${KeyFrames.blink} 1s ease-in-out infinite`,
  backgroundColor: '$surface-skeleton',
  borderRadius: '$sm',

  variants: {
    variant: {
      text: {
        height: '$lineHeights$xs',
        width: '$full',
      },
      button: {
        height: '$inline-component-height-xl',
        width: '$full',
        borderRadius: '$md',
      },
      avatar: {
        borderRadius: '$full',
        width: '$inline-component-height-lg',
        height: '$inline-component-height-lg',
      },
    },
  },
});
