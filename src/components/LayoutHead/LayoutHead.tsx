import Head from 'next/head';

export type LayoutHeadProps = {
  title: string;
};

export const LayoutHead = ({ title }: LayoutHeadProps): JSX.Element => {
  return (
    <Head>
      <title>{`${title} - Fleek`}</title>
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
  template: (templateName: string) => `Template - ${templateName}`,
  profile: 'Profile',
  maintenance: 'Maintenance',
  migration: 'A new experience awaits',
  notFound: 'Page not found',
  billing: 'Billing',
  billingCheckout: 'Checkout',
  authenticationCallback: 'Completed',
  ipfsPropagation: 'IPFS propagation',
};
