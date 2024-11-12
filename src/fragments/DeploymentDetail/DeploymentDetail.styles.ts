import { BadgeText, StatusRadio } from '@/components';
import { styled } from '@/theme';
import { Accordion, Box, Icon, Skeleton } from '@/ui';

const statusRadioStyles = {
  padding: '$spacing-1',

  [`${Icon}`]: {
    color: '$icon-monochrome',

    svg: {
      width: '0.75em',
      height: '0.75em',
    },
  },
};

export const DeploymentStyles = {
  NavContainer: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',

    [`> ${Box}`]: {
      flexDirection: ' row',
      gap: '$spacing-3',
    },
  }),
  RightAlignedBox: styled(Box, {
    marginLeft: 'auto',
  }),
  StatusRadio: styled(StatusRadio, {
    variants: {
      status: {
        error: statusRadioStyles,
        success: {
          ...statusRadioStyles,
          backgroundColor: '$icon-green',
        },
        spinner: {
          ...statusRadioStyles,
          [`${Icon}`]: {
            color: '$border-slate-actionable-focus',
            svg: {
              width: '1.25em',
              height: '1.25em',
            },
          },
        },
      },
    },
  }),
  Domains: {
    Container: styled(Box, {
      flexDirection: 'row',
      gap: '$spacing-2',
    }),
  },
  Accordion: {
    Root: styled(Accordion.Root, {}),
    Header: styled(Accordion.Header, {
      fontSize: '$md',
      gap: '$spacing-4',
      padding: '$spacing-5 $spacing-6',
      background: '$surface-content-fill',

      [`> ${Box}`]: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '$spacing-3',
      },

      [`> ${Skeleton}`]: {
        skeletonTextHeight: '$lg',
        width: '30%',
      },
    }),
    Content: styled(Accordion.Content, {
      maxHeight: '30rem',
      backgroundColor: '$surface-secondary',
      overflowY: 'auto',
      padding: 0,
    }),
  },
  RowSkeleton: styled(Skeleton, {
    height: '$lineHeights$sm',

    variants: {
      variant: {
        text: {
          width: '15%',
        },
        message: {
          width: '90%',
        },
      },
    },
  }),
  Log: {
    Row: styled(Box, {
      flexDirection: 'row',
      padding: '$spacing-2-5 $spacing-6',
      gap: '$spacing-6',
      background: '$surface-primary',

      variants: {
        status: {
          failed: {
            '&:last-child': {
              backgroundColor: '$surface-red-light',
            },
          },
          loading: {
            '&:last-child': {
              backgroundColor: '$surface-amber-light',
            },
          },
        },
      },
    }),
  },
  Row: {
    Container: styled(Box, {
      padding: '$spacing-3 $spacing-6',
      textSize: '$sm',
      flexDirection: 'row',
      justifyContent: 'space-between',

      [`${BadgeText}`]: {
        height: 'fit-content', // should we extend this to the component?
      },
    }),
  },
  IconContainer: styled(Box, {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '$sm',
    borderRadius: '$full',
    padding: '$spacing-1',
    background: '$surface-avatar-icon',
    height: 'fit-content',

    variants: {
      variant: {
        ens: { backgroundColor: '$surface-ens' },
      },
    },
  }),

  // TODO move to SiteOverviewBox component
  ProviderWrapper: styled(Box, {
    flexDirection: 'row',
    gap: '$spacing-2-5',

    '@sm!': {
      flexDirection: 'column',
    },
  }),
};
