import { isServerSide } from '@/utils/isServerSide';
import { getDefined } from '../defined';

export const getTopLevelDomain = (url: string) => {
  if (!url) {
    // eslint-disable-next-line fleek-custom/no-default-error
    throw Error('Oops! Invalid URL');
  }

  try {
    const { hostname } = new URL(url);

    // Only expected hostnames have max 3 levels
    // during the time of writing, e.g.:
    // development -> app.fleeksandbox.xyz
    // staging -> staging.fleeksandbox.xyz
    // production -> app.fleek.xyz
    const topLevelDomain = hostname.split('.').slice(-2).join('.');

    return topLevelDomain;
  } catch (e) {
    // eslint-disable-next-line fleek-custom/no-default-error
    throw Error('Oops! Failed to parse the URL');
  }
};

export const joinUrl = (
  base: string,
  segment: string | undefined,
  omitTrailingSlash = false,
): string | '' => {
  try {
    if (typeof base !== 'string' || !base.startsWith('http')) {
      console.error(`Invalid base URL: ${base}`);

      return '';
    }

    const cleanedBase = removeLeadingAndTrailingSlashes(base);
    const baseWithTrailingSlash = cleanedBase + '/';

    if (typeof segment !== 'string' || segment.trim() === '') {
      console.warn(`Invalid URL segment detected: ${segment}`);

      const finalBase = omitTrailingSlash ? cleanedBase : baseWithTrailingSlash;

      return new URL(finalBase).toString();
    }

    const cleanedSegment = removeLeadingAndTrailingSlashes(segment);
    const segmentWithTrailingSlash = cleanedSegment + '/';
    const finalSegment = omitTrailingSlash
      ? cleanedSegment
      : segmentWithTrailingSlash;

    // base must have trailing slash for correct segment concatenation
    return new URL(finalSegment, baseWithTrailingSlash).toString();
  } catch (error) {
    console.error('Error constructing URL:', error);

    return '';
  }
};

/** Removes leading or trailing slash or both. */
export const removeLeadingAndTrailingSlashes = (segment: string) =>
  segment.replace(/^\/+|\/+$/g, '');

const excludeQueryValues = ['[projectId]'];

export const getQueryParamsToObj = (search: string) => {
  const searchParams = !isServerSide() ? new URLSearchParams(search) : [];
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    if (excludeQueryValues.includes(value)) continue;

    query[key] = value;
  }
  return query;
};

export const websiteUrl = getDefined('NEXT_PUBLIC_WEBSITE_URL');
export const dashboardUrl = joinUrl(websiteUrl, getDefined('NEXT_PUBLIC_DASHBOARD_BASE_PATH'));
export const agentsUrl = joinUrl(websiteUrl, getDefined('NEXT_PUBLIC_AGENTS_AI_PATH'));
