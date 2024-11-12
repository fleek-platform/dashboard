import { LayoutHead } from '@/components';
import { ChildrenProps } from '@/types/Props';

import { App } from '../App/App';
import { BillingCheckoutStyles as S } from './BillingCheckout.styles';

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <LayoutHead title={LayoutHead.titles.billingCheckout} />
      <App.Navbar.Combined />
      <S.LayoutGrid>{children}</S.LayoutGrid>
      <App.Footer />
    </>
  );
};
