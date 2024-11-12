import { FleekLogo } from '@/components';

import { Navbar } from '../Navbar/Navbar';

export const NavbarMaintenance: React.FC = () => {
  return (
    <Navbar.Container layout="app">
      <FleekLogo showTypography />
    </Navbar.Container>
  );
};
