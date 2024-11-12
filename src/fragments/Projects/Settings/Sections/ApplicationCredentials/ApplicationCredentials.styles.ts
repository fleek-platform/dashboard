import { BadgeText } from '@/components';
import { styled } from '@/theme';
import { Box, FormField, Icon, Menu, Skeleton } from '@/ui';

export const ApplicationCredentialsStyles = {
  Item: {
    Container: styled(Box, {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateAreas: '"name dropdown""domains dropdown""clientId dropdown"',

      gap: '$spacing-3',
      alignItems: 'center',

      [`>${Box}`]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '$spacing-1',
      },

      [`${Skeleton}`]: {
        aspectRatio: '1/1',
        alignSelf: 'center',
        skeletonTextHeight: '$lg',
        width: '$full',
      },

      [`${BadgeText}`]: {
        height: 'fit-content',
        paddingTop: 0,
        paddingBottom: 0,
      },

      [`${Menu.Root}`]: {
        gridArea: 'dropdown',
      },

      '@sm': {
        gridTemplateColumns: '10rem 20rem 1fr 1rem',
        gridTemplateAreas: '"name domains clientId dropdown"',
      },

      variants: {
        isLoading: {
          true: {
            gridTemplateColumns: '1fr 1fr 1fr 1rem',
          },
        },
      },
    }),
    Name: styled(Box, {
      gridArea: 'name',
    }),
    DomainsList: styled(Box, {
      gridArea: 'domains',
    }),
    ClientId: styled(Box, {
      gridArea: 'clientId',
    }),
    Domains: {
      Container: styled(Box, {
        flexDirection: 'row',
        gap: '$spacing-2',
        width: '$full',
      }),
    },
    TextSkeleton: styled(Box, {
      width: '$full',

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$sm',
        width: '40%',
        alignSelf: 'start',
      },
    }),
    LabelSkeleton: styled(Box, {
      variants: {
        isLoading: {
          true: {
            width: '$full',
          },
        },
      },

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$xs',
        width: '80%',
        alignSelf: 'start',
      },
    }),
  },
  Whitelist: {
    Container: styled(Box, {
      gap: '$inline-component-gap',

      [`> ${Box}`]: {
        gap: '$spacing-3',
      },
    }),
  },
  Domain: {
    Container: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-4',

      [`${Icon}`]: {
        maxHeight: '$inline-component-height-xl',
        color: '$icon-slate-actionable',
        cursor: 'pointer',

        '&:hover': {
          color: '$icon-slate-actionable-focus',
        },
      },

      [`${FormField.Root}`]: {
        flex: 1,
      },
    }),
  },
};
