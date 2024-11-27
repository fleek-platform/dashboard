import { TemplateCategory as GeneratedTemplateCategory, TemplateQuery, TemplatesQuery } from '@/generated/graphqlClient';

export type TemplateCategory = Omit<GeneratedTemplateCategory, 'templates' | 'templatesPaginated'> & {
  templates?: GeneratedTemplateCategory['templates'];
};

export type Template = Omit<TemplateQuery['template'], 'category'> & {
  category: TemplateCategory;
};

export type Templates = TemplatesQuery['templates']['data'];
