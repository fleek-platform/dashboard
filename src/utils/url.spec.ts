import { describe, expect, it } from 'vitest';

import { getTopLevelDomain } from './url';

describe('getTopLevelDomain', () => {
  it('should extract top level domain from development URL', () => {
    const url = 'https://app.fleeksandbox.xyz';

    expect(getTopLevelDomain(url)).toBe('fleeksandbox.xyz');
  });

  it('should extract top level domain from staging URL', () => {
    const url = 'https://staging.fleeksandbox.xyz';

    expect(getTopLevelDomain(url)).toBe('fleeksandbox.xyz');
  });

  it('should extract top level domain from production URL', () => {
    const url = 'https://app.fleek.xyz';

    expect(getTopLevelDomain(url)).toBe('fleek.xyz');
  });

  it('should work with HTTP URLs', () => {
    const url = 'http://app.fleek.xyz';

    expect(getTopLevelDomain(url)).toBe('fleek.xyz');
  });

  it('should work with URLs containing paths', () => {
    const url = 'https://app.fleek.xyz/some/path';

    expect(getTopLevelDomain(url)).toBe('fleek.xyz');
  });

  it('should work with URLs containing query parameters', () => {
    const url = 'https://app.fleek.xyz?param=value';

    expect(getTopLevelDomain(url)).toBe('fleek.xyz');
  });

  it('should throw error for empty URL', () => {
    expect(() => getTopLevelDomain('')).toThrow('Oops! Invalid URL');
  });

  it('should throw error for invalid URL', () => {
    expect(() => getTopLevelDomain('invalid-url')).toThrow(
      'Oops! Failed to parse the URL',
    );
  });

  it('should work with URLs containing ports', () => {
    const url = 'https://app.fleek.xyz:3000';

    expect(getTopLevelDomain(url)).toBe('fleek.xyz');
  });

  it('should work with longer subdomains', () => {
    const url = 'https://test.dev.app.fleek.xyz';

    expect(getTopLevelDomain(url)).toBe('fleek.xyz');
  });
});
