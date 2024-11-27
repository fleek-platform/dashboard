import { LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { Button } from '@/ui';

import { CreateTemplateModal } from './CreateTemplateModal';

export const Templates: React.FC = () => (
  <SettingsBox.Container>
    <SettingsBox.Title>Templates</SettingsBox.Title>
    <SettingsBox.Text>Create frontend templates and share them with the community.</SettingsBox.Text>

    <SettingsBox.ActionRow>
      <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_TEMPLATES}>templates</LearnMoreMessage>

      <CreateTemplateModal>
        <Button>Create template</Button>
      </CreateTemplateModal>
    </SettingsBox.ActionRow>
  </SettingsBox.Container>
);
