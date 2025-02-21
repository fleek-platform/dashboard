import { Form, LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { LoadingProps } from '@/types/Props';

export const RenameUser: React.FC<LoadingProps> = ({ isLoading }) => (
  <SettingsBox.Container>
    <SettingsBox.Title>Username</SettingsBox.Title>
    <SettingsBox.Text>This is your username within Fleek.</SettingsBox.Text>

    <Form.InputField name="username" isLoading={isLoading} />

    <SettingsBox.ActionRow>
      <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_USERNAME}>username</LearnMoreMessage>
      {isLoading ? <SettingsBox.Skeleton variant="button" /> : <Form.SubmitButton>Save Changes</Form.SubmitButton>}
    </SettingsBox.ActionRow>
  </SettingsBox.Container>
);
