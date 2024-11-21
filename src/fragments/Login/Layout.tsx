import { LayoutHead } from '@/components';
import { ChildrenProps } from '@/types/Props';

import { App } from '../App/App';
import { LoginStyles as S } from './Login.styles';

export type LoginLayoutProps = ChildrenProps;

export const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.login} />

      <App.Navbar.Combined />
      <App.Content>
        <S.Wrapper>{children}</S.Wrapper>
      </App.Content>
      <App.Footer />
    </>
  );
};
