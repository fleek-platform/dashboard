import { useState, useMemo, useEffect } from 'react';
import { useListInvoices } from '@/fragments/Projects/Settings/Sections/Billing/Invoices/useListInvoices';
import {
  useProjectsQuery,
  useMeQuery,
  ProjectMembersDocument,
} from '@/generated/graphqlClient';
import { useClient, gql } from 'urql';
import { useLogout } from '@/hooks/useLogout';

type UseDeleteUserReturn = {
  canDeleteAccount: boolean;
  hasUnpaidInvoices: boolean | null;
  isOnlyOwner: boolean | null;
  isCheckingOwnership: boolean;
  isCheckingInvoices: boolean;
  error: string | null;
  deleteAccount: () => Promise<void>;
  isDeletingAccount: boolean;
};

const useDeleteUser = (): UseDeleteUserReturn => {
  const [isOnlyOwner, setIsOnlyOwner] = useState<boolean | null>(null);
  const [isCheckingOwnership, setIsCheckingOwnership] = useState(true);
  const [isCheckingInvoices, setIsCheckingInvoices] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const client = useClient();
  const [meQuery] = useMeQuery();
  const { logout } = useLogout();

  const { data: invoices, error: invoicesError } = useListInvoices({});

  const [projectsQuery] = useProjectsQuery({
    variables: {},
  });

  const DELETE_USER_MUTATION = gql`
    mutation DeleteUser($where: DeleteUserWhereInput!) {
      deleteUser(where: $where) {
        id
      }
    }
  `;

  const deleteAccount = async () => {
    const userId = meQuery.data?.user.id;
    if (!userId) {
      setError('Could not identify user to delete.');
      return;
    }

    setIsDeletingAccount(true);
    setError(null);

    try {
      const result = await client
        .mutation(DELETE_USER_MUTATION, { where: { id: userId } })
        .toPromise();

      if (result.data?.deleteUser) {
        logout();
      } else if (result.error) {
        setError(
          result.error.graphQLErrors[0]?.message ||
            result.error.message ||
            'Failed to delete account. Please try again.',
        );
      } else {
        setError('Failed to delete account. Unexpected response.');
      }
    } catch (err: unknown) {
      let errorMessage =
        'An unexpected error occurred while deleting the account.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const hasUnpaidInvoices = useMemo(() => {
    if (invoicesError) {
      setError('Failed to fetch invoice information');
      return null;
    }
    if (!invoices) {
      return null;
    }
    return invoices.some((invoice) => invoice.status.toUpperCase() !== 'PAID');
  }, [invoices, invoicesError]);

  useEffect(() => {
    if (invoices !== undefined || invoicesError) {
      setIsCheckingInvoices(false);
    }
  }, [invoices, invoicesError]);

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        if (!projectsQuery.data?.projects.data || !meQuery.data?.user.id) {
          return;
        }

        const userId = meQuery.data.user.id;
        const projects = projectsQuery.data.projects.data;

        const projectMemberPromises = projects.map((project) =>
          client
            .query(ProjectMembersDocument, {
              where: { id: project.id },
            })
            .toPromise(),
        );

        const projectMembersResults = await Promise.all(projectMemberPromises);

        for (const result of projectMembersResults) {
          if (!result.data?.project?.memberships) continue;

          const memberships = result.data.project.memberships;
          const owners = memberships.filter(
            (member) => member.permissionGroup.name === 'Owner',
          );
          const nonOwners = memberships.filter(
            (member) => member.permissionGroup.name !== 'Owner',
          );

          if (
            owners.length === 1 &&
            owners[0].user.id === userId &&
            nonOwners.length > 0
          ) {
            setIsOnlyOwner(true);
            setIsCheckingOwnership(false);
            return;
          }
        }

        setIsOnlyOwner(false);
        setIsCheckingOwnership(false);
      } catch (err) {
        setError('Failed to check project ownership status');
        setIsCheckingOwnership(false);
      }
    };

    setIsCheckingOwnership(true);
    checkOwnership();
  }, [projectsQuery.data, meQuery.data, client]);

  const canDeleteAccount = useMemo(() => {
    if (error) return false;
    if (isCheckingOwnership || isCheckingInvoices) return false;
    if (hasUnpaidInvoices === null || isOnlyOwner === null) return false;
    return !hasUnpaidInvoices && !isOnlyOwner;
  }, [
    hasUnpaidInvoices,
    isOnlyOwner,
    isCheckingOwnership,
    isCheckingInvoices,
    error,
  ]);

  return {
    canDeleteAccount,
    hasUnpaidInvoices,
    isOnlyOwner,
    isCheckingOwnership,
    isCheckingInvoices,
    error,
    deleteAccount,
    isDeletingAccount,
  };
};

export default useDeleteUser;
