import { constants } from '@/constants';
import { Icon } from '@/ui';

import { LinkButton } from '../ftw/LinkButton/LinkButton';

export const ThreeDNSBuyDomainButton: React.FC = () => {
  return (
    <LinkButton variant="outline" intent="neutral" href={constants.EXTERNAL_LINK.THREE_DNS_BUY_DOMAIN} isExternalLink>
      Buy Domain <Icon name="3dns" className="text-[3.25em]" />
      <Icon name="arrow-up-right" />
    </LinkButton>
  );
};
