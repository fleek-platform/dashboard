import { ProjectDropdown, RootLayout } from '@/components';
import { useMainNavigationItems } from '@/hooks/useMainNavigationItems';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  const session = useSessionContext();
  const navigation = useMainNavigationItems();

  return (
    <RootLayout.Container>
      <RootLayout.Head
        title={RootLayout.Head.titles.deploy(session.project.name)}
      />
      <RootLayout.Page
        slotSidebar={<ProjectDropdown />}
        navigation={navigation}
        isNavigationLoading={session.loading}
      >
        {children}
      </RootLayout.Page>
    </RootLayout.Container>
  );
};
