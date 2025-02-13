'use client';

import '@/styles/globals.css';

import LogRocket from 'logrocket';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { FeedbackModal, ToastsContainer } from '@/components';
import { Maintenance } from '@/fragments';
import { Providers } from '@/providers/Providers';
import { getMutableSecrets, secrets } from '@/secrets';
import { AppProps } from '@/types/App';
import { getMaintenanceMode } from '@/utils/getMaintenanceMode';
import { useRouter } from '@/hooks/useRouter';
import { usePathname } from 'next/navigation';
import { isServerSide } from '@/utils/isServerSide';
import { getQueryParamsToObj } from '@/utils/url';

const App = ({ Component, pageProps, requestCookies }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const forcedTheme = Component.theme || undefined;
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // TODO: Believe this can be removed now
    if (secrets.TEST_MODE) {
      const environment = getMutableSecrets();
      // Override secrets with environment variables on test mode
      Object.assign(secrets, environment);
    } else {
      // TODO: Are we really using log rocket?
      LogRocket.init(secrets.NEXT_PUBLIC_UI__LOG_ROCKET_ID);
    }

    setMaintenanceMode(getMaintenanceMode());
  }, []);

  // TODO: maintenance mode not working
  if (maintenanceMode) {
    return <Maintenance.Page />;
  }

  // Client-side router for page refresh
  // otherwise, single page app will fail to locate pages
  useEffect(() => {
    const search = !isServerSide()
     ? window.location.search
     : '';
    
    const query = getQueryParamsToObj(search);
    
    router.push({
      pathname,
      query,
    });
  }, []);

  // TODO: What is <Head /> setting about?
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={secrets.NEXT_DASHBOARD_WEBSITE_URL}
          key="canonical"
        />
      </Head>
      <Providers requestCookies={requestCookies} forcedTheme={forcedTheme}>
        {getLayout(<Component {...pageProps} />)}
        <ToastsContainer />
        <FeedbackModal />
      </Providers>
    </>
  );
};

export default App;
