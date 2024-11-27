import { useQuery } from '@tanstack/react-query';

import { Link, SettingsBox } from '@/components';
import { LoadingProps } from '@/types/Props';
import { Box, Icon, Text } from '@/ui';

import { CurrentUsageStyles as S } from './CurrentUsage.styles';

export const CurrentUsage: React.FC = () => {
  // eslint-disable-next-line fleek-custom/valid-gql-hooks-destructuring
  const query = useMockedQuery();

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Current Usage</SettingsBox.Title>

      <SettingsBox.Text>Quick breakdown of usage in this project, click a specific data point to get a breakdown.</SettingsBox.Text>

      <S.Grid>
        {query.isLoading && Array.from({ length: 15 }).map((_, index) => <UsageGridItem isLoading key={index} />)}

        {query.data?.map((item) => (
          <UsageGridItem title={item.title} value={item.value} href={item.href} key={item.title} />
        ))}
      </S.Grid>
    </SettingsBox.Container>
  );
};

type UsageItem = {
  title: string;
  value: string;
  href: string;
};

type UsageGridItemProps = LoadingProps<UsageItem>;

const UsageGridItem: React.FC<UsageGridItemProps> = ({ title, value, href, isLoading }) => {
  if (isLoading) {
    return (
      <S.GridItem.Container>
        <Box>
          <S.GridItem.Skeleton variant="title" />
        </Box>
        <Box>
          <S.GridItem.Skeleton variant="value" />
        </Box>
      </S.GridItem.Container>
    );
  }

  return (
    <Link href={href}>
      <S.GridItem.Container data-link>
        <Text as="h3" variant="primary" weight={500} className="flex gap-1 justify-between">
          {title} <Icon name="chevron-right" />
        </Text>
        <Text>{value}</Text>
      </S.GridItem.Container>
    </Link>
  );
};

const useMockedQuery = () =>
  useQuery({
    queryKey: ['current-usage'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return [
        { title: 'Projects', value: '1 / 5', href: '#' },
        { title: 'Project Members', value: '2 / 3', href: '#' },
        { title: 'Sites', value: '2 / 10', href: '#' },
        { title: 'IPFS Storage', value: '2 GB / 100 GB', href: '#' },
        { title: 'Private Gateways', value: '2 GB / 100 GB', href: '#' },
        { title: 'Fleek Domains', value: '2 GB / 100 GB', href: '#' },
        { title: 'Total Bandwidth', value: '1 / 2', href: '#' },
        { title: 'Build Tier', value: 'Basic + Intermediate', href: '#' },
        { title: 'Build Minutes', value: '200 / 1000 (Tiered)', href: '#' },
        { title: 'Concurrent Builds', value: '5 Included', href: '#' },
        { title: 'Custom Domains', value: '1 / 2', href: '#' },
        { title: 'ENS Domains', value: '1 / 2', href: '#' },
        { title: 'IPNS Records', value: '2 / 5', href: '#' },
        { title: 'Fleek Functions', value: '1 / 10', href: '#' },
        { title: 'Function Runtime', value: '50 min / 100 min', href: '#' },
        { title: 'Function Requests', value: '200 / 1000', href: '#' },
      ] as UsageItem[];
    },
  });
