import { constants } from '@/constants';

type GetDomainOrSubdomainArgs = {
  hostname: string;
  withDnsLink?: boolean;
};

export const getDomainOrSubdomain = ({ hostname, withDnsLink = false }: GetDomainOrSubdomainArgs) => {
  const domainSplitted = hostname.split('.');
  const isSubdomain = domainSplitted.length > 2;

  if (isSubdomain) {
    return `${withDnsLink ? `${constants.DNS_NAME.DNS_LINK}.${domainSplitted[0]}` : `${domainSplitted[0]}`}`;
  }

  return `${withDnsLink ? `${constants.DNS_NAME.DNS_LINK}` : '@'}`;
};
