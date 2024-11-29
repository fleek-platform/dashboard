// eslint-disable-next-line no-restricted-imports
import { useRouter as useNextRouter } from 'next/router';
import type { NextRouter } from 'next/router';

export const useRouter = () => {
  const router: NextRouter & {
    query: {
      projectId?: string;
      siteId?: string;
      domainId?: string;
      verificationSessionId?: string;
      mode?: string;
      deploymentId?: string;
      templateId?: string;
      invitation?: string;
      migrationToken?: string;
      page?: string;
      folderId?: string;
      path?: string;
      hash?: string;
      success?: boolean;
      canceled?: boolean;
      session_id?: string;
    };
  } = useNextRouter();

  return router;
};
