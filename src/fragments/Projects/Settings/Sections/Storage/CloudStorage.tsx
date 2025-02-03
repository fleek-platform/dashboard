import { useEffect, useMemo, useState } from 'react';

import { LearnMoreMessage, PermissionsTooltip } from '@/components';
import { SettingsBox } from '@/components';
import { constants } from '@/constants';
import { useProjectQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/useToast';
import { useSessionContext } from '@/providers/SessionProvider';
import { Button, Combobox, Icon } from '@/ui';

import { useStorageSettingsContext } from './StorageSettings.context';

export const CloudStorage: React.FC = () => {
  const { selectedStorage, setSelectedStorage } = useStorageSettingsContext();
  const session = useSessionContext();
  const toast = useToast();
  const hasEditPermission = usePermissions({
    action: [constants.PERMISSION.STORAGE.EDIT_SETTINGS],
  });

  const [projectQuery] = useProjectQuery({
    variables: { where: { id: session.project.id } },
  });

  const isLoading = useMemo(
    () => session.loading || projectQuery.fetching,
    [projectQuery.fetching, session.loading],
  );

  useEffect(() => {
    if (projectQuery.data?.project) {
      const project = projectQuery.data.project;

      if (project.backupStorageOnArweave && project.backupStorageOnFilecoin) {
        setSelectedStorage(constants.STORAGE_PROVIDERS.all);

        return;
      }

      if (project.backupStorageOnArweave) {
        setSelectedStorage(constants.STORAGE_PROVIDERS.arweave);

        return;
      }

      if (project.backupStorageOnFilecoin) {
        setSelectedStorage(constants.STORAGE_PROVIDERS.filecoin);

        return;
      }
    }
  }, [projectQuery.data, setSelectedStorage]);

  const error = useMemo(() => {
    if (projectQuery.error) {
      return projectQuery.error;
    }
  }, [projectQuery.error]);

  useEffect(() => {
    if (error) {
      toast.error({ error, log: 'Fetch project storage failed' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Default Storage</SettingsBox.Title>
      <SettingsBox.Text>
        Select what decentralized storage layer your files are stored by
        default. Filecoin is selected by default.
      </SettingsBox.Text>

      <PermissionsTooltip hasAccess={hasEditPermission} isLoading={isLoading}>
        <Combobox
          items={Object.values(constants.STORAGE_PROVIDERS)}
          selected={[selectedStorage, setSelectedStorage]}
          queryKey="label"
          isLoading={isLoading}
        >
          {({ Field, Options, CompoundOption }) => (
            <>
              <Field placeholder="Select storage">
                {(selected) => (
                  <>
                    {selected.icons.map((icon) => (
                      <Icon key={icon} name={icon} />
                    ))}
                    {selected.label}
                  </>
                )}
              </Field>

              <Options disableSearch horizontalDividers>
                {(item) => (
                  <CompoundOption
                    header={item.icons.map((icon) => (
                      <Icon key={icon} name={icon} className="size-4" />
                    ))}
                    content={`When this option is selected all files will be stored on ${item.label}. ${
                      item.disclaimer ? item.disclaimer : ''
                    }`}
                  />
                )}
              </Options>
            </>
          )}
        </Combobox>
      </PermissionsTooltip>

      <SettingsBox.ActionRow>
        <LearnMoreMessage
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_CLOUD_STORAGE}
        >
          default cloud storage
        </LearnMoreMessage>
        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <SaveChangesButton />
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

const SaveChangesButton: React.FC = () => {
  const { onSaveSubmit, selectedStorage } = useStorageSettingsContext();
  const [isLoading, setIsLoading] = useState(false);
  const hasEditPermission = usePermissions({
    action: [constants.PERMISSION.STORAGE.EDIT_SETTINGS],
  });

  const handleSaveChanges = async () => {
    if (!selectedStorage) {
      return;
    }

    setIsLoading(true);
    await onSaveSubmit(selectedStorage.value);
    setIsLoading(false);
  };

  return (
    <Button
      loading={isLoading}
      disabled={isLoading || !hasEditPermission}
      onClick={handleSaveChanges}
      role="button"
      aria-label="Save storage layer changes"
    >
      Save changes
    </Button>
  );
};
