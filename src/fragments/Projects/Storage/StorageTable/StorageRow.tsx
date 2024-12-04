import { DateTime } from 'luxon';

import { BadgeText, ExternalLink } from '@/components';
import { useUploadContext } from '@/providers/UploadProvider';
import { TEST_ID } from '@/test/testId';
import { LoadingProps } from '@/types/Props';
import { Folder, Pin } from '@/types/StorageProviders';
import { Box, Icon, Image, Skeleton, Text } from '@/ui';
import { dateFormat } from '@/utils/dateFormats';
import { shortStringFormat } from '@/utils/stringFormat';

import { RightMenu } from './RightMenu';
import {
  StorageRowStyles as RS,
  StorageTableStyles as S,
} from './StorageTable.styles';
import { useStorageTableUtils } from './storageTableUtils';

type StorageRowProps = LoadingProps<{ pin?: Pin; folder?: Folder }>;

export const StorageRow: React.FC<StorageRowProps> = ({
  isLoading,
  pin,
  folder,
}) => {
  const { setParentFolderId, setFolderHistory } = useUploadContext();
  const {
    isIpfsFolder,
    isFilecoinDealPending,
    isArweavePending,
    getLink,
    getSize,
    handleCopyCid,
    handleCopyArweaveId,
    handleCopyFilecoinDealId,
  } = useStorageTableUtils(pin ? { pin } : folder ? { folder } : {});

  const onClickFolder = () => {
    if (folder) {
      setFolderHistory((prev) => [
        ...prev,
        { folderId: folder.id, path: folder.path },
      ]);
      setParentFolderId(folder.id, folder.path, true);
    }
  };

  if (isLoading) {
    return <SkeletonRow />;
  }

  const publicUrl = getLink();

  return (
    <S.Table.Row data-testid={TEST_ID.TABLE_ROW_STORAGE}>
      <S.Table.Cell>
        <RS.NameRow>
          {folder || isIpfsFolder ? (
            <Icon name="archive" />
          ) : (
            <Image alt="preview" />
          )}
          <Box className="lg:w-4/5">
            {folder ? (
              <Text
                variant="primary"
                className="truncate cursor-pointer"
                onClick={onClickFolder}
              >
                {folder.name}
              </Text>
            ) : publicUrl ? (
              <ExternalLink href={publicUrl} className="flex max-w-full">
                <Text variant="primary" className="truncate">
                  {pin?.filename}
                </Text>
                <Text variant="primary">
                  {pin?.extension && `.${pin?.extension}`}
                </Text>
              </ExternalLink>
            ) : (
              <>
                <Text variant="primary" className="truncate">
                  {pin?.filename}
                </Text>
                <Text variant="primary">
                  {pin?.extension && `.${pin?.extension}`}
                </Text>
              </>
            )}
          </Box>
        </RS.NameRow>
      </S.Table.Cell>
      <S.Table.Cell>
        <Text variant="primary">{getSize()}</Text>
      </S.Table.Cell>
      <S.Table.Cell>
        <Text variant="primary">
          {dateFormat({
            dateISO: pin?.createdAt || folder?.createdAt,
            format: DateTime.DATE_MED,
          })}
        </Text>
      </S.Table.Cell>
      <S.Table.Cell>
        {pin && (
          <BadgeText hoverable colorScheme="slate" onClick={handleCopyCid}>
            <RS.IconContainer>
              <Icon name="ipfs-colored" />
            </RS.IconContainer>
            <Text size="xs">{`${shortStringFormat({ str: pin.cid })}`}</Text>
          </BadgeText>
        )}
      </S.Table.Cell>
      <S.Table.Cell>
        <RS.StorageProviders.Container>
          {pin && pin.storedOnArweave && (
            <RS.BadgeText
              colorScheme="slate"
              onClick={handleCopyArweaveId}
              className="group"
            >
              <Icon name="arweave" />
              <Text size="xs" className="hidden group-hover:block">
                {isArweavePending
                  ? 'Pending...'
                  : shortStringFormat({ str: pin?.arweavePin?.bundlrId || '' })}
              </Text>
            </RS.BadgeText>
          )}

          {pin && pin.storedOnFilecoin && (
            <RS.BadgeText
              colorScheme="slate"
              onClick={handleCopyFilecoinDealId}
              className="group"
            >
              <Icon name="filecoin" />
              <Text size="xs" className="hidden group-hover:block">{`${
                isFilecoinDealPending
                  ? 'Pending...'
                  : pin?.filecoinPin?.deals[0].dealId
              }`}</Text>
            </RS.BadgeText>
          )}
        </RS.StorageProviders.Container>
      </S.Table.Cell>
      <S.Table.Cell>
        <RightMenu pin={pin} folder={folder} />
      </S.Table.Cell>
    </S.Table.Row>
  );
};

const SkeletonRow: React.FC = () => (
  <S.Table.Row>
    <S.Table.Cell>
      <Skeleton />
    </S.Table.Cell>
    <S.Table.Cell>
      <Skeleton />
    </S.Table.Cell>
    <S.Table.Cell>
      <Skeleton />
    </S.Table.Cell>
    <S.Table.Cell>
      <Skeleton />
    </S.Table.Cell>
    <S.Table.Cell>
      <Skeleton />
    </S.Table.Cell>
    <S.Table.Cell>
      <Skeleton />
    </S.Table.Cell>
  </S.Table.Row>
);
