import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { Button, Text } from '@/ui';

import { TemplateStyles as S } from '../Template.styles';

export const SubmitFooter: React.FC = () => (
  <S.SubmitFooter.Container>
    <S.SubmitFooter.Wrapper>
      <Text>Submit a Template to Fleek</Text>
      <Link href={routes.profile.settings.templates()}>
        <Button>Submit template</Button>
      </Link>
    </S.SubmitFooter.Wrapper>
  </S.SubmitFooter.Container>
);
