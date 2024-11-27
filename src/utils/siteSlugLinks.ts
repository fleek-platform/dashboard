import { secrets } from '@/secrets';

export type LinkParts = {
  protocol: string;
  slug: string;
  domain: string;
  getFullLink: () => string;
  getLinkNoHttps: () => string;
};

type GetLinkPartsForSiteSlugArgs = {
  slug: string;
};

export const getLinkPartsForSiteSlug = ({ slug }: GetLinkPartsForSiteSlugArgs): LinkParts => {
  const protocol = 'https://';
  const domain = `.${secrets.NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN}`;

  return {
    protocol,
    slug,
    domain,
    getFullLink: () => `${protocol}${slug}${domain}`,
    getLinkNoHttps: () => `${slug}${domain}`,
  };
};

export const getLinkForSiteSlug = (slug: string): string => {
  return getLinkPartsForSiteSlug({ slug }).getFullLink() || '';
};
