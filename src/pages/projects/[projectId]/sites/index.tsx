import { routes } from '@fleek-platform/utils-routes';
import { useEffect } from 'react';

import { constants } from '@/constants';
import { Projects, Site } from '@/fragments';
import { useSitesQuery } from '@/generated/graphqlClient';
import { useQueryPagination } from '@/hooks/useQueryPagination';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const Sites: Page = () => {
  const session = useSessionContext();

  const { page, handlePageChange, setPageCount } = useQueryPagination({
    pathname: routes.project.site.list({ projectId: session.project.id }),
  });
  const [sitesQuery] = useSitesQuery({
    variables: {
      where: {},
      filter: { page: page, take: constants.SITES_PAGE_SIZE },
    },
    pause: !page,
  });
  const pageCount = sitesQuery.data?.sites.pageCount;
  const sites = sitesQuery?.data?.sites.data;
  const isLoading = session.loading || sitesQuery?.fetching;

  useEffect(() => {
    if (sitesQuery.data?.sites.pageCount) {
      setPageCount(sitesQuery.data.sites.pageCount);
    }
  }, [sitesQuery.data, setPageCount]);

  if (isLoading) {
    return <Site.Elements.SkeletonList />;
  }

  if (sites === undefined || sites?.length === 0) {
    return (
      <>
        <Projects.Sites.EmptyMessage />
        <Projects.Sites.Templates />
      </>
    );
  }

  return (
    <>
      <Site.Elements.List
        sites={sites}
        totalPages={pageCount}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

const PageNavContent: React.FC = () => {
  return <Projects.Sites.AddSiteDropdown />;
};

Sites.getLayout = (page) => (
  <Projects.Layout nav={<PageNavContent />}>{page}</Projects.Layout>
);

export default withAccess({
  Component: Sites,
  requiredPermissions: [constants.PERMISSION.SITE.VIEW_OVERVIEW],
});
