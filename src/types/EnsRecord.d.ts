import type { EnsRecord as GraphEnsRecord } from '@/generated/graphqlClient';

export type EnsRecord = Pick<
  GraphEnsRecord,
  'id' | 'createdAt' | 'name' | 'status'
>;
