import { siteName, slug } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';
import * as zod from 'zod';

import { Form } from '@/components';
import { constants } from '@/constants';
import { Site, TwoFactorAuthentication } from '@/fragments';
import { UpdateSiteDataInput, useMeQuery, usePurgeSiteCacheMutation, useSiteQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useUpdateSite } from '@/hooks/useUpdateSite';
import { Page } from '@/types/App';
import { HandleLogoUploadProps } from '@/types/Logo';
import { withAccess } from '@/utils/withAccess';

const SiteSettingsPage: Page = () => {
  const toast = useToast();
  const router = useRouter();
  const client = useClient();

  const siteId = router.query.siteId!;
  const [meQuery] = useMeQuery();
  const [siteQuery, refetchSiteQuery] = useSiteQuery({ variables: { where: { id: siteId } }, pause: !siteId });

  const isLoading = siteQuery.fetching || meQuery.fetching;

  const [, purgeSiteCache] = usePurgeSiteCacheMutation();

  const { update: updateSite } = useUpdateSite();

  const renameForm = Form.useForm({
    values: {
      name: siteQuery.data?.site.name || '',
    },
    schema: zod.object({ name: siteName }),
    extraValidations: {
      name: Form.createExtraValidation.siteName(client),
    },
    onSubmit: async (values) => {
      try {
        if (!siteQuery.data) {
          throw new UpdateSiteUpdateError('Site not found');
        }

        const site = siteQuery.data.site;

        if (site.name === values.name) {
          return;
        }

        const data: UpdateSiteDataInput = { name: values.name };

        await updateSite({ updateSiteArgs: data, successMessage: 'Site renamed successfully' });
      } catch (error) {
        toast.error({ error, log: 'Error updating site' });
      }
    },
  });

  const handlePurgeCache = async () => {
    try {
      const purgeCacheResult = await purgeSiteCache({ where: { id: siteId } });

      if (!purgeCacheResult.data) {
        throw purgeCacheResult.error;
      }

      toast.success({ message: 'Successfully purged site Cache' });
    } catch (error) {
      toast.error({ error, log: 'Failed to Purge cache' });
    }
  };

  const handleLogoUpload = async ({ image }: HandleLogoUploadProps) => {
    const data: UpdateSiteDataInput = { avatar: image };

    await updateSite({ updateSiteArgs: data, successMessage: 'Site logo uploaded successfully' });
    refetchSiteQuery({ requestPolicy: 'network-only' });
  };

  const updateSlugForm = Form.useForm({
    values: {
      slug: siteQuery.data?.site.slug || '',
    },
    schema: zod.object({ slug }),
    extraValidations: {
      slug: Form.createExtraValidation.slug(client),
    },
    onSubmit: async (values) => {
      try {
        if (!siteQuery.data) {
          throw new UpdateSiteUpdateError('Site not found');
        }

        const site = siteQuery.data?.site;

        if (site?.slug === values.slug) {
          return;
        }

        const data: UpdateSiteDataInput = { slug: values.slug };
        await updateSite({ updateSiteArgs: data, successMessage: 'Site slug updated successfully' });
      } catch (error) {
        toast.error({ error, log: 'Error updating site slug' });
      }
    },
  });

  return (
    <>
      <Form.Provider value={renameForm}>
        <Site.Settings.Sections.RenameSite isLoading={isLoading} />
      </Form.Provider>

      <Form.Provider value={updateSlugForm}>
        <Site.Settings.Sections.SiteSlug isLoading={isLoading} />
      </Form.Provider>

      <Site.Settings.Sections.SiteLogo onSubmit={handleLogoUpload} isLoading={isLoading} initialImage={siteQuery.data?.site.avatar} />

      <Site.Settings.Sections.PurgeCache onSubmit={handlePurgeCache} isLoading={isLoading} />

      <TwoFactorAuthentication.Provider>
        <Site.Settings.Sections.DeleteSite siteName={siteQuery.data?.site.name} isLoading={isLoading} />
      </TwoFactorAuthentication.Provider>
    </>
  );
};

SiteSettingsPage.getLayout = (page) => <Site.Settings.Layout>{page}</Site.Settings.Layout>;

export default withAccess({
  Component: SiteSettingsPage,
  requiredPermissions: [
    constants.PERMISSION.SITE.EDIT_NAME,
    constants.PERMISSION.SITE.EDIT_SLUG,
    constants.PERMISSION.SITE.EDIT_AVATAR,
    constants.PERMISSION.SITE.PURGE_CACHE,
    constants.PERMISSION.SITE.DELETE,
  ],
});

class UpdateSiteUpdateError extends Error {}
