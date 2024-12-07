import { ChildrenProps } from '@/types/Props';

import { CookiesContext, CookiesProvider } from './CookiesProvider';
import { DynamicProvider } from './DynamicProvider';
import { FeedbackModalProvider } from './FeedbackModalProvider';
import { LogRocketProvider } from './LogRocketProvider';
import { QueryClientProvider } from './QueryClientProvider';
import { SessionProvider } from './SessionProvider';
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
    <ToastProvider>
      <CookiesProvider requestCookies={requestCookies}>
        <UrqlProvider>
          <DynamicProvider>
            <LogRocketProvider>
              <QueryClientProvider>
                <SessionProvider>
                  <WagmiProvider>
                    <ThemeProvider forcedTheme={forcedTheme}>
                      <UploadProvider>
                        <FeedbackModalProvider>
                          {children}
                        </FeedbackModalProvider>
                      </UploadProvider>
                    </ThemeProvider>
                  </WagmiProvider>
                </SessionProvider>
              </QueryClientProvider>
            </LogRocketProvider>
          </DynamicProvider>
        </UrqlProvider>
      </CookiesProvider>
    </ToastProvider>
  );
};
