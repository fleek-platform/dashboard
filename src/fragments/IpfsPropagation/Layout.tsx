import { routes } from '@fleek-platform/utils-routes';

import {
  type BreadcrumbItem,
  LayoutHead,
  ProjectDropdown,
  RootLayout,
} from '@/components';
import { useMainNavigationItems } from '@/hooks/useMainNavigationItems';
import { useSessionContext } from '@/providers/SessionProvider';
import type { ChildrenProps } from '@/types/Props';

import { App } from '../App/App';

export const IpfsPropagationLayout: React.FC<ChildrenProps> = ({
  children,
}) => {
  const session = useSessionContext();
  const navItems = useMainNavigationItems();

  if (!session.auth.token) {
    return (
      <>
        <LayoutHead title={LayoutHead.titles.ipfsPropagation} />
        <App.Navbar.Combined />
        <Content>{children}</Content>
        <App.Footer />
      </>
    );
  }

  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: 'IPFS propagation',
      icon: 'ipfs',
      url: routes.ipfsPropagation.withHash({ hash: '' }),
    },
  ];

  return (
    <RootLayout.Container>
      <RootLayout.Head title={LayoutHead.titles.ipfsPropagation} />
      <RootLayout.Page
        slotSidebar={<ProjectDropdown />}
        isNavigationLoading={session.loading}
        navigation={navItems}
        breadcrumbs={breadcrumbs}
      >
        {children}
      </RootLayout.Page>
    </RootLayout.Container>
  );
};

const Content: React.FC<ChildrenProps> = ({ children }) => {
  const session = useSessionContext();

  if (session.auth.token) {
    return <App.Content>{children}</App.Content>;
  }

  return <App.Content>{children}</App.Content>;
};
