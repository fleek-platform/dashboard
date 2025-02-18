import { isServerSide } from '@/utils/isServerSide';

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

export const getQueryParamsToObj = (search: string) => {
  const searchParams = !isServerSide() ? new URLSearchParams(search) : [];
  const query: Record<string, string> = {};
  for (const [key, value] of searchParams) {
    query[key] = value;
  }
  return query;
};
