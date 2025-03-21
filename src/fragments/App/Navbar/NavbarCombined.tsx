import { useSessionContext } from '@/providers/SessionProvider';

import { NavbarProject } from './NavbarProject';
import { NavbarUnauthenticated } from './NavbarUnauthenticated';

export const NavbarCombined: React.FC = () => {
  const session = useSessionContext(true);

  if (session.loading || session.auth.accessToken) {
    return <NavbarProject />;
  }

  return <NavbarUnauthenticated />;
};
