import { routes } from '@fleek-platform/utils-routes';
import { useMemo } from 'react';

import { ActionBox } from '@/components';
import { useSessionContext } from '@/providers/SessionProvider';

export const CreateGatewayButton: React.FC = () => {
  const session = useSessionContext();

  const hasToken = Boolean(session.auth.token);

  const handleClick = () => {
    if (!hasToken) {
      session.auth.login('dynamic', routes.project.settings.privateGateways({ projectId: 'project' }));
    }
  };

  const href = useMemo(() => (hasToken ? routes.project.settings.privateGateways({ projectId: 'project' }) : '#'), [hasToken]);

  return (
    <ActionBox
      key="Create a private gateway"
      href={href}
      icon="domain"
      title="Create a private gateway"
      description="Get faster propagation times on IPFS and manage it all in the Fleek app."
      onClick={handleClick}
    />
  );
};
