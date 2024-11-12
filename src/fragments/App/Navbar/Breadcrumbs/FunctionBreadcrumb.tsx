import { routes } from '@fleek-platform/utils-routes';

import { Icon } from '@/ui';

import { BreadcrumbStyle as S } from './Breadcrumb.styles';

export type FunctionBreadcrumbProps = {
  name: string;
  projectId: string;
};

export const FunctionBreadcrumb: React.FC<FunctionBreadcrumbProps> = ({ name, projectId }) => {
  return (
    <S.Container>
      <S.Divider>/</S.Divider>
      <S.Link href={routes.project.function.list({ projectId })}>
        <S.Name>Functions</S.Name>
      </S.Link>
      <S.Divider>/</S.Divider>
      <S.Link href={routes.project.function.detail({ projectId, fnName: name })}>
        <Icon name="code" />
        <S.Name>{name}</S.Name>
      </S.Link>
    </S.Container>
  );
};
