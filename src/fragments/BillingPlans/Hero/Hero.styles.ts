import { styled } from '@/theme';
import { Box } from '@/ui';

export const HeroStyles = {
  HeadingWrapper: styled(Box, {
    gap: '$spacing-6',
    textAlign: 'center',
    padding: '$spacing-6 0',
    margin: '$spacing-4 0 $spacing-6 0',
  }),

  Heading: styled('h2', {
    margin: 0,
    fontFamily: '$heading',
    fontSize: '5.96063rem',
    fontWeight: '$tertiary',
    letterSpacing: '-0.17881rem',
    lineHeight: '100%',

    '@sm!': {
      fontSize: '3rem',
    },
  }),

  SubHeading: styled('h3', {
    margin: 0,
    fontSize: '1.5625rem',
    lineHeight: '150%',
    fontWeight: '$text',

    color: '$text-secondary',

    '@sm!': {
      fontSize: '1.2rem',
    },
  }),
};
