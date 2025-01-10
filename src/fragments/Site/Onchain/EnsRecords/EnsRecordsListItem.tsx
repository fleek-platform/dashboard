import { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { useEnsAddress } from 'wagmi';

import { BadgeText, CustomTooltip, SettingsListItem } from '@/components';
import { constants } from '@/constants';
import {
  EnsRecordStatus,
  useEnsRecordStatusQuery,
} from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { EnsRecord } from '@/types/EnsRecord';
import { Icon } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';
import { getLinkForDomain } from '@/utils/getLinkForDomain';

import { useEnsSettingsContext } from './EnsSettings.context';

export type EnsRecordItemProps = EnsRecord;

export const EnsRecordsListItem: React.FC<EnsRecordItemProps> = ({
  id,
  name,
  createdAt,
  status: initialStatus,
}) => {
  const { openModal } = useEnsSettingsContext();
  const [ensRecordStatusQuery, refetchEnsRecordStatusQuery] =
    useEnsRecordStatusQuery({
      variables: { where: { id } },
      requestPolicy: 'network-only',
    });
  const hasVerifyENSPermission = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS],
  });

  const { status = initialStatus } = ensRecordStatusQuery.data?.ensRecord || {};

  const handleOpenEnsModal = () => {
    if (hasVerifyENSPermission) {
      openModal(id, name);
    }
  };

  useEffect(() => {
    switch (ensRecordStatusQuery.data?.ensRecord.status) {
      case EnsRecordStatus.VERIFYING:
        setTimeout(() => {
          refetchEnsRecordStatusQuery();
        }, 6000);

      default:
        return;
    }
  }, [ensRecordStatusQuery.data, refetchEnsRecordStatusQuery]);

  const { data: ensAddressOwner } = useEnsAddress({
    name,
  });

  return (
    <SettingsListItem.FlatRow>
      <SettingsListItem.Data
        subtitle={`Added ${getDurationUntilNow({
          isoDateString: createdAt,
          shortFormat: true,
        })}`}
        title={name}
      />
      {match(status)
        .with(EnsRecordStatus.ACTIVE, () => (
          <BadgeText colorScheme="green">Active</BadgeText>
        ))
        .with(EnsRecordStatus.CREATED, () => (
          <EnsRecordCreated
            isBuyable={!ensAddressOwner}
            hasVerifyPermission={hasVerifyENSPermission}
            handleOpenEnsModal={handleOpenEnsModal}
          />
        ))
        .with(EnsRecordStatus.VERIFYING, () => (
          <BadgeText colorScheme="slate">
            Verifying <Icon name="spinner" />
          </BadgeText>
        ))
        .with(EnsRecordStatus.VERIFYING_FAILED, () => (
          <BadgeText
            hoverable={hasVerifyENSPermission}
            colorScheme="red"
            onClick={handleOpenEnsModal}
          >
            Verification Failed
          </BadgeText>
        ))
        .exhaustive()}

      <DropdownMenu
        name={name}
        id={id}
        status={status}
        handleOpenEnsModal={handleOpenEnsModal}
        isBuyable={!ensAddressOwner}
      />
    </SettingsListItem.FlatRow>
  );
};

type EnsRecordCreatedProps = {
  isBuyable: boolean;
  hasVerifyPermission: boolean;
  handleOpenEnsModal: () => void;
};

const EnsRecordCreated: React.FC<EnsRecordCreatedProps> = ({
  isBuyable,
  hasVerifyPermission,
  handleOpenEnsModal,
}) => {
  if (isBuyable) {
    return (
      <CustomTooltip
        side="top"
        content="This ENS is available for sale, purchase it from ENS here, or you can remove it from the 3 dot menu"
      >
        <BadgeText hoverable colorScheme="slate">
          ENS Available
        </BadgeText>
      </CustomTooltip>
    );
  }

  return (
    <BadgeText
      hoverable={hasVerifyPermission}
      colorScheme="amber"
      onClick={handleOpenEnsModal}
    >
      Set Content Record
    </BadgeText>
  );
};

type DropdownMenuProps = {
  id: string;
  name: string;
  status: EnsRecordStatus;
  isBuyable: boolean;
  handleOpenEnsModal: () => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  name,
  id,
  status,
  isBuyable,
  handleOpenEnsModal,
}) => {
  const { onSubmitDelete } = useEnsSettingsContext();
  const [isLoading, setIsLoading] = useState(false);
  const hasVerifyENSPermission = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS],
  });
  const hasRemoveENSPermission = usePermissions({
    action: [constants.PERMISSION.SITE.DELETE_ENS],
  });

  const handleDelete = async () => {
    if (onSubmitDelete) {
      setIsLoading(true);
      await onSubmitDelete(id);
      setIsLoading(false);
    }
  };

  const hasAccess = hasVerifyENSPermission || hasRemoveENSPermission;

  const shouldDisableMenu =
    (status !== EnsRecordStatus.ACTIVE &&
      !hasVerifyENSPermission &&
      !hasRemoveENSPermission) ||
    /* we shouldn't have this cases since we're checking if the ens has an owner in the input field validation, 
      but just in case there are ens added before we introduced the ens field validation */
    (isBuyable && status === EnsRecordStatus.CREATED);

  return (
    <SettingsListItem.DropdownMenu
      isLoading={isLoading}
      isDisabled={shouldDisableMenu}
      hasAccess={hasAccess}
    >
      {match(status)
        .with(EnsRecordStatus.ACTIVE, () => (
          <>
            <SettingsListItem.DropdownMenuItem
              href={getLinkForDomain(name)}
              icon="external-link"
            >
              Visit
            </SettingsListItem.DropdownMenuItem>
          </>
        ))
        .with(EnsRecordStatus.CREATED, () => {
          if (isBuyable) {
            return null;
          }

          return (
            <>
              {hasVerifyENSPermission && (
                <>
                  <SettingsListItem.DropdownMenuItem
                    icon="check"
                    onClick={handleOpenEnsModal}
                  >
                    Verify
                  </SettingsListItem.DropdownMenuItem>
                </>
              )}
            </>
          );
        })
        .with(EnsRecordStatus.VERIFYING_FAILED, () => (
          <>
            {hasVerifyENSPermission && (
              <>
                <SettingsListItem.DropdownMenuItem
                  icon="refresh"
                  onClick={handleOpenEnsModal}
                >
                  Retry Verification
                </SettingsListItem.DropdownMenuItem>
              </>
            )}
          </>
        ))
        .otherwise(() => null)}

      {hasRemoveENSPermission && (
        <>
          <SettingsListItem.DropdownMenuSeparator />
          <SettingsListItem.DropdownMenuItem
            icon="trash"
            onClick={handleDelete}
          >
            Remove
          </SettingsListItem.DropdownMenuItem>
        </>
      )}
    </SettingsListItem.DropdownMenu>
  );
};
