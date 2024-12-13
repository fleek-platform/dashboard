import { routes } from '@fleek-platform/utils-routes';
import { useEffect } from 'react';

import { FleekLogo, LayoutHead, Link } from '@/components';
import { constants } from '@/constants';
import { useSessionContext } from '@/providers/SessionProvider';

import { App } from '../App/App';
import { Navbar } from '../App/Navbar/Navbar';

export type Layout = React.PropsWithChildren<{
  nav?: React.ReactNode | React.ReactNode[];
}>;

export const Layout: React.FC<Layout> = ({ children }) => {
  const { error, auth: { login, accessToken }, loading } = useSessionContext();

  const handleLogIn = () => {
    if (!error && !loading && !accessToken) {
      login('dynamic', routes.migration());
    }
  };

  useEffect(() => {
    handleLogIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (accessToken) {
    return (
      <>
        <LayoutHead title={LayoutHead.titles.migration} />
        <App.Navbar.Project />
        <App.Content disableGap>{children}</App.Content>
        <App.Footer />
      </>
    );
  }

  return (
    <>
      <LayoutHead title={LayoutHead.titles.migration} />
      <Navbar.Container layout="template">
        <Link href={constants.EXTERNAL_LINK.FLEEK_HOME}>
          <FleekLogo showTypography />
        </Link>
        <Navbar.LoginButton title="Login to Migrate" />
      </Navbar.Container>
      <App.Content disableGap>{children}</App.Content>
      <App.Footer />
    </>
  );
};
