import { routes } from '@fleek-platform/utils-routes';

import { constants } from '@/constants';
import { useFleekFunctionsQuery } from '@/generated/graphqlClient';
import { useProjectContext } from '@/providers/ProjectProvider';

import { useQueryPagination } from './useQueryPagination';
import { useRouter } from './useRouter';

const sources = ['project', 'site'] as const;
export type UseFunctionsListArgs = (typeof sources)[number];

export const useFunctionsList = (source?: UseFunctionsListArgs) => {
  const router = useRouter();
  const isSiteSource = source === 'site';
  const siteId = router.query.siteId || '';
  const {
    project: { id: projectId },
  } = useProjectContext();

  const pathname = isSiteSource
    ? routes.project.site.functions.list({ projectId, siteId })
    : routes.project.function.list({ projectId });

  const { page, handlePageChange } = useQueryPagination({
    pathname,
  });

  const variables = isSiteSource
    ? {
        filter: { page, take: constants.FUNCTIONS_PAGE_SIZE },
        where: { siteId },
        orderBy: { updatedAt: 'desc' },
      }
    : {
        filter: { page, take: constants.FUNCTIONS_PAGE_SIZE },
        orderBy: { updatedAt: 'desc' },
      };

  const [fleekFunctionsQuery] = useFleekFunctionsQuery({
    variables,
  });

  return { page, handlePageChange, fleekFunctionsQuery };
};
