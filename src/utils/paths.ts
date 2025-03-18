import { secrets } from '@/secrets';

const normalizePathname = (pathname: string) =>
  pathname.startsWith('/') && pathname.length > 1
    ? pathname.split('/')[1]
    : pathname;

export const joinBase = (pathname: string) =>
  secrets.NEXT_PUBLIC_BASE_PATH
    ? `${secrets.NEXT_PUBLIC_BASE_PATH}/${normalizePathname(pathname)}`
    : pathname;
