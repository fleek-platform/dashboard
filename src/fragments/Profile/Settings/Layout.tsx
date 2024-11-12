import { routes } from '@fleek-platform/utils-routes';

import { BreadcrumbItem, ProjectDropdown, RootLayout, SubNavigationItem, SubNavigationLayout } from '@/components';
import { useMeQuery } from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useMainNavigationItems } from '@/hooks/useMainNavigationItems';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';

export type ProfileSettingsLayoutProps = ChildrenProps;

export const ProfileSettingsLayout: React.FC<ProfileSettingsLayoutProps> = ({ children }) => {
  const flags = useFeatureFlags();
  const session = useSessionContext();
  const [meQuery] = useMeQuery();

  const navigation = useMainNavigationItems();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      id: meQuery.data?.user.id || '',
      name: meQuery.data?.user.username || '',
      avatar: meQuery.data?.user.avatar,
      url: routes.profile.settings.general(),
    },
  ];

  const subNavigation: SubNavigationItem[] = [
    { label: 'General', path: routes.profile.settings.general(), hasAccess: true },
    { label: 'Login Connections', path: routes.profile.settings.loginConnections(), hasAccess: true },
    { label: 'Personal Access Tokens', path: routes.profile.settings.personalAccessTokens(), hasAccess: true },
    { label: 'Projects', path: routes.profile.settings.projects(), hasAccess: true },
    { label: 'Templates', path: routes.profile.settings.templates(), hasAccess: true },
    {
      label: 'Two-Factor Authentication',
      path: routes.profile.settings.twoFactorAuthentication(),
      hasAccess: flags.enableTwoFactorAuthentication,
    },
    {
      label: 'Notifications',
      path: routes.profile.settings.notifications(),
      hasAccess: true,
    },
  ];

  return (
    <RootLayout.Container>
      <RootLayout.Head title={RootLayout.Head.titles.profile} />
      <RootLayout.Page
        slotSidebar={<ProjectDropdown />}
        navigation={navigation}
        isNavigationLoading={session.loading}
        breadcrumbs={breadcrumbs}
      >
        <SubNavigationLayout navigation={subNavigation} isNavigationLoading={session.loading}>
          {children}
        </SubNavigationLayout>
      </RootLayout.Page>
    </RootLayout.Container>
  );
};
