import { Form, LearnMoreMessage, PermissionsTooltip, SiteField } from '@/components';
import { SettingsBox } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';

export const RenameSite: React.FC<LoadingProps> = ({ isLoading }) => {
  const hasEditPermission = usePermissions({ action: [constants.PERMISSION.SITE.EDIT_NAME] });

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Site Name</SettingsBox.Title>
      <SettingsBox.Text>The name of your site.</SettingsBox.Text>

      <PermissionsTooltip hasAccess={hasEditPermission}>
        <SiteField isLoading={isLoading} isDisabled={!hasEditPermission} />
      </PermissionsTooltip>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_SITE_NAME}>site names</LearnMoreMessage>

        {isLoading ? <SettingsBox.Skeleton variant="button" /> : <Form.SubmitButton>Save changes</Form.SubmitButton>}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
