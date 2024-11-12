import { envVarName, envVarValue } from '@fleek-platform/utils-validation';
import { useState } from 'react';
import zod from 'zod';

import { Form, SettingsBox, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import { SecretVisibility } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';
import { SiteSecret } from '@/types/Site';
import { Box, FormField, Icon, Text } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import { EnvironmentVariablesStyles as S } from './EnvironmentVariables.styles';
import { ValueField } from './Fields/ValueField';
import { VisibilityField } from './Fields/VisibilityField';
import {
  ManageEnvironmentVariablesContext,
  ManageEnvironmentVariablesProvider,
  useManageEnvironmentVariablesContext,
} from './ManageEnvironmentVariables.context';

export type ManageEnvironmentVariablesProps = ManageEnvironmentVariablesContext & ContentProps;

export const ManageEnvironmentVariables: React.FC<ManageEnvironmentVariablesProps> = ({ onSubmitDelete, onSubmitUpdate, ...props }) => {
  return (
    <ManageEnvironmentVariablesProvider value={{ onSubmitDelete, onSubmitUpdate }}>
      <SettingsBox.Container>
        <SettingsBox.Title>Environment Variables</SettingsBox.Title>
        <SettingsBox.Text>Edit or remove existing environment variables.</SettingsBox.Text>

        <Content {...props} />
      </SettingsBox.Container>
    </ManageEnvironmentVariablesProvider>
  );
};

type ContentProps = LoadingProps<{
  secrets: SiteSecret[];
}>;

const Content: React.FC<ContentProps> = ({ secrets, isLoading }) => {
  if (isLoading) {
    return (
      <>
        <ListItem isLoading />
        <ListItem isLoading />
        <ListItem isLoading />
      </>
    );
  }

  if (secrets.length === 0) {
    return <SettingsBox.EmptyContent title="No Variables" description="Once you add variables, they will appear here." />;
  }

  return (
    <>
      {secrets.map((secret) => (
        <ListItem key={secret.id} secret={secret} />
      ))}
    </>
  );
};

type ListItemProps = LoadingProps<{
  secret: SiteSecret;
}>;

const ListItem: React.FC<ListItemProps> = ({ secret, isLoading }) => {
  const { onSubmitDelete } = useManageEnvironmentVariablesContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const hasEditPermission = usePermissions({ action: [constants.PERMISSION.SITE.EDIT_ENV_VARIABLES] });

  if (isLoading) {
    return (
      <SettingsListItem.FlatRow>
        <SettingsListItem.DataSkeleton />
        <SettingsListItem.DataSkeleton />
        <Box />
      </SettingsListItem.FlatRow>
    );
  }

  if (isEditing) {
    return <EditingListItem secret={secret} onFinish={() => setIsEditing(false)} />;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    await onSubmitDelete(secret.id);
    setIsDeleting(false);
  };

  return (
    <SettingsListItem.FlatRow>
      <SettingsListItem.Data
        title={secret.key}
        subtitle={`Created ${getDurationUntilNow({ isoDateString: secret.updatedAt, shortFormat: true })}`}
      />
      <SettingsListItem.Data
        title="Value"
        subtitle={
          <>
            <Icon name={secret.visibility === SecretVisibility.ENCRYPTED ? 'lock-closed' : 'lock-open'} />
            <Text as="span" className="truncate">
              {secret.value}
            </Text>
          </>
        }
      />

      <SettingsListItem.DropdownMenu isLoading={isDeleting} isDisabled={!hasEditPermission} hasAccess={hasEditPermission}>
        <SettingsListItem.DropdownMenuItem icon="pencil" onClick={() => setIsEditing(true)}>
          Edit
        </SettingsListItem.DropdownMenuItem>
        <SettingsListItem.DropdownMenuItem icon="trash" onClick={handleDelete}>
          Delete
        </SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>
    </SettingsListItem.FlatRow>
  );
};

type EditingListItemProps = {
  secret: SiteSecret;
  onFinish: () => void;
};

const EditingListItem: React.FC<EditingListItemProps> = ({ secret, onFinish }) => {
  const { onSubmitUpdate } = useManageEnvironmentVariablesContext();

  const editForm = Form.useForm({
    options: { partial: true },
    values: {
      key: secret.key,
      value: secret.visibility === SecretVisibility.ENCRYPTED ? '' : secret.value,
      encrypted: secret.visibility === SecretVisibility.ENCRYPTED,
    },
    schema: zod.object({
      key: envVarName,
      value: envVarValue,
    }),
    onSubmit: async (values) => {
      await onSubmitUpdate({
        where: {
          id: secret.id,
        },
        data: {
          value: values.value,
          visibility: values.encrypted ? SecretVisibility.ENCRYPTED : SecretVisibility.PUBLIC,
        },
      });
      onFinish();
    },
  });

  return (
    <Form.Provider value={editForm}>
      <S.Editing.FlatRow>
        <SettingsListItem.Data
          title={secret.key}
          subtitle={`Created ${getDurationUntilNow({ isoDateString: secret.updatedAt, shortFormat: true })}`}
        />

        <ValueField disableLabel />
        <VisibilityField disableLabel />

        <FormField.Root>
          {editForm.isSubmitting ? (
            <Icon name="spinner" />
          ) : (
            <S.Editing.ActionsBox>
              <S.Editing.ActionText colorScheme="yellow" onClick={editForm.submit}>
                Save
              </S.Editing.ActionText>
              <S.Editing.ActionText colorScheme="slate" onClick={onFinish}>
                Cancel
              </S.Editing.ActionText>
            </S.Editing.ActionsBox>
          )}
        </FormField.Root>
      </S.Editing.FlatRow>
    </Form.Provider>
  );
};
