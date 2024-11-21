import type { Domain } from '@/types/Domain';
import type { LoadingProps } from '@/types/Props';
import type { SiteENSRecord } from '@/types/Site';
import { Button, Skeleton, Text } from '@/ui';

import { BadgeText, Link, PermissionsTooltip } from '..';
import {
  BoxWithFooter,
  type BoxWithFooterProps,
} from '../BoxWithFooter/BoxWithFooter';
import { CustomDomainBoxStyles as S } from './CustomDomainBox.styles';

export type CustomDomainBoxProps = LoadingProps<
  {
    title: string;
    isActive: boolean;
  } & BoxWithFooterProps &
    DomainListProps &
    Omit<DomainCTAProps, 'hasDomains'>
>;

export const CustomDomainBox: React.FC<CustomDomainBoxProps> = ({
  isLoading,
  footerIcon,
  footerIconLabel,
  footer,
  title,
  emptyText,
  CTAText,
  domainList,
  listLabel,
  emptyCTAText,
  emptyCTAHref,
  CTAHref,
  isActive,
  iconContainerVariant,
  hasPermission,
}) => {
  if (isLoading) {
    return <CustomDomainBoxSkeleton />;
  }

  const hasDomains = domainList.length > 0;

  return (
    <BoxWithFooter
      footer={footer}
      footerIcon={footerIcon}
      footerIconLabel={footerIconLabel}
      iconContainerVariant={iconContainerVariant}
    >
      <S.Container>
        <S.Header>
          <Text as="h3" variant="primary" size="lg" weight={700}>
            {title}
          </Text>
          {isActive && <BadgeText colorScheme="green">Active</BadgeText>}
        </S.Header>
        <DomainList
          domainList={domainList}
          emptyText={emptyText}
          listLabel={listLabel}
        />
        <DomainCTA
          hasDomains={hasDomains}
          CTAText={CTAText}
          CTAHref={CTAHref}
          emptyCTAText={emptyCTAText}
          emptyCTAHref={emptyCTAHref}
          hasPermission={hasPermission}
        />
      </S.Container>
    </BoxWithFooter>
  );
};

const CustomDomainBoxSkeleton: React.FC = () => (
  <BoxWithFooter isLoading>
    <S.Container>
      <S.Header>
        <S.TitleSkeleton>
          <Skeleton />
        </S.TitleSkeleton>
      </S.Header>
      <S.ListContainer>
        <S.ListTitleSkeleton>
          <Skeleton />
        </S.ListTitleSkeleton>
        <S.DomainTextSkeleton>
          <Skeleton />
        </S.DomainTextSkeleton>
      </S.ListContainer>
      <S.SkeletonButton />
    </S.Container>
  </BoxWithFooter>
);

type DomainItem = Domain | SiteENSRecord;

type DomainListProps = {
  domainList: DomainItem[];
  emptyText: string;
  listLabel: string;
};

type DomainCTAProps = {
  hasDomains: boolean;
  hasPermission: boolean;
  CTAText: string;
  emptyCTAText: string;
  CTAHref: string;
  emptyCTAHref: string;
};

type GetDomainItemNameProps = DomainItem;

const getDomainItemName = (item: GetDomainItemNameProps): string => {
  switch (item.__typename) {
    case 'Domain':
      return item.hostname;
    case 'EnsRecord':
      return item.name;
    default:
      return '';
  }
};

const DomainList: React.FC<DomainListProps> = ({
  domainList,
  emptyText,
  listLabel,
}) => {
  if (domainList.length === 0) {
    return <Text className="-mt-3">{emptyText}</Text>;
  }

  return (
    <S.ListContainer>
      <Text size="xs" weight={500}>
        {listLabel}
      </Text>
      {domainList.map((domainItem) => (
        <Text variant="primary" size="md" key={domainItem.id}>
          {getDomainItemName(domainItem)}
        </Text>
      ))}
    </S.ListContainer>
  );
};

const DomainCTA: React.FC<DomainCTAProps> = ({
  hasDomains,
  hasPermission = false,
  CTAText,
  CTAHref,
  emptyCTAText,
  emptyCTAHref,
}) => {
  if (hasDomains) {
    if (!hasPermission) {
      return null;
    }

    return (
      <Link href={CTAHref}>
        <Button>{CTAText}</Button>
      </Link>
    );
  }

  if (!hasPermission) {
    return (
      <PermissionsTooltip hasAccess={false} asChild>
        <Button disabled>{emptyCTAText}</Button>
      </PermissionsTooltip>
    );
  }

  return (
    <Link href={emptyCTAHref} aria-disabled={true}>
      <Button>{emptyCTAText}</Button>
    </Link>
  );
};
