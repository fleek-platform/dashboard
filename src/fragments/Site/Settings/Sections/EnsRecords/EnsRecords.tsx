import {
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
} from '@/components';
import { constants } from '@/constants';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useSiteEnsRecordsQuery } from '@/hooks/useSiteEnsRecordsQuery';
import { Button } from '@/ui';

import type { SettingsItemProviderProps } from '../../Elements/SettingsItem.context';
import { EnsMethodSetupModal } from './EnsMethodSetupModal';
import { EnsRecordsList } from './EnsRecordsList';
import {
  EnsSettingsProvider,
  useEnsSettingsContext,
} from './EnsSettings.context';
import { EnsSetupAutomaticModal } from './EnsSetupAutomaticModal';
import { VerifyEnsRecordManuallyModal } from './VerifyEnsRecordManuallyModal';

export type EnsRecordsProps = Pick<
  SettingsItemProviderProps,
  'onSubmitVerification' | 'onSubmitDelete'
>;

export const EnsRecords: React.FC<EnsRecordsProps> = ({
  onSubmitVerification,
  onSubmitDelete,
}) => {
  const router = useRouter();
  const hasAddEnsPermission = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_ENS],
  });
  const [siteEnsRecordsQuery] = useSiteEnsRecordsQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  return (
    <EnsSettingsProvider
      onSubmitVerification={onSubmitVerification}
      onSubmitDelete={onSubmitDelete}
    >
      <SettingsBox.Container>
        <SettingsBox.Title>ENS</SettingsBox.Title>
        <SettingsBox.Text>
          Add a ENS name to your site, this allows you to use your ENS name as a
          domain access point for the site deployed.
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
          <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_ENS_NAME}>
            custom ENS
          </LearnMoreMessage>

          {siteEnsRecordsQuery.fetching ? (
            <SettingsBox.Skeleton variant="button" />
          ) : (
            <SubmitButton />
          )}
        </SettingsBox.ActionRow>
      </SettingsBox.Container>

      <SettingsBox.Container>
        <EnsRecordsList
          isLoading={siteEnsRecordsQuery.fetching}
          ensRecords={siteEnsRecordsQuery.data}
        />

        <VerifyEnsRecordManuallyModal />
        <EnsMethodSetupModal />
        <EnsSetupAutomaticModal />
      </SettingsBox.Container>
    </EnsSettingsProvider>
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
