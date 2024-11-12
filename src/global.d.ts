declare module 'react-use-keypress';
declare module 'ipfs-geoip' {
  export function lookup(getBlock: (cid: string) => Promise<Uint8Array>, ip: string): Promise<{ country_code: string }>;
}
