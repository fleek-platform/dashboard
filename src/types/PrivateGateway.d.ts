import type { PrivateGatewaysQuery } from '@/generated/graphqlClient';

export type PrivateGateway = PrivateGatewaysQuery['privateGateways']['data'][0];
