'use client';

import '@/styles/globals.css';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { FeedbackModal, ToastsContainer } from '@/components';
import { Providers, LandingPageProvider } from '@/providers/Providers';
import { AppProps } from '@/types/App';
import { useRouter } from '@/hooks/useRouter';
import { usePathname } from 'next/navigation';
import { isServerSide } from '@/utils/isServerSide';
import { getDashboardUrl, getQueryParamsToObj } from '@/utils/url';
// TODO: Rename the util as `cookies` (plural)
import { cookies } from '@/utils/cookie';
import HomePage from '@/pages/LandingPage';
import { LegacyPlanUpgradeModal } from '@/components/LegacyPlanUpgradeModal/LegacyPlanUpgradeModal';
import { LoadingFullScreen } from '@/components/Loading';
import { setDefined, getDefined, DEFINED_OVERRIDES_FILENAME } from '../defined';
import { ShutdownBanner } from '@/components/ShutdownBanner';

const loadConfig = async (): Promise<boolean> => {
  const dashboardBasePath = getDashboardUrl();
  const overridesJson = `${dashboardBasePath}/${DEFINED_OVERRIDES_FILENAME}`;

  try {
    const response = await fetch(overridesJson);

    if (!response.ok) {
      throw new Error(`Failed to load config: ${response.status}`);
    }
    const config = await response.json();

    setDefined(config);
  } catch (error) {
    console.warn(`Couldn\'t find ${overridesJson}`, error);
  }

  return true;
};

const App = ({ Component, pageProps, requestCookies }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  const forcedTheme = Component.theme || undefined;
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated =
    !isServerSide() && typeof cookies.get('accessToken') !== 'undefined';

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
      !getDefined('NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN')
    ) {
      const currentParams = new URLSearchParams(window.location.search);
      const targetUrl = new URL(getDashboardUrl());

      currentParams.forEach((value, key) => {
        targetUrl.searchParams.append(key, value);
      });

      window.location.assign(targetUrl.toString());
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    if (getDefined('NEXT_PUBLIC_ALLOW_LANDING_PAGE_LOGIN')) {
      return (
        <LandingPageProvider forcedTheme={forcedTheme}>
          <HomePage />
        </LandingPageProvider>
      );
    }

    const currentParams = new URLSearchParams(window.location.search);

    const targetUrl = new URL(getDashboardUrl());

    currentParams.forEach((value, key) => {
      targetUrl.searchParams.append(key, value);
    });

    window.location.assign(targetUrl.toString());

    return <></>;
  }

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <ShutdownBanner />
      <Providers requestCookies={requestCookies} forcedTheme={forcedTheme}>
        {getLayout(<Component {...pageProps} />)}
        <ToastsContainer />
        <FeedbackModal />
        <LegacyPlanUpgradeModal />
      </Providers>
    </>
  );
};

export default dynamic<AppProps>(
  async () => {
    await loadConfig();

    return App;
  },
  {
    ssr: false,
    loading: () => <LoadingFullScreen />,
  },
);
