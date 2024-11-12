import { LayoutHead } from '@/components';
import { App } from '@/fragments/App/App';

import { TemplateStyles as S } from '../../Template.styles';

export type ListLayoutProps = React.PropsWithChildren<{}>;

export const ListLayout: React.FC<ListLayoutProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.templates} />
      <App.Navbar.Combined />
      <S.List.Main>{children}</S.List.Main>
      <App.Footer />
    </>
  );
};
