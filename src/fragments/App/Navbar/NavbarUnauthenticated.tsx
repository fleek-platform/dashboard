import { routes } from '@fleek-platform/utils-routes';

import { ExternalLink, FleekLogo, Link } from '@/components';
import { constants } from '@/constants';
import { Box, Button } from '@/ui';

import { Navbar } from './Navbar';

export const NavbarUnauthenticated: React.FC = () => {
  return (
    <Navbar.Container layout="template">
      <Link href={routes.home()}>
        <FleekLogo showTypography />
      </Link>

      <Box className="flex-row gap-3 [grid-area:login]">
        <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DOCS}>
          <Button intent="neutral">Read docs</Button>
        </ExternalLink>
        <Navbar.LoginButton title="Sign in" />
      </Box>
    </Navbar.Container>
  );
};
