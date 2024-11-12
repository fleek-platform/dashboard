import { SubNavigationItem, SubNavigationLayout } from '@/components';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps } from '@/types/Props';

import { SiteLayout } from '../Layout';

export type ExtendedLayoutProps = ChildrenProps;

export const ExtendedLayout: React.FC<ExtendedLayoutProps> = ({ children }) => {
  const session = useSessionContext();

  const navigation: SubNavigationItem[] = [
    { label: 'Storage', path: '', hasAccess: true, isDisabled: true },
    { label: 'Bandwith', path: '', hasAccess: true, isDisabled: true },
    { label: 'Requests', path: '', hasAccess: true, isDisabled: true },
    { label: 'CPU Time', path: '', hasAccess: true, isDisabled: true },
    { label: 'Compute', path: '', hasAccess: true, isDisabled: true },
    { label: 'Reads / Writes', path: '', hasAccess: true, isDisabled: true },
    { label: 'Executions', path: '', hasAccess: true, isDisabled: true },
    { label: 'Speed Insights', path: '', hasAccess: true, isDisabled: true },
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
