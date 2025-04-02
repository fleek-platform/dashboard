import React from 'react';
import { useClient } from 'urql';

import { getDefined } from '@/defined';

import { useVersionQuery } from '@/generated/graphqlClient';

import { VersionTagsStyles } from './VersionTags.styles';

const commitHash = getDefined('NEXT_PUBLIC_UI__COMMIT_HASH');

const InternalComponent: React.FC = () => {
  const [versionQuery] = useVersionQuery();

  const version = `${commitHash?.slice(0, 7) ?? '...'} / ${versionQuery.data?.version.commitHash?.slice(0, 7) ?? '...'}`;

  return <VersionTagsStyles.Text>{version}</VersionTagsStyles.Text>;
};

export const VersionTags: React.FC = () => {
  const client = useClient();

  if (!client) {
    return null;
  }

  return <InternalComponent />;
};
