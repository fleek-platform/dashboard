import type { UpdateSecretMutationVariables } from '@/generated/graphqlClient';
import { createContext } from '@/utils/createContext';

export type ManageEnvironmentVariablesContext = {
  onSubmitDelete: (secretId: string) => Promise<void>;
  onSubmitUpdate: (args: UpdateSecretMutationVariables) => Promise<void>;
};

export const [
  ManageEnvironmentVariablesProvider,
  useManageEnvironmentVariablesContext,
] = createContext<ManageEnvironmentVariablesContext>({
  name: 'ManageEnvironmentVariablesContext',
  hookName: 'useManageEnvironmentVariablesContext',
  providerName: 'ManageEnvironmentVariablesProvider',
});
