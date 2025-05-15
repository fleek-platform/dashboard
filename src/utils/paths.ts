import { getDefined } from '@/defined';
import { getDashboardUrl } from './url';

const normalizePathname = (pathname: string) => {
  const [path, query] = pathname.split('?');

  const segments = path.split('/').filter(Boolean);

  const normalizedPath = pathname.startsWith('/')
    ? `/${segments.join('/')}`
    : segments.join('/');

  return query ? `${normalizedPath}?${query}` : normalizedPath;
};

export const joinBase = (pathname: string) => {
  const dashboardBasePath = getDashboardUrl();
  if (!dashboardBasePath) {
    return normalizePathname(pathname);
  }

  const normalizedBase = normalizePathname(dashboardBasePath);
  const normalizedPath = normalizePathname(pathname);

  const pathWithoutLeadingSlash = normalizedPath.startsWith('/')
    ? normalizedPath.substring(1)
    : normalizedPath;

  return (
    normalizedBase +
    (pathWithoutLeadingSlash ? `/${pathWithoutLeadingSlash}` : '')
  );
};
