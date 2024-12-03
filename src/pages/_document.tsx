import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { secrets } from '@/secrets';
import { getCssText } from '@/theme';

const Document = () => (
  <Html>
    <Head>
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} /> {/* Usage for SSR */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
       (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
       new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
       j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
       'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
       })(window,document,'script','dataLayer','${secrets.NEXT_PUBLIC_UI__GTM_ID}');
      `}
      </Script>
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
