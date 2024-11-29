import { type SubNavigationItem, SubNavigationLayout } from '@/components';
import { useSessionContext } from '@/providers/SessionProvider';
import type { ChildrenProps } from '@/types/Props';

import { SiteLayout } from '../Layout';

export type ExtendedLayoutProps = ChildrenProps;

export const ExtendedLayout: React.FC<ExtendedLayoutProps> = ({ children }) => {
  const session = useSessionContext();

  const navigation: SubNavigationItem[] = [
    { label: 'Health Check', path: '', hasAccess: true, isDisabled: true },
    { label: 'Build Insights', path: '', hasAccess: true, isDisabled: true },
  ];

  return (
    <SiteLayout>
      <SubNavigationLayout
        navigation={navigation}
        isNavigationLoading={session.loading}
      >
        {children}
      </SubNavigationLayout>
    </SiteLayout>
  );
};
