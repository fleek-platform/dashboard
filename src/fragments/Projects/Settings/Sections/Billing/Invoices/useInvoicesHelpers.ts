import { useToast } from '@/hooks/useToast';

export class InvoiceError extends Error {
  constructor(
    message: string,
    public readonly statusText?: string,
  ) {
    super(message);
    this.name = 'InvoiceError';
    Object.setPrototypeOf(this, InvoiceError.prototype);
  }
}

const viewInvoice = (url: string) => {
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Error opening invoice:', error);
  }
};

const downloadInvoice = async (
  url: string,
  filename: string,
  onError?: (message: string) => void,
) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new InvoiceError(
        `Failed to download invoice: ${response.statusText}`,
      );
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading invoice:', error);

    if (typeof onError === 'function') {
      onError('Failed to download invoice');
    }
  }
};

const useInvoicesHelpers = () => {
  const toast = useToast();

  return {
    viewInvoice,
    downloadInvoice: async (url: string, filename: string) =>
      downloadInvoice(url, filename, (message: string) =>
        toast.error({ message }),
      ),
  };
};

export default useInvoicesHelpers;
