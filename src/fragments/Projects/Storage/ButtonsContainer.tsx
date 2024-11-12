import { routes } from '@fleek-platform/utils-routes';

import { constants } from '@/constants';
import { useSessionContext } from '@/providers/SessionProvider';

import { StorageStyles as S } from './Storage.styles';

export const ButtonsContainer: React.FC = () => {
  const session = useSessionContext();

  const projectId = session.project.id;

  return (
    <S.ButtonsContainer.Wrapper>
      <S.ButtonsContainer.ActionBox
        href={routes.project.settings.privateGateways({ projectId })}
        title="Create private gateway"
        description="Increased rate limits when retrieving."
        icon="word"
      />
      <S.ButtonsContainer.ActionBox
        href={constants.EXTERNAL_LINK.FLEEK_DOCS_SDK}
        target="_blank"
        rel="noopener noreferrer"
        title="Integrate storage"
        description="Give your application a decentralized storage layer."
        icon="code"
      />
    </S.ButtonsContainer.Wrapper>
  );
};
