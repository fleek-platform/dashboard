import { styled } from '@/theme';
import { Box, Skeleton } from '@/ui';

import { Link } from '..';

export const CustomDomainBoxStyles = {
  Container: styled(Box, {
    gap: '$spacing-4',
  }),
  Header: styled(Box, {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '$spacing-2-5',
  }),
  TitleSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$lg',
      width: '30%',
    },
  }),
  LinkButton: styled(Link, {
    width: 'fit-content',
    textCategory: '$tertiary',
    textSize: '$sm',
    padding: '$spacing-3',
    borderRadius: '$lg',

    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: '$button-disabled',
      color: '$text-tertiary',

      '&:hover': {
        backgroundColor: '$button-disabled',
      },
    },

    variants: {
      isSecondary: { true: {} },
    },
  }),
  SkeletonButton: styled(Skeleton, {
    borderRadius: '$lg',
    width: '10%',
    padding: '$spacing-3',
  }),
  ListContainer: styled(Box, {
    gap: '$spacing-1',
  }),
  ListTitleSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$xs',
      width: '25%',
    },
  }),
  DomainTextSkeleton: styled(Box, {
    [`> ${Skeleton}`]: {
      skeletonTextHeight: '$md',
      width: '16%',
    },
  }),
  CTALink: styled(Link, {
    color: '$text-yellow',
  }),
};
