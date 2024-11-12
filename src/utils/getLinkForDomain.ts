export const getLinkForDomain = (domain: string): string => {
  if (domain.endsWith('.eth')) {
    return `https://${domain}.limo`;
  }

  return `https://${domain}`;
};
