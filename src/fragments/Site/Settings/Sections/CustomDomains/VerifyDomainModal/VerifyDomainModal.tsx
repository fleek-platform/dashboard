import { useEffect, useMemo } from 'react';

import { LearnMoreMessage, Modal } from '@/components';
import { constants } from '@/constants';
import { useDomainQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { DnsConfig } from '@/types/Domain';
import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Box, Divider, FormField, Icon, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { getDomainOrSubdomain } from '@/utils/getDomainOrSubdomain';

import { useSettingsItemContext } from '../../../Elements/SettingsItem.context';
import { SettingsItemModal } from '../../../Elements/SettingsItemModal';

export const VerifyDomainModal: React.FC = () => {
  const { selectedId, isModalOpen, withDnsLink, closeModal } = useSettingsItemContext();
  const route = useRouter();
  const toast = useToast();

  const [domainQuery] = useDomainQuery({ variables: { where: { id: selectedId } }, pause: !selectedId || !isModalOpen });

  const isSiteDomain = route.pathname.includes('sites');

  const dnsConfigs = domainQuery.data?.domain.dnsConfigs || [];
  const hostname = domainQuery.data?.domain.hostname || '';

  const dnsLinkConfig = useMemo(() => {
    return domainQuery.data?.domain.dnsConfigs?.filter((dnsConfig) => {
      if (isSiteDomain && withDnsLink) {
        return dnsConfig.name === constants.DNS_NAME.DNS_LINK;
      }

      return dnsConfig.name === constants.DNS_NAME.REGULAR;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dnsConfigs]);

  const isLoading = domainQuery.fetching || domainQuery.stale || (withDnsLink && !dnsLinkConfig?.length);

  useEffect(() => {
    if (domainQuery.error) {
      toast.error({ error: domainQuery.error, log: 'Failed to fetch DNS records' });

      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainQuery.error]);

  if (domainQuery.error) {
    return null;
  }

  return (
    <SettingsItemModal.Root>
      <Modal.Heading>{`Set ${withDnsLink ? 'DNSLink ' : ''}CNAME record`}</Modal.Heading>
      <Text>
        {`Continue your ${withDnsLink ? 'DNSLink' : 'domain'} setup by assigning this ${
          withDnsLink ? 'DNSLink ' : ''
        }CNAME record within your DNS provider. After that, confirm you've completed this step by clicking the button below.`}
      </Text>

      <DNSConfigurations dnsConfig={dnsLinkConfig && dnsLinkConfig[0]} hostname={hostname} isLoading={isLoading as true} />

      <LearnMoreMessage prefix="Need help? Follow the instructions" href={constants.EXTERNAL_LINK.FLEEK_DOCS_CUSTOM_DOMAIN}>
        here
      </LearnMoreMessage>

      <Modal.CTARow>
        <SettingsItemModal.CloseButton />
        <SettingsItemModal.SubmitButton disabled={isLoading}>Ok, I&apos;ve added it</SettingsItemModal.SubmitButton>
      </Modal.CTARow>
    </SettingsItemModal.Root>
  );
};

type DNSConfigurationsProps = LoadingProps<{
  dnsConfig: DnsConfig;
  hostname: string;
}>;

const DNSConfigurations: React.FC<DNSConfigurationsProps> = ({ isLoading, dnsConfig, hostname }) => {
  const { withDnsLink } = useSettingsItemContext();
  const route = useRouter();

  const isSiteDomain = route.pathname.includes('sites');

  if (isLoading) {
    return <DataSection isLoading />;
  }

  return (
    <DataSection
      key={dnsConfig.id}
      config={dnsConfig}
      hostname={getDomainOrSubdomain({ hostname, withDnsLink: isSiteDomain && withDnsLink })}
    />
  );
};

type DataSectionProps = LoadingProps<{
  config: DnsConfig;
  hostname: string;
}>;

const DataSection: React.FC<DataSectionProps> = ({ isLoading, config, hostname }) => {
  const toast = useToast();

  if (isLoading) {
    return <DataSectionSkeleton />;
  }

  const handleCopyToClipboard = () => {
    try {
      copyToClipboard(config.value);
      toast.success({ message: 'CNAME value copied to clipboard' });
    } catch {
      toast.error({ message: 'Failed to copy CNAME value to clipboard' });
    }
  };

  return (
    <Modal.Inner.Container>
      <Modal.Inner.Row className="justify-between">
        <DataSectionItem label="Type">{config.type}</DataSectionItem>
        <DataSectionItem label="Name">{hostname}</DataSectionItem>
      </Modal.Inner.Row>
      <Divider />
      <DataSectionItem label="Value" onCopy={handleCopyToClipboard}>
        {config.value}
      </DataSectionItem>
    </Modal.Inner.Container>
  );
};

const DataSectionSkeleton: React.FC = () => (
  <Modal.Inner.Container>
    <Modal.Inner.Row className="justify-between">
      <DataSectionItem label="Type" isLoading />
      <DataSectionItem label="Name" isLoading />
    </Modal.Inner.Row>
    <Divider />
    <DataSectionItem label="Value" isLoading />
  </Modal.Inner.Container>
);

type DataSectionItemProps = LoadingProps<
  ChildrenProps<{
    label: string;
    onCopy?: () => void;
  }>
>;

const DataSectionItem: React.FC<DataSectionItemProps> = ({ children, label, onCopy, isLoading }) => {
  if (isLoading) {
    return <DataSectionItemSkeleton label={label} />;
  }

  if (onCopy) {
    return (
      <FormField.Root onClick={onCopy} className="cursor-pointer group">
        <FormField.Label>{label}</FormField.Label>
        <Box className="flex-row justify-between">
          <Text className="truncate">{children}</Text>
          <Icon name="copy" className="group-hover:text-white" />
        </Box>
      </FormField.Root>
    );
  }

  return (
    <FormField.Root>
      <FormField.Label>{label}</FormField.Label>
      <Text className="truncate ml-auto">{children}</Text>
    </FormField.Root>
  );
};

const DataSectionItemSkeleton: React.FC<Pick<DataSectionItemProps, 'label'>> = ({ label }) => (
  <FormField.Root>
    <FormField.Label>{label}</FormField.Label>
    <Modal.Inner.TextSkeleton />
  </FormField.Root>
);
