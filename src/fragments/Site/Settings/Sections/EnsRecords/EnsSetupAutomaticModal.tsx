import {
  DynamicMultiWalletPromptsWidget,
  useDynamicContext,
  useUserWallets,
} from '@dynamic-labs/sdk-react-core';
import { encode } from '@ensdomains/content-hash';
import { useEffect, useMemo, useState } from 'react';
import { namehash, normalize } from 'viem/ens';
import { useEnsAddress, useEnsName, useEnsResolver } from 'wagmi';

import {
  BadgeText,
  LearnMoreMessage,
  Modal,
  SettingsListItem,
} from '@/components';
import { constants } from '@/constants';
import { useEnsRecordQuery } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { EnsProvider, useEnsContext } from '@/integrations/ens/Ens.context';
import {
  Box,
  Button,
  Dialog,
  Icon,
  RadioGroup,
  Skeleton,
  Stepper,
  Text,
} from '@/ui';
import { shortStringFormat } from '@/utils/stringFormat';

import { SettingsItemModal } from '../../Elements/SettingsItemModal';
import { EnsName } from './EnsName/EnsName';
import { EnsRecordStyles as S } from './EnsRecords.styles';
import { useEnsSettingsContext } from './EnsSettings.context';

export const EnsSetupAutomaticModal: React.FC = () => {
  const { isAutomaticSetupModalOpen, closeSetupModal } =
    useEnsSettingsContext();
  const { showAuthFlow } = useDynamicContext();

  return (
    <Dialog.Root
      open={isAutomaticSetupModalOpen}
      onOpenChange={closeSetupModal}
    >
      {!showAuthFlow && <Dialog.Overlay />}
      <Modal.Content>
        <EnsProvider>
          <ModalContent />
        </EnsProvider>
      </Modal.Content>
    </Dialog.Root>
  );
};

const ModalContent: React.FC = () => {
  const [enableWalletConnectStep, setEnableWalletConnectStep] = useState<
    boolean | undefined
  >();
  const { primaryWallet } = useDynamicContext();

  const { ensName: ensNameSelected } = useEnsSettingsContext();

  const { data: ensAddressOwner } = useEnsAddress({
    name: ensNameSelected,
  });

  const {
    prepare: { status: prepareStatus },
    write: { status: writeStatus },
  } = useEnsContext();

  useEffect(() => {
    if (
      primaryWallet &&
      primaryWallet.address === ensAddressOwner &&
      enableWalletConnectStep === undefined
    ) {
      setEnableWalletConnectStep(false);
    } else if (enableWalletConnectStep === undefined) {
      setEnableWalletConnectStep(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryWallet, ensAddressOwner]);

  const isWaitingForTransaction = useMemo(
    () => writeStatus === 'success' && prepareStatus === 'success',
    [prepareStatus, writeStatus],
  );

  if (isWaitingForTransaction) {
    return <ConfirmingTransaction />;
  }

  return (
    <Stepper.Root>
      <Stepper.Indicator />

      <Stepper.Container>
        <Stepper.Step>
          <Step1 />
        </Stepper.Step>

        {enableWalletConnectStep && (
          <Stepper.Step>
            <Step2 />
          </Stepper.Step>
        )}

        <Stepper.Step>
          <Step3 />
        </Stepper.Step>
      </Stepper.Container>
    </Stepper.Root>
  );
};

const ConfirmingTransaction: React.FC = () => {
  const {
    transaction: { isSuccess: isTransactionSuccess },
  } = useEnsContext();
  const { selectedId, onSubmitVerification, closeSetupModal } =
    useEnsSettingsContext();

  useEffect(() => {
    const verify = async () => {
      // verify ens
      const shouldClose = await onSubmitVerification(selectedId);

      if (shouldClose) {
        closeSetupModal();
      }
    };

    if (isTransactionSuccess) {
      verify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTransactionSuccess]);

  return (
    <S.ConfirmTransaction.Container>
      <Icon name="spinner" />
      <S.ConfirmTransaction.Title>
        Confirming transaction...
      </S.ConfirmTransaction.Title>
      <Text>Please do not close this page.</Text>
    </S.ConfirmTransaction.Container>
  );
};

const Step1: React.FC = () => {
  const { nextStep } = Stepper.useContext();
  const { automaticSetupMethod, selectedId, ensName, setAutomaticSetupMethod } =
    useEnsSettingsContext();
  const { setArgs } = useEnsContext();

  const [ensRecordQuery] = useEnsRecordQuery({
    variables: { where: { id: selectedId } },
    pause: !selectedId,
  });

  const normalizedEnsName = useMemo(() => normalize(ensName), [ensName]);

  const ensResolver = useEnsResolver({
    name: normalizedEnsName,
  });

  const confirmTransactionOnClick = () => {
    if (!ensResolver.data) {
      throw ensResolver.error;
    }

    const contentHash =
      automaticSetupMethod === 'ipns'
        ? ensRecordQuery.data?.ensRecord.ipnsRecord.name!
        : ensRecordQuery.data?.ensRecord.ipnsRecord.hash!;

    const contentHashEncoded =
      `0x${encode(automaticSetupMethod, contentHash)}` as `0x${string}`;
    const node = namehash(normalizedEnsName);

    setArgs({
      resolver: ensResolver.data,
      node,
      hash: contentHashEncoded,
    });

    nextStep();
  };

  return (
    <>
      <Modal.Heading>Select Method</Modal.Heading>
      <Text>
        Select either IPNS or IPFS as the method you would like to configure
        your ENS name to your site:
      </Text>

      <Modal.RadioGroup.Root
        value={automaticSetupMethod}
        onValueChange={setAutomaticSetupMethod}
      >
        <Modal.RadioGroup.ItemContainer>
          <Box>
            <RadioGroup.Item value="ipns" />
            IPNS Content Name
            <BadgeText colorScheme="yellow">Recommended</BadgeText>
          </Box>
          <Text>
            If you deploy updates to your site frequently, and don&apos;t want
            to pay gas for every update.
          </Text>
        </Modal.RadioGroup.ItemContainer>
        <Modal.RadioGroup.ItemContainer>
          <Box>
            <RadioGroup.Item value="ipfs" />
            IPFS Content Hash
          </Box>
          <Text>
            If you deploy updates to your site less frequently, and want to pay
            gas for every update.
          </Text>
        </Modal.RadioGroup.ItemContainer>
      </Modal.RadioGroup.Root>

      <LearnMoreMessage
        prefix="Need Help?"
        href={constants.EXTERNAL_LINK.FLEEK_DOCS_ENS_NAME}
      >
        Follow Instructions Here
      </LearnMoreMessage>

      <Modal.CTARow>
        <SettingsItemModal.CloseButton />
        <Button
          loading={ensResolver.isLoading}
          onClick={confirmTransactionOnClick}
        >
          Confirm transaction
        </Button>
      </Modal.CTARow>
    </>
  );
};

const Step2: React.FC = () => {
  const { nextStep } = Stepper.useContext();
  const { primaryWallet, setShowAuthFlow, setPrimaryWallet } =
    useDynamicContext();
  const { ensName: ensNameSelected } = useEnsSettingsContext();
  const [didOpenedLinkWalletModal, setDidOpenedLinkWalletModal] =
    useState(false);
  const userWallets = useUserWallets();

  const { data: ensAddressOwner, isLoading: isFetchingEnsOwner } =
    useEnsAddress({
      name: ensNameSelected,
    });

  const { data: ensName } = useEnsName({
    address: primaryWallet?.address as `0x${string}`,
  });

  const handleConnectWallet = () => {
    setShowAuthFlow(true);
    setDidOpenedLinkWalletModal(true);
  };

  useEffect(() => {
    if (primaryWallet && ensAddressOwner === primaryWallet.address) {
      nextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryWallet, ensName]);

  useEffect(() => {
    // need to set primary wallet after linking a new wallet
    const linkedWalletEnsOwner = userWallets.find(
      (userWallet) => userWallet.address === ensAddressOwner,
    );

    if (
      didOpenedLinkWalletModal &&
      linkedWalletEnsOwner &&
      primaryWallet?.id !== linkedWalletEnsOwner.id
    ) {
      setPrimaryWallet(linkedWalletEnsOwner.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWallets]);

  const handleSwitchWallet = (walletId: string) => {
    setPrimaryWallet(walletId);
  };

  const GetWalletCase = () => {
    // function to get if use has a connected wallet that owns the ens
    const linkedWalletEnsOwner = userWallets.find(
      (userWallet) => userWallet.address === ensAddressOwner,
    );

    if (ensAddressOwner) {
      if (primaryWallet && linkedWalletEnsOwner) {
        // logged with wallet but another linked wallet is the ens owner, user should switch to that wallet

        return (
          <>
            <Text>{constants.ENS_TEXTS.WALLET_LOGGED_LINKED_WALLET}</Text>

            <WalletItem
              title="Connected Wallet:"
              address={primaryWallet.address}
              isActive
            />
            <WalletItem
              title="Switch to this Wallet:"
              address={linkedWalletEnsOwner.address}
              subtitle={`Owns ${ensNameSelected}`}
            />

            <S.Modal.CTARow>
              <Button
                onClick={() => handleSwitchWallet(linkedWalletEnsOwner.id)}
              >
                Switch wallet
              </Button>

              <SettingsItemModal.CloseButton />
            </S.Modal.CTARow>
          </>
        );
      }
      if (primaryWallet) {
        // logged with wallet but no linked wallet is the ens owner, user should connect to that wallet

        return (
          <>
            <Text>{constants.ENS_TEXTS.WALLET_LOGGED_NO_LINKED_WALLET}</Text>

            <WalletItem
              title="Connected Wallet:"
              address={primaryWallet.address}
              isActive
            />
            <WalletItem
              title="Connect this Wallet:"
              address={ensAddressOwner}
              subtitle={`Owns ${ensNameSelected}`}
            />

            <S.Modal.CTARow>
              <Button onClick={handleConnectWallet}>Connect wallet</Button>

              <SettingsItemModal.CloseButton />
            </S.Modal.CTARow>
          </>
        );
      }
      if (linkedWalletEnsOwner) {
        // logged with email but has a linked wallet that is the ens owner, user should connect to that wallet

        return (
          <>
            <Text>{constants.ENS_TEXTS.EMAIL_LOGGED_LINKED_WALLET}</Text>
            <WalletItem
              title="Connect this Wallet:"
              address={linkedWalletEnsOwner.address}
              subtitle={`Owns ${ensNameSelected}`}
            />

            <S.Modal.CTARow>
              <Button
                onClick={() => handleSwitchWallet(linkedWalletEnsOwner.id)}
              >
                Connect wallet
              </Button>

              <SettingsItemModal.CloseButton />
            </S.Modal.CTARow>
          </>
        );
      }
      // logged with email but  but no linked wallet is the ens owner, user should link a new wallet

      return (
        <>
          <Text>{constants.ENS_TEXTS.EMAIL_LOGGED_NO_LINKED_WALLET}</Text>
          <WalletItem
            title="Connect this Wallet:"
            address={ensAddressOwner}
            subtitle={`Owns ${ensNameSelected}`}
          />

          <S.Modal.CTARow>
            <Button onClick={handleConnectWallet}>Connect wallet</Button>

            <SettingsItemModal.CloseButton />
          </S.Modal.CTARow>
        </>
      );
    }
  };

  if (isFetchingEnsOwner) {
    return (
      <>
        <Step2Heading />

        <S.Wallet.Container>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </S.Wallet.Container>

        <SettingsListItem.Skeleton enableAvatar />

        <S.Modal.CTARow>
          <Skeleton variant="button" />

          <SettingsItemModal.CloseButton />
        </S.Modal.CTARow>
      </>
    );
  }

  return (
    <>
      <Step2Heading />

      {GetWalletCase()}

      <DynamicMultiWalletPromptsWidget />
    </>
  );
};

const Step2Heading: React.FC = () => {
  const { ensName: ensNameSelected } = useEnsSettingsContext();

  return (
    <S.Modal.Heading>
      <Box>
        Connect Wallet
        <EnsName>{ensNameSelected}</EnsName>
      </Box>
    </S.Modal.Heading>
  );
};

type WalletItemProps = {
  title: string;
  address: string;
  subtitle?: string;
  isActive?: boolean;
};

const WalletItem: React.FC<WalletItemProps> = ({
  title,
  address,
  subtitle = '',
  isActive = false,
}) => {
  return (
    <S.Wallet.Container>
      <Text>{title}</Text>

      <SettingsListItem
        title={shortStringFormat({ str: address })}
        subtitle={subtitle}
        avatarSrc={constants.ASSET_URL.ETHEREUM_LOGO}
      >
        {isActive && <BadgeText colorScheme="green">Active</BadgeText>}
      </SettingsListItem>
    </S.Wallet.Container>
  );
};

const Step3: React.FC = () => {
  const {
    prepare: { status: prepareStatus },
    write: { status: writeStatus, write },
  } = useEnsContext();
  const { ensName } = useEnsSettingsContext();

  const toast = useToast();

  const isLoading = useMemo(
    () => [prepareStatus, writeStatus].some((status) => status === 'loading'),
    [prepareStatus, writeStatus],
  );

  useEffect(() => {
    if (writeStatus === 'error') {
      toast.error({
        message:
          'There was an error trying to write the contract. Please try again',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeStatus]);

  return (
    <>
      <S.Modal.Heading>
        <Box>
          Sign Transaction
          <EnsName>{ensName}</EnsName>
        </Box>
      </S.Modal.Heading>
      <Text>
        Click the button below to prompt the transaction to set the content hash
        on your ENS name.
      </Text>

      <LearnMoreMessage
        prefix="Need Help?"
        href={constants.EXTERNAL_LINK.FLEEK_DOCS_ENS_NAME}
      >
        Follow Instructions Here
      </LearnMoreMessage>

      <S.Modal.CTARow>
        <Button
          disabled={isLoading || !write}
          loading={isLoading}
          onClick={() => write?.()}
        >
          Sign transaction
        </Button>
        <SettingsItemModal.CloseButton />
      </S.Modal.CTARow>
    </>
  );
};
