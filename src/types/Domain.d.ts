import type { Domain as GraphDomain, DomainQuery } from '@/generated/graphqlClient';

export type Domain = Pick<
  GraphDomain,
  'id' | 'createdAt' | 'hostname' | 'status' | 'errorMessage' | '__typename'
>;

export type PrimaryDomainItem = {
  id: string;
  hostname: string;
};

export type DnsConfig = DomainQuery['domain']['dnsConfigs'][0];
