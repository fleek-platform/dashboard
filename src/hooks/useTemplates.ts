import { useQuery } from '@tanstack/react-query';

import { TemplateJson, TemplateJsonObject } from '@/types/Template';
import { FLEEK_TEMPLATES_URLS, transformTemplate } from '@/utils/template';

export const useTemplates = () => {
  return useQuery({
    queryKey: ['get-templates'],
    queryFn: async () => {
      const response = await fetch(FLEEK_TEMPLATES_URLS.templatesAPI);
      const data = await response.json();

      return data as TemplateJsonObject;
    },
    select: (data) => (Object.values(data) as TemplateJson[]).map(transformTemplate),
    refetchOnMount: false,
  });
};
