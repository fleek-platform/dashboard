import { useEffect } from 'react';

import { Home } from '@/fragments/Home/Home';
import { App } from '../../fragments/App/App';
import { HomeStyles } from '../../fragments/Home/HomeStyles';
import { LayoutHead } from '@/components';
import { LandingPageProvider } from '@/providers/Providers';
import { useAuthContext } from '../../providers/AuthProvider';

import { Navbar } from '../../fragments/App/Navbar/Navbar';
import { Box, Button } from '@/ui';
import { ExternalLink, FleekLogo, Link } from '@/components';
import { routes } from '@fleek-platform/utils-routes';
import { constants } from '@/constants';

const LoginButton = ({ title, handleLogIn }) => (
  <Button onClick={handleLogIn}>
    {title}
  </Button>
);

const HomePage = () => {
  const auth = useAuthContext();

  const handleLogIn = () => {
    auth.login('dynamic');
  };

  useEffect(() => {
    handleLogIn();
  }, []);

  return (
    <LandingPageProvider>
      <LayoutHead title={LayoutHead.titles.home} />
       <Navbar.Container layout="template">
         <Link href={routes.home()}>
           <FleekLogo showTypography />
         </Link>

         <Box className="flex-row gap-3 [grid-area:login]">
           <ExternalLink href={constants.EXTERNAL_LINK.FLEEK_DOCS}>
             <Button intent="neutral">Read docs</Button>
           </ExternalLink>
           <LoginButton title="Sign in" handleLogIn={handleLogIn} />
         </Box>
       </Navbar.Container>

      <HomeStyles.Background.Wrapper>
        <HomeStyles.Background.Image />
        <App.Content>
          <Home.Sections.Hero handleLogIn={handleLogIn} />
        </App.Content>
      </HomeStyles.Background.Wrapper>
      <App.Footer />
    </LandingPageProvider>
  )
};

HomePage.theme = 'dark';

export default HomePage;
