import { constants } from '@/constants';

export type GetLinkForIPFSGatewayArgs = {
  cid: string;
  baseURL?: string;
};
type GetSubDomainResolutionIpfsGatewayUrlArgs = GetLinkForIPFSGatewayArgs;

export const getLinkForIPFSGateway = ({
  cid,
  baseURL = constants.IPFS_GATEWAYS.FLEEK_GW,
}: GetLinkForIPFSGatewayArgs) => {
  const base = `https://${baseURL}/ipfs/`;

  return `${base}${cid}`;
};

export const getSubDomainResolutionIpfsGatewayUrl = ({
  cid,
  baseURL = constants.IPFS_GATEWAYS.FLEEK_GW,
}: GetSubDomainResolutionIpfsGatewayUrlArgs) => {
  return `https://${cid}.ipfs.${baseURL}`;
};
