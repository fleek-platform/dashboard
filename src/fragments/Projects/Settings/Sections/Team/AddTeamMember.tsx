import { useEffect, useMemo, useState } from 'react';
import * as zod from 'zod';

import {
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import { TwoFactorAuthentication } from '@/fragments/2FA/TwoFactorAuthentication';
import {
  TwoFactorProtectedActionType,
  useCreateInvitationMutation,
  useInvitationsQuery,
  usePermissionGroupsQuery,
} from '@/generated/graphqlClient';
import { useTeamRestriction } from '@/hooks/useBillingRestriction';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/useToast';
import type { DisabledProps, LoadingProps } from '@/types/Props';
import type {
  CreateInvitationModalState,
  PermissionGroup,
} from '@/types/TeamProject';
import { Button, Combobox, FormField } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { Log } from '@/utils/log';

import { InviteLinkModal } from './InviteLinkModal';
import { TeamSettingsStyles as S } from './TeamSettings.styles';

type AddTeamMemberProps = {
  isLoading: boolean;
};

export const AddTeamMember: React.FC<AddTeamMemberProps> = ({
  isLoading = true,
}) => {
  const toast = useToast();

  const [invitationModalState, setInvitationModalState] =
    useState<CreateInvitationModalState>({ isOpen: false });
  const [permissionGroupsQuery] = usePermissionGroupsQuery();
  const hasAddMemberPermission = usePermissions({
    action: [constants.PERMISSION.TEAM.INVITE],
  });
  const billingRestriction = useTeamRestriction();

  const [, refetchInvitationsQuery] = useInvitationsQuery();

  const closeModal = () => setInvitationModalState({ isOpen: false });

  const createLinkInvitation = async () => {
    try {
      const createInvitationResult = await createInvitationLink({
        data: {
          permissionGroupId:
            permissionGroupsQuery.data?.permissionGroups.data?.find(
              (permissionGroup) =>
                permissionGroup.name.toUpperCase() === 'MEMBER',
            )?.id,
        },
      });

      if (!createInvitationResult.data?.createInvitation) {
        throw (
          createInvitationResult.error ||
          new Error('Error trying to create link invitation')
        );
      }

      setInvitationModalState({
        isOpen: true,
        invitationLink: createInvitationResult.data?.createInvitation,
      });
      refetchInvitationsQuery({ requestPolicy: 'network-only' });
    } catch (error) {
      toast.error({ error, log: 'Add member to project failed' });
    }
  };

  const createInvitationForm = Form.useForm({
    values: {
      email: '',
      role: {
        id: '',
        name: '',
        description: '',
      },
    },
    schema: zod.object({
      email: zod.string().email(),
      message: zod.string(),
    }),
    onSubmit: async (values) => {
      if (!values.email) {
        await createLinkInvitation();
      }

      const createEmailInvitation = async () => {
        try {
          const { data, error } = await createInvitation({
            data: { email: values.email, permissionGroupId: values.role.id },
          });

          if (!data) {
            throw error || new Error('Error trying to create email invitation');
          }

          try {
            copyToClipboard(data.createInvitation);
            toast.success({
              message: `Invite sent to ${values.email}. Invitation link copied to clipboard.`,
            });
          } catch (error) {
            // we don't want to throw an error here, just log it
            Log.error({ message: 'Failed to copy to clipboard' });
            toast.success({ message: `Invite sent to ${values.email}.` });
          }

          refetchInvitationsQuery({ requestPolicy: 'network-only' });
        } catch (error) {
          toast.error({ error, log: 'Create email invitation failed' });
        }
      };

      await createEmailInvitation();
    },
  });

  const createLinkInvitationForm = Form.useForm({
    values: {},
    onSubmit: async () => {
      await createLinkInvitation();
    },
  });

  const [, createInvitation] = TwoFactorAuthentication.useMutation({
    useMutationHook: useCreateInvitationMutation,
    actionType: TwoFactorProtectedActionType.INVITE_MEMBER,
    parentForm: createInvitationForm,
  });

  const [, createInvitationLink] = TwoFactorAuthentication.useMutation({
    useMutationHook: useCreateInvitationMutation,
    actionType: TwoFactorProtectedActionType.INVITE_MEMBER,
    parentForm: createLinkInvitationForm,
  });

  return (
    <>
      <Form.Provider value={createLinkInvitationForm}>
        <Form.Provider value={createInvitationForm}>
          <SettingsBox.Container
            isBillingDisabled={billingRestriction.hasReachedLimit}
            disabledText={billingRestriction.restrictionMessage}
          >
            <SettingsBox.TitleRow>
              <SettingsBox.Title>Invite Members</SettingsBox.Title>
              <InviteLinkButton
                isLoading={isLoading as true}
                isDisabled={
                  !hasAddMemberPermission || billingRestriction.hasReachedLimit
                }
                isCreatingLinkInvitation={createLinkInvitationForm.isSubmitting}
                handleCreateLinkInvitation={createLinkInvitationForm.submit}
                hasAddMemberPermission={hasAddMemberPermission}
                isHeaderButton
              />
            </SettingsBox.TitleRow>

            <SettingsBox.Text>
              Add a member to your project, either by adding them via email or
              invite link.
            </SettingsBox.Text>

            <S.InlineFields>
              <PermissionsTooltip
                hasAccess={hasAddMemberPermission}
                isLoading={isLoading as true}
              >
                <Form.InputField
                  label="Email"
                  name="email"
                  placeholder="jane@example.com"
                  isLoading={isLoading}
                  isDisabled={
                    !hasAddMemberPermission ||
                    billingRestriction.hasReachedLimit
                  }
                />
              </PermissionsTooltip>

              <PermissionsTooltip
                hasAccess={hasAddMemberPermission}
                isLoading={isLoading as true}
              >
                <RoleComboboxField
                  isLoading={isLoading}
                  isDisabled={
                    !hasAddMemberPermission ||
                    billingRestriction.hasReachedLimit
                  }
                />
              </PermissionsTooltip>
            </S.InlineFields>

            <SettingsBox.ActionRow>
              <LearnMoreMessage
                href={constants.EXTERNAL_LINK.FLEEK_DOCS_TEAM_PROJECT_MEMBERS}
              >
                inviting team members
              </LearnMoreMessage>
              {isLoading ? (
                <SettingsBox.Skeleton variant="button" />
              ) : (
                <SubmitButton />
              )}
            </SettingsBox.ActionRow>
          </SettingsBox.Container>
        </Form.Provider>
      </Form.Provider>

      <InviteLinkModal
        inviteLink={invitationModalState.invitationLink || ''}
        isOpen={invitationModalState.isOpen}
        closeModal={closeModal}
      />
    </>
  );
};

type InviteLinkButtonProps = LoadingProps<
  DisabledProps<{
    isCreatingLinkInvitation: boolean;
    isHeaderButton?: boolean;
    hasAddMemberPermission: boolean;
    handleCreateLinkInvitation: () => void;
  }>
>;

const InviteLinkButton: React.FC<InviteLinkButtonProps> = ({
  isLoading,
  isDisabled,
  isCreatingLinkInvitation,
  hasAddMemberPermission,
  handleCreateLinkInvitation,
}) => {
  if (isLoading) {
    return <S.ButtonSkeleton variant="button" />;
  }

  return (
    <PermissionsTooltip
      hasAccess={hasAddMemberPermission}
      isLoading={isLoading as true}
    >
      <Button
        iconLeft="link"
        disabled={isDisabled}
        onClick={handleCreateLinkInvitation}
        loading={isCreatingLinkInvitation}
      >
        Invite link
      </Button>
    </PermissionsTooltip>
  );
};

const RoleComboboxField: React.FC<LoadingProps<DisabledProps>> = ({
  isLoading,
  isDisabled,
}) => {
  const field = Form.useField<PermissionGroup | undefined>('role');

  const handleRoleChange = (selectedRole: PermissionGroup | undefined) => {
    if (selectedRole) {
      field.setValue(selectedRole);
    }
  };

  return (
    <FormField.Root>
      <FormField.Label>Role</FormField.Label>
      <RoleCombobox
        onChange={handleRoleChange}
        selectedRole={field.value}
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
    </FormField.Root>
  );
};

const SubmitButton: React.FC = () => {
  const { isSubmitting, shouldDisableSubmit, submit } = Form.useContext();

  return (
    <Button
      type="submit"
      loading={isSubmitting}
      onClick={submit}
      disabled={shouldDisableSubmit}
    >
      Send invite
    </Button>
  );
};

type RoleComboboxProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  selectedRole?: PermissionGroup;
  onChange: (selectedRole: PermissionGroup | undefined) => void;
};

export const RoleCombobox: React.FC<RoleComboboxProps> = ({
  selectedRole,
  isLoading = false,
  isDisabled = false,
  onChange,
}) => {
  const [permissionGroupsQuery] = usePermissionGroupsQuery();
  const hasAssignOwnerPermission = usePermissions({
    action: [constants.PERMISSION.TEAM.ASSIGN_OWNER],
  });

  useEffect(() => {
    if (
      permissionGroupsQuery.data?.permissionGroups.data &&
      !selectedRole?.id
    ) {
      onChange(permissionGroupsQuery.data.permissionGroups.data[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRole, permissionGroupsQuery.data]);

  const items = useMemo(() => {
    return (
      permissionGroupsQuery.data?.permissionGroups.data.filter(
        (permissionGroup) => {
          if (
            !hasAssignOwnerPermission &&
            permissionGroup.name.toUpperCase() === 'OWNER'
          ) {
            return false;
          }

          return permissionGroup;
        },
      ) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionGroupsQuery.data]);

  return (
    <Combobox
      items={items}
      selected={[
        selectedRole?.id
          ? selectedRole
          : permissionGroupsQuery.data?.permissionGroups.data[0],
        onChange,
      ]}
      queryKey="name"
      css={{ width: '8rem', fontSize: '0.725rem' }}
      isDisabled={isDisabled}
      isLoading={isLoading || permissionGroupsQuery.fetching}
    >
      {({ Field, Options, CompoundOption }) => (
        <>
          <Field>{(selected) => selected.name}</Field>
          <Options
            disableSearch
            css={{ width: '15rem' }}
            horizontalDividers
            viewportHeight={null}
          >
            {(item) => (
              <CompoundOption header={item.name} content={item.description} />
            )}
          </Options>
        </>
      )}
    </Combobox>
  );
};
