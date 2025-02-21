import { useState } from 'react';

import { Form, SettingsBox, SettingsListItem } from '@/components';
import type { LoadingProps } from '@/types/Props';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import type { ApiToken } from '../useApiTokens';
import { DeleteApiTokenModal } from './DeleteApiToken';

type openDeleteFormType = (apiToken: ApiToken) => void;

type DeleteApiTokenModalState =
  | {
      isOpen: true;
      apiToken: ApiToken;
    }
  | {
      isOpen: false;
      apiToken: null;
    };

type ManageApiTokensProps = LoadingProps<{
  apiTokenList?: ApiToken[];
  isError?: boolean;
}>;

export const ManageApiTokens: React.FC<ManageApiTokensProps> = ({
  isLoading,
  apiTokenList,
  isError,
}) => {
  const [deleteModalState, setDeleteModalState] =
    useState<DeleteApiTokenModalState>({ isOpen: false, apiToken: null });
  const form = Form.useContext();

  const openDeleteForm: openDeleteFormType = (apiToken) => {
    form.fields.id.setValue(apiToken.id);
    setDeleteModalState({ isOpen: true, apiToken });
  };

  const closeModal = () => {
    form.resetForm();
    setDeleteModalState({ isOpen: false, apiToken: null });
  };

  if (isError) {
    return (
      <SettingsBox.Container>
        <SettingsBox.Title>Manage API Tokens</SettingsBox.Title>
        <SettingsBox.EmptyContent
          showIcon={false}
          title="Error"
          description="An error occurred while fetching your API tokens"
        />
      </SettingsBox.Container>
    );
  }

  if (isLoading && !apiTokenList) {
    return (
      <SettingsBox.Container>
        <SettingsBox.Title>Manage API Tokens</SettingsBox.Title>
        <SettingsBox.Text>Remove existing tokens.</SettingsBox.Text>
        <ApiTokenItem isLoading />
        <ApiTokenItem isLoading />
        <ApiTokenItem isLoading />
      </SettingsBox.Container>
    );
  }

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Manage API Tokens</SettingsBox.Title>
      <SettingsBox.Text>Remove existing tokens.</SettingsBox.Text>
      {apiTokenList?.length ? (
        apiTokenList.map((apiToken) => (
          <ApiTokenItem
            key={apiToken.id}
            handleDeleteApiToken={openDeleteForm}
            apiToken={apiToken}
          />
        ))
      ) : (
        <SettingsBox.EmptyContent
          title="No Tokens"
          description="Once you add tokens, they will appear here."
        />
      )}
      <DeleteApiTokenModal
        apiToken={deleteModalState.apiToken}
        open={deleteModalState.isOpen}
        close={closeModal}
        onOpenChange={closeModal}
      />
    </SettingsBox.Container>
  );
};

type ApiTokenItemProps = LoadingProps<{
  apiToken: ApiToken;
  handleDeleteApiToken: openDeleteFormType;
}>;

const ApiTokenItem: React.FC<ApiTokenItemProps> = ({
  apiToken,
  handleDeleteApiToken,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <SettingsListItem.FlatRow className="border-b border-neutral-6 pb-4 last:border-none last:pb-0">
        <SettingsListItem.DataSkeleton />
        <SettingsListItem.DataSkeleton />
      </SettingsListItem.FlatRow>
    );
  }

  return (
    <SettingsListItem.FlatRow className="border-b border-neutral-6 pb-4 pr-2.5 last:border-none last:pb-0">
      <SettingsListItem.Data
        title={apiToken.name || 'Unnamed'}
        subtitle={getDurationUntilNow({
          isoDateString: apiToken.created_at,
          shortFormat: true,
        })}
      />
      <SettingsListItem.Data
        title="Masked Value"
        subtitle={`flk_${apiToken.token_prefix}_*************`}
      />

      <SettingsListItem.DropdownMenu>
        <SettingsListItem.DropdownMenuItem
          icon="trash"
          onClick={() => handleDeleteApiToken(apiToken)}
        >
          Delete
        </SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>
    </SettingsListItem.FlatRow>
  );
};
