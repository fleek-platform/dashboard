import { useMemo } from 'react';

import { DomainStatus, useSiteQuery } from '@/generated/graphqlClient';
import { Site } from '@/types/Site';
import { getActiveEnsList } from '@/utils/getActiveEnsList';
import { getLinkForDomain } from '@/utils/getLinkForDomain';
import { getLinkForIPFSGateway } from '@/utils/getLinkForIPFSGateway';
import { getLinkForSiteSlug } from '@/utils/siteSlugLinks';

type UseSiteLinkArgs = {
  siteId?: string;
  site?: Site;
  noHttps?: boolean;
};

export const useSiteLink = ({
  siteId,
  site,
  noHttps,
}: UseSiteLinkArgs): string | undefined => {
  const [siteQuery] = useSiteQuery({
    variables: { where: { id: siteId! } },
    pause: Boolean(site),
  });

  const siteData = site || siteQuery.data?.site;

  return useMemo(() => {
    const getLink = () => {
      const primaryDomain = siteData?.primaryDomain;

      if (primaryDomain && primaryDomain.isVerified && primaryDomain.hostname) {
        // we should not have Primary Domain that are not Active but just to double check
        return getLinkForDomain(primaryDomain.hostname);
      }

      const activeEnsList = getActiveEnsList({ site: siteData! });

      if (activeEnsList.length > 0) {
        return getLinkForDomain(activeEnsList[0].name);
      }

      // keep this for backwards compatibility
      const domain = siteData?.domains?.find(
        (domain) => domain.isVerified && domain.status === DomainStatus.ACTIVE,
      );

      if (domain) {
        return getLinkForDomain(domain.hostname);
      }

      const slug = siteData?.slug;

      if (slug) {
        return getLinkForSiteSlug(slug);
      }

      const cid = siteData?.currentDeployment?.cid;

      if (cid) {
        return getLinkForIPFSGateway({ cid });
      }
    };

    const link = getLink();

    if (link) {
      return noHttps ? removeHttps(link) : link;
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteData, siteQuery, noHttps]);
};

const removeHttps = (url: string) =>
  url.replace(/^https?:\/\//, '').replace(/\.limo/, '');
