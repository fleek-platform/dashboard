import { DeletePrimaryDomainModal as DeleteModal } from '@/components';
import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { Text } from '@/ui';

export const DeletePrimaryDomainModal: React.FC = () => {
  const { resourceName, hostname } = useSettingsItemContext();

  return (
    <DeleteModal>
      <Text>
        Are you sure you want to remove the primary domain <b>{hostname}</b>{' '}
        from your site <b>{resourceName}</b>?
      </Text>

      <Text>
        After removing, your site will no longer be accessible through this
        domain.
      </Text>

      <Text>Please select another domain to use as your primary domain:</Text>
    </DeleteModal>
  );
};
