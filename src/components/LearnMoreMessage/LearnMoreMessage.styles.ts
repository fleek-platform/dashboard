import { styled } from '@/theme';

import { ExternalLink } from '../ExternalLink/ExternalLink';

export const LearnMoreMessageStyles = {
  ExternalLink: styled(ExternalLink, {
    textSize: '$inline-component-font-size',
    variants: { colorScheme: { yellow: {} } },
    defaultVariants: { colorScheme: 'yellow' },
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
};
