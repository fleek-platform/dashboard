import { useEffect, useRef, useState } from 'react';

import { SettingsBox } from '@/components';
import { useTemplatesQuery } from '@/generated/graphqlClient';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/ui';

import { TemplateStyles as S } from '../../Template.styles';
import { TemplateCard } from '../../TemplateCard/TemplateCard';

const ITEMS_PER_PAGE = 12;
const INITIAL_PAGES = [1];

export const Explorer: React.FC<ExplorerProps> = ({ frameworkId, categoryId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [pages, setPages] = useState(INITIAL_PAGES);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setPages(INITIAL_PAGES);
    setIsComplete(false);
    setIsEmpty(false);
  }, [frameworkId, categoryId, query]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isComplete) {
          observer.unobserve(container);

          return;
        }

        if (entries[0].isIntersecting) {
          setPages((prev) => [...prev, prev.length + 1]);
        }
      },
      {
        root: null,
        threshold: 0.8,
      }
    );

    observer.observe(container);

    return () => {
      observer.unobserve(container);
    };
  }, [containerRef, isComplete]);

  const setDebouncedQuery = useDebounce((newQuery) => setQuery(newQuery), 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDebouncedQuery(e.target.value);
  };

  return (
    <S.List.Explorer.Container ref={containerRef}>
      <S.List.Explorer.Controls>
        <Input.Root>
          <Input.Icon name="magnify" />
          <Input.Field onChange={handleSearchChange} value={search} placeholder="Search Templates" />
        </Input.Root>
      </S.List.Explorer.Controls>

      {isEmpty ? (
        <SettingsBox.EmptyContent title="No Results" description="We found no template results." />
      ) : (
        <S.List.Explorer.Grid>
          {pages.map((page) => (
            <Grid
              key={page}
              page={page}
              frameworkId={frameworkId}
              categoryId={categoryId}
              setIsComplete={setIsComplete}
              query={query}
              setIsEmpty={setIsEmpty}
            />
          ))}
        </S.List.Explorer.Grid>
      )}
    </S.List.Explorer.Container>
  );
};

export type ExplorerProps = {
  categoryId?: string | null;
  frameworkId?: string | null;
};

type GridProps = {
  page: number;
  query: string;
  setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
} & ExplorerProps;

const Grid: React.FC<GridProps> = ({ page, frameworkId, categoryId, setIsComplete, query, setIsEmpty }) => {
  const [templatesQuery] = useTemplatesQuery({
    variables: {
      where: {
        frameworkId,
        categoryId,
        name: query,
      },
      filter: { take: ITEMS_PER_PAGE, page },
    },
  });

  useEffect(() => {
    if (templatesQuery.data?.templates.isLastPage) {
      setIsComplete(true);
    }

    if (templatesQuery.data?.templates.totalCount === 0) {
      setIsEmpty(true);
    }
  }, [setIsComplete, templatesQuery.data?.templates, setIsEmpty]);

  if (templatesQuery.fetching) {
    return (
      <>
        {new Array(ITEMS_PER_PAGE).fill(null).map((_, index) => (
          <TemplateCard isLoading key={index} />
        ))}
      </>
    );
  }

  if (templatesQuery.error) {
    return null;
  }

  const templates = templatesQuery.data?.templates.data || [];

  return (
    <>
      {templates?.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </>
  );
};
