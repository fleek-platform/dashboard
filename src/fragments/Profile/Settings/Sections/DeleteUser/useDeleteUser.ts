import { useCheckProjectOwnership } from './useCheckProjectOwnership';
import { useCheckUnpaidInvoices } from './useCheckUnpaidInvoices';
import { useDeleteAccount } from './useDeleteAccount';

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
  const {
    isOnlyOwner,
    isLoading: isCheckingOwnership,
    error: ownershipError,
  } = useCheckProjectOwnership();

  const {
    hasUnpaidInvoices,
    isLoading: isCheckingInvoices,
    error: invoicesError,
  } = useCheckUnpaidInvoices();

  const {
    deleteAccount,
    isDeleting: isDeletingAccount,
    error: deleteError,
  } = useDeleteAccount();

  const error = deleteError || ownershipError || invoicesError || null;

  const canDeleteAccount =
    !error &&
    !isCheckingOwnership &&
    !isCheckingInvoices &&
    hasUnpaidInvoices !== null &&
    isOnlyOwner !== null &&
    !hasUnpaidInvoices &&
    !isOnlyOwner;

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
