import { DeleteDomainModal } from '@/components';
import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { Text } from '@/ui';

export const DeleteSiteDomainModal: React.FC = () => {
  const { resourceName, hostname } = useSettingsItemContext();

  return (
    <DeleteDomainModal>
      <Text>
        Are you sure you want to remove the domain <b>{hostname}</b> from your site <b>{resourceName}</b>?
      </Text>

      <Text> After removing, your site will no longer be accessible through this domain.</Text>
    </DeleteDomainModal>
  );
};
