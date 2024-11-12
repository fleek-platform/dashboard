import { AppStyles as S } from './App.styles';
import { Footer } from './Footer/Footer';
import { DeployBreadcrumb } from './Navbar/Breadcrumbs/DeploymentBreadcrumb';
import { FunctionBreadcrumb } from './Navbar/Breadcrumbs/FunctionBreadcrumb';
import { SiteBreadcrumb } from './Navbar/Breadcrumbs/SiteBreadcrumb';
import { NavbarCombined } from './Navbar/NavbarCombined';
import { NavbarMaintenance } from './Navbar/NavbarMaintenance';
import { NavbarProject } from './Navbar/NavbarProject';
import { NavbarUnauthenticated } from './Navbar/NavbarUnauthenticated';

export const App = {
  // fragments
  Content: S.Content,
  Navbar: {
    Project: NavbarProject,
    Unauthenticated: NavbarUnauthenticated,
    Combined: NavbarCombined,
    Breadcrumbs: {
      Site: SiteBreadcrumb,
      Deployment: DeployBreadcrumb,
      Function: FunctionBreadcrumb,
    },
    Maintenance: NavbarMaintenance,
  },
  Footer,
};
