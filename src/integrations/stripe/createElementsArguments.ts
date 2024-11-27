import { StripeElementsOptionsMode } from '@stripe/stripe-js';

import { ThemeHook } from '@/providers/ThemeProvider';

type CreateElementsAppearance = (
  args: ThemeArgs,
) => StripeElementsOptionsMode['appearance'];

export const createElementsAppearance: CreateElementsAppearance = ({
  theme,
}) => ({
  theme: 'stripe',
  variables: {
    fontFamily: 'IBM Plex Sans, sans-serif',

    colorBackground: theme.colors['surface-primary'].value,
    colorText: theme.colors['text-primary'].value,
    colorDanger: theme.colors['text-red'].value,

    borderRadius: theme.radii.md.value,
  },
  rules: {
    '.Label': {
      fontWeight: theme.fontWeights.tertiary.value,
      fontSize: theme.fontSizes.xs.value,
      color: theme.colors['text-secondary'].value,
      marginBottom: theme.space.xs.value,
    },

    '.Input:focus': {
      boxShadow: `0 0 0 1px ${theme.colors['border-yellow-actionable-focus'].value}`,
      borderColor: theme.colors['border-yellow-actionable-focus'].value,
    },

    '.Input--invalid': {
      color: theme.colors['text-primary'].value,
    },

    '.Error': {
      fontSize: theme.fontSizes['2xs'].value,
      fontWeight: theme.fontWeights.tertiary.value,
    },
  },
});

export type ThemeArgs = {
  theme: NonNullable<ThemeHook['constants']>;
};
