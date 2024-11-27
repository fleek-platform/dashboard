import { DeletePrimaryDomainModal as DeleteModal } from '@/components';
import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { Text } from '@/ui';

export const DeletePrimaryDomainModal: React.FC = () => {
  const { resourceName, hostname } = useSettingsItemContext();

  return (
    <DeleteModal title="Remove Domain from Gateway" comboboxLabel="New Primary Gateway Domain">
      <Text>
        Are you sure you want to remove the primary gateway domain <b>{hostname}</b> from your gateway <b>{resourceName}</b>?
      </Text>

      <Text>After removing, your gateway will no longer be accessible through this domain.</Text>

      <Text>Please select another domain to use as your primary gateway domain:</Text>
    </DeleteModal>
  );
};
