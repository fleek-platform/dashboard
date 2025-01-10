import { SettingsBox } from '@/components';
import { constants } from '@/constants';
import { DomainsListItem } from '@/fragments/Site/Settings/Sections/CustomDomains/DomainsListItem';
import { usePermissions } from '@/hooks/usePermissions';
import { PrivateGateway } from '@/types/PrivateGateway';
import { Button, Icon, Menu } from '@/ui';
import { filterDeletedDomains } from '@/utils/filterDeletedDomains';
import { getPrivateGatewayHostname } from '@/utils/getPrivateGatewayHostname';

import { useDeletePrivateGatewayContext } from './DeletePrivateGateway.context';
import { usePrivateGatewayContext } from './PrivateGateway.context';

type PrivateGatewayListItemProps = {
  privateGateway: PrivateGateway;
};

export const PrivateGatewayListItem: React.FC<PrivateGatewayListItemProps> = ({ privateGateway }) => {
  const { openModal } = usePrivateGatewayContext();
  const hasAddAndVerifyDomainPermission = usePermissions({ action: [constants.PERMISSION.PRIVATE_GATEWAY.ADD_AND_VERIFY_DOMAIN] });
  const hasDeletePGWPermission = usePermissions({ action: [constants.PERMISSION.PRIVATE_GATEWAY.DELETE] });
  const hasRemoveDomainPermission = usePermissions({ action: [constants.PERMISSION.PRIVATE_GATEWAY.REMOVE_DOMAIN] });
  const hasChangePrimaryDomainPermission = usePermissions({ action: [constants.PERMISSION.PRIVATE_GATEWAY.CHANGE_PRIMARY_DOMAIN] });

  const domains = filterDeletedDomains(privateGateway.domains || []);

  const handleAddDomain = () => {
    openModal(privateGateway.zone?.id!);
  };

  return (
    <SettingsBox.Container>
      <SettingsBox.TitleRow>
        <SettingsBox.Column className="gap-2.5">
          <SettingsBox.Title>{privateGateway.name}</SettingsBox.Title>
          <SettingsBox.Text>{`${domains.length} Domains`}</SettingsBox.Text>
        </SettingsBox.Column>

        <SettingsBox.FieldsRow className="gap-3">
          {hasAddAndVerifyDomainPermission && <Button onClick={handleAddDomain}>Add domain</Button>}
          {hasDeletePGWPermission && <DropdownMenu id={privateGateway.id} name={privateGateway.name} />}
        </SettingsBox.FieldsRow>
      </SettingsBox.TitleRow>

      <SettingsBox.Container className="gap-0 p-0">
        {domains.map((domain) => (
          <DomainsListItem
            key={domain.id}
            {...domain}
            isPrimaryDomain={privateGateway.primaryDomain?.id === domain.id}
            hostname={getPrivateGatewayHostname(domain.hostname)}
            resourceName={privateGateway.name}
            hostnameSuffix="<ipfs-cid>"
            primaryDomainTooltipContent="Used as the URL to open all files in Storage, only one Domain can be set as Primary out of all Gateways."
            primaryDomainSubtitle="Used as the URL to open all files in Storage, only one Domain can be set as Primary out of all Gateways."
            hideVisitButton
            hasVerifyDomainPermission={hasAddAndVerifyDomainPermission}
            hasRemoveDomainPermission={hasRemoveDomainPermission}
            hasChangePrimaryDomainPermission={hasChangePrimaryDomainPermission}
          />
        ))}
        {domains.length === 0 && (
          <SettingsBox.EmptyContent title="No Domains Added" description="Once you add a domain, they will appear here." />
        )}
      </SettingsBox.Container>
    </SettingsBox.Container>
  );
};

type DropdownMenuProps = {
  id: string;
  name: string;
  isDeleteDisabled?: boolean;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ id, name, isDeleteDisabled = false }) => {
  const { openModal } = useDeletePrivateGatewayContext();

  const handleDeletePrivateGateway = () => {
    openModal({
      id,
      name,
    });
  };

  if (isDeleteDisabled) {
    // disable edit for now
    return (
      <Button intent="neutral" disabled>
        Manage
      </Button>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button intent="neutral">Manage</Button>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Content align="end">
          {!isDeleteDisabled && (
            <Menu.Item onClick={handleDeletePrivateGateway}>
              Delete <Icon name="trash" />
            </Menu.Item>
          )}
        </Menu.Content>
      </Menu.Portal>
    </Menu.Root>
  );
};
