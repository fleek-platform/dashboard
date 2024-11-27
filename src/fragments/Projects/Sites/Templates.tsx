import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { Template } from '@/fragments';
import { useTemplatesQuery } from '@/generated/graphqlClient';
import { Button, Text } from '@/ui';

import { SitesStyles as S } from './Sites.styles';

export const Templates: React.FC = () => (
  <S.Templates.Wrapper>
    <S.Templates.Heading.Wrapper>
      <Text as="h3" variant="primary" size="xl" weight={700}>
        Use a template
      </Text>
      <Link href={routes.template.list()}>
        <Button intent="ghost" iconRight="arrow-right">
          Browse all templates
        </Button>
      </Link>
    </S.Templates.Heading.Wrapper>

    <TemplatesList />
  </S.Templates.Wrapper>
);

export const TemplatesList: React.FC = () => {
  const [templatesQuery] = useTemplatesQuery({
    variables: { where: {}, filter: { take: 3 } },
  });
  const templates = templatesQuery.data?.templates.data || [];

  if (templatesQuery.fetching) {
    return (
      <S.Templates.CardsGrid>
        <Template.Elements.Card isLoading />
        <Template.Elements.Card isLoading />
        <Template.Elements.Card isLoading />
      </S.Templates.CardsGrid>
    );
  }

  return (
    <S.Templates.CardsGrid>
      {templates.map((template) => (
        <Template.Elements.Card key={template.name} template={template} />
      ))}
    </S.Templates.CardsGrid>
  );
};
