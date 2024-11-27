import { createTemplateSchema } from '@fleek-platform/utils-validation';
import { useTheme } from 'next-themes';
import { useClient } from 'urql';
import zod from 'zod';

import { ComingSoon, Form } from '@/components';
import { Profile } from '@/fragments';
import { useCreateTemplateMutation } from '@/generated/graphqlClient';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';
import { useToast } from '@/hooks/useToast';
import { Page } from '@/types/App';
import { Site } from '@/types/Site';
import { TemplateCategory } from '@/types/Template';

const TemplatesSettingsPage: Page = () => {
  const flags = useFeatureFlags();

  if (flags.enableTemplateCreation) {
    return <FeaturePage />;
  }

  return <ComingSoonPage />;
};

const FeaturePage: React.FC = () => {
  const toast = useToast();
  const client = useClient();
  const [, createTemplate] = useCreateTemplateMutation();

  const createTemplateForm = Form.useForm({
    values: {
      name: '',
      description: '',

      site: undefined as unknown as Site,
      category: undefined as unknown as TemplateCategory,
      banner: undefined as unknown as File,
    },
    schema: zod.object({
      name: createTemplateSchema.shape.data.shape.name,
      description: createTemplateSchema.shape.data.shape.description,
      site: zod.object({
        id: createTemplateSchema.shape.data.shape.siteId,
      }),
      category: zod.object({
        id: createTemplateSchema.shape.data.shape.templateCategoryId,
      }),
    }),
    extraValidations: {
      name: Form.createExtraValidation.templateName(client),
      banner: async (banner: File) => {
        if (!banner) {
          return { status: 'invalid', error: 'Banner is required' };
        }

        return { status: 'valid' };
      },
    },
    onSubmit: async (data) => {
      try {
        const result = await createTemplate({
          data: {
            name: data.name,
            description: data.description,
            siteId: data.site.id,
            templateCategoryId: data.category.id,
            banner: data.banner,
          },
        });

        if (!result.data) {
          throw result.error;
        }

        return result.data.createTemplate.id;
      } catch (error) {
        toast.error({ error, log: 'Failed to create Template' });
      }
    },
  });

  return (
    <>
      <Form.Provider value={createTemplateForm}>
        <Profile.Settings.Sections.Templates />
      </Form.Provider>

      <Profile.Settings.Sections.ManageTemplates />
    </>
  );
};

const ComingSoonPage: React.FC = () => {
  const { resolvedTheme = 'dark' } = useTheme();

  return (
    <ComingSoon.Modal
      imgSrc={`/assets/static/${resolvedTheme}/templates-coming-soon.png`}
      modalContent={
        <>
          <ComingSoon.Modal.Description>
            Soon we will introduce the create template flow, here you will be able to upload templates to the public Fleek template gallery,
            where any other Fleek user can pick and deploy them.
          </ComingSoon.Modal.Description>
        </>
      }
    >
      <ComingSoon.Skeleton.Container>
        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.Row variant="small">
            <ComingSoon.Skeleton.TextSkeleton />
            <ComingSoon.Skeleton.TextSkeleton />
          </ComingSoon.Skeleton.Row>
          <ComingSoon.Skeleton.BigSkeleton />
          <ComingSoon.Skeleton.TextSkeleton />
        </ComingSoon.Skeleton.Box>
        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.Row variant="small">
            <ComingSoon.Skeleton.TextSkeleton />
            <ComingSoon.Skeleton.TextSkeleton />
          </ComingSoon.Skeleton.Row>
          <ComingSoon.Skeleton.BigSkeleton variant="medium" />
        </ComingSoon.Skeleton.Box>

        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.TextSkeleton />
          <ComingSoon.Skeleton.TextSkeleton variant="large" />
          <ComingSoon.Skeleton.TextSkeleton variant="large" />
          <ComingSoon.Skeleton.TextSkeleton variant="large" />
        </ComingSoon.Skeleton.Box>

        <ComingSoon.Skeleton.Box>
          <ComingSoon.Skeleton.TextSkeleton />
          <ComingSoon.Skeleton.Row>
            <ComingSoon.Skeleton.BigSkeleton />
            <ComingSoon.Skeleton.BigSkeleton />
            <ComingSoon.Skeleton.BigSkeleton />
          </ComingSoon.Skeleton.Row>
        </ComingSoon.Skeleton.Box>
      </ComingSoon.Skeleton.Container>
    </ComingSoon.Modal>
  );
};

TemplatesSettingsPage.getLayout = (page) => <Profile.Settings.Layout>{page}</Profile.Settings.Layout>;

export default TemplatesSettingsPage;
