import { styled } from '@/theme';
import { Box, Skeleton } from '@/ui';

export const CodeSnippetStyles = {
  Root: styled(Box, {
    overflow: 'hidden',
    flexShrink: 0, // fixes shrinking due to overflow hidden in flex parent

    variants: {
      variant: {
        container: {
          gap: '0',
          padding: '0',

          backgroundColor: '$surface-secondary',
        },
      },
    },

    defaultVariants: {
      variant: 'container',
    },
  }),
  Header: styled('div', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    textSize: '$sm',
    textCategory: '$tertiary',
    padding: '$spacing-3 $spacing-4',
    baseBorderBottom: '$border-slate',
  }),
  Body: styled('pre', {
    margin: 0,
    padding: '$spacing-3 $spacing-4',
    backgroundColor: '$surface-monochrome',
    textSize: '$sm',
    textCategory: '$tertiary',
    height: 'fit-content',
    fontFamily: '$mono',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',

    [`${Skeleton}`]: {
      skeletonTextHeight: '$sm',
      width: '$full',
    },

    '> i': {
      color: '$text-tertiary',
    },
  }),
};
