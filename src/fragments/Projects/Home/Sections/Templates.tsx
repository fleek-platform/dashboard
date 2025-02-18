import { Link } from '@/components';
import { Box, Icon, Text } from '@/ui';
import { FLEEK_TEMPLATES_URLS } from '@/utils/template';

import { TemplatesList } from '../../Sites/Templates';

export const HomeTemplates: React.FC = () => {
  return (
    <Box className="sm:col-span-2 gap-4" style={{ gridArea: 'templates' }}>
      <Box className="flex-row justify-between">
        <Text as="h3" variant="secondary" size="xl" weight={500}>
          Use a template
        </Text>
        <Link
          href={FLEEK_TEMPLATES_URLS.templatesUrl}
          className="flex flex-row gap-1 text-neutral-11 group"
        >
          View all templates
          <Icon name="arrow-right" className="group-hover:text-neutral-12" />
        </Link>
      </Box>
      <TemplatesList />
    </Box>
  );
};
