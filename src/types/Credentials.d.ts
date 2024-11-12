import { ApplicationsQuery } from '@/generated/graphqlClient';

export type Credential = ApplicationsQuery['applications']['data'][0];
