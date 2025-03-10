'use client';

import '@/styles/globals.css';

import LogRocket from 'logrocket';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import { FeedbackModal, ToastsContainer } from '@/components';
import { Maintenance } from '@/fragments';
import { Providers, LandingPageProvider } from '@/providers/Providers';
import { getMutableSecrets, secrets } from '@/secrets';
import { AppProps } from '@/types/App';
import { getMaintenanceMode } from '@/utils/getMaintenanceMode';
import { useRouter } from '@/hooks/useRouter';
import { usePathname } from 'next/navigation';
import { isServerSide } from '@/utils/isServerSide';
import { getQueryParamsToObj } from '@/utils/url';
// TODO: Rename the util as `cookies` (plural)
import { cookies } from '@/utils/cookie';
import HomePage from '@/pages/LandingPage';

const App = ({ Component, pageProps, requestCookies }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const forcedTheme = Component.theme || undefined;
  const [noCanonical, setNoCanonical] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (secrets.TEST_MODE) {
      const environment = getMutableSecrets();
      // Override secrets with environment variables on test mode
      Object.assign(secrets, environment);
    } else {
      LogRocket.init(secrets.NEXT_PUBLIC_UI__LOG_ROCKET_ID);
    }

    setMaintenanceMode(getMaintenanceMode());

    const pathname = window.location.pathname;
    setNoCanonical(
      ['/templates', '/templates/[templateId]'].includes(pathname),
    );
  }, []);

  // TODO: maintenance mode not working
  if (maintenanceMode) {
    return <Maintenance.Page />;
  }

  // Client-side router for page refresh
  // otherwise, single page app will fail to locate pages
  useEffect(() => {
    const search = !isServerSide() ? window.location.search : '';

    const query = getQueryParamsToObj(search);
    router.push({
      pathname,
      query,
    });
  }, []);

  const isAuthenticated =
    !isServerSide() && typeof cookies.get('accessToken') !== 'undefined';

  if (!isAuthenticated) {
    if (secrets.NEXT_ALLOW_LANDING_PAGE_LOGIN) {
      return (
        <LandingPageProvider forcedTheme={forcedTheme}>
          <HomePage />
        </LandingPageProvider>
      );
    }

    window.location.href = secrets.NEXT_PUBLIC_WEBSITE_URL;

    return <></>;
  }

  return (
    <>
      {!noCanonical && (
        <Head>
          <link
            rel="canonical"
            href={secrets.NEXT_DASHBOARD_WEBSITE_URL}
            key="canonical"
          />
        </Head>
      )}
      <Providers requestCookies={requestCookies} forcedTheme={forcedTheme}>
        {getLayout(<Component {...pageProps} />)}
        <ToastsContainer />
        <FeedbackModal />
      </Providers>
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
