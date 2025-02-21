import { useState } from 'react';

import { Form, SettingsBox, SettingsListItem } from '@/components';
import { PersonalAccessToken } from '@/generated/graphqlClient';
import { LoadingProps } from '@/types/Props';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';

import { DeletePATModal } from './DeletePAT';

type openDeleteFormType = (pat: PersonalAccessToken) => void;

type DeletePATModalState =
  | {
      isOpen: true;
      pat: PersonalAccessToken;
    }
  | {
      isOpen: false;
      pat: null;
    };

type ManagePatProps = LoadingProps<{
  patList: PersonalAccessToken[];
}>;

export const ManagePAT: React.FC<ManagePatProps> = ({ isLoading, patList }) => {
  const [deleteModalState, setDeleteModalState] = useState<DeletePATModalState>({ isOpen: false, pat: null });

  const personalAccessTokens = patList;
  const form = Form.useContext();

  const openDeleteForm: openDeleteFormType = (pat) => {
    form.fields.patName.setValue(pat.name || 'Unnamed');
    form.fields.id.setValue(pat.id);
    setDeleteModalState({ isOpen: true, pat });
  };

  const closeModal = () => {
    form.resetForm();
    setDeleteModalState({ isOpen: false, pat: null });
  };

  if (isLoading) {
    return (
      <SettingsBox.Container>
        <SettingsBox.Title>Manage Tokens</SettingsBox.Title>
        <SettingsBox.Text>Remove existing tokens.</SettingsBox.Text>
        <PATItem isLoading />
        <PATItem isLoading />
        <PATItem isLoading />
      </SettingsBox.Container>
    );
  }

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Manage Tokens</SettingsBox.Title>
      <SettingsBox.Text>Remove existing tokens.</SettingsBox.Text>
      {personalAccessTokens && personalAccessTokens.length > 0 ? (
        personalAccessTokens.map((pat) => <PATItem key={pat.id} handleDeletePAT={openDeleteForm} pat={pat} />)
      ) : (
        <SettingsBox.EmptyContent title="No Tokens" description="Once you add tokens, they will appear here." />
      )}
      <DeletePATModal pat={deleteModalState.pat!} open={deleteModalState.isOpen} close={closeModal} onOpenChange={closeModal} />
    </SettingsBox.Container>
  );
};

type PATItemProps = LoadingProps<{
  pat: PersonalAccessToken;
  handleDeletePAT: openDeleteFormType;
}>;

const PATItem: React.FC<PATItemProps> = ({ pat, handleDeletePAT, isLoading }) => {
  if (isLoading) {
    return (
      <SettingsListItem.FlatRow className="border-b border-neutral-6 pb-4 last:border-none last:pb-0">
        <SettingsListItem.DataSkeleton />
        <SettingsListItem.DataSkeleton />
      </SettingsListItem.FlatRow>
    );
  }

  const deletePAT = () => {
    handleDeletePAT(pat);
  };

  return (
    <SettingsListItem.FlatRow className="border-b border-neutral-6 pb-4 pr-2.5 last:border-none last:pb-0">
      <SettingsListItem.Data
        title={pat.name || 'Unnamed'}
        subtitle={getDurationUntilNow({ isoDateString: pat.createdAt, shortFormat: true })}
      />
      <SettingsListItem.Data title="Value" subtitle={pat.maskedToken} />

      <SettingsListItem.DropdownMenu>
        <SettingsListItem.DropdownMenuItem icon="trash" onClick={deletePAT}>
          Delete
        </SettingsListItem.DropdownMenuItem>
      </SettingsListItem.DropdownMenu>
    </SettingsListItem.FlatRow>
  );
};
