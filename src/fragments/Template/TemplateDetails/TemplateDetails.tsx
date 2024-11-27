import { ExternalLink } from '@/components';
import { useMeQuery } from '@/generated/graphqlClient';
import { LoadingProps } from '@/types/Props';
import { Template } from '@/types/Template';
import { IconName, Skeleton, Text } from '@/ui';
import { dateFormat } from '@/utils/dateFormats';
import { getLinkForTemplateReport } from '@/utils/getLinkForTemplateReport';
import { firstLetterUpperCase } from '@/utils/stringFormat';

import { TemplateDetailsStyles as S } from './TemplateDetails.styles';

export type TemplateDetailsProps = LoadingProps<{ template: Template }>;

export const TemplateDetails: React.FC<TemplateDetailsProps> = ({ isLoading, template }) => {
  const [meQuery] = useMeQuery();

  if (isLoading) {
    return <TemplateDetailsSkeleton />;
  }

  return (
    <S.Container>
      <Text as="h3" variant="primary" size="lg" weight={700}>
        Details
      </Text>
      <S.DetailsContainer>
        <TemplateDetail
          label="Creation date"
          iconName="calendar"
          value={dateFormat({ dateISO: template.createdAt, stringFormat: 'LLLL, dd, y' })}
        />
        <S.Item.Divider />
        <TemplateDetail label="Deployments" iconName="analytics" value={`${template.usageCount}`} />
        <S.Item.Divider />
        <TemplateDetail label="Framework" iconName="code" value={firstLetterUpperCase(template.framework?.name || 'Other')} />
        <S.Item.Divider />
        <TemplateDetail label="Category" iconName="deploy" value={firstLetterUpperCase(template.category.name)} />
        <S.Item.Divider />
        <ExternalLink
          variant="danger"
          href={getLinkForTemplateReport({ templateId: template.id, name: template.name, userEmail: meQuery.data?.user.email })}
        >
          Report template for abuse
        </ExternalLink>
      </S.DetailsContainer>
    </S.Container>
  );
};

const TemplateDetailsSkeleton: React.FC = () => (
  <S.Container>
    <S.TitleSkeleton>
      <Skeleton />
    </S.TitleSkeleton>
    <S.DetailsContainer>
      <TemplateDetail isLoading />
      <S.Item.Divider />
      <TemplateDetail isLoading />
      <S.Item.Divider />
      <TemplateDetail isLoading />
      <S.Item.Divider />
      <TemplateDetail isLoading />
    </S.DetailsContainer>
  </S.Container>
);

const TemplateDetail: React.FC<TemplateDetailProps> = ({ isLoading, iconName, label, value }) => {
  if (isLoading) {
    return (
      <S.Item.Container>
        <S.Item.SkeletonIcon />
        <S.Item.TextContent>
          <S.Item.ValueSkeleton>
            <Skeleton />
          </S.Item.ValueSkeleton>
          <S.Item.LabelSkeleton>
            <Skeleton />
          </S.Item.LabelSkeleton>
        </S.Item.TextContent>
      </S.Item.Container>
    );
  }

  return (
    <S.Item.Container>
      <S.Item.Icon name={iconName} />
      <S.Item.TextContent>
        <Text variant="primary" size="xs" weight={500}>
          {value}
        </Text>
        <Text size="xs">{label}</Text>
      </S.Item.TextContent>
    </S.Item.Container>
  );
};

type TemplateDetailProps = LoadingProps<{
  iconName: IconName;
  label: string;
  value: string;
}>;
