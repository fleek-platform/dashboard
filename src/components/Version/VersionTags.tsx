import React from 'react';
import { useClient } from 'urql';

import { useVersionQuery } from '@/generated/graphqlClient';
import { secrets } from '@/secrets';

import { VersionTagsStyles } from './VersionTags.styles';

const InternalComponent: React.FC = () => {
  const [versionQuery] = useVersionQuery();

  const version = `${secrets?.COMMIT_HASH?.slice(0, 7) ?? '...'} / ${versionQuery.data?.version.commitHash?.slice(0, 7) ?? '...'}`;

  return <VersionTagsStyles.Text>{version}</VersionTagsStyles.Text>;
};

export const VersionTags: React.FC = () => {
  const client = useClient();

  if (!client) {
    return null;
  }

  return <InternalComponent />;
};
