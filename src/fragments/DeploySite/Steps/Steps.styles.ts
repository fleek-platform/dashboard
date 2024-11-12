import { ExternalLink, Form, Link } from '@/components';
import { styled } from '@/theme';
import { Box } from '@/ui';

export const DeploySiteStepsStyles = {
  Container: styled(Box, {
    position: 'relative',
    variants: {
      variant: {
        container: {
          gap: '$spacing-6',
          borderRadius: '$xl',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  Message: styled(Box, {
    display: 'inline',

    [`${ExternalLink}`]: {
      display: 'inline',
    },

    variants: {
      variant: {
        container: {
          borderRadius: '$xl',
        },
      },
    },
    defaultVariants: { variant: 'container' },
  }),
  Link: styled(Link, ExternalLink, {
    display: 'inline !important',
    variants: { colorScheme: { yellow: {} } },
    defaultVariants: { colorScheme: 'yellow' },
  }),
  SubmitButton: styled(Form.SubmitButton, {
    minWidth: '$full',
  }),
};
