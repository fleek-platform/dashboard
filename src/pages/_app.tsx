'use client';

import '@/styles/globals.css';

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
import { LegacyPlanUpgradeModal } from '@/components/LegacyPlanUpgradeModal/LegacyPlanUpgradeModal';
import { LoadingFullScreen } from '@/components/Loading';
import { setDefined, getDefined, DEFINED_OVERRIDES_FILENAME } from '../defined';
import { websiteUrl } from '@/utils/url';

const App = ({ Component, pageProps, requestCookies }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const forcedTheme = Component.theme || undefined;
  const [noCanonical, setNoCanonical] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated =
    !isServerSide() && typeof cookies.get('accessToken') !== 'undefined';

  useEffect(() => {
    const loadConfig = async () => {
      console.log('[debug] _app.tsx: 1')
      const overridesJson = `${getDefined('NEXT_PUBLIC_DASHBOARD_BASE_PATH')}/${DEFINED_OVERRIDES_FILENAME}`;
      console.log(`[debug] _app.tsx: overridesJson = ${overridesJson}`);

      try {
        const response = await fetch(overridesJson);

        if (!response.ok) {
          throw new Error(`Failed to load config: ${response.status}`);
        }
        const config = await response.json();

      console.log(`[debug] _app.tsx: config:`, JSON.stringify(config));

        setDefined(config);

        if (secrets.TEST_MODE) {
          const environment = getMutableSecrets();
          Object.assign(secrets, environment);
        }

        setMaintenanceMode(getMaintenanceMode());
        setIsConfigLoaded(true);
      } catch (error) {
        console.warn(`Couldn\'t find ${overridesJson}`, error);
      } finally {
        setIsConfigLoaded(true);
      }
    };

    loadConfig();

    const pathname = window.location.pathname;
    setNoCanonical(
      ['/templates', '/templates/[templateId]'].includes(pathname),
    );
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // TODO: replace by useSearchParams
    const search = window.location.search;
    const query = getQueryParamsToObj(search);
    router.push({
      pathname,
      query,
    });
  }, []);

  useEffect(() => {
    if (
      !isServerSide() &&
      !isAuthenticated &&
      !secrets.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN &&
      isConfigLoaded
    ) {
      const currentParams = new URLSearchParams(window.location.search);
      const targetUrl = new URL(websiteUrl);

      currentParams.forEach((value, key) => {
        targetUrl.searchParams.append(key, value);
      });

      window.location.assign(targetUrl.toString());
    }
  }, [isAuthenticated, isConfigLoaded]);

  if (!isConfigLoaded) {
    return <LoadingFullScreen />;
  }

  if (maintenanceMode) {
    return <Maintenance.Page />;
  }

  if (!isAuthenticated) {
    if (secrets.NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN) {
      return (
        <LandingPageProvider forcedTheme={forcedTheme}>
          <HomePage />
        </LandingPageProvider>
      );
    }

    const currentParams = new URLSearchParams(window.location.search);

    const targetUrl = new URL(websiteUrl);

    currentParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    console.log(`[debug] _app.tsx: targetUrl = ${targetUrl}`);

    window.location.assign(targetUrl.toString());

    return <></>;
  }

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <Providers requestCookies={requestCookies} forcedTheme={forcedTheme}>
        {getLayout(<Component {...pageProps} />)}
        <ToastsContainer />
        <FeedbackModal />
        <LegacyPlanUpgradeModal />
      </Providers>
    </>
  );
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
