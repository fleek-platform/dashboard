import { useSessionContext } from '@/providers/SessionProvider';

import { NavbarProject } from './NavbarProject';
import { NavbarUnauthenticated } from './NavbarUnauthenticated';

export const NavbarCombined: React.FC = () => {
  const { loading, auth: { accessToken } } = useSessionContext(true);

  if (loading || accessToken) {
    return <NavbarProject />;
  }

  return <NavbarUnauthenticated />;
};
