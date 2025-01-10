import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { Template } from '@/fragments';
import { useTemplatesQuery } from '@/generated/graphqlClient';
import { Box, Button, Text } from '@/ui';

export const Templates: React.FC = () => (
  <Box className="gap-5">
    <Box className="flex-row justify-between items-center">
      <Text as="h3" variant="primary" size="xl" weight={700}>
        Use a template
      </Text>
      <Link href={routes.template.list()}>
        <Button intent="ghost" iconRight="arrow-right">
          Browse all templates
        </Button>
      </Link>
    </Box>

    <TemplatesList />
  </Box>
);

export const TemplatesList: React.FC = () => {
  const [templatesQuery] = useTemplatesQuery({
    variables: { where: {}, filter: { take: 3 } },
  });
  const templates = templatesQuery.data?.templates.data || [];

  if (templatesQuery.fetching) {
    return (
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Template.Elements.Card isLoading />
        <Template.Elements.Card isLoading />
        <Template.Elements.Card isLoading />
      </Box>
    );
  }

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Template.Elements.Card key={template.name} template={template} />
      ))}
    </Box>
  );
};
