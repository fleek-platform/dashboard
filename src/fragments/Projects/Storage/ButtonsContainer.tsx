import { routes } from '@fleek-platform/utils-routes';

import { ActionBox } from '@/components';
import { constants } from '@/constants';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box } from '@/ui';

export const ButtonsContainer: React.FC = () => {
  const session = useSessionContext();

  const projectId = session.project.id;

  return (
    <Box className="sm:flex-row gap-4">
      <ActionBox
        href={routes.project.settings.privateGateways({ projectId })}
        title="Create private gateway"
        description="Increased rate limits when retrieving."
        icon="word"
      />
      <ActionBox
        href={constants.EXTERNAL_LINK.FLEEK_DOCS_SDK}
        target="_blank"
        rel="noopener noreferrer"
        title="Integrate storage"
        description="Give your application a decentralized storage layer."
        icon="code"
      />
    </Box>
  );
};
