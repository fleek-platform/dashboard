import { routes } from '@fleek-platform/utils-routes';
import { useState } from 'react';
import { match } from 'ts-pattern';

import {
  BadgeText,
  CustomTooltip,
  Link,
  SettingsBox,
  SettingsListItem,
} from '@/components';
import { Template } from '@/fragments/Template/Template';
import {
  TemplateReviewStatus,
  useDeleteTemplateMutation,
  useMeQuery,
  useTemplatesQuery,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { LoadingProps } from '@/types/Props';
import { Templates } from '@/types/Template';
import { Box, Icon } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

export const ManageTemplates = () => {
  const [meQuery] = useMeQuery();
  const userId = meQuery.data?.user.id!;
  const [templatesQuery] = useTemplatesQuery({
    variables: { where: { createdById: userId } },
    pause: !userId,
  });

  const isLoading =
    (meQuery.fetching || templatesQuery.fetching) && !templatesQuery.data;
  const templates = templatesQuery.data?.templates.data || [];

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Manage Templates</SettingsBox.Title>
      <SettingsBox.Text>
        Remove or modify templates from your collection.
      </SettingsBox.Text>
      <TemplatesList templates={templates} isLoading={isLoading} />
    </SettingsBox.Container>
  );
};

type TemplatesListProps = LoadingProps<{
  templates: Templates;
}>;

const TemplatesList: React.FC<TemplatesListProps> = ({
  templates,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <>
        <SettingsListItem.Skeleton enableAvatar />
        <SettingsListItem.Skeleton enableAvatar />
        <SettingsListItem.Skeleton enableAvatar />
      </>
    );
  }

  if (templates.length === 0) {
    return (
      <SettingsBox.EmptyContent
        title="No Templates"
        description="Once you create a template, they will appear here."
      />
    );
  }

  return (
    <>
      {templates.map((template) => (
        <SettingsListItem
          key={template.id}
          avatarSrc={template.siteAvatar}
          title={template.name}
          subtitle={`Created ${getDurationUntilNow({ isoDateString: template.createdAt, shortFormat: true })}`}
          avatarIcon="image"
        >
          <Box className="flex-row gap-2 items-center">
            {match(template.reviewStatus)
              .with(TemplateReviewStatus.REJECTED, () => (
                <CustomTooltip
                  side="top"
                  content={template.reviewComment!}
                  delayDuration={0}
                >
                  <BadgeText colorScheme="red">
                    Rejected
                    <Icon name="question" />
                  </BadgeText>
                </CustomTooltip>
              ))
              .with(TemplateReviewStatus.PENDING, () => (
                <BadgeText colorScheme="amber">Review pending</BadgeText>
              ))
              .with(TemplateReviewStatus.APPROVED, () => (
                <BadgeText colorScheme="green">
                  {`${template.usageCount} Deployment${template.usageCount > 1 ? 's' : ''}`}{' '}
                </BadgeText>
              ))
              .exhaustive()}

            <Dropdown
              templateId={template.id}
              reviewStatus={template.reviewStatus}
            />
          </Box>
        </SettingsListItem>
      ))}
    </>
  );
};

type DropdownProps = {
  templateId: string;
  reviewStatus: TemplateReviewStatus;
};

const Dropdown: React.FC<DropdownProps> = ({ templateId, reviewStatus }) => {
  const toast = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [deleteTemplateMutation, deleteTemplate] = useDeleteTemplateMutation();

  const handleCopyTemplateUrl = () => {
    try {
      const url =
        window?.location.origin + routes.template.indexed({ templateId });
      copyToClipboard(url);
      toast.success({ message: 'Template url copied to clipboard' });
    } catch (error) {
      toast.error({ message: 'Failed to copy Template url to clipboard' });
    }
  };

  const handleDeleteTemplate = async () => {
    try {
      await deleteTemplate({ where: { id: templateId } });
      toast.success({ message: 'Template successfully deleted' });
    } catch (error) {
      toast.error({ error, log: 'Failed to delete template' });
    }
  };

  const handleEditTemplate = () => {
    setIsEditModalOpen(true);
  };

  return (
    <>
      <SettingsListItem.DropdownMenu
        isLoading={deleteTemplateMutation.fetching}
      >
        {reviewStatus === TemplateReviewStatus.APPROVED && (
          <Link href={routes.template.indexed({ templateId })}>
            <SettingsListItem.DropdownMenuItem icon="arrow-up-right">
              View Template
            </SettingsListItem.DropdownMenuItem>
          </Link>
        )}
        <SettingsListItem.DropdownMenuItem
          icon="pencil"
          onSelect={handleEditTemplate}
        >
          Edit Template
        </SettingsListItem.DropdownMenuItem>
        <SettingsListItem.DropdownMenuSeparator />
        {reviewStatus === TemplateReviewStatus.APPROVED && (
          <>
            <SettingsListItem.DropdownMenuItem
              icon="copy"
              onClick={handleCopyTemplateUrl}
            >
              Copy URL
            </SettingsListItem.DropdownMenuItem>
            <SettingsListItem.DropdownMenuSeparator />
          </>
        )}
        <SettingsListItem.DropdownMenuItem
          icon="trash"
          onClick={handleDeleteTemplate}
        >
          Delete
        </SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>

      <Template.UpdateModal
        templateId={templateId}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </>
  );
};
