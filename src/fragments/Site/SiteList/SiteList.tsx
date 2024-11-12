import { useSiteLink } from '@/hooks/useSiteLink';
import { useSessionContext } from '@/providers/SessionProvider';
import { SiteListItem } from '@/types/Site';
import { Pagination } from '@/ui';

import { SiteCard } from '../SiteCard/SiteCard';
import { SiteListStyles as S } from './SiteList.styles';

type SiteListProps = {
  sites: SiteListItem[];
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

export const SiteList: React.FC<SiteListProps> = ({ sites, totalPages = 0, onPageChange, currentPage }) => {
  const session = useSessionContext();
  const projectId = session.project.id;

  return (
    <>
      <S.SitesGrid>
        {sites?.map((site) => (
          <SiteListCard key={site.id} site={site} projectId={projectId} />
        ))}
      </S.SitesGrid>

      <S.PaginationContainer>
        {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />}
      </S.PaginationContainer>
    </>
  );
};

type SiteListSkeletonProps = {
  count?: number;
};

export const SkeletonList: React.FC<SiteListSkeletonProps> = ({ count = 9 }) => {
  return (
    <S.SitesGrid>
      {Array.from({ length: count }).map((_, index) => (
        <SiteCard key={index} isLoading />
      ))}
    </S.SitesGrid>
  );
};

type SiteListCardProps = {
  site: SiteListItem;
  projectId: string;
};
const SiteListCard: React.FC<SiteListCardProps> = ({ site, projectId }) => {
  const currentDeployment = site.currentDeployment; // the last successful deployment
  const siteLink = useSiteLink({ site, noHttps: true });

  return (
    <SiteCard
      key={site.id}
      id={site.id}
      avatar={site.avatar}
      name={site.name}
      projectId={projectId}
      siteLink={siteLink}
      deployment={currentDeployment}
      sourceProvider={site.sourceProvider}
    />
  );
};
