import { SettingsListItem } from '@/components';
import { GitProvidersQuery } from '@/generated/graphqlClient';
import { LoadingProps } from '@/types/Props';

import { ProviderDetails } from './ProviderDetails';

export const ManageContainer: React.FC<ManageContainerProps> = ({
  gitProviders,
  isLoading,
}) => {
  if (isLoading || !gitProviders) {
    return (
      <>
        <SettingsListItem.Skeleton enableAvatar />
        <SettingsListItem.Skeleton enableAvatar />
      </>
    );
  }

  return (
    <>
      {gitProviders.map((gitProvider) => (
        <ProviderDetails provider={gitProvider} key={gitProvider.id} />
      ))}
    </>
  );
};

type ManageContainerProps = LoadingProps<{
  gitProviders?: GitProvidersQuery['gitProviders'];
}>;
