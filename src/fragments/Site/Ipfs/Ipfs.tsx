import { BadgeText, BoxWithFooter } from '@/components';
import { LoadingProps } from '@/types/Props';
import { Skeleton, Text } from '@/ui';

import { IpfsStyles as S } from './Ipfs.styles';

export type IpfsProps = LoadingProps<{
  cid?: string | null;
  ipns?: string;
  active?: boolean;
  isFn?: boolean;
}>;

export const Ipfs: React.FC<IpfsProps> = ({
  isLoading,
  isFn,
  cid,
  ipns,
  active,
}) => {
  if (isLoading) {
    return <IpfsSkeleton />;
  }

  return (
    <BoxWithFooter
      footerIcon="ipfs-grayscale"
      footerIconLabel="IPFS"
      footer={
        isFn ? 'The hash for your function' : 'The hash for your site content'
      }
      iconContainerVariant="ipfs"
    >
      <S.Container>
        <S.Header>
          <Text as="h3" variant="primary" size="lg" weight={700}>
            IPFS
          </Text>
          <BadgeText colorScheme={active ? 'green' : 'slate'}>
            {active ? 'Current' : 'Pending'}
          </BadgeText>
        </S.Header>
        <S.Column>
          <Text size="xs" weight={500}>
            IPFS Hash
          </Text>
          <Text variant="primary" size="md" className="truncate">
            {cid || '-'}
          </Text>
        </S.Column>
        {!isFn && (
          <S.Column>
            <Text size="xs" weight={500}>
              IPNS URL
            </Text>
            <Text variant="primary" size="md" className="truncate">
              {ipns || '-'}
            </Text>
          </S.Column>
        )}
      </S.Container>
    </BoxWithFooter>
  );
};

const IpfsSkeleton: React.FC = () => (
  <BoxWithFooter isLoading>
    <S.Container>
      <S.Header>
        <S.TitleSkeleton>
          <Skeleton />
        </S.TitleSkeleton>
      </S.Header>
      <S.Column>
        <S.LabelSkeleton>
          <Skeleton />
        </S.LabelSkeleton>
        <S.TextSkeleton>
          <Skeleton />
        </S.TextSkeleton>
      </S.Column>
      <S.Column>
        <S.LabelSkeleton>
          <Skeleton />
        </S.LabelSkeleton>
        <S.TextSkeleton>
          <Skeleton />
        </S.TextSkeleton>
      </S.Column>
    </S.Container>
  </BoxWithFooter>
);
