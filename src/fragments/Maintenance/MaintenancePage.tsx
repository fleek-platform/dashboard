import { ExternalLink, FleekLogoDotted, LayoutHead } from '@/components';
import { constants } from '@/constants';
import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import type { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

import { App } from '../App/App';
import { MaintenancePageStyles as S } from './MaintenancePage.styles';

export const MaintenancePage: React.FC = () => {
  return (
    <Providers>
      <Layout>
        <S.LogoContainer>
          <FleekLogoDotted />
        </S.LogoContainer>
        <Text as="h1">Sorry, we&apos;re down for maintenance</Text>
        <Text>
          We&apos;ll be back up shortly. Check our&nbsp;
          <ExternalLink
            href={constants.EXTERNAL_LINK.FLEEK_DISCORD}
            variant="accent"
          >
            Discord
          </ExternalLink>
          &nbsp;or&nbsp;
          <ExternalLink
            href={constants.EXTERNAL_LINK.FLEEK_TWITTER}
            variant="accent"
          >
            X
          </ExternalLink>
          &nbsp;for updates.
        </Text>
      </Layout>
    </Providers>
  );
};

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.maintenance} />

      <App.Navbar.Maintenance />
      <S.Container>{children}</S.Container>
      <App.Footer />
    </>
  );
};

const Providers: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};
