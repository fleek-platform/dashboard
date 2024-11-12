import { useState } from 'react';

import { LearnMoreMessage, PermissionsTooltip, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';
import { Button } from '@/ui';

import { AddApplicationCredentialsModal } from './AddAplicationCredentialsModal';

export const AddApplicationCredentials: React.FC<LoadingProps> = ({ isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);
  const hasAppCredentialsCreatePermission = usePermissions({ action: [constants.PERMISSION.APPLICATION_CREDENTIALS.CREATE] });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setClientId(null);
  };

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Application Credentials</SettingsBox.Title>
      <SettingsBox.Text>Create an application token to authenticate with the Fleek SDK.</SettingsBox.Text>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_APPLICATION_CREDENTIALS}>application credentials</LearnMoreMessage>
        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <PermissionsTooltip hasAccess={hasAppCredentialsCreatePermission}>
            <Button onClick={() => setIsModalOpen(true)} disabled={!hasAppCredentialsCreatePermission}>
              Create application credential
            </Button>
          </PermissionsTooltip>
        )}
      </SettingsBox.ActionRow>
      <AddApplicationCredentialsModal
        isOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        clientId={clientId}
        setClientId={setClientId}
      />
    </SettingsBox.Container>
  );
};
