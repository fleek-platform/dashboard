import { isServerSide } from '@/utils/isServerSide';
import { getTopLevelDomain } from '@/utils/url';

// We must specify the domain where the cookie is available
// to allow it to work cross-domain
// https://nextjs.org/docs/app/api-reference/functions/cookies#options
// OBS: The application fails to provide enviroment hostname settings. Thus, using the runtime URL but this can change in the future.
export const hostname = !isServerSide() ? getTopLevelDomain(window.location.href) : '';
