import { Box, Button, Text, Icon } from '@/ui';
import { LearnMoreMessage, SettingsBox } from '@/components';
import { DeleteUserModal } from './DeleteUserModal';
import useDeleteUser from './useDeleteUser';
import { useMeQuery } from '@/generated/graphqlClient'; // Import useMeQuery
import { constants } from '@/constants';

const getRestrictionMessage = ({
  hasUnpaidInvoices,
  isOnlyOwner,
  error,
}: {
  hasUnpaidInvoices: boolean;
  isOnlyOwner: boolean;
  error: string | null;
}): Array<{ id: string; message: string }> => {
  const restrictions: Array<{ id: string; message: string }> = [];

  if (hasUnpaidInvoices) {
    restrictions.push({
      id: 'unpaid-invoices',
      message:
        'You have unpaid invoices. Please pay all outstanding invoices before deleting your account.',
    });
  }

  if (isOnlyOwner) {
    restrictions.push({
      id: 'only-owner',
      message:
        'You are the only owner of one or more projects that have other team members. Please add another owner to these projects or remove the other members first.',
    });
  }

  if (error) {
    restrictions.push({
      id: 'error',
      message: error,
    });
  }

  return restrictions;
};

export const DeleteUser = () => {
  const {
    canDeleteAccount,
    hasUnpaidInvoices,
    isOnlyOwner,
    isCheckingOwnership,
    isCheckingInvoices,
    error,
    deleteAccount,
    isDeletingAccount,
  } = useDeleteUser();
  const [meQuery] = useMeQuery();
  const username = meQuery.data?.user?.username || '';

  const restrictions = getRestrictionMessage({
    hasUnpaidInvoices: Boolean(hasUnpaidInvoices),
    isOnlyOwner: Boolean(isOnlyOwner),
    error,
  });

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Delete Account</SettingsBox.Title>
      <SettingsBox.Text>
        Delete your Fleek account and all projects, files, and data. This action
        is irreversible.
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_DELETE_ACCOUNT}
        >
          deleting an account
        </LearnMoreMessage>
      </SettingsBox.Text>

      <Text variant="primary" size="sm" weight={700}>
        Account deletion checklist:
      </Text>
      <SettingsBox.ActionRow>
        <Box className="gap-2">
          <Box className="flex-row items-center gap-2">
            {isCheckingInvoices || hasUnpaidInvoices === null ? (
              <Icon name="spinner" className="text-neutral-11" />
            ) : (
              <Icon
                name={hasUnpaidInvoices ? 'alert-circled' : 'check-circled'}
                className={
                  hasUnpaidInvoices ? 'text-danger-11' : 'text-success-11'
                }
              />
            )}
            <Text>No unpaid invoices</Text>
          </Box>
          <Box className="flex-row items-center gap-2">
            {isCheckingOwnership || isOnlyOwner === null ? (
              <Icon name="spinner" className="text-neutral-11" />
            ) : (
              <Icon
                name={isOnlyOwner ? 'alert-circled' : 'check-circled'}
                className={isOnlyOwner ? 'text-danger-11' : 'text-success-11'}
              />
            )}
            <Text>No project ownership that includes any other members</Text>
          </Box>
        </Box>
      </SettingsBox.ActionRow>

      {restrictions.length > 0 && (
        <Box className="mt-4 gap-2">
          {restrictions.map((restriction) => (
            <Text
              key={restriction.id}
              className={
                restriction.id === 'error' ? 'text-danger-11' : 'text-red-11'
              }
            >
              {restriction.message}
            </Text>
          ))}
        </Box>
      )}

      <DeleteUserModal
        username={username}
        onDelete={deleteAccount}
        isDeleting={isDeletingAccount}
      >
        <Box className="mt-4">
          <Button intent="danger" disabled={!canDeleteAccount}>
            Delete account
          </Button>
        </Box>
      </DeleteUserModal>
    </SettingsBox.Container>
  );
};
