import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { useTemplatesQuery } from '@/generated/graphqlClient';
import { Button, Text } from '@/ui';

import { TemplateStyles as S } from '../../Template.styles';
import { TemplateCard } from '../../TemplateCard/TemplateCard';

type SimilarTemplatesProps = {
  templateId?: string;
  count?: number;
};

export const SimilarTemplates: React.FC<SimilarTemplatesProps> = ({ templateId, count = 3 }) => {
  return (
    <S.Details.SimilarTemplates.Container>
      <S.Details.SimilarTemplates.Header>
        <Text>Similar Templates</Text>
        <Link href={routes.template.list()}>
          <Button intent="neutral">Browse all</Button>
        </Link>
      </S.Details.SimilarTemplates.Header>
      <SimilarTemplatesList templateId={templateId} count={count} />
    </S.Details.SimilarTemplates.Container>
  );
};

type SimilarTemplatesListProps = {
  count: number;
  templateId?: string;
};

const SimilarTemplatesList: React.FC<SimilarTemplatesListProps> = ({ templateId, count }) => {
  const [templatesQuery] = useTemplatesQuery({ variables: { where: {}, filter: { take: count + 1 } } });

  if (templatesQuery.fetching) {
    return <SimilarTemplatesListLoading count={count} />;
  }

  const templates = templatesQuery.data?.templates.data || [];

  const displayedTemplates = templates.filter((template) => !templateId || template.id !== templateId).slice(0, count);

  return (
    <S.Details.SimilarTemplates.Grid>
      {displayedTemplates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </S.Details.SimilarTemplates.Grid>
  );
};

const SimilarTemplatesListLoading: React.FC<SimilarTemplatesListProps> = ({ count }) => (
  <S.Details.SimilarTemplates.Grid>
    {Array.from({ length: count }).map((_, idx) => (
      <TemplateCard key={idx} isLoading />
    ))}
  </S.Details.SimilarTemplates.Grid>
);
