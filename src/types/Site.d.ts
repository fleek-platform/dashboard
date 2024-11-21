import type {
  SiteFrameworksQuery,
  SiteQuery,
  SitesQuery,
} from '@/generated/graphqlClient';

export type Site = SiteQuery['site'];

export type SiteListItem = SitesQuery['sites']['data'][0];

export type SiteDomain = Site['domains'][0];

export type SiteIPNSRecord = Site['ipnsRecords'][0];

export type SiteENSRecord = Site['ipnsRecords'][0]['ensRecords'][0];

export type SiteFramework = SiteFrameworksQuery['siteFrameworks'][0];

export type SiteSourceProvider = GitProvider.Name | 'self';

export type SiteConfig = {
  slug: string;
  distDir: string;
  buildCommand?: string;
};

export type FleekRootConfig = {
  sites: FleekSiteConfig[];
};

export type SiteSecret = NonNullable<
  SiteQuery['site']['secretGroup']
>['secrets'][0];

export type SiteNewSecret = {
  key: string;
  value: string;
  encrypted: boolean;
};
