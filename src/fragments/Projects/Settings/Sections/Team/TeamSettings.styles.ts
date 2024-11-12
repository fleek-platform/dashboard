import { BadgeText } from '@/components';
import { styled } from '@/theme';
import { Box, Icon, Skeleton, Text } from '@/ui';

export const TeamSettingsStyles = {
  Item: {
    Container: styled(Box, {
      display: 'grid',
      gridTemplateColumns: '2fr auto 1.625rem',
      gap: '$spacing-3',
      alignItems: 'center',

      [`> ${Box}`]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '$spacing-1',
      },

      [`> ${Skeleton}`]: {
        aspectRatio: '1/1',
        width: '30%',
        alignSelf: 'center',
        skeletonTextHeight: '$lg',
      },

      [`${BadgeText}`]: {
        display: 'inline',
        marginLeft: '$spacing-3',
      },
    }),
    Text: styled(Text, {
      color: '$text-primary',
      textCategory: '$tertiary',
      textSize: '$sm',
      width: '$full',

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$sm',
        width: '20%',
      },
    }),
    Label: styled(Text, {
      textCategory: '$primary',
      textSize: '$xs',
      color: '$text-secondary',
      width: '$full',

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$xs',
        width: '30%',
      },
    }),

    Icon: styled(Icon, {
      color: '$icon-slate',
    }),
  },

  ButtonSkeleton: styled(Skeleton, {
    variants: {
      variant: {
        button: {
          width: '5.8126rem',
          height: '$inline-component-height-lg',
        },
      },
    },
  }),

  InlineFields: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-4',
    alignItems: 'flex-start',

    // to support styles for when there's a tooltip
    'button:first-child': {
      flex: 1,
    },

    'div:first-child': {
      flex: 1,
    },
  }),
};
