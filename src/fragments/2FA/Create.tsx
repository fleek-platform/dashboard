import { verifyTwoFactorSecretKey } from '@fleek-platform/utils-validation';
import { useMemo, useState } from 'react';
import * as zod from 'zod';

import { Form, LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import {
  useDeleteSecretKeyMutation,
  useGenerateRecoveryCodesMutation,
  useGenerateTwoFactorSecretKeyMutation,
  useMeQuery,
  useVerifySecretKeyMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { SecretKey } from '@/types/2FA';
import { Button } from '@/ui';
import { getManualSecret, getURI } from '@/utils/TOTP';

import { DisableModal } from './components/DisableModal';
import { SetupModal } from './components/SetupModal';
import { TwoFactorAuthentication } from './TwoFactorAuthentication';

type CreateProps = {
  isLoading: boolean;
  secretKey?: SecretKey;
  hasActiveKey?: boolean;
};

export const Create: React.FC<CreateProps> = ({
  isLoading,
  secretKey,
  hasActiveKey,
}) => {
  const toast = useToast();
  const [otpUrl, setOtpUrl] = useState<string>('');
  const [, verifySecretKey] = useVerifySecretKeyMutation();
  const [, generateRecoveryCodes] = useGenerateRecoveryCodesMutation();
  const [meQuery] = useMeQuery();

  const username = useMemo(() => meQuery.data?.user.username || '', [meQuery]);

  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSecretKeyLoading, setIsSecretKeyLoading] = useState(false);

  const [, generateTwoFactorSecretKey] =
    useGenerateTwoFactorSecretKeyMutation();
  const { isVisible } = TwoFactorAuthentication.useTwoFactorModal();
  const [deleteSecretKeyMutation, deleteSecretKey] =
    TwoFactorAuthentication.useMutation({
      useMutationHook: useDeleteSecretKeyMutation,
      isEnabledByDefault: true,
    });

  const handleDeleteSecretKey = async () => {
    if (!secretKey) {
      return;
    }

    try {
      const deleteResult = await deleteSecretKey({
        where: { id: secretKey.id },
      });
      setIsDeleteModalOpen(true);

      if (!deleteResult.data || !deleteResult.data.deleteSecretKey) {
        throw deleteResult.error || new Error('Failed to delete secret key');
      }
    } catch (error) {
      toast.error({ error, log: 'Failed to delete secret key' });
    } finally {
      setIsDeleteModalOpen(false);
    }

    return;
  };

  const createTwoFactorAuthenticationForm = Form.useForm({
    values: {
      secretKey: '',
      secretKeyId: '',
      token: '',
    },
    schema: zod.object({
      secretKeyId: verifyTwoFactorSecretKey.shape.where.shape.secretKeyId,
      token: verifyTwoFactorSecretKey.shape.data.shape.token,
    }),
    onSubmit: async ({ secretKeyId, token }) => {
      let errorMessage = 'Failed to verify token.';

      try {
        const verifyResult = await verifySecretKey({
          data: { token },
          where: { secretKeyId },
        });

        if (
          !verifyResult.data ||
          !verifyResult.data.verifyTwoFactorSecretKey.isVerified
        ) {
          throw verifyResult.error || new Error(errorMessage);
        }

        errorMessage = 'Failed to generate recovery codes.';
        const recoveryCodesResult = await generateRecoveryCodes({
          where: { secretKeyId: secretKeyId },
        });

        if (!recoveryCodesResult.data) {
          throw recoveryCodesResult.error || new Error(errorMessage);
        }

        return {
          isVerified: verifyResult?.data.verifyTwoFactorSecretKey.isVerified,
          recoveryCodes:
            recoveryCodesResult.data?.generateRecoveryCodes.recoveryCodes,
        };
      } catch (error) {
        toast.error({ error, log: errorMessage });
        setIsSetupModalOpen(false);
      }
    },
  });

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const generateOTPForSecretKey = (secretKey: SecretKey) => {
    const { id, key, digits, algorithm } = secretKey;

    const setupKey = getManualSecret({ secret: key });

    createTwoFactorAuthenticationForm.fields.secretKeyId.setValue(id, true);
    createTwoFactorAuthenticationForm.fields.secretKeyId.setTouched(true);

    createTwoFactorAuthenticationForm.fields.secretKey.setValue(setupKey, true);
    createTwoFactorAuthenticationForm.fields.secretKey.setTouched(true);

    const qrUrl = getURI({
      label: username,
      algorithm,
      digits,
      secret: key,
      issuer: 'Fleek',
    });
    setOtpUrl(qrUrl);
    setIsSecretKeyLoading(false);
  };

  const handleGetOrGenerateSecretKey = async () => {
    setIsSecretKeyLoading(true);

    try {
      if (secretKey) {
        generateOTPForSecretKey(secretKey);

        return;
      }

      const generateSecretKeyResponse = await generateTwoFactorSecretKey({});

      if (
        !generateSecretKeyResponse.data ||
        !generateSecretKeyResponse.data.generateTwoFactorSecretKey
      ) {
        throw (
          generateSecretKeyResponse.error ||
          new Error('Failed to get or generate secret key')
        );
      }

      generateOTPForSecretKey(
        generateSecretKeyResponse.data?.generateTwoFactorSecretKey,
      );
    } catch (error) {
      toast.error({ error, log: 'Failed to get or generate secret key' });
    }
  };

  const handleChangeSetupModalOpen = (open: boolean) => {
    createTwoFactorAuthenticationForm.resetForm();
    setIsSetupModalOpen(open);
  };

  const handleChangeDeleteModalOpen = (open: boolean) =>
    setIsDeleteModalOpen(open);

  const handleButtonAction = () => {
    if (hasActiveKey) {
      handleChangeDeleteModalOpen(true);

      return;
    }

    handleChangeSetupModalOpen(true);
    handleGetOrGenerateSecretKey();
  };

  return (
    <SettingsBox.Container>
      <SettingsBox.Title>Two-factor Authentication</SettingsBox.Title>
      <SettingsBox.Text>
        Two-factor authentication adds an additional layer of security to your
        account by requiring more than just a password or wallet connection to
        sign in.
      </SettingsBox.Text>
      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_2FA_SETUP}>
          two-factor authentication
        </LearnMoreMessage>
        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <Button
            intent={!hasActiveKey ? 'accent' : 'neutral'}
            onClick={handleButtonAction}
          >
            {hasActiveKey
              ? 'Disable two-factor authentication'
              : 'Enable two-factor authentication'}
          </Button>
        )}
      </SettingsBox.ActionRow>
      {isDeleteModalOpen && !isVisible && (
        <DisableModal
          open={isDeleteModalOpen || deleteSecretKeyMutation.fetching}
          isLoading={deleteSecretKeyMutation.fetching}
          onOpenChange={handleChangeDeleteModalOpen}
          onConfirmDelete={handleDeleteSecretKey}
        />
      )}
      {isSetupModalOpen && (
        <Form.Provider value={createTwoFactorAuthenticationForm}>
          <SetupModal
            open={isSetupModalOpen}
            onOpenChange={handleChangeSetupModalOpen}
            otpUrl={otpUrl}
            isLoading={isSecretKeyLoading}
          />
        </Form.Provider>
      )}
    </SettingsBox.Container>
  );
};
