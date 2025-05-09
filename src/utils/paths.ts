import { getDefined } from '@/defined';

const normalizePathname = (pathname: string) => {
  const [path, query] = pathname.split('?');

  const segments = path.split('/').filter(Boolean);

  const normalizedPath = pathname.startsWith('/')
    ? '/' + segments.join('/')
    : segments.join('/');

  return query ? `${normalizedPath}?${query}` : normalizedPath;
};

export const joinBase = (pathname: string) => {
  if (!getDefined('NEXT_PUBLIC_DASHBOARD_BASE_PATH')) {
    return normalizePathname(pathname);
  }

  const normalizedBase = normalizePathname(
    getDefined('NEXT_PUBLIC_DASHBOARD_BASE_PATH'),
  );
  const normalizedPath = normalizePathname(pathname);

  const pathWithoutLeadingSlash = normalizedPath.startsWith('/')
    ? normalizedPath.substring(1)
    : normalizedPath;

  return (
    normalizedBase +
    (pathWithoutLeadingSlash ? '/' + pathWithoutLeadingSlash : '')
  );
};
