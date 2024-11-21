import {
  createDomainSchema,
  createPrivateGatewaySchema,
} from '@fleek-platform/utils-validation';
import { useClient } from 'urql';

import { Form } from '@/components';
import { constants } from '@/constants';
import { Projects } from '@/fragments';
import {
  ZoneDocument,
  type ZoneQuery,
  type ZoneQueryVariables,
  ZoneStatus,
  useCreateDomainMutation,
  useCreatePrivateGatewayMutation,
  useCreateZoneForPrivateGatewayMutation,
  useDeleteDomainMutation,
  useDeletePrivateGatewayMutation,
  usePrivateGatewaysQuery,
  useSelectPrimaryDomainMutation,
  useVerifyDomainMutation,
} from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import type { Page } from '@/types/App';
import { checkPeriodicallyUntil } from '@/utils/checkPeriodicallyUntil';
import { withAccess } from '@/utils/withAccess';
import type { ReactElement } from 'react';

class PrivateGatewayCreationError extends Error {}

const PrivateGatewaysPage: Page = () => {
  const client = useClient();
  const toast = useToast();

  const [, deletePrivateGateway] = useDeletePrivateGatewayMutation();
  const [, createZoneForPrivateGateway] =
    useCreateZoneForPrivateGatewayMutation();
  const [, createPrivateGateway] = useCreatePrivateGatewayMutation();

  const [, createDomain] = useCreateDomainMutation();
  const [, verifyDomain] = useVerifyDomainMutation();
  const [, deleteDomain] = useDeleteDomainMutation();
  const [, selectPrimaryDomain] = useSelectPrimaryDomainMutation();

  const [, refetchPrivateGatewaysQuery] = usePrivateGatewaysQuery();

  const newPrivateGatewayForm = Form.useForm({
    values: {
      name: '', // private gateway name needed to create the zone
    },
    schema: createPrivateGatewaySchema.shape.data,
    extraValidations: {
      name: Form.createExtraValidation.privateGatewayName(client),
    },
    onSubmit: async (values) => {
      try {
        // create zone for PGW and get zoneId
        // TODO abstract this since in the domain creation we do the same
        const getZoneId = async (): Promise<string> => {
          const createZoneResult = await createZoneForPrivateGateway({});

          const zoneId = createZoneResult.data?.createZoneForPrivateGateway?.id;

          if (!zoneId) {
            throw createZoneResult.error;
          }

          await checkPeriodicallyUntil({
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
                throw new PrivateGatewayCreationError('Zone creation failed');
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

        // with the zone created we can create the PGW

        const createPrivateGatewayResult = await createPrivateGateway({
          where: { zoneId },
          data: { name: values.name },
        });

        if (!createPrivateGatewayResult.data) {
          throw createPrivateGatewayResult.error;
        }

        newPrivateGatewayForm.resetForm();

        toast.success({
          message: `Private Gateway ${createPrivateGatewayResult.data.createPrivateGateway.name} created`,
        });

        return zoneId;
      } catch (error) {
        toast.error({ error, log: 'Failed to create private gateway' });
      }
    },
  });

  const handleSubmitDomainVerification = async (domainId: string) => {
    try {
      const result = await verifyDomain({ where: { id: domainId } });

      if (!result.data) {
        throw result.error || new Error('Error trying to verify domain');
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
        throw result.error || new Error('Error trying to delete domain');
      }

      refetchPrivateGatewaysQuery({ requestPolicy: 'network-only' });

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

  const handlePrivateGatewayDelete = async (
    privateGatewayId: string,
    primaryDomainId?: string,
    // TODO: Investigate why this type had to be added
  ): Promise<true> => {
    try {
      let newPrimaryDomainHostname = '';

      if (primaryDomainId) {
        const newPrimaryDomainResult = await selectPrimaryDomain({
          where: { id: primaryDomainId },
        });

        if (!newPrimaryDomainResult.data || newPrimaryDomainResult.error) {
          throw new DeletePrimaryDomainError(
            'Failed to set new primary domain',
          );
        }

        newPrimaryDomainHostname =
          newPrimaryDomainResult.data.selectPrimaryDomain.hostname;
      }

      const result = await deletePrivateGateway({
        where: { id: privateGatewayId },
      });

      if (!result.data) {
        throw (
          result.error || new Error('Error trying to delete private gateway')
        );
      }

      refetchPrivateGatewaysQuery({ requestPolicy: 'cache-and-network' });

      toast.success({
        message: `Deleted Private Gateway ${result.data.deletePrivateGateway.name}${
          newPrimaryDomainHostname
            ? ` and set ${newPrimaryDomainHostname} as the Primary domain`
            : ''
        }`,
      });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Failed to delete private gateway' });
    }
  };

  const addDomainForm = Form.useForm({
    values: {
      hostname: '',
      zoneId: '',
    },
    schema: createDomainSchema.shape.data,
    extraValidations: {
      hostname: Form.createExtraValidation.domain(client),
    },
    onSubmit: async (values) => {
      try {
        const createDomainResult = await createDomain({
          where: { zoneId: values.zoneId },
          data: { hostname: values.hostname },
        });

        if (!createDomainResult.data) {
          throw (
            createDomainResult.error ||
            new Error('Error trying to add domain to private gateway')
          );
        }

        refetchPrivateGatewaysQuery({ requestPolicy: 'cache-and-network' });

        addDomainForm.resetForm();
      } catch (error) {
        toast.error({ error, log: 'Failed to add domain to private gateway' });
      }
    },
  });

  const handleSubmitPrimaryDomain = async (domainId: string) => {
    try {
      const result = await selectPrimaryDomain({ where: { id: domainId } });

      if (!result.data) {
        throw result.error;
      }

      refetchPrivateGatewaysQuery({ requestPolicy: 'network-only' });

      toast.success({
        message: `${result.data.selectPrimaryDomain.hostname} is now the primary domain for private gateway`,
      });

      return true;
    } catch (error) {
      toast.error({ error, log: 'Failed to set primary domain' });
    }
  };

  const onCancelAddDomainClick = () => {
    addDomainForm.resetForm();
  };

  return (
    <Projects.Settings.Sections.PrivateGateways.Provider
      onSubmitDeletePrivateGateway={handlePrivateGatewayDelete}
      onSubmitVerification={handleSubmitDomainVerification}
      onSubmitDelete={handleSubmitDomainDelete}
      onSubmitPrimaryDomain={handleSubmitPrimaryDomain}
    >
      <Projects.Settings.Sections.PrivateGateways.Delete.Provider
        onSubmitDelete={handlePrivateGatewayDelete}
      >
        <Form.Provider value={newPrivateGatewayForm}>
          <Projects.Settings.Sections.PrivateGateways.Main />
        </Form.Provider>

        <Form.Provider value={addDomainForm}>
          <Projects.Settings.Sections.PrivateGateways.AddDomainModal
            onCancel={onCancelAddDomainClick}
          />
        </Form.Provider>
      </Projects.Settings.Sections.PrivateGateways.Delete.Provider>
    </Projects.Settings.Sections.PrivateGateways.Provider>
  );
};

// TODO: Why the inferred type's any? Is the added type correct?
PrivateGatewaysPage.getLayout = (page: ReactElement) => (
  <Projects.Settings.Layout>{page}</Projects.Settings.Layout>
);

export default withAccess({
  Component: PrivateGatewaysPage,
  requiredPermissions: [constants.PERMISSION.PRIVATE_GATEWAY.VIEW],
});

class DeletePrimaryDomainError extends Error {}
