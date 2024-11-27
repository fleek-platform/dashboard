import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import { BadgeText, SettingsBox, SettingsListItem } from '@/components';
import { LoadingProps } from '@/types/Props';
import { Button } from '@/ui';
import { dateFormat } from '@/utils/dateFormats';

export const Invoices: React.FC = () => {
  // eslint-disable-next-line fleek-custom/valid-gql-hooks-destructuring
  const query = useMockedQuery();

  return (
    <SettingsBox.Container>
      <SettingsBox.TitleRow>
        <SettingsBox.Title>Invoices</SettingsBox.Title>
        <Button iconLeft="download" intent="neutral">
          Download all
        </Button>
      </SettingsBox.TitleRow>

      <SettingsBox.Text>Download your previous invoices and usage details.</SettingsBox.Text>

      {query.isLoading && Array.from({ length: 5 }).map((_, index) => <InvoiceListItem isLoading key={index} />)}

      {query.data?.map((item) => (
        <InvoiceListItem
          title={item.title}
          value={item.value}
          overage={item.overage}
          dateFrom={item.dateFrom}
          dateTo={item.dateTo}
          key={item.title}
        />
      ))}
    </SettingsBox.Container>
  );
};

type InvoiceListItemProps = LoadingProps<{
  title: string;
  value: number;
  overage: number;
  dateFrom: string;
  dateTo: string;
}>;

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ title, value, overage, isLoading, dateFrom, dateTo }) => {
  if (isLoading) {
    return <SettingsListItem.Skeleton enableAvatar />;
  }

  const subtitle = `${formatDate(dateFrom)} - ${formatDate(dateTo)}`;
  const formattedValue = formatMoney(value);
  const formattedOverage = overage > 0 && `+ ${formatMoney(overage)} Overage`;

  return (
    <SettingsListItem title={title} subtitle={subtitle} avatarIcon="invoice">
      {formattedOverage && <BadgeText colorScheme="yellow">{formattedOverage}</BadgeText>}
      <BadgeText colorScheme="green">{formattedValue}</BadgeText>

      <SettingsListItem.DropdownMenu>
        <SettingsListItem.DropdownMenuItem icon="download">Download</SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>
    </SettingsListItem>
  );
};

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

const formatDate = (date: string) => dateFormat({ dateISO: date, stringFormat: 'MMM dd, yyyy' });

const useMockedQuery = () =>
  useQuery({
    queryKey: ['invoices-mocked-query'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return [
        {
          title: 'Fleek Invoice #005',
          value: 10,
          overage: 12.12,
          dateFrom: DateTime.now().minus({ months: 1 }).toISODate(),
          dateTo: DateTime.now().toISODate(),
        },
        {
          title: 'Fleek Invoice #004',
          value: 10,
          overage: 28.91,
          dateFrom: DateTime.now().minus({ months: 2 }).toISODate(),
          dateTo: DateTime.now().minus({ months: 1 }).toISODate(),
        },
        {
          title: 'Fleek Invoice #003',
          value: 10,
          overage: 0,
          dateFrom: DateTime.now().minus({ months: 3 }).toISODate(),
          dateTo: DateTime.now().minus({ months: 2 }).toISODate(),
        },
        {
          title: 'Fleek Invoice #002',
          value: 10,
          overage: 0,
          dateFrom: DateTime.now().minus({ months: 4 }).toISODate(),
          dateTo: DateTime.now().minus({ months: 3 }).toISODate(),
        },
        {
          title: 'Fleek Invoice #001',
          value: 10,
          overage: 0,
          dateFrom: DateTime.now().minus({ months: 5 }).toISODate(),
          dateTo: DateTime.now().minus({ months: 4 }).toISODate(),
        },
      ];
    },
  });
