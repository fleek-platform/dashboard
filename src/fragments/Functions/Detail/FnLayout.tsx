import { routes } from '@fleek-platform/utils-routes';

import {
  type BreadcrumbItem,
  type NavigationItem,
  ProjectGoBack,
  RootLayout,
} from '@/components';
import { useFleekFunctionDetailQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import type { ChildrenProps } from '@/types/Props';

import { FunctionDetailProvider } from './Context';

export type FnLayoutProps = ChildrenProps;

export const FnLayout: React.FC<FnLayoutProps> = ({ children }) => {
  const session = useSessionContext();
  const router = useRouter();
  const fnName = String(router.query.fnName);
  const [fleekFunctionDetailQuery] = useFleekFunctionDetailQuery({
    variables: { where: { name: fnName } },
  });

  const projectId = session.project.id;

  const { data, error } = fleekFunctionDetailQuery;

  if (error) {
    router.replace(routes.project.function.list({ projectId }));

    return null;
  }

  const navigation: NavigationItem[] = [
    {
      icon: 'browser',
      label: 'Overview',
      path: routes.project.function.detail({ projectId, fnName }),
      hasAccess: true,
      isExact: true,
    },
    {
      icon: 'gear',
      label: 'Settings',
      path: routes.project.function.settings({ projectId, fnName }),
      hasAccess: true,
      isExact: true,
    },
  ];

  const breadcrumbs: BreadcrumbItem[] = [
    {
      name: 'Functions',
      icon: 'code',
      url: routes.project.function.list({ projectId }),
    },
    {
      name: fnName,
      icon: 'code',
      url: routes.project.function.detail({ projectId, fnName }),
    },
  ];

  return (
    <RootLayout.Container>
      <RootLayout.Head title={RootLayout.Head.titles.function(fnName)} />
      <RootLayout.Page
        slotSidebar={
          <ProjectGoBack
            projectName={session.project.name}
            goBackUrl={routes.project.function.list({ projectId })}
          />
        }
        navigation={navigation}
        isNavigationLoading={session.loading}
        breadcrumbs={breadcrumbs}
      >
        <FunctionDetailProvider value={data?.fleekFunctionByName || null}>
          {children}
        </FunctionDetailProvider>
      </RootLayout.Page>
    </RootLayout.Container>
  );
};
