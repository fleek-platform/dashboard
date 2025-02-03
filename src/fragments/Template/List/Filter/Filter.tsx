import * as Collapsible from '@radix-ui/react-collapsible';
import { useMemo, useState } from 'react';

import { BadgeText } from '@/components';
import { useTemplateCategoriesQuery } from '@/generated/graphqlClient';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { LoadingProps } from '@/types/Props';
import { Avatar, Box, Checkbox, Icon, Skeleton, Text } from '@/ui';

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
    <Box className="[grid-area:filter] gap-3">
      <Text as="h2" variant="primary" size="md" weight={700}>
        Filter By
      </Text>
      <Box className="gap-3">
        <Box className="h-[1px] bg-neutral-6" />
        <CollapsibleFilter
          title="Frameworks"
          items={frameworks}
          toggleActiveCategory={setFilterFrameworks}
          activeId={frameworkId}
          enableAvatar
          isLoading={siteFrameworks.isLoading}
        />
      </Box>
      <Box className="pt-2 gap-3">
        <Box className="h-[1px] bg-neutral-6" />
        <CollapsibleFilter
          title="Categories"
          items={categories}
          toggleActiveCategory={setFilterCategory}
          activeId={categoryId}
          isLoading={templateCategoriesQuery.fetching}
        />
      </Box>
    </Box>
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
      <Box className="overflow-hidden">
        <Box className="px-2.5 flex-row justify-between">
          <Text weight={500}>{title}</Text>
          <Collapsible.Trigger asChild>
            <Icon
              name="chevron-down"
              rotate={isOpen}
              className="text-neutral-8"
            />
          </Collapsible.Trigger>
        </Box>
        <Collapsible.Content asChild>
          <Box className="gap-3 pt-4">
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
                  <label
                    htmlFor={String(item.id)}
                    className="flex gap-2.5 items-center px-2.5 cursor-pointer"
                    key={item.id}
                  >
                    <Checkbox
                      id={String(item.id)}
                      checked={item.id === activeId}
                      onCheckedChange={() => toggleActiveCategory(item)}
                    />
                    {enableAvatar && (
                      <Avatar
                        src={item.avatar}
                        enableIcon
                        icon="gear"
                        className="text-2xs"
                      />
                    )}
                    <Text>{item.label}</Text>
                    {item.badge && (
                      <BadgeText
                        colorScheme="slate"
                        className="text-2xs pointer-events-none"
                      >
                        {item.badge}
                      </BadgeText>
                    )}
                  </label>
                ))}
          </Box>
        </Collapsible.Content>
      </Box>
    </Collapsible.Root>
  );
};

const FilterRowSkeleton: React.FC<
  Pick<FilterCollapsibleProps, 'enableAvatar'>
> = ({ enableAvatar }) => {
  return (
    <Box className="flex-row gap-2.5 items-center px-2.5">
      <Skeleton variant="avatar" className="rounded-sm size-5" />
      {enableAvatar && <Skeleton variant="avatar" className="size-5" />}
      <Skeleton variant="text" className="w-1/2" />
    </Box>
  );
};

type FilterItem = {
  id: string | null;
  label: string;
  avatar?: string;
  badge?: string | number;
};
