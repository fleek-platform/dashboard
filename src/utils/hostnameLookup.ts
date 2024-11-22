import { lookup } from 'ipfs-geoip';
import { getLinkForIPFSGateway } from '@/utils/getLinkForIPFSGateway';
import { Log } from '@/utils/log';

type DNSQuestion = {
  name: string;
  type: number;
};

type DNSAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

type DNSResponse = {
  Status: number;
  TC: boolean;
  RD: boolean;
  RA: boolean;
  AD: boolean;
  CD: boolean;
  Question: DNSQuestion[];
  Answer?: DNSAnswer[];
};

type DomainLookupResponse = {
  address: string;
  name: string;
};

const domainLookup = async (domain: string): Promise<DomainLookupResponse> => {
  try {
    const response = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${domain}&type=A`,
      {
        headers: {
          Accept: 'application/dns-json',
        },
      },
    );
    if (!response.ok) {
      throw new Error(`DNS lookup failed: ${response.statusText}`);
    }
    const res = (await response.json()) as unknown as DNSResponse;
    const { data: address, name } = res.Answer?.find(
      (record) => record.type === 1,
    );

    return { address, name };
  } catch (err) {
    console.error(err);
  }
};

type GeoData = {
  country_code: string;
};

type HostnameLookupResponse =
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

export const hostnameLookup = async (
  hostname: string,
): Promise<HostnameLookupResponse> => {
  try {
    const { address } = await domainLookup(hostname);

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
        throw new Error(`unable to fetch raw block for CID ${cid}`);
      }
    };

    let geoData: GeoData;
    try {
      geoData = await lookup(getBlock, address);
    } catch (error) {
      Log.error(`Error looking up hostname ${hostname} (${address}): ${error}`);
    }

    if (geoData) {
      return {
        data: {
          country: geoData.country_code,
          ip: address,
          hostname,
        },
      };
    }

    throw new Error('Hostname address data not found');
  } catch (error) {
    if (error instanceof Error) {
      Log.error(`Error looking up hostname ${hostname}: ${error.message}`);
    }
    throw new Error(
      error instanceof Error ? error.message : 'Internal Server Error',
    );
  }
};
