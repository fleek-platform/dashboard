import React from 'react';

import { Link } from '@/components/Link/Link';
import { Avatar, AvatarMarble, Box, Icon, IconName, Skeleton, Text } from '@/ui';

export type BreadcrumbItem = { id: string; name: string; avatar: string; url: string } | { name: string; icon: IconName; url: string };

const Breadcrumb: React.FC<BreadcrumbItem> = (breadcrumb) => {
  return (
    <Link href={breadcrumb.url} className="group flex gap-2 items-center h-[2rem]">
      {'icon' in breadcrumb && (
        <Box className="bg-neutral-5 rounded justify-center items-center size-4">
          <Icon name={breadcrumb.icon} className="size-[0.625rem] text-neutral-11" />
        </Box>
      )}

      {'avatar' in breadcrumb && (
        <>
          {breadcrumb.avatar ? (
            <Avatar src={breadcrumb.avatar} enableIcon icon="image" className="shrink-0 rounded-sm size-4" />
          ) : (
            <AvatarMarble name={breadcrumb.id} className="shrink-0 rounded-sm size-4" />
          )}
        </>
      )}

      <Text variant="primary" weight={500} className="group-hover:text-neutral-11 transition-colors line-clamp-1">
        {breadcrumb.name}
      </Text>
    </Link>
  );
};

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbItem[];
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const isBreadcrumbsLoading = breadcrumbs.some((breadcumb) => !breadcumb.name);

  if (isBreadcrumbsLoading) {
    return (
      <Box className="flex-row gap-2 items-center h-[2rem] w-1/6">
        <Skeleton className="size-4 rounded shrink-0" />
        <Skeleton variant="text" className="shrink-0" />
      </Box>
    );
  }

  return (
    <Box className="flex-row items-center gap-2">
      {breadcrumbs.map((breadcrumb, idx) => {
        const isLastBreadcrumb = breadcrumbs.length === idx + 1;

        if ('icon' in breadcrumb) {
          return (
            <Box key={breadcrumb.name} className="flex-row items-center gap-2">
              <Breadcrumb name={breadcrumb.name} url={breadcrumb.url} icon={breadcrumb.icon} />
              {!isLastBreadcrumb && <Icon name="chevron-right" className="size-3" />}
            </Box>
          );
        }

        return (
          <Box key={breadcrumb.name} className="flex-row items-center gap-2">
            <Breadcrumb id={breadcrumb.id} name={breadcrumb.name} url={breadcrumb.url} avatar={breadcrumb.avatar} />
            {!isLastBreadcrumb && <Icon name="chevron-right" className="size-3" />}
          </Box>
        );
      })}
    </Box>
  );
};
