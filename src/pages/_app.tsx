import '@/styles/globals.css';

import LogRocket from 'logrocket';
import Head from 'next/head';
import { useMemo } from 'react';

import { FeedbackModal, ToastsContainer } from '@/components';
import { Maintenance } from '@/fragments';
import { Providers } from '@/providers/Providers';
import { getMutableSecrets, secrets } from '@/secrets';
import { AppContext, AppProps } from '@/types/App';
import { getMaintenanceMode } from '@/utils/getMaintenanceMode';
import { isServerSide } from '@/utils/isServerSide';

const App = ({
  Component,
  pageProps,
  requestCookies,
  maintenanceMode,
  environment,
  noCanonical,
}: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const forcedTheme = Component.theme || undefined;

  useMemo(() => {
    // Initialize client side

    if (secrets.TEST_MODE) {
      // Override secrets with environment variables on test mode
      Object.assign(secrets, environment);

      return;
    }

    LogRocket.init(secrets.NEXT_PUBLIC_UI__LOG_ROCKET_ID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (maintenanceMode) {
    return <Maintenance.Page />;
  }

  return (
    <>
      {!noCanonical && (
        <Head>
          <link rel="canonical" href="https://app.fleek.xyz/" key="canonical" />
        </Head>
      )}
      <Providers requestCookies={requestCookies} forcedTheme={forcedTheme}>
        <h1>{noCanonical}</h1>
        {getLayout(<Component {...pageProps} />)}
        <ToastsContainer />
        <FeedbackModal />
      </Providers>
    </>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  const environment = getMutableSecrets();
  const maintenanceMode = getMaintenanceMode();
  const noCanonical = ['/templates', '/templates/[templateId]'].includes(
    ctx.pathname,
  );

  return {
    pageProps,
    requestCookies: isServerSide() && ctx.req?.cookies,
    maintenanceMode,
    environment,
    noCanonical,
  };
};

export default App;
