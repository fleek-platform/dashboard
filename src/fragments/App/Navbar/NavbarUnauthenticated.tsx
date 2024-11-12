import { routes } from '@fleek-platform/utils-routes';

import { ExternalLink, FleekLogo, Link } from '@/components';
import { constants } from '@/constants';
import { Button } from '@/ui';

import { Navbar } from './Navbar';
import { NavbarStyles as S } from './Navbar.styles';

export const NavbarUnauthenticated: React.FC = () => {
  return (
    <Navbar.Container layout="template">
      <Link href={routes.home()}>
        <FleekLogo showTypography />
      </Link>

      <S.LoginAreaContainer>
        <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DOCS}>
          <Button intent="neutral">Read docs</Button>
        </ExternalLink>
        <Navbar.LoginButton title="Sign in" />
      </S.LoginAreaContainer>
    </Navbar.Container>
  );
};
