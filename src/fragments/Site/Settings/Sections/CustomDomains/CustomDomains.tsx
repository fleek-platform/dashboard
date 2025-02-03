import {
  DomainField,
  Form,
  LearnMoreMessage,
  PermissionsTooltip,
  SettingsBox,
  ThreeDNSBuyDomainButton,
} from '@/components';
import { constants } from '@/constants';
import { useSiteQuery } from '@/generated/graphqlClient';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from '@/hooks/useRouter';
import { useBillingContext } from '@/providers/BillingProvider';
import { Button } from '@/ui';
import { filterDeletedDomains } from '@/utils/filterDeletedDomains';

import {
  SettingsItemContext,
  SettingsItemProvider,
  useSettingsItemContext,
} from '../../Elements/SettingsItem.context';
import { DeletePrimaryDomainModal } from './DeletePrimaryDomainModal';
import { DeleteSiteDomainModal } from './DeleteSiteDomainModal';
import { DomainsList } from './DomainsList';
import { VerifyDomainModal } from './VerifyDomainModal/VerifyDomainModal';

export type CustomDomainsProps = Pick<
  SettingsItemContext,
  | 'onSubmitVerification'
  | 'onSubmitDelete'
  | 'onSubmitPrimaryDomain'
  | 'refetchQuery'
>;

export const CustomDomains: React.FC<CustomDomainsProps> = ({
  onSubmitVerification,
  onSubmitDelete,
  onSubmitPrimaryDomain,
}) => {
  const router = useRouter();
  const hasAddDomainPermission = usePermissions({
    action: [constants.PERMISSION.SITE.ADD_AND_VERIFY_DOMAIN],
  });
  const billing = useBillingContext();

  const [siteQuery, refetchSiteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  const siteName = siteQuery.data?.site.name || '';
  const domains = filterDeletedDomains(siteQuery.data?.site.domains || []);

  const billingRestriction = billing.hasReachedLimit(
    'customDomains',
    domains.length,
  );

  return (
    <SettingsItemProvider
      onSubmitVerification={onSubmitVerification}
      onSubmitDelete={onSubmitDelete}
      onSubmitPrimaryDomain={onSubmitPrimaryDomain}
      refetchQuery={refetchSiteQuery}
    >
      <SettingsBox.Container
        className="bg-transparent"
        isBillingDisabled={billingRestriction.hasReachedLimit}
        disabledText={billingRestriction.restrictionMessage}
      >
        <SettingsBox.TitleRow>
          <SettingsBox.Column>
            <SettingsBox.Title>Custom Domains</SettingsBox.Title>
            <SettingsBox.Text>
              Add a DNS domain or subdomain to your site, allowing anyone to
              access your site via traditional https endpoint.
            </SettingsBox.Text>
          </SettingsBox.Column>
          <ThreeDNSBuyDomainButton />
        </SettingsBox.TitleRow>

        <PermissionsTooltip hasAccess={hasAddDomainPermission}>
          <DomainField
            isLoading={siteQuery.fetching}
            isDisabled={
              !hasAddDomainPermission || billingRestriction.hasReachedLimit
            }
          />
        </PermissionsTooltip>

        <SettingsBox.ActionRow>
          <LearnMoreMessage
            href={constants.EXTERNAL_LINK.FLEEK_DOCS_CUSTOM_DOMAIN}
          >
            custom domains
          </LearnMoreMessage>

          {siteQuery.fetching ? (
            <SettingsBox.Skeleton variant="button" />
          ) : (
            <SubmitButton />
          )}
        </SettingsBox.ActionRow>
      </SettingsBox.Container>

      <SettingsBox.Container className="p-0 gap-0">
        <DomainsList
          isLoading={siteQuery.fetching}
          domains={domains}
          primaryDomainId={siteQuery.data?.site.primaryDomain?.id}
          siteName={siteName}
        />

        <VerifyDomainModal />
        <DeleteSiteDomainModal />
        <DeletePrimaryDomainModal />
      </SettingsBox.Container>
    </SettingsItemProvider>
  );
};

const SubmitButton: React.FC = () => {
  const { setShouldOpenModalOnCreated } = useSettingsItemContext();
  const { isSubmitting, shouldDisableSubmit, submit } = Form.useContext();

  const handleSubmit = () => {
    submit();
    setShouldOpenModalOnCreated(true);
  };

  return (
    <Button
      type="submit"
      loading={isSubmitting}
      disabled={shouldDisableSubmit}
      onClick={handleSubmit}
    >
      Add custom domain
    </Button>
  );
};
