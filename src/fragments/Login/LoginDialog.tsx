import { LearnMoreMessage, Modal } from '@/components';
import { constants } from '@/constants';
import { ChildrenProps } from '@/types/Props';
import { Text } from '@/ui';

import { LoginStyles as S } from './Login.styles';

export type LoginDialogProps = ChildrenProps<{
  heading: string;
  description: string;
  withExternalLink?: boolean;
}>;

export const LoginDialog: React.FC<LoginDialogProps> = ({ heading, description, withExternalLink = false, children }) => {
  return (
    <S.Container>
      <Modal.Heading>{heading}</Modal.Heading>
      <Text>{description}</Text>
      {withExternalLink && (
        <LearnMoreMessage prefix="Need Help?" href={constants.EXTERNAL_LINK.FLEEK_DOCS_CLI}>
          Follow instructions Here
        </LearnMoreMessage>
      )}

      <S.ContentWrapper>{children}</S.ContentWrapper>
    </S.Container>
  );
};
