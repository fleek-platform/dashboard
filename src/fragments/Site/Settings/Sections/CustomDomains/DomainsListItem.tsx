import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';

import { BadgeText, CustomTooltip, ErrorBadge, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import { DnslinkStatus, DomainStatus, useCreateDnsConfigMutation, useDomainStatusQuery } from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { TEST_ID } from '@/test/testId';
import { SiteDomain } from '@/types/Site';
import { Box, Icon } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';
import { getLinkForDomain } from '@/utils/getLinkForDomain';

import { useSettingsItemContext } from '../../Elements/SettingsItem.context';
import { DnsLinkBadge } from './DnsLinkBadge';
import { PrimaryDomainMenuItem } from './PrimaryDomainMenuItem/PrimaryDomainMenuItem';

export type DomainsListItemProps = SiteDomain & {
  hideVisitButton?: boolean;
  hostnameSuffix?: string;
  isPrimaryDomain: boolean;
  primaryDomainTooltipContent: string;
  primaryDomainSubtitle: string;
  resourceName: string; // used to display in delete modal
  hasVerifyDomainPermission: boolean;
  hasRemoveDomainPermission: boolean;
  hasChangePrimaryDomainPermission: boolean;
};

export const DomainsListItem: React.FC<DomainsListItemProps> = ({
  id,
  hostname,
  hostnameSuffix,
  createdAt,
  errorMessage,
  status: initialStatus,
  dnslinkStatus,
  hideVisitButton = false,
  isPrimaryDomain,
  primaryDomainTooltipContent,
  primaryDomainSubtitle,
  resourceName,
  hasVerifyDomainPermission,
  hasRemoveDomainPermission,
  hasChangePrimaryDomainPermission,
}) => {
  const [domainStatusQuery, refetchDomainStatusQuery] = useDomainStatusQuery({
    variables: { where: { id } },
    requestPolicy: 'network-only',
    pause: initialStatus === DomainStatus.ACTIVE,
  });
  const flags = useFeatureFlags();

  const { status = initialStatus } = domainStatusQuery.data?.domain || {};

  const { openModal, shouldOpenModalOnCreated, setShouldOpenModalOnCreated, refetchQuery } = useSettingsItemContext();

  const handleOpenDomainModal = () => {
    if (hasVerifyDomainPermission) {
      openModal(id);
    }
  };

  useEffect(() => {
    switch (domainStatusQuery.data?.domain.status) {
      case DomainStatus.CREATING:
      case DomainStatus.VERIFYING:
        setTimeout(() => {
          refetchDomainStatusQuery();
        }, 6000);

        return;
      case DomainStatus.CREATED:
        if (shouldOpenModalOnCreated) {
          handleOpenDomainModal();
          setShouldOpenModalOnCreated(false);
        }

        return;
      case DomainStatus.ACTIVE:
        if (refetchQuery) {
          refetchQuery({ requestPolicy: 'network-only' });
        }

        return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainStatusQuery.data, refetchDomainStatusQuery]);

  if (status === DomainStatus.DELETING || domainStatusQuery.error?.message.includes('not found')) {
    // this conditional is going to clean up after the domain is deleted

    return null;
  }

  return (
    <SettingsListItem.FlatRow testId={TEST_ID.DOMAINS_LIST_ITEM} className="grid-cols-1">
      <SettingsListItem
        subtitle={`Added ${getDurationUntilNow({ isoDateString: createdAt, shortFormat: true })}`}
        title={hostname}
        titleSuffix={hostnameSuffix}
        testId={TEST_ID.DOMAINS_LIST_ITEM}
        className="p-0 border-none w-full"
      >
        <Box className="flex-row gap-3 items-center">
          {flags.enableDnsLink && dnslinkStatus && <DnsLinkBadge domainId={id} dnsLinkStatus={dnslinkStatus} errorMessage={errorMessage} />}
          {isPrimaryDomain && (
            <CustomTooltip side="top" content={primaryDomainTooltipContent}>
              <BadgeText colorScheme="yellow" hoverable>
                Primary <Icon name="question" />
              </BadgeText>
            </CustomTooltip>
          )}
          {match(status)
            .with(DomainStatus.ACTIVE, () => <BadgeText colorScheme="green">Active</BadgeText>)
            .with(DomainStatus.CREATED, () => (
              <BadgeText hoverable={hasVerifyDomainPermission} colorScheme="amber" onClick={handleOpenDomainModal}>
                Set DNS Record
              </BadgeText>
            ))
            .with(DomainStatus.CREATING, () => (
              <BadgeText colorScheme="slate">
                Creating <Icon name="spinner" />
              </BadgeText>
            ))
            .with(DomainStatus.VERIFYING, () => (
              <BadgeText colorScheme="slate">
                Verifying <Icon name="spinner" />
              </BadgeText>
            ))
            .with(DomainStatus.CREATING_FAILED, () => <ErrorBadge errorMessage={errorMessage}>Creation Failed</ErrorBadge>)
            .with(DomainStatus.VERIFYING_FAILED, () => <ErrorBadge errorMessage={errorMessage}>Verification Failed</ErrorBadge>)
            .otherwise(() => null)}

          <DropdownMenu
            hostname={hostname}
            id={id}
            status={status}
            dnsLinkStatus={dnslinkStatus}
            hideVisitButton={hideVisitButton}
            isPrimaryDomain={isPrimaryDomain}
            primaryDomainSubtitle={primaryDomainSubtitle}
            resourceName={resourceName}
            handleOpenDomainModal={handleOpenDomainModal} // Pass the function down
            hasVerifyDomainPermission={hasVerifyDomainPermission}
            hasRemoveDomainPermission={hasRemoveDomainPermission}
            hasChangePrimaryDomainPermission={hasChangePrimaryDomainPermission}
          />
        </Box>
      </SettingsListItem>
    </SettingsListItem.FlatRow>
  );
};

type DropdownMenuProps = {
  id: string;
  hostname: string;
  status: DomainStatus;
  dnsLinkStatus?: DnslinkStatus | null;
  hideVisitButton: boolean;
  isPrimaryDomain: boolean;
  primaryDomainSubtitle: string;
  resourceName: string;
  handleOpenDomainModal: () => void; // Add this line
  hasVerifyDomainPermission: boolean;
  hasRemoveDomainPermission: boolean;
  hasChangePrimaryDomainPermission: boolean;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  hostname,
  id,
  status,
  dnsLinkStatus,
  hideVisitButton,
  isPrimaryDomain,
  primaryDomainSubtitle,
  resourceName,
  handleOpenDomainModal,
  hasVerifyDomainPermission,
  hasRemoveDomainPermission,
  hasChangePrimaryDomainPermission,
}) => {
  const { activeDomains, openDeleteModal, setWithDnsLink, onSubmitPrimaryDomain, closeModal } = useSettingsItemContext();
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const toast = useToast();
  const flags = useFeatureFlags();

  const [, createDnsConfig] = useCreateDnsConfigMutation();

  const isSiteDomain = route.pathname.includes('sites');

  const disableDelete = status === DomainStatus.DELETING || status === DomainStatus.CREATING || status === DomainStatus.VERIFYING;

  if (isLoading) {
    // needed cause the forwardStyledRef
    return <Icon name="spinner" />;
  }

  const handleDelete = async () => {
    if (disableDelete) {
      return;
    }

    if (isPrimaryDomain && activeDomains.length > 0) {
      openDeleteModal({ itemId: id, hostname, resourceName, modal: 'primary-domain' });
    } else {
      openDeleteModal({ itemId: id, hostname, resourceName, modal: 'domain' });
    }
  };

  const handleSetPrimaryDomain = async () => {
    if (onSubmitPrimaryDomain) {
      setIsLoading(true);
      await onSubmitPrimaryDomain(id);
      setIsLoading(false);
    }
  };

  const handleCreateDnsConfig = async () => {
    try {
      handleSetDNSLink();

      const result = await createDnsConfig({
        where: { domainId: id, siteId: route.query.siteId! },
        data: { name: constants.DNS_NAME.DNS_LINK },
      });

      if (!result.data) {
        throw result.error || new Error('Error trying to create DNS Link config');
      }
    } catch (error) {
      toast.error({ error, log: 'Failed to create DNS Link config' });
      closeModal();
    }
  };

  const handleSetDNSLink = async () => {
    setWithDnsLink(true);
    handleOpenDomainModal();
  };

  const shouldShowDnsLinkItems = isSiteDomain && status === DomainStatus.ACTIVE && hasVerifyDomainPermission;

  const doesNotHaveAccess =
    (status !== DomainStatus.ACTIVE && !hasVerifyDomainPermission && !hasRemoveDomainPermission) ||
    (status === DomainStatus.ACTIVE && !hasChangePrimaryDomainPermission && hideVisitButton);

  const shouldDisableMenu = status === DomainStatus.CREATING || doesNotHaveAccess;

  return (
    <SettingsListItem.DropdownMenu isLoading={isLoading} isDisabled={shouldDisableMenu} hasAccess={!doesNotHaveAccess}>
      {match(status)
        .with(DomainStatus.ACTIVE, () => (
          <>
            {!hideVisitButton && (
              <SettingsListItem.DropdownMenuItem href={getLinkForDomain(hostname)} icon="external-link">
                Visit
              </SettingsListItem.DropdownMenuItem>
            )}
          </>
        ))
        .with(DomainStatus.CREATED, () => (
          <>
            {hasVerifyDomainPermission && (
              <SettingsListItem.DropdownMenuItem icon="gear" onClick={handleOpenDomainModal}>
                Verify
              </SettingsListItem.DropdownMenuItem>
            )}
          </>
        ))
        .with(DomainStatus.VERIFYING_FAILED, () => (
          <>
            {hasVerifyDomainPermission && (
              <SettingsListItem.DropdownMenuItem icon="refresh" onClick={handleOpenDomainModal}>
                Retry Verification
              </SettingsListItem.DropdownMenuItem>
            )}
          </>
        ))
        .otherwise(() => null)}

      {isPrimaryDomain && hasChangePrimaryDomainPermission && (
        <PrimaryDomainMenuItem title="Primary" subtitle={primaryDomainSubtitle} isPrimaryDomain showSeparator={!hideVisitButton} />
      )}

      {!isPrimaryDomain && status === DomainStatus.ACTIVE && hasChangePrimaryDomainPermission && (
        <PrimaryDomainMenuItem
          title="Make Primary"
          subtitle={primaryDomainSubtitle}
          onClick={handleSetPrimaryDomain}
          showSeparator={!hideVisitButton}
        />
      )}

      {flags.enableDnsLink &&
        shouldShowDnsLinkItems &&
        match(dnsLinkStatus)
          .with(DnslinkStatus.CREATED, () => (
            <>
              <SettingsListItem.DropdownMenuSeparator />
              <SettingsListItem.DropdownMenuItem icon="gear" onClick={handleSetDNSLink}>
                Verify DNSLink
              </SettingsListItem.DropdownMenuItem>
            </>
          ))
          .with(DnslinkStatus.VERIFICATION_FAILED, () => (
            <>
              <SettingsListItem.DropdownMenuSeparator />
              <SettingsListItem.DropdownMenuItem icon="refresh" onClick={handleSetDNSLink}>
                Retry DNSLink Verification
              </SettingsListItem.DropdownMenuItem>
            </>
          ))
          .with(DnslinkStatus.VERIFIED, () => null)
          .otherwise(() => (
            <>
              <SettingsListItem.DropdownMenuSeparator />
              <SettingsListItem.DropdownMenuItem icon="ipfs-colored" onClick={handleCreateDnsConfig}>
                Set DNSLink
              </SettingsListItem.DropdownMenuItem>
            </>
          ))}

      {hasRemoveDomainPermission && (
        <>
          <SettingsListItem.DropdownMenuSeparator />
          <SettingsListItem.DropdownMenuItem icon="close" onClick={handleDelete} disabled={disableDelete}>
            Remove
          </SettingsListItem.DropdownMenuItem>
        </>
      )}
    </SettingsListItem.DropdownMenu>
  );
};
