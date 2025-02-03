import { styled } from '@/theme';
import { Skeleton } from '@/ui';

export const CodeSnippetStyles = {
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
