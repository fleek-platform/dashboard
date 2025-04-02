import Head from 'next/head';

import { getDashboardUrl } from '@/utils/url';

export type LayoutHeadProps = {
  title: string;
  description?: string;
};

const dashboardUrl = getDashboardUrl();

export const LayoutHead = (props: LayoutHeadProps): JSX.Element => {
  const title = `${props.title} - Fleek`;
  const description =
    props.description ??
    'Access and manage your apps or start new projects with the Fleek app. All the tools you need in one seamless workflow. Functions, hosting, storage and more.';
  const image =
    'https://prod-gw.fleekdemos.online/ipfs/bafkreiew7vkryh4nuqv7cby5wnoqrbpahbx5kgtrlxlxbmtyvz7rwtxeta';

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="theme-color" content="" />

      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={dashboardUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={dashboardUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

LayoutHead.titles = {
  home: 'Home',
  login: 'Login',
  project: (projectName: string) => `${projectName}`,
  deploy: (projectName: string) => `Deploy - ${projectName}`,
  site: (siteName?: string) => (siteName ? `Site - ${siteName}` : 'Site'),
  function: (fnName?: string) => (fnName ? `Function - ${fnName}` : 'Function'),
  templates: 'Templates',
  templateCreate: 'Template Creation',
  template: (templateName: string) => `${templateName}`,
  profile: 'Profile',
  maintenance: 'Maintenance',
  migration: 'A new experience awaits',
  notFound: 'Page not found',
  billing: 'Billing',
  billingCheckout: 'Checkout',
  authenticationCallback: 'Completed',
  ipfsPropagation: 'IPFS propagation',
};
