import { useMemo, memo } from 'react';
import { ProjectDropdown, RootLayout } from '@/components';
import { useMainNavigationItems } from '@/hooks/useMainNavigationItems';
import { useSessionContext } from '@/providers/SessionProvider';

export type Layout = React.PropsWithChildren<{
  nav?: React.ReactNode | React.ReactNode[];
}>;

// TODO: When clicking outside the menu, e.g. right side
// content area, this component re-renders. Why?
export const Layout: React.FC<Layout> = ({ children, nav: pageNavContent }) => {
  const session = useSessionContext(true);
  const navigationItems = useMainNavigationItems();
  // TODO: The memo won't be effective as the nav items
  // has the URL attribute which includes diff projectid
  // per navigation selection
  const navigation = useMemo(() => navigationItems, [navigationItems]);

  console.log('[debug] Layout: re-render: 1', JSON.stringify(navigation))

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

Layout.displayName = 'Layout';
