import { DomainStatus } from '@/generated/graphqlClient';
import { SiteDomain } from '@/types/Site';

type IsActiveDomainArgs = {
  domain: Pick<SiteDomain, 'id' | 'isVerified' | 'status'>;
  primaryDomainId?: string;
};

export const isActiveDomain = ({ domain, primaryDomainId }: IsActiveDomainArgs) =>
  domain.isVerified && domain.status === DomainStatus.ACTIVE && domain.id !== primaryDomainId;
