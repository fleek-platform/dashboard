import { constants } from '@/constants';

import { getSubDomainResolutionIpfsGatewayUrl } from './getLinkForIPFSGateway';

type GetLinkForIPFSDownloadArgs = {
  cid: string;
  filename: string;
  isFolder: boolean;
};

export const getLinkForIPFSDownload = ({ cid, filename, isFolder }: GetLinkForIPFSDownloadArgs) => {
  return `${getSubDomainResolutionIpfsGatewayUrl({
    cid,
    baseURL: constants.IPFS_GATEWAYS.FLEEK_GW,
  })}?filename=${filename}&download=true${isFolder ? '&format=tar' : ''}`;
};
