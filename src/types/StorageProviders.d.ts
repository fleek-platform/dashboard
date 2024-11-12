import { Folder as FolderModel, ListFolderQuery, PinsQuery } from '@/generated/graphqlClient';
import { IconName } from '@/ui';

export type StorageProviderValue = 'arweave' | 'filecoin' | 'all';

export type StorageProvider = {
  value: StorageProviderValue;
  label: string;
  icons: IconName[];
  disclaimer?: string;
};

export type Pin = PinsQuery['pins']['data'][0];

export type Folder = Omit<FolderModel, 'folderCount' | 'pinCount' | 'updatedAt'>;

export type FolderOrPin = ListFolderQuery['listFolder'][0];
