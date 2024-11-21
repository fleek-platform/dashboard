import type {
  GenerateRecoveryCodesMutation,
  GetSecretKeysQuery,
  ProtectedActionsQuery,
} from '@/generated/graphqlClient';

export type Create2FAFormResponse = {
  isVerified: boolean;
  recoveryCodes?: string[];
};
export type Create2FAFormValues = { token: string; secretKeyId: string };

export type SecretKey = GetSecretKeysQuery['user']['secretKeys'][0];
export type RecoveryCodes =
  GenerateRecoveryCodesMutation['generateRecoveryCodes']['recoveryCodes'];

export type ProtectedAction =
  ProtectedActionsQuery['twoFactorProtectedActions']['data'][0];

export type TokenSubmitArgs = {
  verificationCode?: string;
  recoveryCode?: string;
};
