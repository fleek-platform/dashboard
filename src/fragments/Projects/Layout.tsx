import { ProjectDropdown, RootLayout } from '@/components';
import { useMainNavigationItems } from '@/hooks/useMainNavigationItems';
import { useSessionContext } from '@/providers/SessionProvider';

export type Layout = React.PropsWithChildren<{
  nav?: React.ReactNode | React.ReactNode[];
}>;

export const Layout: React.FC<Layout> = ({ children, nav: pageNavContent }) => {
  const session = useSessionContext(true);
  const navigation = useMainNavigationItems();

  return (
    <RootLayout.Container>
      <RootLayout.Head
        title={RootLayout.Head.titles.project(session.project?.name)}
      />
      <RootLayout.Page
        slotSidebar={<ProjectDropdown />}
        slotPage={pageNavContent}
        navigation={navigation}
        isNavigationLoading={session.loading}
      >
        {children}
      </RootLayout.Page>
    </RootLayout.Container>
  );
};
