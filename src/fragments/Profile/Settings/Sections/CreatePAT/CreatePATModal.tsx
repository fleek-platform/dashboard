import { AlertBox, CodeSnippet } from '@/components';
import { Button, Dialog, Text } from '@/ui';

import { ProfileStyles as S } from '../../../Profile.styles';

export type CreatePATModalProps = {
  closeModal: () => any;
  patValue?: string;
};

export const CreatePATModal: React.FC<CreatePATModalProps> = ({
  closeModal,
  patValue,
}) => {
  return (
    <>
      <Dialog.Overlay />

      <S.Settings.Modal.Content>
        <Text as="h1" variant="primary" size="xl" weight={700}>
          Personal Access Token
        </Text>
        <Text>
          Copy the below access token, you won&apos;t be able to see it again
          after this.
        </Text>
        <CodeSnippet title="Token" code={patValue || ' '} />
        <AlertBox variant="warning" size="sm">
          This token is only shown during creation.
        </AlertBox>

        <S.Settings.Modal.CTARow>
          <Button disabled={!patValue} onClick={closeModal} className="flex-1">
            Ok, I have copied it
          </Button>
        </S.Settings.Modal.CTARow>
      </S.Settings.Modal.Content>
    </>
  );
};
