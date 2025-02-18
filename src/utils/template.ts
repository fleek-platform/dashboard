import { constants } from '@/constants';
import { secrets } from '@/secrets';
import { TemplateCardPart, TemplateJson, TemplatePart } from '@/types/Template';
import { joinUrl } from '@/utils/url';

const { templatesAPI, templatesUrl } = constants.FLEEK_TEMPLATES_RELATIVE_PATHS;

const websiteBaseUrl = new URL(secrets.NEXT_PUBLIC_WEBSITE_URL).toString();

export const FLEEK_TEMPLATES_URLS = {
  websiteBaseUrl,
  templatesAPI: joinUrl(websiteBaseUrl, templatesAPI),
  templatesUrl: joinUrl(websiteBaseUrl, templatesUrl),
};

// eslint-disable-next-line fleek-custom/valid-argument-types
export const transformTemplate = (templateJson: TemplateJson): TemplatePart => {
  return {
    id: templateJson.id,
    banner: templateJson.banner,
    name: templateJson.name,
    description: templateJson.description,
    siteSlug: templateJson.slug,
    // set first contributor as creator
    creator: {
      username: templateJson.repository.contributors?.[0].name ?? '', // Todo: handle defaults
      avatar: templateJson.repository.contributors?.[0].avatar_url ?? '',
    },
    framework: {
      name: templateJson.framework.name,
      avatar: templateJson.framework.avatar,
    },
    deployment: {
      // map TemplateJson.repository to TemplatePart.deployment
      // this groups repo data correctly in the json and avoids repetition
      build: templateJson.repository.build,
      sourceRepositoryOwner: templateJson.repository.owner,
      sourceRepositoryName: templateJson.repository.slug,
      sourceProvider: templateJson.repository.provider,
      sourceBranch: templateJson.repository.branch,
      sourceRef: templateJson.repository.ref,
    },
  };
};

// eslint-disable-next-line fleek-custom/valid-argument-types
export const templatePartToTemplateCardPart = (
  templatePart: TemplatePart,
): TemplateCardPart => {
  const { deployment: _, ...templateCardPart } = templatePart;

  return templateCardPart;
};

export const randomizeArray = <T>(array: T[]): T[] =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
