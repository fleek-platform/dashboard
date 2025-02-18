import { useMemo } from 'react';

import { AlertBox } from '@/components';
import { Link } from '@/components';
import { Template } from '@/fragments';
import { useTemplates } from '@/hooks/useTemplates';
import { Box, Button, Text } from '@/ui';
import {
  randomizeArray,
  templatePartToTemplateCardPart,
} from '@/utils/template';
import { FLEEK_TEMPLATES_URLS } from '@/utils/template';

export const Templates: React.FC = () => (
  <Box className="gap-5">
    <Box className="flex-row justify-between items-center">
      <Text as="h3" variant="primary" size="xl" weight={700}>
        Use a template
      </Text>
      <Link href={FLEEK_TEMPLATES_URLS.templatesUrl}>
        <Button intent="ghost" iconRight="arrow-right">
          Browse all templates
        </Button>
      </Link>
    </Box>

    <TemplatesList />
  </Box>
);

export const TemplatesList: React.FC = () => {
  const templates = useTemplates();

  const threeRandomTemplates = useMemo(() => {
    if (templates.error || !templates.data) {
      return [];
    }

    return randomizeArray(templates.data).slice(0, 3);
  }, [templates.data, templates.error]);

  if (templates.isLoading) {
    return (
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Template.Elements.Card isLoading />
        <Template.Elements.Card isLoading />
        <Template.Elements.Card isLoading />
      </Box>
    );
  }

  if (templates.error || !(threeRandomTemplates.length > 0)) {
    return (
      <AlertBox variant="danger" size="lg">
        Error fetching templates.
      </AlertBox>
    );
  }

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {threeRandomTemplates.map((template) => (
        <Template.Elements.Card
          key={template.name}
          template={templatePartToTemplateCardPart(template)}
        />
      ))}
    </Box>
  );
};
