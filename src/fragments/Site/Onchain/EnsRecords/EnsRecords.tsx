import { createEnsRecordSchema } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';

import {
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import {
  useCreateEnsRecordMutation,
  useCreateIpnsRecordForSiteMutation,
  useDeleteEnsRecordMutation,
  useSiteQuery,
  useVerifyEnsRecordMutation,
} from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSiteEnsRecordsQuery } from '@/hooks/useSiteEnsRecordsQuery';
import { useToast } from '@/hooks/useToast';
import { Box, Button } from '@/ui';

import { EnsMethodSetupModal } from './EnsMethodSetupModal';
import { EnsRecordsList } from './EnsRecordsList';
import {
  EnsSettingsProvider,
  useEnsSettingsContext,
} from './EnsSettings.context';
import { EnsSetupAutomaticModal } from './EnsSetupAutomaticModal';
import { VerifyEnsRecordManuallyModal } from './VerifyEnsRecordManuallyModal';

export const EnsRecords: React.FC = () => {
  const router = useRouter();
  const client = useClient();

  const hasAddEnsPermission = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS],
  });
  const [siteEnsRecordsQuery] = useSiteEnsRecordsQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  const toast = useToast();

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  const [, createIpnsRecordForSite] = useCreateIpnsRecordForSiteMutation();
  const [, createEnsRecord] = useCreateEnsRecordMutation();
  const [, verifyEnsRecord] = useVerifyEnsRecordMutation();
  const [, deleteEnsRecord] = useDeleteEnsRecordMutation();

  const [, refetchSiteEnsRecordsQuery] = useSiteEnsRecordsQuery({
    variables: { where: { id: router.query.siteId! } },
    pause: true,
  });

  const newEnsRecordForm = Form.useForm({
    values: {
      name: '',
    },
    schema: createEnsRecordSchema.shape.data,
    extraValidations: {
      name: Form.createExtraValidation.ensName(client, router.query.siteId!),
    },
    onSubmit: async (values) => {
      try {
        const getIpnsId = async (): Promise<string> => {
          if (siteQuery.data?.site.ipnsRecords[0]?.id) {
            return siteQuery.data?.site.ipnsRecords[0].id;
          }

          const createIpnsResult = await createIpnsRecordForSite({
            where: { siteId: router.query.siteId! },
          });

          const ipnsId = createIpnsResult.data?.createIpnsRecordForSite.id;

          if (!ipnsId) {
            throw createIpnsResult.error;
          }

          return ipnsId;
        };

        const ipnsId = await getIpnsId();

        const createEnsRecordResult = await createEnsRecord({
          where: { siteId: router.query.siteId!, ipnsRecordId: ipnsId },
          data: { name: values.name },
        });

        if (!createEnsRecordResult.data) {
          throw createEnsRecordResult.error;
        }

        refetchSiteEnsRecordsQuery({ requestPolicy: 'network-only' });

        newEnsRecordForm.resetForm();

        return createEnsRecordResult.data.createEnsRecord.id;
      } catch (error) {
        toast.error({ error, log: 'Failed to create ens record' });
      }
    },
  });

  const handleSubmitEnsRecordVerification = async (id: string) => {
    try {
      const result = await verifyEnsRecord({ where: { id } });

      if (!result.data) {
        throw result.error;
      }

      refetchSiteEnsRecordsQuery({ requestPolicy: 'network-only' });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Failed to verify ens record' });
    }
  };

  const handleSubmitEnsRecordDelete = async (id: string) => {
    try {
      const result = await deleteEnsRecord({ where: { id } });

      if (!result.data) {
        throw result.error;
      }

      refetchSiteEnsRecordsQuery({ requestPolicy: 'network-only' });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Failed to delete ens record' });
    }
  };

  return (
    <Form.Provider value={newEnsRecordForm}>
      <EnsSettingsProvider
        onSubmitVerification={handleSubmitEnsRecordVerification}
        onSubmitDelete={handleSubmitEnsRecordDelete}
      >
        <SettingsBox.Container className="bg-transparent">
          <SettingsBox.Title>ENS</SettingsBox.Title>
          <SettingsBox.Text>
            Add an ENS name to your site, this allows you to use your ENS name
            as a domain access point for the site deployed.
          </SettingsBox.Text>

          <PermissionsTooltip hasAccess={hasAddEnsPermission}>
            <Form.InputField
              name="name"
              placeholder="example.eth"
              isLoading={siteEnsRecordsQuery.fetching}
              isDisabled={!hasAddEnsPermission}
            />
          </PermissionsTooltip>

          <SettingsBox.ActionRow>
            <LearnMoreMessage
              href={constants.EXTERNAL_LINK.FLEEK_DOCS_ENS_NAME}
            >
              custom ENS
            </LearnMoreMessage>

            {siteEnsRecordsQuery.fetching ? (
              <SettingsBox.Skeleton variant="button" />
            ) : (
              <SubmitButton />
            )}
          </SettingsBox.ActionRow>
        </SettingsBox.Container>

        <Box className="p-0 gap-0 bg-neutral-2" variant="container">
          <EnsRecordsList
            isLoading={siteEnsRecordsQuery.fetching}
            ensRecords={siteEnsRecordsQuery.data}
          />

          <VerifyEnsRecordManuallyModal />
          <EnsMethodSetupModal />
          <EnsSetupAutomaticModal />
        </Box>
      </EnsSettingsProvider>
    </Form.Provider>
  );
};

const SubmitButton: React.FC = () => {
  const { isSubmitting, shouldDisableSubmit, submit, fields } =
    Form.useContext();
  const { openModal } = useEnsSettingsContext();

  const handleSubmit = async () => {
    const ensRecordId = await submit();

    if (typeof ensRecordId === 'string') {
      openModal(ensRecordId, fields.name.value);
    }
  };

  return (
    <Button
      type="submit"
      loading={isSubmitting}
      disabled={shouldDisableSubmit}
      onClick={handleSubmit}
    >
      Add ENS name
    </Button>
  );
};
