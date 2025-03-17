import { ChildrenProps } from '@/types/Props';

import { CookiesContext, CookiesProvider } from './CookiesProvider';
import { DynamicProvider } from './DynamicProvider';
import { FeedbackModalProvider } from './FeedbackModalProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { SessionProvider, SessionProviderMin } from './SessionProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { UploadProvider } from './UploadProvider';
import { UrqlProvider } from './UrqlProvider';
import { WagmiProvider } from './WagmiProvider';

type ProvidersProps = ChildrenProps<{
  requestCookies?: CookiesContext['values'];
  forcedTheme?: string;
}>;

export const Providers: React.FC<ProvidersProps> = ({
  children,
  requestCookies,
  forcedTheme,
}) => {
  return (
    <CookiesProvider requestCookies={requestCookies}>
      <UrqlProvider>
        <DynamicProvider>
          <QueryClientProvider>
            <WagmiProvider>
              <ThemeProvider forcedTheme={forcedTheme}>
                <ToastProvider>
                  <SessionProvider>
                    <UploadProvider>
                      <FeedbackModalProvider>
                        {children}
                      </FeedbackModalProvider>
                    </UploadProvider>
                  </SessionProvider>
                </ToastProvider>
              </ThemeProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </DynamicProvider>
      </UrqlProvider>
    </CookiesProvider>
  );
};

export const LandingPageProvider: React.FC<ProvidersProps> = ({
  children,
  forcedTheme,
}) => (
  <CookiesProvider>
    <UrqlProvider>
      <QueryClientProvider>
        <ThemeProvider forcedTheme={forcedTheme}>
          <DynamicProvider>
            <SessionProviderMin>{children}</SessionProviderMin>
          </DynamicProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </UrqlProvider>
  </CookiesProvider>
);
