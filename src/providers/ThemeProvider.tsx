import { IBM_Plex_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { themeGlobals, themes } from '@/theme';
import { ChildrenProps } from '@/types/Props';

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-plex',
  weight: ['400', '500', '700'],
});

const atyp = localFont({
  src: [
    {
      path: '../../public/fonts/atyp/AtypDisplay-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../../public/fonts/atyp/AtypDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atyp/AtypDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atyp/AtypDisplay-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atyp/AtypDisplay-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../../public/fonts/atyp/AtypDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/atyp/AtypDisplay-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-atyp',
});

const ThemeMetadataSetter = (): null => {
  const { resolvedTheme } = useNextTheme();

  useEffect(() => {
    if (resolvedTheme === 'light' || resolvedTheme === 'dark') {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themes[resolvedTheme].colors.foreground.value);
      document.documentElement.dataset.theme = resolvedTheme;
    }
  }, [resolvedTheme]);

  return null;
};

type ThemeProviderProps = ChildrenProps<{
  forcedTheme?: string;
}>;

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, forcedTheme }) => {
  themeGlobals();

  return (
    <NextThemesProvider
      disableTransitionOnChange
      attribute="class"
      value={{ light: themes.light.className, dark: themes.dark.className }}
      defaultTheme="dark"
      forcedTheme={forcedTheme}
      enableSystem
    >
      <style jsx global>{`
        html {
          font-family: ${atyp.style.fontFamily};
          font-family: ${plex.style.fontFamily};
        }
      `}</style>
      <ThemeMetadataSetter />
      {children}
    </NextThemesProvider>
  );
};

export type ThemeHook = Partial<
  {
    toggleTheme: () => void;
    constants: typeof themes.light;
  } & ReturnType<typeof useNextTheme>
>;

// With fix to prevent no theme in SSR
export const useTheme = (): ThemeHook => {
  const [isMounted, setMounted] = useState(false);
  const nextTheme = useNextTheme();
  const { theme, setTheme } = nextTheme;

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return {};
  }

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // light theme has all the constants
  const constants = theme === 'light' ? themes.light : Object.assign({}, themes.light, themes.dark);

  return Object.assign({}, nextTheme, { toggleTheme, constants });
};
