import { DeleteDomainModal } from '@/components';
import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { Text } from '@/ui';

export const DeletePrivateGatewayDomainModal: React.FC = () => {
  const { resourceName, hostname } = useSettingsItemContext();

  return (
    <DeleteDomainModal title="Remove Domain from Gateway">
      <Text>
        Are you sure you want to remove the private gateway domain <b>{hostname}</b> from your gateway <b>{resourceName}</b>?
      </Text>
      <Text>After removing, your gateway will no longer be accessible through this domain.</Text>
    </DeleteDomainModal>
  );
};
