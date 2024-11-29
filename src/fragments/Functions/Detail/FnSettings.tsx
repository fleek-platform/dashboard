import { routes } from '@fleek-platform/utils-routes';
import { isEmpty } from 'lodash';
import type React from 'react';
import { type PropsWithChildren, useCallback, useState } from 'react';

import {
  AlertBox,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import {
  FleekFunctionStatus,
  type UpdateFleekFunctionDataInput,
  useUpdateFleekFunctionMutation,
} from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, Button, Skeleton, Switch } from '@/ui';

import {
  type FunctionDetailContext,
  useDeleteFunction,
  useFunctionDetailContext,
} from './Context';
import { FnDeleteModal } from './FnDeleteModal';
import { UpdateForm } from './UpdateForm';

const { ACTIVE, INACTIVE } = FleekFunctionStatus;

export const FnSettings = () => {
  const ctxt = useFunctionDetailContext(true);
  const content = ctxt ? (
    <FnSettingsContent {...ctxt} />
  ) : (
    <FnSettingsSkeleton />
  );

  return content;
};

const FnSettingsSkeleton = () => (
  <>
    <Box variant="container">
      <Box className="gap-2">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="text" className="w-1/6" />
      </Box>
      <Skeleton variant="text" className="h-8" />
    </Box>
    {Array.from({ length: 2 }).map((_, idx) => (
      <Box key={idx} variant="container">
        <Box className="gap-2">
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="text" className="w-1/6" />
        </Box>
        <Skeleton variant="text" className="h-8" />
        <Box className="flex-row justify-between items-center">
          <Skeleton variant="text" className="w-1/4" />
          <Skeleton variant="button" className="w-1/6" />
        </Box>
      </Box>
    ))}
    <Box variant="container">
      <Box className="gap-2">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="text" className="w-1/6" />
      </Box>
      <Box className="flex-row justify-between items-center">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="button" className="w-1/6" />
      </Box>
    </Box>
  </>
);

type FnSettingsContentProps = NonNullable<FunctionDetailContext>;

export const FnSettingsContent = (fn: FnSettingsContentProps) => {
  const { id, name, status, slug } = fn;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteFleekFunctionMutation] = useDeleteFunction(fn);
  const [updateFleekFunctionMutation, updateFleekFunction] =
    useUpdateFleekFunctionMutation();

  const hasDeleteFunctionPermission = usePermissions({
    action: [constants.PERMISSION.FUNCTIONS.DELETE],
  });

  const toast = useToast();
  const router = useRouter();
  const session = useSessionContext();

  const handleUpdate = useCallback(
    async (data: UpdateFleekFunctionDataInput) => {
      await updateFleekFunction({ where: { id }, data });
      const newName = data.name;

      if (newName) {
        router.replace(
          routes.project.function.settings({
            fnName: newName!,
            projectId: session.project.id,
          }),
        );
      }

      toast.success({ message: 'Settings saved!' });
    },
    [updateFleekFunction, id, toast, router, session.project.id],
  );

  const [statusChanging, setStatusChanging] = useState(false);
  const isActive = status === ACTIVE;
  const handleStatusToggle = useCallback(async () => {
    setStatusChanging(true);
    await handleUpdate({ status: isActive ? INACTIVE : ACTIVE });
    setStatusChanging(false);
  }, [handleUpdate, isActive]);

  const isLoading = session.loading || isEmpty(fn);

  return (
    <>
      <SettingCard
        title="Run or stop function"
        subtitle="Start or stop your function on demand."
        rightContent={
          <Switch
            checked={isActive}
            onCheckedChange={handleStatusToggle}
            disabled={updateFleekFunctionMutation.fetching}
            loading={statusChanging}
            intent={isActive ? 'success' : 'neutral'}
            labelOn="Running"
            labelOff="Stopped"
            className="w-[7rem]"
          />
        }
      >
        <AlertBox size="sm" variant="primary" className="bg-transparent">
          Stopping a function will not remove it from IPFS. Functions that have
          been stopped can be run by users who know the function&#39;s CID.
        </AlertBox>
      </SettingCard>

      <SettingCard title="Function name" subtitle="The name of your function.">
        <UpdateForm
          type="name"
          value={name}
          onSubmit={handleUpdate}
          isLoading={isLoading}
        >
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_LEARN_MORE}
          >
            function names
          </LearnMoreMessage>
        </UpdateForm>
      </SettingCard>

      <SettingCard
        title="Function slug"
        subtitle="The URL the function will operate on."
      >
        <UpdateForm
          type="slug"
          value={slug}
          onSubmit={handleUpdate}
          isLoading={isLoading}
        >
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_LEARN_MORE}
          >
            function slugs
          </LearnMoreMessage>
        </UpdateForm>
      </SettingCard>

      <SettingCard
        title="Delete this function"
        subtitle="Deleting a function is an irreversible action, so proceed with caution."
      >
        <Box className="flex-row items-center justify-between gap-4">
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_LEARN_MORE}
          >
            deleting a function
          </LearnMoreMessage>
          <FnDeleteModal
            fnId={id}
            fnName={name}
            isOpen={isModalOpen}
            onOpenChange={setIsModalOpen}
          />
          <PermissionsTooltip
            hasAccess={hasDeleteFunctionPermission}
            isLoading={isLoading}
          >
            <Button
              intent="danger"
              loading={deleteFleekFunctionMutation.fetching}
              disabled={!hasDeleteFunctionPermission}
              onClick={() => setIsModalOpen(true)}
            >
              Delete Function
            </Button>
          </PermissionsTooltip>
        </Box>
      </SettingCard>
    </>
  );
};

type SettingCardProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  rightContent?: React.ReactNode;
}>;

const SettingCard = ({
  title,
  subtitle,
  rightContent,
  children,
}: SettingCardProps) => {
  return (
    <SettingsBox.Container>
      <SettingsBox.TitleRow>
        <Box className="gap-1 flex-col">
          <SettingsBox.Title>{title}</SettingsBox.Title>
          <SettingsBox.Text>{subtitle}</SettingsBox.Text>
        </Box>
        <SettingsBox.Column>{rightContent}</SettingsBox.Column>
      </SettingsBox.TitleRow>
      <SettingsBox.FieldsRow>
        <Box className="flex-1">{children}</Box>
      </SettingsBox.FieldsRow>
    </SettingsBox.Container>
  );
};
