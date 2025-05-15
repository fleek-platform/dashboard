import { useQuery } from '@tanstack/react-query';

import { constants } from '@/constants';
import { ArticleItemProps } from '@/fragments/Projects/Home/Sections/Articles';
import { Log } from '@/utils/log';
import { joinUrl, getWebsiteUrl } from '@/utils/url';
import { getDefined } from '@/defined';

const MAX_CACHED_TIME = 24 * 60 * 60 * 1000;

export const useBlogArticles = (sliceCount = 4) => {
  return useQuery(
    ['blogArticles', sliceCount],
    () => fetchBlogArticles(sliceCount),
    {
      staleTime: MAX_CACHED_TIME,
      cacheTime: MAX_CACHED_TIME,
    },
  );
};

const fetchBlogArticles = async (
  sliceCount: number,
): Promise<ArticleItemProps[]> => {
  const websiteUrl = getWebsiteUrl();
  try {
    const response = await fetch(constants.FLEEK_BLOG_API.postsAPI);
    const jsonData: RawArticleItem[] = await response.json();
    const slicedData = jsonData.slice(0, sliceCount);

    const parsedArticles: ArticleItemProps[] = slicedData.map((article) => ({
      title: article.title,
      description: article.description,
      href: joinUrl(websiteUrl, `/blog/${article.slug}`),
      imgSrc: joinUrl(websiteUrl, article.imageSrc),
    }));

    return parsedArticles;
  } catch (error) {
    Log.error({ error, log: 'Failed to fetch articles' });

    throw error;
  }
};

type RawArticleItem = {
  title: string;
  date: string;
  description: string;
  imageSrc: string;
  slug: string;
};
