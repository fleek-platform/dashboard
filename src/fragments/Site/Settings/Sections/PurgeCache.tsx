import { useState } from 'react';

import { LearnMoreMessage, PermissionsTooltip } from '@/components';
import { SettingsBox } from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';
import { Button } from '@/ui';
import { Log } from '@/utils/log';

export type PurgeCacheProps = LoadingProps<{
  onSubmit: () => Promise<void>;
}>;

export const PurgeCache: React.FC<PurgeCacheProps> = ({ isLoading, onSubmit }) => {
  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Purge Cache</SettingsBox.Title>
      <SettingsBox.Text>
        If your website is not reflecting the latest changes, you might have a cache-refresh issue. Use the Purge Cache button to manually
        fix this issue.
      </SettingsBox.Text>

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_PURGE_CACHE}>purging the cache</LearnMoreMessage>
        {isLoading ? <SettingsBox.Skeleton variant="button" /> : <SubmitButton onSubmit={onSubmit} />}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

type SubmitButtonProps = Pick<PurgeCacheProps, 'onSubmit'>;

const SubmitButton: React.FC<SubmitButtonProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const hasPurgePermission = usePermissions({ action: [constants.PERMISSION.SITE.PURGE_CACHE] });

  const handleSubmit = async () => {
    if (onSubmit === undefined) {
      Log.error('onSubmit is undefined');

      return;
    }

    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  return (
    <PermissionsTooltip hasAccess={hasPurgePermission} asChild>
      <Button loading={isLoading} disabled={isLoading || !onSubmit || !hasPurgePermission} onClick={handleSubmit}>
        Purge cache
      </Button>
    </PermissionsTooltip>
  );
};
