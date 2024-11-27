import { describe, it, expect } from 'vitest';
import { getLinkPartsForSiteSlug, getLinkForSiteSlug } from './siteSlugLinks';

describe('Utils siteSlugLinks', () => {
  it('should return correct link parts for a given slug', () => {
    const result = getLinkPartsForSiteSlug({ slug: 'test' });

    expect(result.protocol).toBe('https://');
    expect(result.slug).toBe('test');
    expect(result.domain).toBe('.stg.on-fleek-test.app');
    expect(typeof result.getFullLink).toBe('function');
    expect(typeof result.getLinkNoHttps).toBe('function');

    const fullLink = result.getFullLink();
    expect(fullLink).toBe('https://test.stg.on-fleek-test.app');

    const noHttpsLink = result.getLinkNoHttps();
    expect(noHttpsLink).toBe('test.stg.on-fleek-test.app');
  });

  it('should return correct link for a given slug', () => {
    const result = getLinkForSiteSlug('test');

    expect(result).toBe('https://test.stg.on-fleek-test.app');
  });
});
