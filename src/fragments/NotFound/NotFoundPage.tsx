import { FleekLogoDotted, LayoutHead } from '@/components';
import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { forwardStyledRef } from '@/theme';
import { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

import { App } from '../App/App';
import { NotFoundPageStyles as S } from './NotFoundPage.styles';

export type NotFoundPageProps = React.ComponentProps<typeof S.Container>;

export const NotFoundPage = forwardStyledRef<HTMLDivElement, NotFoundPageProps>(
  S.Container,
  (props, ref) => {
    return (
      <S.Container {...props} ref={ref}>
        <S.LogoContainer>
          <FleekLogoDotted />
        </S.LogoContainer>
        <Text as="h1" variant="primary" size="3xl" weight={700}>
          404
        </Text>
        <Text>This is not the web page you are looking for.</Text>
      </S.Container>
    );
  },
);

export const NotFoundLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.notFound} />

      <App.Navbar.Maintenance />
      <Providers>{children}</Providers>
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
