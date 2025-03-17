import { SettingsBox } from '@/components';
import { Box, Button, Icon } from '@/ui';

import useInvoicesHelpers from './useInvoicesHelpers';
import { useListInvoices } from './useListInvoices';
import InvoiceListItem from './InvoiceListItem';

export const Invoices: React.FC = () => {
  const { downloadInvoice } = useInvoicesHelpers();
  const {
    data,
    isFetching,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useListInvoices({
    size: 10,
  });

  const handleDownloadAll = async () => {
    if (!data?.length) {
      return;
    }

    const downloadPromises = data.map(({ invoice_pdf, number }) =>
      downloadInvoice(invoice_pdf, `invoice-${number}.pdf`),
    );

    try {
      await Promise.all(downloadPromises);
    } catch (error) {
      console.error('Error downloading invoices:', error);
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <Box variant="container" className="bg-transparent">
          <SettingsBox.EmptyContent
            title="Error loading invoices"
            description="Please try again later."
            icon="alert-triangle"
          />
        </Box>
      );
    }

    if (isFetching && !data?.length) {
      return Array.from({ length: 5 }).map((_, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: not relevant for skeleton items
        <InvoiceListItem isLoading key={index} />
      ));
    }

    if (!isFetching && !data?.length) {
      return (
        <Box variant="container" className="bg-transparent">
          <SettingsBox.EmptyContent
            title="No invoices yet"
            description="Once you have one, it will appear here."
            icon="question"
          />
        </Box>
      );
    }

    return data.map((item) => (
      <InvoiceListItem
        key={item.id}
        invoiceNumber={item.number}
        value={item.amountDue / 100}
        isPaid={item.amountDue === item.amountPaid}
        dateFrom={item.period_start_date}
        dateTo={item.period_end_date}
        invoiceDocumentUrl={item.invoice_pdf}
      />
    ));
  };

  return (
    <SettingsBox.Container>
      <SettingsBox.TitleRow>
        <SettingsBox.Title>Invoices</SettingsBox.Title>
        {!!data?.length && (
          <Button
            iconLeft="download"
            intent="neutral"
            onClick={handleDownloadAll}
            disabled={isFetching || !data?.length}
          >
            Download all
          </Button>
        )}
      </SettingsBox.TitleRow>

      <SettingsBox.Text>
        Download your previous invoices and usage details.
      </SettingsBox.Text>

      {renderContent()}

      {hasNextPage && (
        <Box className="flex flex-row gap-4 w-full justify-center">
          <Button
            intent="neutral"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? (
              <Icon name="spinner" />
            ) : (
              'View older invoices'
            )}
          </Button>
        </Box>
      )}
    </SettingsBox.Container>
  );
};
