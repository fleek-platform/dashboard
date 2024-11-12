import { LearnMoreMessage } from '@/components';
import { SettingsBox } from '@/components';
import { constants } from '@/constants';

export const StorageNotifications: React.FC = () => {
  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Storage</SettingsBox.Title>
      <SettingsBox.Text>
        Use Fleek as a storage layer for your project, powered by IPFS,
        Filecoin, and Arweave.
      </SettingsBox.Text>

      <SettingsBox.ActionRow>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_CLOUD_STORAGE}
        >
          storage
        </LearnMoreMessage>
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
