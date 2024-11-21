import { constants } from '@fleek-platform/utils-permissions';
import { useCallback, useMemo } from 'react';
import type { AnyVariables, OperationResult, UseMutationResponse } from 'urql';

import type { FormController } from '@/components/Form/FormController';
import {
  type TwoFactorProtectedActionType,
  useGetSecretKeysQuery,
  useProtectedActionsQuery,
} from '@/generated/graphqlClient';
import type { TokenSubmitArgs } from '@/types/2FA';

import { useTwoFactorModal } from './ModalProvider';

type UseMutationWith2FAProps<TData, TVariables extends AnyVariables> = {
  useMutationHook: () => UseMutationResponse<TData, TVariables>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentForm?: FormController<any, void>;
} & (
  | { actionType?: never; isEnabledByDefault: true }
  | { actionType: TwoFactorProtectedActionType; isEnabledByDefault?: never }
);

export const useMutationWith2FA = <
  MutationData,
  MutationVariables extends AnyVariables,
>({
  actionType,
  useMutationHook,
  parentForm,
  isEnabledByDefault,
}: UseMutationWith2FAProps<MutationData, MutationVariables>) => {
  const [getSecretKeysQuery] = useGetSecretKeysQuery();
  const [protectedActionsQuery] = useProtectedActionsQuery({
    requestPolicy: 'network-only',
    variables: {},
  });
  const { showModal, setOnClose } = useTwoFactorModal();

  const [mutationState, mutationFunction] = useMutationHook();
  const hasKeyEnabled = useMemo(
    () =>
      getSecretKeysQuery.data?.user.secretKeys.some(
        (secretKey) => secretKey.isVerified && secretKey.isActive,
      ) || false,
    [getSecretKeysQuery.data?.user.secretKeys],
  );
  const protectedActions = useMemo(
    () => protectedActionsQuery.data?.twoFactorProtectedActions.data || [],
    [protectedActionsQuery.data],
  );

  const mutateWith2FA = useCallback(
    (variables: MutationVariables) => {
      const isEnabled =
        hasKeyEnabled &&
        (isEnabledByDefault ||
          protectedActions.find(
            (protectedAction) =>
              protectedAction.type === actionType && protectedAction.enabled,
          ));

      if (!isEnabled) {
        return mutationFunction(variables);
      }

      if (parentForm) {
        setOnClose(() => {
          parentForm.isSubmitting = false;
        });
      }

      return new Promise<OperationResult<MutationData, MutationVariables>>(
        (resolve, reject) => {
          showModal((token: TokenSubmitArgs) => {
            mutationFunction(variables, {
              fetchOptions: {
                headers: {
                  [constants.CUSTOM_HEADERS.twoFactorAuthToken]:
                    token?.verificationCode || '',
                  [constants.CUSTOM_HEADERS.twoFactorRecoveryCode]:
                    token?.recoveryCode || '',
                },
              },
            })
              .then(resolve)
              .catch(() => {
                reject();
              });
          });
        },
      );
    },
    [
      hasKeyEnabled,
      isEnabledByDefault,
      protectedActions,
      parentForm,
      actionType,
      mutationFunction,
      setOnClose,
      showModal,
    ],
  );

  return [mutationState, mutateWith2FA] as const;
};
