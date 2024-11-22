import { useMemo, useState } from 'react';

import {
  CodeSnippet,
  ExternalLink,
  LearnMoreMessage,
  Modal,
} from '@/components';
import { constants } from '@/constants';
import { useEnsRecordQuery } from '@/generated/graphqlClient';
import { DisabledProps } from '@/types/Props';
import { Button, Dialog, Text } from '@/ui';

import { SettingsItemModal } from '../../Elements/SettingsItemModal';
import { useEnsSettingsContext } from './EnsSettings.context';

export const VerifyEnsRecordManuallyModal: React.FC = () => {
  const { selectedId, isManualSetupModalOpen, closeSetupModal } =
    useEnsSettingsContext();

  const [ensRecordQuery] = useEnsRecordQuery({
    variables: { where: { id: selectedId } },
    pause: !selectedId,
  });

  const ipnsName = useMemo(() => {
    if (ensRecordQuery.data?.ensRecord.ipnsRecord.name) {
      return `ipns://${ensRecordQuery.data?.ensRecord.ipnsRecord.name}`;
    }
  }, [ensRecordQuery.data?.ensRecord.ipnsRecord.name]);

  const ipfsHash = useMemo(() => {
    if (ensRecordQuery.data?.ensRecord.ipnsRecord.hash) {
      return `ipfs://${ensRecordQuery.data?.ensRecord.ipnsRecord.hash}`;
    }
  }, [ensRecordQuery.data?.ensRecord.ipnsRecord.hash]);

  return (
    <Dialog.Root open={isManualSetupModalOpen} onOpenChange={closeSetupModal}>
      <Dialog.Overlay />
      <Modal.Content>
        <Modal.Heading>Set Content Hash</Modal.Heading>
        <Text>
          Head to&nbsp;
          <ExternalLink
            href={constants.EXTERNAL_LINK.ENS_DOMAIN}
            variant="accent"
          >
            ens.domains
          </ExternalLink>
          &nbsp; and assign your content hash for&nbsp;
          <b>{ensRecordQuery.data?.ensRecord.name}</b>&nbsp;name:
        </Text>

        <Text>
          Use <b>IPNS Content Name</b> if you deploy updates to your site
          frequently, and don&apos;t want to pay gas for every update.
        </Text>

        <Text>
          Use <b>IPFS Content Hash</b> if you deploy updates to your site less
          frequently, and want to pay gas for every update.
        </Text>

        <Text>
          Once you do this, come back here and confirm you have added it.
        </Text>

        <CodeSnippet
          title="IPNS Content Name"
          code={ipnsName}
          isLoading={ensRecordQuery.fetching}
        />

        <CodeSnippet
          title="IPFS Content Hash"
          code={ipfsHash}
          isLoading={ensRecordQuery.fetching}
        />

        <LearnMoreMessage
          prefix="Need Help?"
          href={constants.EXTERNAL_LINK.FLEEK_DOCS_ENS_NAME}
        >
          Follow Instructions Here
        </LearnMoreMessage>

        <Modal.CTARow>
          <SettingsItemModal.CloseButton />
          <SubmitButton isDisabled={ensRecordQuery.fetching} />
        </Modal.CTARow>
      </Modal.Content>
    </Dialog.Root>
  );
};

const SubmitButton: React.FC<DisabledProps> = ({ isDisabled }) => {
  const { selectedId, onSubmitVerification, closeSetupModal } =
    useEnsSettingsContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmitVerification(selectedId);
    setIsLoading(false);

    closeSetupModal();
  };

  return (
    <Button
      loading={isLoading}
      disabled={isDisabled || isLoading}
      onClick={handleSubmit}
      className="flex-1"
    >
      Ok, I have added it
    </Button>
  );
};
