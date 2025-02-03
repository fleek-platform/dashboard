import { ExternalLink } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Skeleton } from '@/ui';

export const TemplateDetailsStyles = {
  Container: styled(Box, {
    baseBorder: '$border-slate',
    borderRadius: '$lg',
    padding: '$spacing-4',
    backgroundColor: '$surface-primary',

    variants: {
      variant: {
        container: {
          height: 'fit-content',
          padding: '$spacing-5 $spacing-6',
          gap: '$spacing-4',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  TitleSkeleton: styled(Box, {
    width: '$full',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$lg',
      width: '40%',
    },
  }),
  DetailsContainer: styled(Box, {
    [`> ${ExternalLink}`]: {
      textSize: '$xs',
    },
  }),
  Item: {
    Container: styled(Box, {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '$spacing-2-5',
    }),
    Icon: styled(Icon, {
      color: '$icon-slate',
      fontSize: '$md',

      '> svg': {
        height: '1em',
        width: '1em',
      },
    }),
    TextContent: styled(Box, {
      gap: '$spacing-1',
      width: '$full',
    }),
    LabelSkeleton: styled(Box, {
      width: '$full',

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$xs',
        width: '30%',
      },
    }),
    ValueSkeleton: styled(Box, {
      width: '$full',

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$xs',
        width: '60%',
      },
    }),
    Divider: styled(Box, {
      backgroundColor: '$border-slate',
      border: 'none',
      height: '$small-divider-height',
      margin: '$spacing-3 0',
    }),
    SkeletonIcon: styled(Skeleton, {
      aspectRatio: '1 / 1',
      height: '$fontSizes$md',
      borderRadius: '$full',
    }),
  },
};
