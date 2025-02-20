import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { getLinkPartsForSiteSlug, getLinkForSiteSlug } from './siteSlugLinks';

vi.mock('../secrets', () => ({
  secrets: {
    NEXT_PUBLIC_UI__SITE_SLUG_DOMAIN: 'on-fleek.app',
  }
}));

describe('Utils siteSlugLinks', () => {
  it('should return correct link parts for a given slug', () => {
    const result = getLinkPartsForSiteSlug({ slug: 'test' });

    expect(result.protocol).toBe('https://');
    expect(result.slug).toBe('test');
    expect(result.domain).toBe('.on-fleek.app');
    expect(typeof result.getFullLink).toBe('function');
    expect(typeof result.getLinkNoHttps).toBe('function');

    const fullLink = result.getFullLink();
    expect(fullLink).toBe('https://test.on-fleek.app');

    const noHttpsLink = result.getLinkNoHttps();
    expect(noHttpsLink).toBe('test.on-fleek.app');
  });

  it('should return correct link for a given slug', () => {
    const result = getLinkForSiteSlug('test');

    expect(result).toBe('https://test.on-fleek.app');
  });
});
