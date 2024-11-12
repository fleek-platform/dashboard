import { css, styled } from '@/theme';
import { Box, Icon, Skeleton } from '@/ui';

import { BadgeText } from '../BadgeText/BadgeText';
import { ExternalLink } from '../ExternalLink/ExternalLink';
import { Link } from '../Link/Link';

const containerBaseProps = css({
  flexDirection: 'row',
  alignItems: 'center',
  gap: '$xs',
  color: '$text-primary',

  '&:hover': {
    textDecoration: 'none !important',
  },
  [`> ${Skeleton}`]: {
    skeletonTextHeight: '$md',
    width: '30%',
  },

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});

export const SiteOverviewBoxStyles = {
  Container: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    variants: {
      variant: {
        container: {
          gap: '$spacing-6',
          background: '$surface-content-fill',
        },
      },
    },

    defaultVariants: { variant: 'container' },
  }),
  DetailsContainer: styled(Box, {
    flex: 1,
    gap: '$spacing-5',

    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$2xl',
      width: '40%',
    },
  }),
  StatusRow: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textSize: '$xs',

    [`> ${BadgeText} > ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '$space$spacing-9',
    },
  }),
  ElapsedTime: styled(Box, {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '$spacing-1',
    color: '$text-secondary',

    [`${Icon}`]: {
      fontSize: '0.7em',
    },
  }),
  SiteDetail: {
    Container: styled(ExternalLink, Box, containerBaseProps),
    LocalContainer: styled(Link, Box, containerBaseProps, {
      color: '$text-yellow',
    }),

    IconContainer: styled(Box, {
      padding: '$spacing-1',
      width: 'auto',
      height: 'auto',
      borderRadius: '$full',

      [`${Icon}`]: {
        color: 'inherit !important',
        fontSize: '$xs',
      },
      [`> ${Skeleton}`]: {
        aspectRatio: '1/1',
        borderRadius: '$full',
        skeletonTextHeight: '$lg',
      },

      variants: {
        variant: {
          ipfs: {
            backgroundColor: '$surface-ipfs',
          },
          gitProvider: {
            backgroundColor: '$surface-logo',
            color: '$surface-monochrome',
          },
          web: {
            backgroundColor: '$button-slate-secondary',
            color: '$icon-slate',
          },
          loading: {
            backgroundColor: '$surface-primary',
            padding: '0',
          },
        },
      },
    }),
  },
};
