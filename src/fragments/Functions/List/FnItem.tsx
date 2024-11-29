import { routes } from '@fleek-platform/utils-routes';
import type React from 'react';
import { useCallback } from 'react';

import { Link, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import type { FleekFunctionsQuery } from '@/generated/graphqlClient';
import type { UseFunctionsListArgs } from '@/hooks/useFunctionsList';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { Box, Skeleton, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { useDeleteFunction } from '../Detail/Context';
import { DeployTime } from './DeployTime';
import { SiteBadge } from './SiteBadge';
import { StatusBadge } from './StatusBadge';

type FnItemProps = {
  fn: FleekFunctionsQuery['fleekFunctions']['data'][number];
  projectId: string;
  source: UseFunctionsListArgs;
};

export const FnItemSkeleton = () => {
  return (
    <Box className="p-4 grid grid-cols-10 items-center border-b border-neutral-6 last:border-none h-[73px]">
      <Box className="col-span-4 gap-1">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="text" className="w-1/2" />
      </Box>
      <Skeleton variant="text" className="col-span-2 w-1/2" />
      <Skeleton variant="text" className="col-span-2 w-1/2" />
      <Box className="col-span-2 flex-row gap-4 items-center">
        <Skeleton variant="text" />
        <Skeleton variant="avatar" className="shrink-0 rounded-lg size-6" />
      </Box>
    </Box>
  );
};

export const FnItem: React.FC<FnItemProps> = ({ fn, projectId, source }) => {
  const href = routes.project.function.detail({ fnName: fn.name, projectId });
  const settingsHref = routes.project.function.settings({
    fnName: fn.name,
    projectId,
  });
  const router = useRouter();
  const navTo = useCallback((url: string) => () => router.push(url), [router]);
  const hasFunctionOverviewPermissions = usePermissions({
    action: [constants.PERMISSION.FUNCTIONS.VIEW],
  });
  const hasFunctionsSettingsPermissions = usePermissions({
    action: [constants.PERMISSION.FUNCTIONS.EDIT_SETTINGS],
  });

  const [{ fetching: deleting }] = useDeleteFunction(fn);

  return (
    <Link
      className={cn(
        'p-4 grid grid-cols-12 items-center border-b border-neutral-6 last:border-none hover:bg-neutral-3/50',
        {
          'pointer-events-none opacity-50': deleting,
          'cursor-default': !hasFunctionOverviewPermissions,
        },
      )}
      href={hasFunctionOverviewPermissions ? href : '#'}
    >
      <Box className="col-span-6">
        <Text variant="primary" weight={500} className="truncate">
          {fn.name}
        </Text>
        <Text className="truncate">{fn.invokeUrl}</Text>
      </Box>

      <Box className="col-span-2">
        {fn.site && source === 'project' && (
          <SiteBadge projectId={projectId} siteId={fn.site.id}>
            {fn.site.name}
          </SiteBadge>
        )}
      </Box>

      <Box className="col-span-2">
        <DeployTime
          at={fn.currentDeployment?.createdAt}
          before="Deployed"
          size="xs"
          variant="secondary"
        />
      </Box>

      <Box className="col-span-2 flex-row items-center gap-3 place-self-end self-center">
        <Box className="pointer-events-none place-self-end self-center">
          {fn.currentDeployment && !deleting ? (
            <Box className="gap-1">
              <StatusBadge status={fn.status} />
            </Box>
          ) : (
            <StatusBadge status={deleting ? 'DELETING' : null} />
          )}
        </Box>

        <SettingsListItem.DropdownMenu
          isLoading={deleting}
          isDisabled={!hasFunctionsSettingsPermissions}
          hasAccess={hasFunctionsSettingsPermissions}
        >
          {fn.currentDeployment && hasFunctionOverviewPermissions && (
            <SettingsListItem.DropdownMenuItem
              icon="expand"
              onClick={navTo(href)}
            >
              View deployment
            </SettingsListItem.DropdownMenuItem>
          )}
          <SettingsListItem.DropdownMenuItem
            icon="gear"
            onClick={(e) => e.preventDefault()}
            onMouseDown={navTo(settingsHref)}
          >
            Settings
          </SettingsListItem.DropdownMenuItem>
        </SettingsListItem.DropdownMenu>
      </Box>
    </Link>
  );
};
