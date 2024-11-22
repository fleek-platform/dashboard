import fs from 'fs';
import path from 'path';
import { type Template, TemplatesDocument } from '../src/generated/graphqlClient';
import { createUrqlClient } from '../src/integrations';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const DIST_PATH = 'out';

const buildSitemap = (templates: Template[]) => {
  const templatesXml = templates
    .map(
      (template) => `<url>
        <loc>${SITE_URL}/templates/${template.id}/</loc>
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
        <loc>${SITE_URL}/</loc>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>${SITE_URL}/templates/</loc>
        <priority>0.90</priority>
    </url>
    <url>
        <loc>${SITE_URL}/ipfs/</loc>
        <priority>0.90</priority>
    </url>
    ${templatesXml}
    </urlset>`;
};

const generateSitemap = async () => {
  try {
    const client = createUrqlClient({ logout: () => {} });
    const result = await client
      .query(TemplatesDocument, {
        where: {},
      })
      .toPromise();

    if (result.error) {
      throw result.error;
    }

    const templates = result.data.templates.data;
    const sitemap = buildSitemap(templates);

    const distPath = path.join(process.cwd(), DIST_PATH);
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }

    fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
