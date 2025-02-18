import {
  TemplateCategory as GeneratedTemplateCategory,
  TemplateQuery,
  TemplatesQuery,
} from '@/generated/graphqlClient';

export type TemplateCategory = Omit<
  GeneratedTemplateCategory,
  'templates' | 'templatesPaginated'
> & {
  templates?: GeneratedTemplateCategory['templates'];
};

export type Template = Omit<TemplateQuery['template'], 'category'> & {
  category: TemplateCategory;
};

export type Templates = TemplatesQuery['templates']['data'];

/*------------------ GraphQL -----------------*/

/*------------- Fields for TemplateCard ------------*/

export type FrameworkGraphQL = {
  name: string;
  avatar: string;
};
export type UserGraphQL = {
  username: string;
  avatar: string;
};

export type TemplateCardPart = {
  id: string;
  name: string;
  description: string;
  banner: string;
  siteSlug: string;
  framework?: FrameworkGraphQL | null;
  creator: UserGraphQL;
};

/*------------- Fields for Deployment ------------*/

export type DeploymentGraphQL = {
  sourceProvider?: SourceProvider;
  sourceRepositoryOwner?: string;
  sourceRepositoryName?: string;
  sourceBranch?: string;
  sourceRef?: string;
  build?: BuildGraphQL;
};

export type BuildGraphQL = {
  baseDirectory?: string;
  buildCommand?: string;
  distDirectory?: string;
  dockerImage?: string;
};

export type TemplateDeploymentPart = {
  deployment: DeploymentGraphQL;
};

export type TemplatePart = TemplateCardPart & TemplateDeploymentPart;

/*------------------ Json -----------------*/

// copied from the website

export type Contributor = {
  login: string;
  name?: string;
  avatar_url: string;
};

export type Repo = {
  name: string;
  owner?: string;
  html_url: string;
  description: string;
  contributors_url: string;
  contributors?: Contributor[];
  creation_date?: string;
  slug?: string;
};

type DynamicTemplateData = {
  usageCount?: number;
  readmeData?: string;
};

export type Framework = {
  name: string;
  avatar: string;
};

export type Category = {
  name: string;
};

export type Repository = Omit<Repo, 'description' | 'contributors_url'> & {
  provider?: string;
  branch?: string;
  ref?: string;
  build?: BuildGraphQL;
};

export type TemplateJson = {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  demoUrl: string;
  framework: Framework;
  dynamicData?: DynamicTemplateData;
  category: Category;
  screenshots: string[];
  similarTemplateIds: string[];
  /** Extra field for json */
  repository: Repository;
};

type TemplateJsonObject = { [key: string]: TemplateJson };
