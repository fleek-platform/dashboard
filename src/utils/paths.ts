import { secrets } from '@/secrets';

export const joinBase = (pathname: string) =>
  secrets.NEXT_PUBLIC_BASE_PATH
    ? `${secrets.NEXT_PUBLIC_BASE_PATH}/${pathname}`
    : pathname;
