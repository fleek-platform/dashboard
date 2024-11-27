import { constants } from '@/constants';

import { getLinkForIPFSGateway } from './getLinkForIPFSGateway';

type GetLinkForIPFSCountryFlagArgs = {
  country: string;
};

export const getLinkForIPFSCountryFlag = (args: GetLinkForIPFSCountryFlagArgs) => {
  const country = args.country.toLowerCase();

  return getLinkForIPFSGateway({
    cid: `QmaYjj5BHGAWfopTdE8ESzypbuthsZqTeqz9rEuh3EJZi6/${country}.svg`,
    baseURL: constants.IPFS_GATEWAYS.FLEEK_GW,
  });
};
