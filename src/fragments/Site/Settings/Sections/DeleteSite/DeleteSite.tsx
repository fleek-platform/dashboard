import { routes } from '@fleek-platform/utils-routes';
import { forwardRef, useState } from 'react';
import * as zod from 'zod';

import {
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import { TwoFactorAuthentication } from '@/fragments';
import {
  TwoFactorProtectedActionType,
  useDeleteSiteMutation,
} from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { LoadingProps } from '@/types/Props';
import { Button, ButtonProps } from '@/ui';

import { DeleteSiteModal, DeleteSiteModalProps } from './DeleteSiteModal';

export type DeleteSiteProps = LoadingProps<
  Pick<DeleteSiteModalProps, 'siteName'>
>;

export const DeleteSite: React.FC<DeleteSiteProps> = ({
  isLoading,
  siteName,
}) => {
  const toast = useToast();
  const router = useRouter();

  const projectId = router.query.projectId!;
  const siteId = router.query.siteId!;

  const [isOpen, setIsOpen] = useState(false);

  const { isVisible } = TwoFactorAuthentication.useTwoFactorModal();

  const deleteForm = Form.useForm({
    values: {
      name: '',
    },
    schema: zod.object({
      name: zod.literal(siteName, {
        errorMap: () => ({ message: 'Invalid site name' }),
      }),
    }),
    onSubmit: async () => {
      try {
        const result = await deleteSite({ where: { id: siteId } });

        if (!result.data) {
          throw result.error;
        }

        setIsOpen(false);

        toast.success({ message: 'Site deleted successfully' });
        await router.replace(routes.project.site.list({ projectId }));
      } catch (error) {
        toast.error({ error, log: 'Error deleting site' });
      }
    },
  });

  const [, deleteSite] = TwoFactorAuthentication.useMutation({
    useMutationHook: useDeleteSiteMutation,
    actionType: TwoFactorProtectedActionType.DELETE_SITE,
    parentForm: deleteForm,
  });

  return (
    <Form.Provider value={deleteForm}>
      <SettingsBox.Container>
        <SettingsBox.Column>
          <SettingsBox.Title>Delete site</SettingsBox.Title>
          <SettingsBox.Text>
            Deleting a site is an irreversible action so proceed with caution.
          </SettingsBox.Text>
        </SettingsBox.Column>

        <SettingsBox.ActionRow>
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_DELETE_SITE}
          >
            deleting a site
          </LearnMoreMessage>

          <DeleteSiteModal
            siteName={siteName}
            isOpen={isVisible ? false : isOpen}
            setIsOpen={setIsOpen}
          >
            {isLoading ? (
              <SettingsBox.Skeleton variant="button" />
            ) : (
              <DeleteSiteButton />
            )}
          </DeleteSiteModal>
        </SettingsBox.ActionRow>
      </SettingsBox.Container>
    </Form.Provider>
  );
};

const DeleteSiteButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const hasDeleteSitePermission = usePermissions({
      action: [constants.PERMISSION.SITE.DELETE],
    });

    const children = (
      <Button
        intent="neutral"
        disabled={!hasDeleteSitePermission}
        {...props}
        ref={ref}
      >
        Delete site
      </Button>
    );

    if (!hasDeleteSitePermission) {
      return (
        <PermissionsTooltip hasAccess={hasDeleteSitePermission} asChild>
          {children}
        </PermissionsTooltip>
      );
    }

    return children;
  },
);
