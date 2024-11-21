import * as Collapsible from '@radix-ui/react-collapsible';
import { useMemo, useState } from 'react';

import { BadgeText } from '@/components';
import { useTemplateCategoriesQuery } from '@/generated/graphqlClient';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { LoadingProps } from '@/types/Props';
import { Avatar, Box, Checkbox, Icon, Text } from '@/ui';

import { TemplateStyles as S } from '../../Template.styles';

type FilterProps = {
  frameworkId?: string | null;
  setFrameworkId: (id?: string | null) => void;
  categoryId?: string | null;
  setCategoryId: (id?: string | null) => void;
};

export const Filter: React.FC<FilterProps> = ({
  frameworkId,
  setFrameworkId,
  categoryId,
  setCategoryId,
}) => {
  const siteFrameworks = useSiteFrameworks();
  const [templateCategoriesQuery] = useTemplateCategoriesQuery();

  const frameworks = useMemo(() => {
    if (!siteFrameworks.data) {
      return [];
    }

    return siteFrameworks.data
      .filter((framework) => framework.templatesCount > 0)
      .map((framework) => ({
        id: framework.id,
        label: framework.name,
        avatar: framework.avatar,
        badge: framework.templatesCount,
      }));
  }, [siteFrameworks]);

  const categories = useMemo(() => {
    if (!templateCategoriesQuery.data) {
      return [];
    }

    return templateCategoriesQuery.data.templateCategories.data
      .filter((framework) => framework.templatesCount > 0)
      .map((category) => ({
        id: category.id,
        label: category.name,
        badge: category.templatesCount,
      }));
  }, [templateCategoriesQuery.data]);

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const setFilterFrameworks = (item: FilterItem) => {
    if (frameworkId === item.id) {
      setFrameworkId(undefined);
    } else {
      setFrameworkId(item.id);
    }
  };

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const setFilterCategory = (item: FilterItem) => {
    if (categoryId === item.id) {
      setCategoryId(undefined);
    } else {
      setCategoryId(item.id);
    }
  };

  return (
    <S.List.Filter.Container>
      <Text as="h2" variant="primary" size="md" weight={700}>
        Filter By
      </Text>
      <Box>
        <S.List.Filter.Divider />
        <CollapsibleFilter
          title="Frameworks"
          items={frameworks}
          toggleActiveCategory={setFilterFrameworks}
          activeId={frameworkId}
          enableAvatar
          isLoading={siteFrameworks.isLoading}
        />
      </Box>
      <Box>
        <S.List.Filter.Divider />
        <CollapsibleFilter
          title="Categories"
          items={categories}
          toggleActiveCategory={setFilterCategory}
          activeId={categoryId}
          isLoading={templateCategoriesQuery.fetching}
        />
      </Box>
    </S.List.Filter.Container>
  );
};

type FilterCollapsibleProps = LoadingProps & {
  title: string;
  activeId?: string | null;
  items: FilterItem[];
  enableAvatar?: boolean;
  toggleActiveCategory: (item: FilterItem) => void;
};

const CollapsibleFilter: React.FC<FilterCollapsibleProps> = ({
  title,
  items,
  toggleActiveCategory,
  enableAvatar,
  activeId,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible.Root open={isOpen} asChild onOpenChange={setIsOpen}>
      <S.List.Filter.Wrapper>
        <S.List.Filter.HeaderRow>
          <Text weight={500}>{title}</Text>
          <Collapsible.Trigger asChild>
            <Icon name="chevron-down" rotate={isOpen} />
          </Collapsible.Trigger>
        </S.List.Filter.HeaderRow>
        <Collapsible.Content asChild>
          <S.List.Filter.CollapsibleContent>
            {isLoading
              ? new Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <FilterRowSkeleton
                      enableAvatar={enableAvatar}
                      key={index}
                    />
                  ))
              : items.map((item) => (
                  <S.List.Filter.Row key={item.id}>
                    <Checkbox
                      checked={item.id === activeId}
                      onCheckedChange={() => toggleActiveCategory(item)}
                    />
                    {enableAvatar && (
                      <Avatar src={item.avatar} enableIcon icon="gear" />
                    )}
                    <Text>{item.label}</Text>
                    {item.badge && (
                      <BadgeText colorScheme="slate">{item.badge}</BadgeText>
                    )}
                  </S.List.Filter.Row>
                ))}
          </S.List.Filter.CollapsibleContent>
        </Collapsible.Content>
      </S.List.Filter.Wrapper>
    </Collapsible.Root>
  );
};

const FilterRowSkeleton: React.FC<
  Pick<FilterCollapsibleProps, 'enableAvatar'>
> = ({ enableAvatar }) => {
  return (
    <S.List.Filter.Row>
      <S.List.Filter.Skeleton variant="checkbox" />
      {enableAvatar && <S.List.Filter.Skeleton variant="avatar" />}
      <S.List.Filter.Skeleton variant="text" />
    </S.List.Filter.Row>
  );
};

type FilterItem = {
  id: string | null;
  label: string;
  avatar?: string;
  badge?: string | number;
};
