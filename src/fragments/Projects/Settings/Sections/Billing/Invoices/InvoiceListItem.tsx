import { BadgeText, SettingsListItem } from '@/components';
import type { LoadingProps } from '@/types/Props';
import { dateFormat } from '@/utils/dateFormats';

import useInvoicesHelpers from './useInvoicesHelpers';

type InvoiceListItemProps = LoadingProps<{
  value: number;
  dateFrom: string;
  dateTo: string;
  invoiceDocumentUrl: string;
  invoiceNumber?: string;
  isPaid: boolean;
}>;

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({
  value,
  isLoading,
  dateFrom,
  dateTo,
  invoiceDocumentUrl,
  invoiceNumber,
  isPaid,
}) => {
  const { downloadInvoice, viewInvoice } = useInvoicesHelpers();

  if (isLoading) {
    return <SettingsListItem.Skeleton enableAvatar />;
  }

  const subtitle = `${formatDate(dateFrom)} - ${formatDate(dateTo)}`;
  const formattedValue = formatMoney(value);

  const handleDownload = () => {
    if (invoiceDocumentUrl) {
      downloadInvoice(invoiceDocumentUrl, `invoice-${invoiceNumber}.pdf`);
    }
  };

  const handleView = (e: React.MouseEvent) => {
    e.preventDefault();

    if (invoiceDocumentUrl) {
      viewInvoice(invoiceDocumentUrl);
    }
  };

  return (
    <SettingsListItem
      title={invoiceNumber}
      subtitle={subtitle}
      avatarIcon="invoice"
    >
      <BadgeText
        className="mr-0 ml-auto"
        colorScheme={isPaid ? 'green' : 'yellow'}
      >
        {isPaid ? 'Paid' : 'Open'}
      </BadgeText>
      <BadgeText
        className="mr-0 ml-0"
        colorScheme={isPaid ? 'green' : 'yellow'}
      >
        {formattedValue}
      </BadgeText>

      <SettingsListItem.DropdownMenu>
        <SettingsListItem.DropdownMenuItem
          icon="arrow-up-right"
          onClick={handleView}
        >
          View invoice
        </SettingsListItem.DropdownMenuItem>
        <SettingsListItem.DropdownMenuItem
          icon="download"
          onClick={handleDownload}
        >
          Download invoice
        </SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>
    </SettingsListItem>
  );
};

const formatMoney = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const formatDate = (date: string) =>
  dateFormat({ dateISO: date, stringFormat: 'MMM dd, yyyy' });

export default InvoiceListItem;
