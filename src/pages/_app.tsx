'use client'

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
import IpfsPage from '@/pages/ipfs';
import { useRouter } from '@/hooks/useRouter';
import { usePathname } from 'next/navigation';

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

  console.log(`[debug] _app.tsx: router.pathname = ${router.pathname}, pathname = ${pathname}`)

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
        <Auth>
          {
            pathname && pathname.startsWith('/ipfs')
            ? getLayout(<IpfsPage {...pageProps} />)
            : getLayout(<Component {...pageProps} />)
          }
          <ToastsContainer />
          <FeedbackModal />
        </Auth>
      </Providers>
    </>
  );

  // return (
  //   <>
  //     {!noCanonical && (
  //       <Head>
  //         <link
  //           rel="canonical"
  //           href={secrets.NEXT_DASHBOARD_WEBSITE_URL}
  //           key="canonical"
  //         />
  //       </Head>
  //     )}
  //     <Providers requestCookies={requestCookies} forcedTheme={forcedTheme}>
  //       <Auth>
  //         {
  //           pathname && pathname.startsWith('/ipfs')
  //           ? getLayout(<IpfsPage {...pageProps} />)
  //           : getLayout(<Component {...pageProps} />)
  //         }
  //         <ToastsContainer />
  //         <FeedbackModal />
  //       </Auth>
  //     </Providers>
  //   </>
  // );

  // return (
  //   <>
  //     {!noCanonical && (
  //       <Head>
  //         <link
  //           rel="canonical"
  //           href={secrets.NEXT_DASHBOARD_WEBSITE_URL}
  //           key="canonical"
  //         />
  //       </Head>
  //     )}
  //     <Providers requestCookies={requestCookies} forcedTheme={forcedTheme}>
  //       <Auth>
  //         {
  //           getLayout(<IpfsPage {...pageProps} />)
  //         }
  //         <ToastsContainer />
  //         <FeedbackModal />
  //       </Auth>
  //     </Providers>
  //   </>
  // );
};

export default App;
