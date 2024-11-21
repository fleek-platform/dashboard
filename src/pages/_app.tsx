// pages/_app.tsx
import '@/styles/globals.css';

import LogRocket from 'logrocket';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { Auth } from '@/components/Auth';
import { FeedbackModal, ToastsContainer } from '@/components';
import { Maintenance } from '@/fragments';
import { Providers } from '@/providers/Providers';
import { getMutableSecrets, secrets } from '@/secrets';
import { AppProps } from '@/types/App';
import { getMaintenanceMode } from '@/utils/getMaintenanceMode';

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const forcedTheme = Component.theme || undefined;
  const [noCanonical, setNoCanonical] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    if (secrets.TEST_MODE) {
      const environment = getMutableSecrets();
      Object.assign(secrets, environment);
    } else {
      LogRocket.init(secrets.NEXT_PUBLIC_UI__LOG_ROCKET_ID);
    }

    setMaintenanceMode(getMaintenanceMode());

    const pathname = window.location.pathname;
    setNoCanonical(['/templates', '/templates/[templateId]'].includes(pathname));
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
      <Providers forcedTheme={forcedTheme}>
        <Auth>
          {getLayout(<Component {...pageProps} />)}
          <ToastsContainer />
          <FeedbackModal />
        </Auth>
      </Providers>
    </>
  );
};

export default App;
