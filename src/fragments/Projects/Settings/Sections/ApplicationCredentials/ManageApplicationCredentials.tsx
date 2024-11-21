import { useState } from 'react';

import {
  BadgeText,
  CustomTooltip,
  SettingsBox,
  SettingsListItem,
} from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/useToast';
import type { Credential } from '@/types/Credentials';
import type { LoadingProps } from '@/types/Props';
import { Box, Divider, Icon, Skeleton, Text } from '@/ui';
import { copyToClipboard } from '@/utils/copyClipboard';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';
import { parseWhitelistDomains } from '@/utils/whitelistDomains';

import {
  type ApplicationCredentialsContext,
  ApplicationCredentialsProvider,
  useApplicationCredentialsContext,
} from './ApplicationCredentials.context';
import { ApplicationCredentialsStyles as S } from './ApplicationCredentials.styles';
import { ApplicationCredentialsEditModal } from './ApplicationCredentialsEditModal';

export type ManageApplicationCredentialsProps = LoadingProps<
  {
    credentials: Credential[];
  } & Pick<ApplicationCredentialsContext, 'onSubmitDelete'>
>;

export const ManageApplicationCredentials: React.FC<
  ManageApplicationCredentialsProps
> = ({ isLoading, credentials, onSubmitDelete }) => {
  if (isLoading) {
    return <CredentialsSkeleton />;
  }

  return (
    <ApplicationCredentialsProvider onSubmitDelete={onSubmitDelete}>
      <SettingsBox.Container
        role="table"
        aria-label="Application credential list"
      >
        <Header />
        {credentials?.length === 0 ? (
          <SettingsBox.EmptyContent
            title="Credentials"
            description="Once you add credentials, they will appear here."
          />
        ) : (
          credentials?.map((credential, index) => {
            return (
              <Box key={credential.id} role="row">
                <ApplicationCredentialItem credential={credential} />
                {index < credentials.length - 1 && <Divider />}
              </Box>
            );
          })
        )}
      </SettingsBox.Container>

      <ApplicationCredentialsEditModal />
    </ApplicationCredentialsProvider>
  );
};

const Header: React.FC = () => (
  <>
    <SettingsBox.Title>Manage Credentials</SettingsBox.Title>
    <SettingsBox.Text>
      Remove or edit the information associated with an application token.
    </SettingsBox.Text>
  </>
);

const CredentialsSkeleton: React.FC = () => (
  <SettingsBox.Container role="table">
    <Header />
    <S.Item.Container isLoading>
      <Box>
        <S.Item.TextSkeleton>
          <Skeleton />
        </S.Item.TextSkeleton>
        <S.Item.LabelSkeleton isLoading>
          <Skeleton />
        </S.Item.LabelSkeleton>
      </Box>
      <Box>
        <S.Item.TextSkeleton>
          <Skeleton />
        </S.Item.TextSkeleton>
        <S.Item.LabelSkeleton isLoading>
          <Skeleton />
        </S.Item.LabelSkeleton>
      </Box>
      <Box>
        <S.Item.TextSkeleton>
          <Skeleton />
        </S.Item.TextSkeleton>
        <S.Item.LabelSkeleton isLoading>
          <Skeleton />
        </S.Item.LabelSkeleton>
      </Box>
      <Skeleton />
    </S.Item.Container>
  </SettingsBox.Container>
);

type ApplicationCredentialItemProps = {
  credential: Credential;
};

const ApplicationCredentialItem: React.FC<ApplicationCredentialItemProps> = ({
  credential,
}) => {
  const toast = useToast();

  // Warning: The reason why of parsing is related
  // to the deprecated whiteLabelDomains fields,
  // which is combined here. This is only temporary
  // throughout the deprecation phase of whiteLabelDomains
  // for retroactive support, that otherwise new client versions
  // would not be aware of e.g. data pushed via old cli
  const applicationData = parseWhitelistDomains({
    applicationQueryData: credential,
  });

  const whitelistDomains = applicationData
    .slice(0, 2)
    .map((domain) => domain.hostname)
    .join(', ');

  const handleCopyToClipboard = () => {
    try {
      copyToClipboard(credential.clientId);
      toast.success({
        message: 'Application Credential ID copied to clipboard',
      });
    } catch {
      toast.error({
        message: 'Failed to copy Application Credential ID to clipboard',
      });
    }
  };

  return (
    <S.Item.Container>
      <S.Item.Name>
        <Text variant="primary" weight={700}>
          {credential.name}
        </Text>
        <Text size="xs">
          {getDurationUntilNow({
            isoDateString: credential.createdAt,
            shortFormat: true,
          })}
        </Text>
      </S.Item.Name>
      <S.Item.DomainsList>
        <Text variant="primary" weight={700}>
          Domains
        </Text>
        <S.Item.Domains.Container>
          <Text size="xs" className="truncate">
            {whitelistDomains}
          </Text>
          {applicationData.length > 2 && (
            <CustomTooltip
              content={applicationData
                .map((domain) => domain.hostname)
                .join(', ')}
              side="bottom"
            >
              <BadgeText colorScheme="slate">
                +{applicationData.length - 2} more
              </BadgeText>
            </CustomTooltip>
          )}
        </S.Item.Domains.Container>
      </S.Item.DomainsList>
      <S.Item.ClientId>
        <Text variant="primary" weight={700}>
          ID
        </Text>
        <Text
          size="xs"
          onClick={handleCopyToClipboard}
          className="flex items-center gap-2 hover:text-neutral-12 cursor-pointer"
        >
          {credential.clientId}
          <Icon name="copy" color="slate" />
        </Text>
      </S.Item.ClientId>
      <DropdownMenu id={credential.id} />
    </S.Item.Container>
  );
};

type DropdownMenuProps = {
  id: string;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ id }) => {
  const { openModal, onSubmitDelete } = useApplicationCredentialsContext();
  const [isLoading, setIsLoading] = useState(false);
  const hasEditPermission = usePermissions({
    action: [constants.PERMISSION.APPLICATION_CREDENTIALS.EDIT],
  });

  if (isLoading) {
    // needed cause the forwardStyledRef
    return <Icon name="spinner" />;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    await onSubmitDelete(id);
    setIsLoading(false);
  };

  const handleEdit = async () => {
    openModal(id);
  };

  return (
    <SettingsListItem.DropdownMenu
      isLoading={isLoading}
      isDisabled={!hasEditPermission}
      hasAccess={hasEditPermission}
    >
      <SettingsListItem.DropdownMenuItem icon="trash" onClick={handleDelete}>
        Delete
      </SettingsListItem.DropdownMenuItem>
      <SettingsListItem.DropdownMenuItem icon="pencil" onClick={handleEdit}>
        Edit
      </SettingsListItem.DropdownMenuItem>
    </SettingsListItem.DropdownMenu>
  );
};
