import { Form, LearnMoreMessage, PermissionsTooltip } from '@/components';
import { SettingsBox } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';
import { getLinkPartsForSiteSlug } from '@/utils/siteSlugLinks';

export const SiteSlug: React.FC<LoadingProps> = ({ isLoading }) => {
  const field = Form.useField<string>('slug');
  const hasEditSlugPermission = usePermissions({
    action: [constants.PERMISSION.SITE.EDIT_SLUG],
  });

  const { protocol, slug, domain } = getLinkPartsForSiteSlug({
    slug: field.value,
  });

  return (
    <SettingsBox.Container>
      <SettingsBox.Column>
        <SettingsBox.Title>Site slug</SettingsBox.Title>
        <SettingsBox.Text className="flex whitespace-nowrap flex-wrap">
          The site will be available at: &nbsp;
          {!isLoading && (
            <>
              {protocol}
              <SettingsBox.Text as="span" variant="primary" weight={500}>
                {slug}
              </SettingsBox.Text>
              {domain}
            </>
          )}
        </SettingsBox.Text>
      </SettingsBox.Column>

      <PermissionsTooltip hasAccess={hasEditSlugPermission}>
        <Form.InputField
          name="slug"
          placeholder=""
          isLoading={isLoading}
          isDisabled={!hasEditSlugPermission}
        />
      </PermissionsTooltip>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_SITE_NAME}>
          site slug
        </LearnMoreMessage>

        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <Form.SubmitButton>Save changes</Form.SubmitButton>
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
