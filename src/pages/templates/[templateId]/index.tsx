import { routes } from '@fleek-platform/utils-routes';
import { useEffect, useState } from 'react';

import { RestrictionModal } from '@/components';
import { constants } from '@/constants';
import { Template } from '@/fragments';
import {
  TemplateReviewStatus,
  useTemplateQuery,
} from '@/generated/graphqlClient';
import { useSiteRestriction } from '@/hooks/useBillingRestriction';
import { useIsTemplateOwner } from '@/hooks/useIsTemplateOwner';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Page } from '@/types/App';
import { Button } from '@/ui';

const TemplatePage: Page = () => {
  const router = useRouter();
  const templateId = router.query.templateId! as string;

  const [templateQuery] = useTemplateQuery({
    variables: { where: { id: templateId } },
  });

  useEffect(() => {
    if (
      templateQuery.error ||
      (templateQuery.data &&
        templateQuery.data.template.reviewStatus !==
          TemplateReviewStatus.APPROVED)
    ) {
      router.replace(routes.template.list());
    }
  }, [templateQuery.data, templateQuery.error, router]);

  const template = templateQuery?.data?.template!;

  return (
    <>
      <Template.Details.Elements.Content
        template={template}
        isLoading={templateQuery.fetching}
      />
      <Template.Details.Elements.Overview
        template={template}
        isLoading={templateQuery.fetching}
      />
      <Template.Details.Elements.Details
        template={template}
        isLoading={templateQuery.fetching}
      />
      <Template.Details.Elements.Spacer />
      <Template.Details.Elements.SimilarTemplates templateId={templateId} />
    </>
  );
};

const PageNavContent: React.FC = () => {
  const router = useRouter();
  const templateId = router.query.templateId!;
  const session = useSessionContext();
  const projectId = session.project.id;
  const { isOwner, isLoading } = useIsTemplateOwner({ templateId });
  const hasManageBillingPermission = usePermissions({
    action: [constants.PERMISSION.BILLING.MANAGE],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasReachedSitesLimit = useSiteRestriction().hasReachedLimit;

  const handleDeploy = () => {
    if (!session.auth.accessToken) {
      session.auth.login(
        'dynamic',
        routes.project.site.newFromTemplate({
          projectId: '[projectId]',
          templateId,
        }),
      );

      return;
    }

    if (hasReachedSitesLimit) {
      setIsModalOpen(true);

      return;
    }

    router.push(routes.project.site.newFromTemplate({ projectId, templateId }));
  };

  return (
    <>
      <RestrictionModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        shouldShowUpgradePlan={hasManageBillingPermission}
      />
      {isOwner && !isLoading && (
        <Template.UpdateModal templateId={templateId}>
          <Button intent="neutral">Edit template</Button>
        </Template.UpdateModal>
      )}
      <Button onClick={handleDeploy}>Deploy template</Button>
    </>
  );
};

TemplatePage.getLayout = (page) => {
  const templateData = page.props.templateData;

  return (
    <Template.Details.Layout
      title={templateData?.name}
      description={templateData.description}
      nav={<PageNavContent />}
    >
      {page}
    </Template.Details.Layout>
  );
};

export default TemplatePage;
