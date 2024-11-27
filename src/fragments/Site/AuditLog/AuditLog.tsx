import { ExternalLink } from '@/components';
import { LoadingProps } from '@/types/Props';
import { Box, Button, Icon, IconName, Skeleton, Text } from '@/ui';

import { AuditLogStyles as S } from './AuditLog.styles';

export type AuditLogProps = LoadingProps<{
  items: AuditItemProps[];
}>;

type AuditItemCategory =
  | 'site-healthy'
  | 'site-unhealthy'
  | 'deploy-live'
  | 'deploy-started'
  | 'deploy-failed';

type AuditItemProps = LoadingProps<{
  category: AuditItemCategory;
  urlTitle?: string;
  url?: string;
  label: string;
}>;

type AuditIconColorVariantType = React.ComponentProps<
  typeof S.Item.Container
>['iconColor'];

const auditItemIcon: Record<AuditItemCategory, IconName> = {
  'site-healthy': 'arrow-up-circled',
  'site-unhealthy': 'alert-circled',
  'deploy-live': 'check-circled',
  'deploy-failed': 'alert-circled',
  'deploy-started': 'cloud-upload',
};

const auditItemText: Record<AuditItemCategory, string> = {
  'site-healthy': 'Site is healthy',
  'site-unhealthy': 'Site is unhealthy',
  'deploy-live': 'Deploy live for ',
  'deploy-failed': 'Deploy failed for ',
  'deploy-started': 'Deploy started for ',
};

const auditIconVariant: Record<AuditItemCategory, AuditIconColorVariantType> = {
  'deploy-live': 'success',
  'deploy-started': 'slate',
  'deploy-failed': 'failed',
  'site-healthy': 'success',
  'site-unhealthy': 'failed',
};

const AuditItem: React.FC<AuditItemProps> = ({
  category,
  label,
  url,
  urlTitle,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <S.Item.Container>
        <S.Item.IconSkeleton />
        <Box>
          <S.Item.MainTextSkeleton>
            <Skeleton />
          </S.Item.MainTextSkeleton>
          <S.Item.LabelSkeleton>
            <Skeleton />
          </S.Item.LabelSkeleton>
        </Box>
      </S.Item.Container>
    );
  }

  return (
    <S.Item.Container iconColor={auditIconVariant[category]}>
      <Icon name={auditItemIcon[category]} />
      <Box>
        <Text variant="primary" size="xs" weight={700} className="flex gap-1">
          {auditItemText[category]}
          {url && urlTitle && (
            <ExternalLink href={url}>{urlTitle}</ExternalLink>
          )}
        </Text>
        <Text size="xs">{label}</Text>
      </Box>
    </S.Item.Container>
  );
};

export const AuditLog: React.FC<AuditLogProps> = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <S.Container isLoading>
        <Box>
          <Skeleton />
        </Box>
        <S.AuditContent>
          <AuditItem isLoading />
        </S.AuditContent>
        <S.Divider />
        <AuditItem isLoading />
        <S.Divider />
        <AuditItem isLoading />
        <S.ButtonSkeleton />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <Text variant="tertiary" size="lg" weight={700}>
        Audit Log
      </Text>
      <S.AuditContent>
        {items.map((itemProp, index) => (
          <>
            <AuditItem key={itemProp.category} {...itemProp} />
            {index < items.length - 1 && <S.Divider />}
          </>
        ))}
      </S.AuditContent>
      <Button intent="neutral">View all</Button>
    </S.Container>
  );
};
