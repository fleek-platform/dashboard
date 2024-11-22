/* eslint-disable fleek-custom/valid-argument-types */
import { useToastContext } from '@/providers/ToastProvider';
import { Toast } from '@/types/Toast';
import { Log } from '@/utils/log';

export type PushToast = Omit<Toast, 'id' | 'type'>;

export const useToast = () => {
  const { pushToast } = useToastContext();

  const onSuccess = (toast: PushToast) => {
    pushToast({
      ...toast,
      type: 'success',
    });
  };

  const onError = (toast: useToast.PushErrorToast) => {
    if (typeof toast.message === 'undefined') {
      const getErrorMessage = (error: any) => {
        // try to get message from graphql error first
        if (typeof error === 'object') {
          if (error?.graphQLErrors?.[0]?.message) {
            return error.graphQLErrors[0].message as string;
          }
        }

        // try to get message from error object
        if (error instanceof Error) {
          return error.message;
        }

        // return generic error message
        return 'An unknown error occurred';
      };

      pushToast({
        ...toast,
        message: getErrorMessage(toast.error),
        type: 'error',
      });

      Log.error((toast as any).log, toast.error);

      return;
    }

    pushToast({
      ...toast,
      type: 'error',
    } as any); // TODO: fix type
    Log.error(toast.message);
  };

  const onWarn = (toast: PushToast) => {
    pushToast({
      ...toast,
      type: 'warning',
    });
    Log.warn(toast.message);
  };

  const onDefault = (toast: PushToast) => {
    pushToast({
      ...toast,
      type: 'default',
    });
    Log.info(toast.message);
  };

  return {
    success: onSuccess,
    error: onError,
    warning: onWarn,
    default: onDefault,
  };
};

export namespace useToast {
  export type PushToast = Omit<Toast, 'id' | 'type'>;

  export type PushErrorToast =
    | (PushToast & { error?: never })
    | (Omit<PushToast, 'message'> & {
        error: unknown;
        log: string;
        message?: never;
      });
}
