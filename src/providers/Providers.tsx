import { ChildrenProps } from '@/types/Props';

import { CookiesContext, CookiesProvider } from './CookiesProvider';
import { DynamicProvider } from './DynamicProvider';
import { FeedbackModalProvider } from './FeedbackModalProvider';
import { LaunchDarklyProvider } from './LaunchDarklyProvider';
import { LogRocketProvider } from './LogRocketProvider';
import { PHProvider } from './PHProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { SessionProvider } from './SessionProvider';
import { ThemeProvider } from './ThemeProvider';
import { ToastProvider } from './ToastProvider';
import { UploadProvider } from './UploadProvider';
import { UrqlProvider } from './UrqlProvider';
import { WagmiProvider } from './WagmiProvider';
import { AuthProvider } from './AuthProvider';

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
      <QueryClientProvider>
        <PHProvider>
          <AuthProvider>
            <UrqlProvider>
              <LaunchDarklyProvider>
                <LogRocketProvider>
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
                </LogRocketProvider>
              </LaunchDarklyProvider>
            </UrqlProvider>
          </AuthProvider>
        </PHProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
};
