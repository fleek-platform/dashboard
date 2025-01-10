import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { Site } from '@/fragments/Site/Site';
import { SitesSortableFields, SortOrder, useSitesQuery } from '@/generated/graphqlClient';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, Icon, Skeleton, Text } from '@/ui';

export const MainSites: React.FC = () => {
  const session = useSessionContext();

  const projectId = session.project.id;

  const [sitesQuery] = useSitesQuery({
    variables: { where: {}, filter: { page: 1, take: 6, sortField: SitesSortableFields.updatedAt, sortOrder: SortOrder.desc } },
    pause: !session.accesTokenProjectId,
  });

  const sites = sitesQuery?.data?.sites.data || [];
  const isLoading = session.loading || sitesQuery?.fetching;

  if (isLoading) {
    return (
      <Box className="sm:col-span-2 gap-4" style={{ gridArea: 'sites' }}>
        <Box className="flex-row justify-between">
          <Skeleton variant="text" className="w-1/6" />
          <Skeleton variant="text" className="w-1/12" />
        </Box>
        <Site.Elements.SkeletonList count={6} />
      </Box>
    );
  }

  if (sites?.length === 0) {
    return null;
  }

  return (
    <Box className="sm:col-span-2 gap-4 child:min-h-[unset]" style={{ gridArea: 'sites' }}>
      <Box className="flex-row justify-between">
        <Text as="h3" variant="secondary" size="xl" weight={500}>
          Your sites
        </Text>
        <Link href={routes.project.site.list({ projectId })} className="flex flex-row gap-1 text-neutral-11 group">
          View all sites
          <Icon name="arrow-right" className="group-hover:text-neutral-12" />
        </Link>
      </Box>
      <Site.Elements.List sites={sites} />
    </Box>
  );
};
