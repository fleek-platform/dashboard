import { match } from 'ts-pattern';

import { BadgeText, ErrorBadge, type ErrorBadgeProps } from '@/components';
import { DnslinkStatus } from '@/generated/graphqlClient';

import { useSettingsItemContext } from '../../Elements/SettingsItem.context';

type DnsLinkBadgeProps = {
  domainId: string;
  dnsLinkStatus: DnslinkStatus;
  errorMessage?: ErrorBadgeProps['errorMessage'];
};

export const DnsLinkBadge: React.FC<DnsLinkBadgeProps> = ({
  domainId,
  dnsLinkStatus,
  errorMessage,
}) => {
  const { setWithDnsLink, openModal } = useSettingsItemContext();

  const handleOpenDomainModal = () => {
    setWithDnsLink(true);
    openModal(domainId);
  };

  return (
    <>
      {match(dnsLinkStatus)
        .with(DnslinkStatus.CREATED, () => (
          <BadgeText
            hoverable
            colorScheme="amber"
            onClick={handleOpenDomainModal}
          >
            Set DNSLink Record
          </BadgeText>
        ))
        .with(DnslinkStatus.VERIFICATION_FAILED, () => (
          <ErrorBadge errorMessage={errorMessage}>
            Verification DNSLink Failed
          </ErrorBadge>
        ))
        .with(DnslinkStatus.VERIFIED, () => (
          <BadgeText colorScheme="slate">DNSLink</BadgeText>
        ))
        .exhaustive()}
    </>
  );
};
