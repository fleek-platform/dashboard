import {
  Profile,
  TwoFactorAuthentication as TFAuthentication,
} from '@/fragments';
import {
  useGetSecretKeysQuery,
  useUpdateSecretKeyMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import type { Page } from '@/types/App';

const TwoFactorAuthentication: Page = () => {
  const toast = useToast();

  const [, updateSecretKey] = useUpdateSecretKeyMutation();

  const [getSecretKeysQuery] = useGetSecretKeysQuery();

  const isSecretKeyLoading = getSecretKeysQuery.fetching;
  const secretKey = getSecretKeysQuery.data?.user.secretKeys[0];
  const hasActiveKey = secretKey?.isActive;
  const hasVerifiedKey = secretKey?.isVerified;

  const handleUpdateSecretKey = async () => {
    try {
      if (!secretKey) {
        return;
      }

      const verifyResult = await updateSecretKey({
        data: { key: true },
        where: { id: secretKey.id },
      });

      if (!verifyResult.data) {
        throw verifyResult.error || new Error('Failed to verify token.');
      }

      return verifyResult.data?.updateTwoFactorSecretKey;
    } catch (error) {
      toast.error({ error, log: 'Failed to update secret key' });
    }
  };

  return (
    <>
      <TFAuthentication.Provider>
        <TFAuthentication.Sections.Create
          isLoading={isSecretKeyLoading}
          hasActiveKey={hasActiveKey}
          secretKey={secretKey}
        />
      </TFAuthentication.Provider>
      {secretKey ? (
        <TFAuthentication.Provider>
          <TFAuthentication.Sections.Manage
            updateSecretKey={handleUpdateSecretKey}
            secretKey={secretKey}
            isLoading={isSecretKeyLoading}
          />
        </TFAuthentication.Provider>
      ) : (
        <TFAuthentication.Sections.EmptyManage />
      )}
      {hasVerifiedKey && <TFAuthentication.Sections.Settings />}
    </>
  );
};

TwoFactorAuthentication.getLayout = (page) => (
  <Profile.Settings.Layout>{page}</Profile.Settings.Layout>
);

export default TwoFactorAuthentication;
