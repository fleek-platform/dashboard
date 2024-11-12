import { routes } from '@fleek-platform/utils-routes';

import { Image, ImageProps } from '@/ui';
import { AvatarMarble } from '@/ui/AvatarMarble/AvatarMarble';

import { BreadcrumbStyle as S } from './Breadcrumb.styles';

export type SiteBreadcrumbProps = {
  name: string;
  avatar?: ImageProps['src'];
  projectId: string;
  siteId: string;
};

export const SiteBreadcrumb: React.FC<SiteBreadcrumbProps> = ({ name, avatar, projectId, siteId }) => {
  return (
    <S.Container>
      <S.Divider>/</S.Divider>
      <S.Link href={routes.project.site.list({ projectId })}>
        <S.Name>Sites</S.Name>
      </S.Link>
      <S.Divider>/</S.Divider>
      <S.Link href={routes.project.site.overview({ projectId, siteId })}>
        {avatar ? <Image src={avatar} alt="Site logo" /> : <AvatarMarble name={siteId} />}
        <S.Name>{name}</S.Name>
      </S.Link>
    </S.Container>
  );
};
