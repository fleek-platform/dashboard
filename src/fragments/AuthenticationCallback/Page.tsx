import { useEffect, useState } from 'react';

import { LayoutHead } from '@/components';
import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { ChildrenProps } from '@/types/Props';
import { Icon, Text } from '@/ui';
import { isServerSide } from '@/utils/isServerSide';

import { App } from '../App/App';
import { AuthenticationCallbackPageStyles as S } from './AuthenticationCallbackPage.styles';

export const AuthenticationCallbackPage: React.FC = () => {
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    if (isServerSide()) {
      return;
    }

    if (timer <= 0) {
      setTimer(() => 0);
      window.close();

      return;
    }

    setTimeout(() => {
      setTimer((timer) => (timer > 1 ? timer - 1 : 0));
    }, 1000);
  }, [timer]);

  return (
    <Providers>
      <Layout>
        <S.IconContainer>
          <Icon name="check-circled" />
        </S.IconContainer>
        <Text as="h1" variant="primary" size="3xl" weight={700}>
          Authentication Complete
        </Text>
        <Text>
          Your authentication was successful. This page will be closed in{' '}
          <b>{timer}</b> seconds.
        </Text>
      </Layout>
    </Providers>
  );
};

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.authenticationCallback} />

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
