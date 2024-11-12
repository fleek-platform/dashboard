import { verifyTwoFactorSecretKey } from '@fleek-platform/utils-validation';
import { useEffect, useMemo, useState } from 'react';
import * as zod from 'zod';

import { BadgeText, Form, SettingsBox, SettingsListItem } from '@/components';
import {
  useDeleteRecoveryCodesMutation,
  useGenerateRecoveryCodesMutation,
  useMeQuery,
  useVerifySecretKeyMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { RecoveryCodes as Codes, SecretKey } from '@/types/2FA';
import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Icon, Text } from '@/ui';
import { getDurationUntilNow } from '@/utils/getDurationUntilNow';
import { getManualSecret, getURI } from '@/utils/TOTP';

import { Styles } from './2FAStyles.styles';
import { EditModal } from './components/EditModal';
import { RecoveryCodesModal } from './components/RecoveryCodesModal';
import { TwoFactorAuthentication } from './TwoFactorAuthentication';

type ManageProps = LoadingProps<{ secretKey: SecretKey }> & {
  updateSecretKey: () => Promise<SecretKey | undefined>;
};

export const EmptyManage = () => (
  <ManageSettingsBox>
    <Styles.EmptyBox>
      <Icon name="question" />
      <Text as="h3">No Two-factor authentication</Text>
      <Text>Once you enable two-factor authentication, options will appear here.</Text>
    </Styles.EmptyBox>
  </ManageSettingsBox>
);

export const Manage: React.FC<ManageProps> = ({ secretKey, isLoading, updateSecretKey }) => {
  const toast = useToast();
  const [recoveryCodes, setRecoveryCodes] = useState<Codes>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
  const [isLoadingRecoveryCodes, setIsLoadingRecoveryCodes] = useState(false);
  const [otpUrl, setOtpUrl] = useState<string>('');
  const [isSecretKeyLoading, setIsSecretKeyLoading] = useState<boolean>(false);
  const [, verifySecretKey] = useVerifySecretKeyMutation();
  const [meQuery] = useMeQuery();
  const [subtitle, setSubtitle] = useState<string>('');

  const username = useMemo(() => meQuery.data?.user.username || '', [meQuery]);

  const { isVisible: isTwoFactorModalVisible } = TwoFactorAuthentication.useTwoFactorModal();

  const [, generateRecoveryCodes] = useGenerateRecoveryCodesMutation();
  const [, deleteRecoveryCodes] = TwoFactorAuthentication.useMutation({
    useMutationHook: useDeleteRecoveryCodesMutation,
    isEnabledByDefault: true,
  });

  const handleRegenerateRecoveryCodes = async () => {
    if (!secretKey) {
      return;
    }

    setIsLoadingRecoveryCodes(true);
    handleOpenRenegerateModal();

    try {
      const deleteRecoveryCodesResult = await deleteRecoveryCodes({ where: { secretKeyId: secretKey.id } });

      if (!deleteRecoveryCodesResult.data) {
        throw deleteRecoveryCodesResult.error || new Error('Failed to delete recovery codes');
      }

      const recoveryCodes = await generateRecoveryCodes({ where: { secretKeyId: secretKey.id } });

      if (!recoveryCodes.data) {
        setIsRegenerateModalOpen(false);
        throw recoveryCodes.error || new Error('Failed to generate recovery codes');
      }

      toast.warning({
        message: 'New two-factor recovery codes generated. Download the new codes to continue.',
      });

      setRecoveryCodes(recoveryCodes.data.generateRecoveryCodes.recoveryCodes);
    } catch (error) {
      setIsRegenerateModalOpen(false);
      toast.error({ error, log: 'Failed to regenerate recovery codes' });
    } finally {
      setIsLoadingRecoveryCodes(false);
    }
  };

  // eslint-disable-next-line fleek-custom/valid-argument-types
  const generateOTPForSecretKey = (secretKey: SecretKey) => {
    const { id, key, digits, algorithm } = secretKey;

    const setupKey = getManualSecret({ secret: key });

    editSecretKeyForm.fields.secretKeyId.setValue(id, true);
    editSecretKeyForm.fields.secretKeyId.setTouched(true);

    editSecretKeyForm.fields.secretKey.setValue(setupKey, true);
    editSecretKeyForm.fields.secretKey.setTouched(true);

    const qrUrl = getURI({ label: username, algorithm, digits, secret: key, issuer: 'Fleek' });
    setOtpUrl(qrUrl);
    setIsSecretKeyLoading(false);
  };

  const handleOpenRenegerateModal = () => setIsRegenerateModalOpen(true);

  const handleChangeRegenerateModal = (open: boolean) => setIsRegenerateModalOpen(open);

  const handleChangeEditModal = async (open: boolean) => setIsEditModalOpen(open);

  useEffect(() => {
    if (!secretKey || !secretKey.isActive) {
      setSubtitle('');

      return;
    }

    if (secretKey.verifiedAt) {
      setSubtitle(`Active since ${getDurationUntilNow({ isoDateString: secretKey.verifiedAt, shortFormat: true })}`);
    }
  }, [secretKey]);

  const handleOpenEditModal = async () => {
    setIsSecretKeyLoading(true);
    setIsEditModalOpen(true);
    const updateSecretKeyResult = await updateSecretKey();

    if (updateSecretKeyResult) {
      generateOTPForSecretKey(updateSecretKeyResult);
    }
  };

  const editSecretKeyForm = Form.useForm({
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
      try {
        const verifyResult = await verifySecretKey({ data: { token }, where: { secretKeyId } });

        if (!verifyResult.data || !verifyResult.data.verifyTwoFactorSecretKey.isVerified) {
          throw verifyResult.error || new Error('Failed to verify token.');
        }

        editSecretKeyForm.resetForm();
        setIsEditModalOpen(false);
      } catch (error) {
        toast.error({ error, log: 'Failed to verify token.' });
      }
    },
  });

  if (isLoading) {
    return (
      <ManageSettingsBox>
        <SettingsListItem.Skeleton enableAvatar />
      </ManageSettingsBox>
    );
  }

  return (
    <ManageSettingsBox>
      <SettingsListItem title="Authenticator App" subtitle={subtitle} avatarIcon="phone">
        {secretKey.isActive ? <BadgeText colorScheme="green">Active</BadgeText> : <BadgeText colorScheme="slate">Inactive</BadgeText>}
        {secretKey.isActive && (
          <SettingsListItem.DropdownMenu>
            <SettingsListItem.DropdownMenuItem icon="pencil" onSelect={handleOpenEditModal}>
              Edit 2FA App
            </SettingsListItem.DropdownMenuItem>
            <SettingsListItem.DropdownMenuItem icon="documentLock" onSelect={handleRegenerateRecoveryCodes}>
              Regenerate Codes
            </SettingsListItem.DropdownMenuItem>
          </SettingsListItem.DropdownMenu>
        )}
      </SettingsListItem>

      {isEditModalOpen && (
        <Form.Provider value={editSecretKeyForm}>
          <EditModal isLoading={isSecretKeyLoading} otpUrl={otpUrl} open={isEditModalOpen} onOpenChange={handleChangeEditModal} />
        </Form.Provider>
      )}
      {isRegenerateModalOpen && !isTwoFactorModalVisible && (
        <RecoveryCodesModal
          isLoading={isLoadingRecoveryCodes}
          codes={recoveryCodes}
          open={isRegenerateModalOpen}
          onOpenChange={handleChangeRegenerateModal}
        />
      )}
    </ManageSettingsBox>
  );
};

const ManageSettingsBox: React.FC<ChildrenProps> = ({ children }) => (
  <SettingsBox.Container>
    <SettingsBox.Title>Manage Two-factor Authentication</SettingsBox.Title>
    <SettingsBox.Text>Here you can edit your secret key or regenerate your recovery codes.</SettingsBox.Text>
    {children}
  </SettingsBox.Container>
);
