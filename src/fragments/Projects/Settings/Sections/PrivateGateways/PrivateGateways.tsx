import { useMemo } from 'react';

import { Form, LearnMoreMessage, PermissionsTooltip, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { useSettingsItemContext } from '@/fragments/Site/Settings/Elements/SettingsItem.context';
import { VerifyDomainModal } from '@/fragments/Site/Settings/Sections/CustomDomains/VerifyDomainModal/VerifyDomainModal';
import { usePrivateGatewaysQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useSessionContext } from '@/providers/SessionProvider';
import { DisabledProps } from '@/types/Props';
import { Button } from '@/ui';

import { DeletePrimaryDomainModal } from './DeletePrimaryDomainModal';
import { DeletePrivateGatewayDomainModal } from './DeletePrivateGatewayDomainModal';
import { DeletePrivateGatewayModal } from './DeletePrivateGatewayModal';
import { usePrivateGatewayContext } from './PrivateGateway.context';
import { PrivateGatewaysList } from './PrivateGatewaysList';

export const PrivateGateways: React.FC = () => {
  const session = useSessionContext();
  const hasCreatePermission = usePermissions({ action: [constants.PERMISSION.PRIVATE_GATEWAY.CREATE] });

  const [privateGatewaysQuery] = usePrivateGatewaysQuery();

  const isLoading = useMemo(() => {
    return session.loading || privateGatewaysQuery.fetching;
  }, [privateGatewaysQuery.fetching, session.loading]);

  const privateGateways = privateGatewaysQuery.data?.privateGateways.data || [];

  return (
    <>
      <SettingsBox.Container>
        <SettingsBox.Title>Private Gateway</SettingsBox.Title>
        <SettingsBox.Text>Configure a private DNS endpoint to access your storage on Fleek.</SettingsBox.Text>

        <PermissionsTooltip hasAccess={hasCreatePermission}>
          <Form.InputField name="name" placeholder="Gateway" label="Name" isLoading={isLoading} isDisabled={!hasCreatePermission} />
        </PermissionsTooltip>

        <SettingsBox.ActionRow>
          <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_PRIVATE_GATEWAYS}>private gateways</LearnMoreMessage>
          {isLoading ? <SettingsBox.Skeleton variant="button" /> : <SubmitButton isDisabled={!hasCreatePermission} />}
        </SettingsBox.ActionRow>
      </SettingsBox.Container>

      <PrivateGatewaysList isLoading={isLoading} privateGateways={privateGateways} />
      <DeletePrivateGatewayModal />

      <VerifyDomainModal />
      <DeletePrivateGatewayDomainModal />
      <DeletePrimaryDomainModal />
    </>
  );
};

const SubmitButton: React.FC<DisabledProps> = ({ isDisabled }) => {
  const { isSubmitting, submit, shouldDisableSubmit } = Form.useContext();
  const { openModal } = usePrivateGatewayContext();
  const { setShouldOpenModalOnCreated } = useSettingsItemContext();
  const hasAddDomainPermission = usePermissions({ action: [constants.PERMISSION.PRIVATE_GATEWAY.ADD_AND_VERIFY_DOMAIN] });

  const handleSubmit = async () => {
    const zoneId = await submit();

    if (typeof zoneId === 'string' && hasAddDomainPermission) {
      openModal(zoneId);
      setShouldOpenModalOnCreated(true);
    }
  };

  return (
    <Button type="submit" loading={isSubmitting} disabled={shouldDisableSubmit || isDisabled} onClick={handleSubmit}>
      Create private gateway
    </Button>
  );
};
