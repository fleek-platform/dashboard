import { useListInvoices } from '@/fragments/Projects/Settings/Sections/Billing/Invoices/useListInvoices';

type UseCheckUnpaidInvoicesReturn = {
  hasUnpaidInvoices: boolean;
  isLoading: boolean;
  error: string | null;
};

export const useCheckUnpaidInvoices = (): UseCheckUnpaidInvoicesReturn => {
  const {
    data: invoices,
    isFetching,
    error: invoicesError,
  } = useListInvoices({});

  const hasUnpaidInvoices = (() => {
    if (invoicesError) {
      return false;
    }
    if (!invoices) {
      return false;
    }
    return invoices.some((invoice) => invoice.status.toUpperCase() !== 'PAID');
  })();

  const error = (() => {
    if (invoicesError) {
      return 'Failed to fetch invoice information';
    }
    return null;
  })();

  return {
    hasUnpaidInvoices,
    isLoading: isFetching,
    error,
  };
};
