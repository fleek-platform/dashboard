import { createDomainSchema } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';

import { Form } from '@/components';
import { constants } from '@/constants';
import { Site } from '@/fragments';
import {
  useCreateDomainMutation,
  useCreateZoneForSiteMutation,
  useDeleteDomainMutation,
  useSelectPrimaryDomainMutation,
  useSiteQuery,
  useVerifyDnslinkMutation,
  useVerifyDomainMutation,
  ZoneDocument,
  ZoneQuery,
  ZoneQueryVariables,
  ZoneStatus,
} from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { useToast } from '@/hooks/useToast';
import { Page } from '@/types/App';
import { checkPeriodicallyUntil } from '@/utils/checkPeriodicallyUntil';
import { withAccess } from '@/utils/withAccess';

class DomainCreationError extends Error {}

const DomainsSettingsPage: Page = () => {
  const router = useRouter();
  const client = useClient();
  const toast = useToast();

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  const [, createDomain] = useCreateDomainMutation();
  const [, createZoneForSite] = useCreateZoneForSiteMutation();
  const [, verifyDomain] = useVerifyDomainMutation();
  const [, verifyDnslink] = useVerifyDnslinkMutation();
  const [, deleteDomain] = useDeleteDomainMutation();
  const [, selectPrimaryDomain] = useSelectPrimaryDomainMutation();

  const [, refetchSiteQuery] = useSiteQuery({
    variables: { where: { id: router.query.siteId! } },
  });

  const newDomainForm = Form.useForm({
    values: {
      hostname: '',
    },
    schema: createDomainSchema.shape.data,
    extraValidations: {
      hostname: Form.createExtraValidation.domain(client),
    },
    onSubmit: async (values) => {
      try {
        const getZoneId = async (): Promise<string> => {
          const existingZones = siteQuery.data?.site.zones?.filter(
            (zone) => zone.status === 'CREATED',
          );

          if (existingZones?.[0]?.id) {
            return existingZones[0].id;
          }

          const createZoneResult = await createZoneForSite({
            where: { siteId: router.query.siteId! },
          });

          const zoneId = createZoneResult.data?.createZoneForSite.id;

          if (!zoneId) {
            throw createZoneResult.error;
          }

          await checkPeriodicallyUntil({
            // This function should follow packages/cli/src/commands/domains/wait/waitForZoneCreationResult.ts
            conditionFn: async () => {
              const checkedZoneResult = await client
                .query<ZoneQuery, ZoneQueryVariables>(
                  ZoneDocument,
                  { where: { id: zoneId } },
                  { requestPolicy: 'network-only' },
                )
                .toPromise();
              const status = checkedZoneResult.data?.zone.status;

              if (!status) {
                throw checkedZoneResult.error;
              }

              if (status === ZoneStatus.CREATING_FAILED) {
                throw new DomainCreationError('Zone creation failed');
              }

              if (status === ZoneStatus.CREATED) {
                return true;
              }
            },
            tries: 10,
            period: 6_000,
          });

          return zoneId;
        };

        const zoneId = await getZoneId();

        const createDomainResult = await createDomain({
          where: { zoneId },
          data: { hostname: values.hostname },
        }); // for now we create both DNS records (regular/dnslink)

        if (!createDomainResult.data) {
          throw createDomainResult.error;
        }

        refetchSiteQuery({ requestPolicy: 'cache-and-network' });
        newDomainForm.resetForm();

        toast.success({
          message: `Added ${values.hostname} to site ${siteQuery.data?.site.name}`,
        });

        return createDomainResult.data.createDomain.id;
      } catch (error) {
        toast.error({ error, log: 'Failed to create domain' });
      }
    },
  });

  const handleSubmitDomainVerification = async (
    domainId: string,
    withDnsLink?: boolean,
  ) => {
    try {
      let result;

      if (withDnsLink) {
        result = await verifyDnslink({ where: { domainId } });
      } else {
        result = await verifyDomain({ where: { id: domainId } });
      }

      if (!result.data) {
        throw result.error;
      }

      return true;
    } catch (error) {
      toast.error({ error, log: 'Failed to verify domain' });
    }
  };

  const handleSubmitDomainDelete = async (
    domainId: string,
    newPrimaryDomain?: string,
  ) => {
    try {
      let newPrimaryDomainHostname = '';

      if (newPrimaryDomain) {
        // means we first need to set the new primary domain and then delete de domain
        const newPrimaryDomainResult = await selectPrimaryDomain({
          where: { id: newPrimaryDomain },
        });

        if (!newPrimaryDomainResult.data || newPrimaryDomainResult.error) {
          throw new DeletePrimaryDomainError(
            'Failed to set new primary domain',
          );
        }

        newPrimaryDomainHostname =
          newPrimaryDomainResult.data.selectPrimaryDomain.hostname;
      }

      const result = await deleteDomain({ where: { id: domainId } });

      if (!result.data) {
        throw result.error;
      }

      toast.success({
        message: `Domain removed ${result.data.deleteDomain.hostname}${
          newPrimaryDomainHostname
            ? ` and replaced with ${newPrimaryDomainHostname}`
            : ''
        }`,
      });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Failed to remove domain' });
    }
  };

  const handleSubmitPrimaryDomain = async (domainId: string) => {
    try {
      const result = await selectPrimaryDomain({ where: { id: domainId } });

      if (!result.data) {
        throw result.error;
      }

      refetchSiteQuery({ requestPolicy: 'cache-and-network' });

      toast.success({
        message: `${result.data.selectPrimaryDomain.hostname} is now the primary domain for ${siteQuery.data?.site.name}`,
      });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Failed to delete domain' });
    }
  };

  return (
    <>
      <Form.Provider value={newDomainForm}>
        <Site.Settings.Sections.CustomDomains
          onSubmitVerification={handleSubmitDomainVerification}
          onSubmitDelete={handleSubmitDomainDelete}
          onSubmitPrimaryDomain={handleSubmitPrimaryDomain}
        />
      </Form.Provider>
    </>
  );
};

DomainsSettingsPage.getLayout = (page) => (
  <Site.Settings.Layout>{page}</Site.Settings.Layout>
);

export default withAccess({
  Component: DomainsSettingsPage,
  requiredPermissions: [
    constants.PERMISSION.SITE.ADD_AND_VERIFY_DOMAIN,
    constants.PERMISSION.SITE.DELETE_DOMAIN,
    constants.PERMISSION.SITE.CHANGE_PRIMARY_DOMAIN,
  ],
});

class DeletePrimaryDomainError extends Error {}
