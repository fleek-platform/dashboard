import { LayoutHead } from '@/components';
import { ChildrenProps } from '@/types/Props';

import { App } from '../App/App';
import { BackButton } from './BackButton';
import { BillingPlansStyles as S } from './BillingPlans.styles';

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.billing} />
      <App.Navbar.Combined />
      <S.Content>
        <BackButton />
        {children}
      </S.Content>
      <App.Footer />
    </>
  );
};
