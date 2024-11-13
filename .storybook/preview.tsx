import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import React, { useEffect } from 'react';
import { ToastProvider } from '@/providers/ToastProvider';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      disable: true,
    },
    options: {
      storySort: {
        order: ['Docs', 'Library', ['Atoms', 'Molecules', 'Organisms', 'Templates']],
      },
    },
    previewTabs: {
      'storybook/docs/panel': { index: -1 },
    },
  },
};

const Switcher = ({ theme }: any) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (setTheme) setTheme(theme);
  }, [theme, setTheme]);

  return null;
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: 'light',
      dark: 'dark',
    } as any,
    defaultTheme: 'light',
    Provider: ({ theme, children }: any) => {
      return (
        <ThemeProvider>
          <Switcher theme={theme} />
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      );
    },
  }),
];

export default preview;
