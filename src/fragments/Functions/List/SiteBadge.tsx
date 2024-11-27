import { routes } from '@fleek-platform/utils-routes';
import React from 'react';

import { Link } from '@/components';
import { ChildrenProps } from '@/types/Props';
import { Icon, Text } from '@/ui';

type SiteBadgeProps = ChildrenProps & {
  projectId: string;
  siteId: string;
};

export const SiteBadge: React.FC<SiteBadgeProps> = ({ children, projectId, siteId }) => {
  return (
    <Link
      href={routes.project.site.overview({ projectId, siteId })}
      className="flex gap-1 items-center bg-neutral-3 rounded-full px-2 py-[1px] max-w-fit hover:bg-neutral-4"
    >
      <Icon name="browser" className="text-neutral-11 size-[12px]" />
      <Text size="xs" weight={500} className="truncate">
        {children}
      </Text>
    </Link>
  );
};
