import { styled } from '@/theme';
import { Box, Skeleton } from '@/ui';

const iconContainerVariant = {
  filecoin: { fontSize: '$sm', padding: '0' },
  ipfs: { backgroundColor: '$surface-tertiary' },
  ens: { backgroundColor: '$surface-ens' },
  loading: { backgroundColor: '$surface-primary', padding: '0' },
};

export const BoxWithFooterStyles = {
  Container: styled(Box, {
    variants: {
      variant: {
        container: {
          padding: '0',
          gap: '0',
          background: '$surface-content-fill',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  MainContent: styled(Box, {
    padding: '$spacing-5 $spacing-6',
    borderTopLeftRadius: '$lg',
    borderTopRightRadius: '$lg',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$lg',
      width: '30%',
    },
  }),
  Footer: styled(Box, {
    background: '$surface-tertiary',
    padding: '$spacing-2-5 $spacing-6',
    borderBottomLeftRadius: '$lg',
    borderBottomRightRadius: '$lg',

    color: '$text-secondary',
    textCategory: '$primary',
    textSize: '$xs',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '10%',
    },

    [`> ${Box}`]: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: '$spacing-2',
    },
  }),
  IconContainer: styled(Box, {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc($xs / 1.5)',
    borderRadius: '$full',
    padding: '$spacing-1',
    background: '$surface-avatar-icon',

    [`> ${Skeleton}`]: {
      aspectRatio: '1 / 1',
      borderRadius: '$full',
      skeletonTextHeight: '$xs',
    },

    variants: {
      variant: {
        ...iconContainerVariant,
      },
    },
  }),
};
