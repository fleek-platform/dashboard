import { ApplicationQuery } from '@/generated/graphqlClient';
import { Credential } from '@/types/Credentials';

type ParseWhiteListDomainsResponse = {
  __typename?: 'ApplicationWhitelistDomain' | 'ApplicationWhiteLabelDomain';
  hostname: string;
}[];

export const parseWhitelistDomains = ({
  applicationQueryData,
}: {
  applicationQueryData: ApplicationQuery['application'] | Credential;
}): ParseWhiteListDomainsResponse => {
  const application = applicationQueryData;
  const whitelistData = application?.whitelistDomains || [];
  const whiteLabelData = application?.whiteLabelDomains || [];

  if (!whitelistData.length && !whiteLabelData.length) {
    return [];
  }

  if (!whitelistData.length && whiteLabelData.length) {
    return whiteLabelData;
  }

  if (whitelistData.length && whiteLabelData.length) {
    // we need to remove the __typename from the object to be able to compare them in the Set,
    // otherwise we have duplicate domains
    const combinedWhitelistDomains = [
      ...whitelistData.map((whitelistData) => whitelistData.hostname),
      ...whiteLabelData.map((whiteLabelData) => whiteLabelData.hostname),
    ];

    return Array.from(new Set(combinedWhitelistDomains)).map(
      (whiteListDomain) => ({ hostname: whiteListDomain }),
    );
  }

  return whitelistData;
};
