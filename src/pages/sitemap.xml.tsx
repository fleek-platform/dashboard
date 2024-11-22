import type { GetServerSideProps } from 'next';

import { type Template, TemplatesDocument } from '@/generated/graphqlClient';
import { createUrqlClient } from '@/integrations';

const buildSitemap = (templates: Template[], baseUrl: string) => {
  const templatesXml = templates
    .map(
      (template) => `<url>
        <loc>${baseUrl}/templates/${template.id}/</loc>
        <lastmod>${template.updatedAt}</lastmod>
        <priority>0.80</priority>
      </url>`,
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

    <url>
        <loc>${baseUrl}/</loc>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${baseUrl}/templates/</loc>
        <priority>0.90</priority>
    </url>
    <url>
        <loc>${baseUrl}/ipfs/</loc>
        <priority>0.90</priority>
    </url>
    ${templatesXml}
    </urlset>`;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { res, req } = ctx;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const client = createUrqlClient({ logout: () => {} });
  const result = await client
    .query(TemplatesDocument, {
      where: {},
    })
    .toPromise();

  if (result.error) {
    console.error(result.error);

    return {
      notFound: true,
    };
  }

  const templates = result.data.templates.data;

  res.setHeader('Content-Type', 'text/xml');
  res.write(buildSitemap(templates, baseUrl));
  res.end();

  return {
    props: {},
  };
};

const Sitemap = () => {
  return <></>;
};

export default Sitemap;
