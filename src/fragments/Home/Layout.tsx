import { LayoutHead } from '@/components';
import type { ChildrenProps } from '@/types/Props';

import { App } from '../App/App';
import { HomeStyles } from './HomeStyles';

export const HomeLayout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.home} />

      <App.Navbar.Unauthenticated />
      <HomeStyles.Background.Wrapper>
        <HomeStyles.Background.Image />
        <App.Content>{children}</App.Content>
      </HomeStyles.Background.Wrapper>
      <App.Footer />
    </>
  );
};
