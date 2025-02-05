import { updateSiteSchema } from '@fleek-platform/utils-validation';

import { Form } from '@/components';
import { constants } from '@/constants';
import { Site } from '@/fragments';
import { useSiteBuildSettingsGuard } from '@/fragments/GitIntegration/useSiteBuildSettingsGuard';
import { UpdateSiteDataInput, useSiteQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useUpdateSite } from '@/hooks/useUpdateSite';
import { Page } from '@/types/App';
import { isSiteSelfManaged } from '@/utils/isSiteSelfManaged';
import { withAccess } from '@/utils/withAccess';

const BuildSettingsPage: Page = () => {
  const router = useRouter();
  const toast = useToast();

  const [siteQuery, refetchSiteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });
  const buildSettingsGuard = useSiteBuildSettingsGuard({
    siteQuery,
    refetchSiteQuery,
  });
  const isSelfManaged = isSiteSelfManaged(siteQuery?.data?.site);

  const { update: updateSite } = useUpdateSite();

  const siteBuildForm = Form.useForm({
    options: { partial: true },
    values: {
      distDirectory: siteQuery.data?.site.distDirectory || '',
      buildCommand: siteQuery.data?.site.buildCommand || '',
      frameworkId: siteQuery.data?.site.framework?.id || null,
      baseDirectory: siteQuery.data?.site.baseDirectory || '',
    },
    schema: updateSiteSchema.shape.data,
    onSubmit: async (values) => {
      try {
        if (!siteQuery.data) {
          throw new UpdateSiteBuildError('Site not found');
        }

        const site = siteQuery.data.site;
        const updateSiteArgs: UpdateSiteDataInput = {};

        if (values.distDirectory !== site.distDirectory) {
          updateSiteArgs.distDirectory = values.distDirectory;
        }

        if (values.buildCommand !== site.buildCommand) {
          updateSiteArgs.buildCommand = values.buildCommand;
        }

        if (values.frameworkId !== site.framework?.id) {
          updateSiteArgs.frameworkId = values.frameworkId;
        }

        if (values.baseDirectory !== site.baseDirectory) {
          updateSiteArgs.baseDirectory = values.baseDirectory;
        }

        await updateSite({
          updateSiteArgs,
          successMessage: 'Site build settings updated successfully',
        });
      } catch (error) {
        toast.error({ error, log: 'Error updating site build settings' });
      }
    },
  });

  const deployContextsForm = Form.useForm({
    options: { partial: true },
    values: {
      sourceBranch: siteQuery.data?.site.sourceBranch || '',
      enablePreviews: siteQuery.data?.site.enablePreviews || false,
      deployOnBranchUpdate: siteQuery.data?.site.deployOnBranchUpdate || false,
      dockerImage: siteQuery.data?.site.dockerImage || '',
    },
    schema: updateSiteSchema.shape.data,
    onSubmit: async (values) => {
      try {
        if (!siteQuery.data) {
          throw new UpdateSiteDeployContextsError('Site not found');
        }

        const site = siteQuery.data.site;
        const updateSiteArgs: UpdateSiteDataInput = {};

        if (values.sourceBranch !== site.sourceBranch) {
          updateSiteArgs.sourceBranch = values.sourceBranch;
        }

        if (values.dockerImage !== site.dockerImage) {
          updateSiteArgs.dockerImage = values.dockerImage;
        }

        if (values.enablePreviews !== site.enablePreviews) {
          updateSiteArgs.enablePreviews = values.enablePreviews;
        }

        if (values.deployOnBranchUpdate !== site.deployOnBranchUpdate) {
          updateSiteArgs.deployOnBranchUpdate = values.deployOnBranchUpdate;
        }

        await updateSite({
          updateSiteArgs,
          successMessage: 'Site deploy contexts updated successfully',
        });
      } catch (error) {
        toast.error({ error, log: 'Error updating site deploy contexts' });
      }
    },
  });

  if (buildSettingsGuard.isLoading || !router.isReady) {
    return (
      <>
        <Form.Provider value={siteBuildForm}>
          <Site.Settings.Sections.SiteBuild isLoading={true} />
        </Form.Provider>
      </>
    );
  }

  if (buildSettingsGuard.gitProvider && buildSettingsGuard.shouldInstall) {
    return buildSettingsGuard.ManageGitIntegrationComponent;
  }

  return (
    <>
      <Form.Provider value={siteBuildForm}>
        <Site.Settings.Sections.SiteBuild
          isSelfManaged={isSelfManaged}
          gitProviderId={
            siteQuery.data?.site.gitIntegration?.gitProvider.id ?? undefined
          }
          isLoading={
            buildSettingsGuard.isLoading || (siteQuery.fetching as true)
          }
          sourceRepositoryOwner={
            siteQuery.data?.site.sourceRepositoryOwner ?? undefined
          }
          sourceRepositoryName={
            siteQuery.data?.site.sourceRepositoryName ?? undefined
          }
          sourceBranch={siteQuery.data?.site.sourceBranch ?? undefined}
        />
      </Form.Provider>

      {siteQuery.data?.site.sourceProvider && (
        <Form.Provider value={deployContextsForm}>
          <Site.Settings.Sections.DeployContexts
            site={siteQuery.data.site}
            sourceRepositoryName={
              siteQuery.data?.site.sourceRepositoryName ?? undefined
            }
            sourceRepositoryOwner={
              siteQuery.data?.site.sourceRepositoryOwner ?? undefined
            }
          />
        </Form.Provider>
      )}
    </>
  );
};

BuildSettingsPage.getLayout = (page) => (
  <Site.Settings.Layout>{page}</Site.Settings.Layout>
);

export default withAccess({
  Component: BuildSettingsPage,
  requiredPermissions: [constants.PERMISSION.SITE.VIEW_BUILD_SETTINGS],
});

class UpdateSiteBuildError extends Error {}

class UpdateSiteDeployContextsError extends Error {}
