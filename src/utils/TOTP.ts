import * as OTPAuth from 'otpauth';

import { SecretKeyAlgorithm } from '@/generated/graphqlClient';

type GetURIArgs = {
  secret: string;
  issuer: string;
  label: string;
  digits?: number;
  algorithm?: SecretKeyAlgorithm;
  period?: number;
};

export const getURI = ({ label, secret, issuer, digits = 6, algorithm = SecretKeyAlgorithm.SHA256, period = 30 }: GetURIArgs) => {
  const totp = new OTPAuth.TOTP({
    issuer,
    label,
    algorithm,
    digits,
    period,
    secret: OTPAuth.Secret.fromHex(secret),
  });

  return totp.toString();
};

type GetManualSecretArgs = {
  secret: string;
};

export const getManualSecret = ({ secret }: GetManualSecretArgs) => {
  const totpSecret = OTPAuth.Secret.fromHex(secret);

  return totpSecret.base32;
};
