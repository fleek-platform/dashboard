import { Permissions } from '@fleek-platform/utils-permissions';
import { routes } from '@fleek-platform/utils-routes';
import { forwardRef, useState } from 'react';
import { useClient } from 'urql';
import * as zod from 'zod';

import {
  CustomTooltip,
  Form,
  LearnMoreMessage,
  Link,
  Modal,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import { TwoFactorAuthentication } from '@/fragments';
import {
  ProjectsDocument,
  ProjectsQuery,
  ProjectsQueryVariables,
  TwoFactorProtectedActionType,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useProjectQuery,
  useProjectsQuery,
} from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useBillingContext } from '@/providers/BillingProvider';
import { useCookies } from '@/providers/CookiesProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Button, Dialog, Text } from '@/ui';

import {
  DeleteProjectModal,
  DeleteProjectModalProps,
} from './DeleteProjectModal';

export type DeleteProjectProps = LoadingProps<
  Pick<DeleteProjectModalProps, 'projectName'> & {
    isOnlyProject: boolean;
  }
>;

export const DeleteProject: React.FC<DeleteProjectProps> = ({
  projectName,
  isOnlyProject,
  isLoading,
}) => {
  const client = useClient();
  const router = useRouter();
  const toast = useToast();
  const cookies = useCookies();

  const [, createProject] = useCreateProjectMutation();

  const [, refetchProjectsQuery] = useProjectsQuery();
  const [projectQuery] = useProjectQuery({
    variables: { where: { id: router.query.projectId! } },
    pause: !router.query.projectId,
  });

  const deleteForm = Form.useForm({
    values: {
      name: '',
    },
    schema: zod.object({
      name: zod.literal(projectQuery.data?.project.name, {
        errorMap: () => ({ message: 'Incorrect project name' }),
      }),
    }),
    onSubmit: async (values) => {
      try {
        const projects = await client.query<
          ProjectsQuery,
          ProjectsQueryVariables
        >(ProjectsDocument, {}, { requestPolicy: 'network-only' });

        if (!projects.data) {
          throw (
            projects.error ||
            new Error('There was an error getting available projects')
          );
        }

        let redirectProjectId = projects.data.projects.data.find(
          (project) =>
            project.name !== values.name &&
            Permissions.parse(
              project.currentUserMembership.permissionGroup.permissions.join(
                ',',
              ),
            ).has('PROJECT_EDIT_NAME'),
        )?.id;

        if (!redirectProjectId) {
          const project = await createProject({
            data: { name: constants.FIRST_PROJECT_NAME },
          });
          refetchProjectsQuery({ requestPolicy: 'network-only' });

          if (
            project.error ||
            !project.data ||
            !project.data.createProject.id
          ) {
            throw (
              project.error ||
              new Error(`Couldn't create a new project before deleting`)
            );
          }

          redirectProjectId = project.data.createProject.id;
        }

        const result = await deleteProject({
          where: { id: router.query.projectId! },
        });

        if (!result.data) {
          throw (
            result.error || new Error('There was an error deleting the project')
          );
        }

        if (redirectProjectId) {
          cookies.set('projectId', redirectProjectId);
        }

        toast.success({
          message: `Project: ${values.name} deleted successfully`,
        });

        await router.replace(
          routes.project.home({ projectId: redirectProjectId! }),
        );
      } catch (error) {
        toast.error({ error, log: `Error deleting project ${values.name}` });
      }
    },
  });

  const [, deleteProject] = TwoFactorAuthentication.useMutation({
    useMutationHook: useDeleteProjectMutation,
    actionType: TwoFactorProtectedActionType.DELETE_PROJECT,
    parentForm: deleteForm,
  });

  return (
    <Form.Provider value={deleteForm}>
      <SettingsBox.Container>
        <SettingsBox.Title>Delete Project</SettingsBox.Title>
        <SettingsBox.Text>
          Deleting a project is an irreversible action so proceed with caution.
        </SettingsBox.Text>

        <SettingsBox.ActionRow>
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_DELETE_PROJECT}
          >
            deleting a project
          </LearnMoreMessage>

          {isLoading ? (
            <SettingsBox.Skeleton variant="button" />
          ) : (
            <DeleteProjectButton
              isOnlyProject={isOnlyProject}
              projectName={projectName}
            />
          )}
        </SettingsBox.ActionRow>
      </SettingsBox.Container>
    </Form.Provider>
  );
};

type DeleteProjectButtonProps = {
  isOnlyProject: boolean;
  projectName?: string;
};

const DeleteProjectButton = forwardRef<
  HTMLButtonElement,
  DeleteProjectButtonProps
>(({ isOnlyProject, projectName, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  const { subscription } = useBillingContext();
  const hasDeleteProjectPermission = usePermissions({
    action: [constants.PERMISSION.PROJECT.DELETE],
  });
  const { isVisible } = TwoFactorAuthentication.useTwoFactorModal();

  const children = (
    <Button
      intent="neutral"
      disabled={isOnlyProject || !hasDeleteProjectPermission}
      {...props}
      ref={ref}
    >
      Delete project
    </Button>
  );

  if (!hasDeleteProjectPermission) {
    return (
      <PermissionsTooltip hasAccess={hasDeleteProjectPermission} asChild>
        {children}
      </PermissionsTooltip>
    );
  }

  if (isOnlyProject) {
    return (
      <CustomTooltip
        content="You cannot delete the only project within your Fleek account"
        side="top"
        asChild
      >
        {children}
      </CustomTooltip>
    );
  }

  if (subscription.data && !subscription.data?.endDate) {
    return <SubscriptionWarningModal>{children}</SubscriptionWarningModal>;
  }

  return (
    <DeleteProjectModal
      projectName={projectName}
      isOpen={isVisible ? false : isOpen}
      setIsOpen={setIsOpen}
    >
      {children}
    </DeleteProjectModal>
  );
});

const SubscriptionWarningModal: React.FC<ChildrenProps> = ({ children }) => {
  const {
    project: { id: projectId },
  } = useSessionContext();

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Overlay />

      <Modal.Content>
        <Modal.Heading>Cancel subscription to continue</Modal.Heading>
        <Text>
          If you are sure you want to delete your project, you must first cancel
          your subscription.
        </Text>

        <Modal.CTARow>
          <Dialog.Close asChild>
            <Button intent="ghost" className="flex-1">
              Never mind
            </Button>
          </Dialog.Close>

          <Link href={routes.project.billing({ projectId })} className="flex-1">
            <Button className="w-full">Go to billing</Button>
          </Link>
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};
