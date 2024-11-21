import { lookup as domainLookup } from 'node:dns/promises';
import { lookup } from 'ipfs-geoip';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getLinkForIPFSGateway } from '@/utils/getLinkForIPFSGateway';
import { Log } from '@/utils/log';

/**
 * Hostname Lookup API:
 *
 * This API endpoint is responsible for parsing the hostname and returning the IP address and country of the hostname
 * using the `dns` Node.js native module. Without the endpoint the UI would have to make the request to the DNS server.
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<HostnameLookupResponse>,
) => {
  const { hostname } = req.query;

  if (typeof hostname !== 'string') {
    return res.status(400).json({ error: 'Invalid hostname' });
  }

  try {
    const { address } = await domainLookup(hostname, 4);

    const getBlock = async (cid: string) => {
      const gwUrl = new URL(getLinkForIPFSGateway({ cid }));
      gwUrl.search = '?format=raw';

      try {
        const res = await fetch(gwUrl, {
          headers: {
            Accept: 'application/vnd.ipld.raw',
          },
          cache: 'force-cache',
        });

        if (!res.ok) {
          throw res;
        }

        const uint8Array = new Uint8Array(await res.arrayBuffer());

        return uint8Array;
      } catch (cause) {
        Log.error(`Error fetching raw block for CID ${cid}: ${cause}`);
        throw new HostnameLookupError(
          `unable to fetch raw block for CID ${cid}`,
        );
      }
    };

    // Use IPFS GeoIP lookup
    let geoData;
    try {
      geoData = await lookup(getBlock, address);
    } catch (error) {
      Log.error(`Error looking up hostname ${hostname} (${address}): ${error}`);
    }

    if (geoData) {
      return res.status(200).json({
        data: {
          country: geoData.country_code,
          ip: address,
          hostname,
        },
      });
    }

    return res.status(400).json({ error: 'Hostname address data not found' });
  } catch (error) {
    if (error instanceof Error) {
      Log.error(`Error looking up hostname ${hostname}: ${error.message}`);

      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handler;

export type HostnameLookupResponse =
  | {
      data: {
        country: string;
        ip: string;
        hostname: string;
      };
    }
  | {
      error: string;
    };

class HostnameLookupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HostnameLookupError';
  }
}
