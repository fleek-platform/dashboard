import { useQuery } from '@tanstack/react-query';
import { Octokit, RequestError } from 'octokit';
import { useCallback } from 'react';

import { Template } from '@/types/Template';
import { Log } from '@/utils/log';

import { useTemplateGitData } from './useTemplateGitData';

class FetchError extends Error {}
export class TemplateNotFoundError extends Error {}

const decode = (data: string) =>
  decodeURIComponent(
    window
      .atob(data)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

const fetchReadme = async (owner: string, repo: string) => {
  const octokit = new Octokit();

  try {
    const rateLimit = await octokit.request('GET /rate_limit');

    if (rateLimit.data.rate.remaining === 0) {
      throw new FetchError('Hit git provider rate limit');
    }

    const response = await octokit.request('GET /repos/{owner}/{repo}/readme', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.data.content) {
      throw new FetchError('Failed to fetch');
    }

    return decode(response.data.content);
  } catch (error) {
    if (error instanceof RequestError && error.status === 404) {
      throw new TemplateNotFoundError('README not found');
    }

    throw error;
  }
};

type UseReadmeArgs = Template;

export const useReadme = (template?: UseReadmeArgs) => {
  const git = useTemplateGitData(template);

  const queryFn = useCallback(() => {
    const { provider, slug, repository } = git;

    if (!provider || !slug || !repository) {
      throw new FetchError('Deployment not found');
    }

    if (provider === 'github') {
      return fetchReadme(slug, repository);
    }

    throw new FetchError('Unsupported source provider');
  }, [git]);

  return useQuery(['readmeContent', git], queryFn, {
    enabled: Boolean(template),
    retry: false,
    onError: (error) => {
      Log.error('Error when fetching template', error);

      return error;
    },
  });
};
