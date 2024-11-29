import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { secrets } from '@/secrets';
import { getCssText } from '@/theme';

const Document = () => (
  <Html>
    <Head>
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />{' '}
      {/* Usage for SSR */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
       new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
       'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
       })(window,document,'script','dataLayer','${secrets.NEXT_PUBLIC_UI__GTM_ID}');
      `}
      </Script>
      <meta name="theme-color" content="" />
      <meta name="title" content="Dashboard | Fleek App" />
      <meta
        name="description"
        content="Access and manage your apps or start new projects with the Fleek app. All the tools you need in one seamless workflow. Functions, hosting, storage and more."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={secrets.NEXT_DASHBOARD_WEBSITE_URL} />
      <meta property="og:title" content="Dashboard | Fleek App" />
      <meta
        property="og:description"
        content="Access and manage your apps or start new projects with the Fleek app. All the tools you need in one seamless workflow. Functions, hosting, storage and more."
      />
      <meta
        property="og:image"
        content="https://prod-gw.fleekdemos.online/ipfs/bafkreiew7vkryh4nuqv7cby5wnoqrbpahbx5kgtrlxlxbmtyvz7rwtxeta"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={secrets.NEXT_DASHBOARD_WEBSITE_URL}
      />
      <meta property="twitter:title" content="Dashboard | Fleek App" />
      <meta
        property="twitter:description"
        content="Access and manage your apps or start new projects with the Fleek app. All the tools you need in one seamless workflow. Functions, hosting, storage and more."
      />
      <meta
        property="twitter:image"
        content="https://prod-gw.fleekdemos.online/ipfs/bafkreiew7vkryh4nuqv7cby5wnoqrbpahbx5kgtrlxlxbmtyvz7rwtxeta"
      />
    </Head>
    <body>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${secrets.NEXT_PUBLIC_UI__GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;" />`,
        }}
      />
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
