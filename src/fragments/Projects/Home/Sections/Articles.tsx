import { constants } from '@/constants';
import { useBlogArticles } from '@/hooks/useBlogArticles';
import { LoadingProps } from '@/types/Props';
import { Skeleton, Text } from '@/ui';

import { SectionsStyles as S } from './Sections.styles';

export type ArticleItemProps = {
  title: string;
  description: string;
  href: string;
  imgSrc: string;
};

const ArticleItem: React.FC<LoadingProps<ArticleItemProps>> = ({
  title,
  description,
  href = '#',
  imgSrc,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <S.ArticleItem.Wrapper key="title" href={href}>
        <S.ArticleItem.Preview />
        <S.ArticleItem.TextContainer>
          <S.ArticleItem.Title>
            <Skeleton />
          </S.ArticleItem.Title>
          <S.ArticleItem.Description>
            <Skeleton />
          </S.ArticleItem.Description>
        </S.ArticleItem.TextContainer>
      </S.ArticleItem.Wrapper>
    );
  }

  return (
    <S.ArticleItem.Wrapper key="title" href={href}>
      <S.ArticleItem.Preview src={imgSrc} />
      <S.ArticleItem.TextContainer>
        <Text variant="primary" weight={500} className="truncate">
          {title}
        </Text>
        <Text size="xs" className="truncate">
          {description}
        </Text>
      </S.ArticleItem.TextContainer>
    </S.ArticleItem.Wrapper>
  );
};

export const Articles: React.FC = () => {
  const { data: articles, isLoading } = useBlogArticles();

  return (
    <S.Articles.Wrapper>
      <Text as="h2" size="xl" weight={500}>
        Useful articles
      </Text>
      <S.Articles.List>
        {isLoading || !articles ? (
          <>
            <ArticleItem isLoading />
            <ArticleItem isLoading />
            <ArticleItem isLoading />
            <ArticleItem isLoading />
          </>
        ) : (
          articles.map((article) => (
            <ArticleItem
              isLoading={isLoading}
              key={article.title}
              {...article}
            />
          ))
        )}
      </S.Articles.List>
      <S.OutsideLink href={constants.EXTERNAL_LINK.FLEEK_BLOG}>
        Read more on the blog
        <S.LinkArrow name="arrow-right" />
      </S.OutsideLink>
    </S.Articles.Wrapper>
  );
};
