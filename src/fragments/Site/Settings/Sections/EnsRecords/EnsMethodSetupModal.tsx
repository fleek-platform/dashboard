import { useUserWallets } from '@dynamic-labs/sdk-react-core';
import { useEffect, useState } from 'react';
import { useAccount, useEnsAddress } from 'wagmi';

import { AlertBox, BadgeText, LearnMoreMessage, Modal } from '@/components';
import { constants } from '@/constants';
import { useEnsRecordQuery } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import type { DisabledProps } from '@/types/Props';
import { Box, Button, RadioGroup, Text } from '@/ui';
import { Dialog } from '@/ui';

import { SettingsItemModal } from '../../Elements/SettingsItemModal';
import { useEnsSettingsContext } from './EnsSettings.context';

export const EnsMethodSetupModal: React.FC = () => {
  const {
    isModalOpen,
    selectedId,
    ensSetupMethodSelected,
    setEnsSetupMethodSelected,
    closeModal,
    ensName,
  } = useEnsSettingsContext();
  const [automaticSetupState, setAutomaticSetupState] =
    useState<AutomaticSetupState>({ disabled: false });

  const toast = useToast();

  const [ensRecordQuery] = useEnsRecordQuery({
    variables: { where: { id: selectedId } },
    pause: !selectedId,
  });

  const userWallets = useUserWallets();

  const { data: ensAddressOwner } = useEnsAddress({ name: ensName });
  const { address: currentAddress } = useAccount();

  useEffect(() => {
    const dynamicUserHasWallet =
      userWallets.find(
        (wallet) =>
          wallet.authenticated &&
          wallet.connected &&
          wallet.address === ensAddressOwner,
      ) === undefined
        ? false
        : true;

    if (dynamicUserHasWallet) {
      if (currentAddress === ensAddressOwner) {
        setEnsSetupMethodSelected('automatic');
        setAutomaticSetupState({ disabled: false });

        return;
      }

      if (currentAddress !== undefined) {
        setEnsSetupMethodSelected('manual');
        setAutomaticSetupState({
          disabled: true,
          disabledMessage:
            constants.ENS_TEXTS.AUTOMATIC_DISABLED.WALLET_HAS_LINKED,
        });

        return;
      }
    }

    setEnsSetupMethodSelected('manual');
    setAutomaticSetupState({
      disabled: true,
      disabledMessage: constants.ENS_TEXTS.AUTOMATIC_DISABLED.DEFAULT,
    });
  }, [
    isModalOpen,
    userWallets,
    ensAddressOwner,
    currentAddress,
    setEnsSetupMethodSelected,
  ]);

  useEffect(() => {
    if (
      ensRecordQuery.error &&
      ensRecordQuery.error.message !== 'The request is not authenticated.'
    ) {
      toast.error({
        message:
          'There was an error fetching your ENS record. Please try again later.',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ensRecordQuery.error]);

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={closeModal}>
      <Dialog.Overlay />
      <Modal.Content>
        <Modal.Heading>Select Method for ENS Setup</Modal.Heading>
        <Text>Select an option below to configure your ENS name:</Text>

        <form>
          <Modal.RadioGroup.Root
            value={ensSetupMethodSelected}
            onValueChange={setEnsSetupMethodSelected}
          >
            {automaticSetupState.disabled &&
              automaticSetupState.disabledMessage && (
                <Modal.RadioGroup.ItemContainer>
                  <AlertBox variant="primary" size="sm">
                    {automaticSetupState.disabledMessage}
                  </AlertBox>
                </Modal.RadioGroup.ItemContainer>
              )}
            <Modal.RadioGroup.ItemContainer
              aria-disabled={automaticSetupState.disabled}
            >
              <Box>
                <RadioGroup.Item
                  value="automatic"
                  disabled={automaticSetupState.disabled}
                />
                Set Automatically
                <BadgeText colorScheme="yellow">Recommended</BadgeText>
              </Box>
              <Text>
                Fleek will automatically set the site content hash on your ENS
                name by allowing you to connect the wallet that owns the ENS
                name.
              </Text>
            </Modal.RadioGroup.ItemContainer>
            <Modal.RadioGroup.ItemContainer>
              <Box>
                <RadioGroup.Item value="manual" />
                Set Manually
              </Box>
              <Text>
                We will provide you the information needed to setup the ENS name
                for your site manually.
              </Text>
            </Modal.RadioGroup.ItemContainer>
          </Modal.RadioGroup.Root>
        </form>

        <LearnMoreMessage
          prefix="Need Help?"
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_ENS_NAME}
        >
          Follow Instructions Here
        </LearnMoreMessage>

        <Modal.CTARow>
          <SettingsItemModal.CloseButton />
          <ContinueButton
            isDisabled={
              Boolean(ensRecordQuery.error) ||
              (automaticSetupState.disabled &&
                ensSetupMethodSelected === 'automatic')
            }
          />
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};

const ContinueButton: React.FC<DisabledProps> = ({ isDisabled }) => {
  const { ensSetupMethodSelected, openSetupModal } = useEnsSettingsContext();

  return (
    <Button
      disabled={!ensSetupMethodSelected || isDisabled}
      onClick={openSetupModal}
    >
      Continue
    </Button>
  );
};

type AutomaticSetupState = {
  disabled: boolean;
  disabledMessage?: string;
};
