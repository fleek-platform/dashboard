import { LoadingProps } from '@/types/Props';
import { Skeleton } from '@/ui';

import { PreviewImageStyles as S } from './PreviewImage.styles';

export type PreviewImageProps = LoadingProps<{
  status: React.ComponentProps<typeof S.Container>['status'];
  src?: string;
  text?: string;
}>;

export const PreviewImage: React.FC<PreviewImageProps> = ({ isLoading, status, text, src }) => {
  if (isLoading) {
    return <PreviewImageSkeleton />;
  }

  if (!text && !src) {
    text = 'Loading preview...';
  }

  return (
    <S.Container alt="Preview Image" src={status === 'success' ? src : ''} status={status}>
      {text}
    </S.Container>
  );
};

const PreviewImageSkeleton: React.FC = () => (
  <S.Container alt="Preview Image" status="loading">
    <Skeleton />
  </S.Container>
);
