import { GitProvider } from '@/integrations/git';

type GetLinkForRepositoryArgs = {
  provider: GitProvider.Name;
  slug: string;
  name: string;
  sourceRef?: string;
};

export const getLinkForRepository = ({ provider, slug, name, sourceRef }: GetLinkForRepositoryArgs): string => {
  switch (provider) {
    case 'github':
      return `https://github.com/${slug}/${name}${sourceRef ? `/commit/${sourceRef}` : ''}`;
    case 'gitlab':
      return `https://gitlab.com/${slug}/${name}${sourceRef ? `/-/commit/${sourceRef}` : ''}`;
    case 'bitbucket':
      return `https://bitbucket.org/${slug}/${name}${sourceRef ? `/commits/${sourceRef}` : ''}`;
  }
};
