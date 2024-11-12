import { useEffect, useState } from 'react';

import { constants } from '@/constants';
import { getLinkForIPFSGateway } from '@/utils/getLinkForIPFSGateway';

import { useAsync } from './useAsync';

export const proxyUrl = (cid: string) =>
  getLinkForIPFSGateway({ cid, baseURL: constants.IPFS_GATEWAYS.FLEEK_TEST });

export const useIpfsContent = (cid?: string) => {
  const [{ loading, error }, asyncCall] = useAsync();
  const [data, setData] = useState<string>();

  useEffect(() => {
    if (cid) {
      asyncCall(() =>
        fetch(proxyUrl(cid))
          .then((result) => result.text())
          .then(setData),
      )();
    }
  }, [asyncCall, cid]);

  return [
    {
      data,
      error: error && new Error(error),
      fetching: loading,
    },
  ]; // same sig as graphql query
};
