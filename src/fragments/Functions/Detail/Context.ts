import { routes } from '@fleek-platform/utils-routes';
import { useCallback } from 'react';

import {
  FleekFunctionDetailQuery,
  useDeleteFleekFunctionMutation,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { useSessionContext } from '@/providers/SessionProvider';
import { createContext } from '@/utils/createContext';

export type FunctionDetailContext =
  | FleekFunctionDetailQuery['fleekFunctionByName']
  | null;

export const [FunctionDetailProvider, useFunctionDetailContext] =
  createContext<FunctionDetailContext>({
    name: 'FunctionDetailContext',
    hookName: 'FunctionDetail.useContext',
    providerName: 'FunctionDetail.Provider',
  });

type UseDeleteFunctionArgs = { id: string };
export const useDeleteFunction = ({ id }: UseDeleteFunctionArgs) => {
  const [deleteFleekFunctionMutation, deleteFleekFunction] =
    useDeleteFleekFunctionMutation();

  const router = useRouter();
  const {
    project: { id: projectId },
  } = useSessionContext();

  const toast = useToast();

  const handleDelete = useCallback(async () => {
    await deleteFleekFunction({ where: { id } });
    toast.success({ message: 'Function deleted!' });
    router.replace(routes.project.function.list({ projectId }));
  }, [deleteFleekFunction, id, router, projectId, toast]);

  return [deleteFleekFunctionMutation, handleDelete] as const;
};
