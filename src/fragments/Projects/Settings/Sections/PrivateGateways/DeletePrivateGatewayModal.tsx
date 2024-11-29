import { useMemo, useState } from 'react';

import { SettingsDeleteModal } from '@/components';
import {
  useDeletePrivateGatewayDependenciesQuery,
  usePrivateGatewaysQuery,
} from '@/generated/graphqlClient';
import type { Domain } from '@/types/Domain';
import type { ChildrenProps, LoadingProps } from '@/types/Props';
import type { SiteDomain } from '@/types/Site';
import { Button, Combobox, FormField, Input, Stepper, Text } from '@/ui';
import { filterDeletedDomains } from '@/utils/filterDeletedDomains';
import { isActiveDomain } from '@/utils/isActiveDomain';

import { useDeletePrivateGatewayContext } from './DeletePrivateGateway.context';

export const DeletePrivateGatewayModal: React.FC<ChildrenProps> = ({
  children,
}) => {
  const { isOpen, toggleOpen, privateGatewayId } =
    useDeletePrivateGatewayContext();

  const [deletePrivateGatewayDependenciesQuery] =
    useDeletePrivateGatewayDependenciesQuery({
      variables: {
        where: {
          id: privateGatewayId!,
        },
      },
      requestPolicy: 'network-only',
      pause: !isOpen || !privateGatewayId,
    });

  const isLoading = deletePrivateGatewayDependenciesQuery.fetching;
  const currentPrimaryDomain =
    deletePrivateGatewayDependenciesQuery.data?.privateGateway.primaryDomain;
  const domains = useMemo(() => {
    if (deletePrivateGatewayDependenciesQuery.data) {
      return filterDeletedDomains(
        deletePrivateGatewayDependenciesQuery.data.privateGateway
          .domains as SiteDomain[],
      );
    }

    return [];
  }, [deletePrivateGatewayDependenciesQuery.data]);

  const shouldReplacePrimaryDomain =
    currentPrimaryDomain &&
    domains.some((domain) => domain.id === currentPrimaryDomain.id);

  const [privateGatewaysQuery] = usePrivateGatewaysQuery({
    pause: !shouldReplacePrimaryDomain,
    variables: {},
  });

  const primaryDomainCandidates = useMemo(() => {
    if (shouldReplacePrimaryDomain) {
      return privateGatewaysQuery.data?.privateGateways.data.flatMap(
        (gateway) => {
          if (gateway.id === privateGatewayId) {
            return [];
          }

          return (
            gateway.domains.filter((domain) =>
              isActiveDomain({
                domain,
                primaryDomainId: currentPrimaryDomain.id,
              }),
            ) || []
          );
        },
      );
    }

    return [];
  }, [
    shouldReplacePrimaryDomain,
    privateGatewaysQuery.data?.privateGateways.data,
    privateGatewayId,
    currentPrimaryDomain,
  ]);

  return (
    <SettingsDeleteModal
      trigger={children}
      open={isOpen}
      onOpenChange={toggleOpen}
    >
      <Stepper.Root>
        <Stepper.Indicator />

        <Stepper.Container>
          <Stepper.Step>
            <Step1 />
          </Stepper.Step>

          <Stepper.Step>
            <Step2
              domains={domains}
              primaryDomainCandidates={primaryDomainCandidates}
              isLoading={isLoading}
            />
          </Stepper.Step>

          <Stepper.Step>
            <Step3 />
          </Stepper.Step>
        </Stepper.Container>
      </Stepper.Root>
    </SettingsDeleteModal>
  );
};

const Step1: React.FC = () => {
  const stepper = Stepper.useContext();

  const handleConfirm = () => {
    stepper.nextStep();
  };

  return (
    <>
      <SettingsDeleteModal.Heading>
        Delete private gateway
      </SettingsDeleteModal.Heading>

      <Text>
        Please confirm that you want to delete this private gateway and all
        associated domains.
      </Text>

      <Text>
        In the following steps, you will confirm the deletion of all domains
        used within this private gateway.
      </Text>

      <SettingsDeleteModal.Warning />

      <SettingsDeleteModal.Footer>
        <SettingsDeleteModal.CancelButton />

        <SettingsDeleteModal.ConfirmButton
          onClick={handleConfirm}
          className="flex-1"
        >
          Continue
        </SettingsDeleteModal.ConfirmButton>
      </SettingsDeleteModal.Footer>
    </>
  );
};

type Step2Props = LoadingProps<{
  domains: Pick<Domain, 'hostname'>[];
  primaryDomainCandidates?: Domain[];
}>;

const Step2: React.FC<Step2Props> = ({
  domains,
  isLoading,
  primaryDomainCandidates,
}) => {
  const stepper = Stepper.useContext();
  const { newPrimaryDomain, setNewPrimaryDomain } =
    useDeletePrivateGatewayContext();
  const [isDomainsValid, setIsDomainsValid] = useState(false);

  const shouldChoosePrimaryDomain =
    primaryDomainCandidates && primaryDomainCandidates.length > 0;

  const domainsRows = useMemo(() => {
    if (!domains) {
      return [];
    }

    return domains.map((domain) => [domain.hostname]);
  }, [domains]);

  const handleConfirm = () => {
    stepper.nextStep();
  };

  return (
    <>
      <SettingsDeleteModal.Heading>
        Confirm private gateway deletion
      </SettingsDeleteModal.Heading>

      <Text>The active domains in your private gateway are listed below.</Text>

      {domainsRows.length > 0 && (
        <>
          <Text>
            To delete a private gateway that has domains, you will need to
            remove the configurations from your DNS provider.
          </Text>
          <Text>
            After that, mark the domains as confirmed for deletion by clicking
            their check-boxes in the list below.
          </Text>
        </>
      )}

      <SettingsDeleteModal.Table
        title="Private gateway domains"
        isLoading={isLoading}
        headers={[{ size: '100%', children: 'Domain' }]}
        rows={domainsRows}
        onValidationChange={setIsDomainsValid}
      />

      {shouldChoosePrimaryDomain && (
        <>
          <Text>
            Since your primary domain is associated to the private gateway, here
            you can choose a new primary domain from your other private
            gateway&apos;s domains
          </Text>

          <Combobox
            items={primaryDomainCandidates}
            selected={[newPrimaryDomain, setNewPrimaryDomain]}
            queryKey="hostname"
          >
            {({ Field, Options }) => (
              <>
                <Field placeholder="Choose Domain">
                  {(selected) => selected.hostname}
                </Field>

                <Options>{(item) => item.hostname}</Options>
              </>
            )}
          </Combobox>
        </>
      )}

      <SettingsDeleteModal.Warning />
      <SettingsDeleteModal.Footer>
        <SettingsDeleteModal.CancelButton />
        <SettingsDeleteModal.ConfirmButton
          onClick={handleConfirm}
          disabled={
            !isDomainsValid ||
            (shouldChoosePrimaryDomain && !newPrimaryDomain) ||
            isLoading
          }
          className="flex-1"
        >
          Continue
        </SettingsDeleteModal.ConfirmButton>
      </SettingsDeleteModal.Footer>
    </>
  );
};

const Step3: React.FC<LoadingProps> = ({ isLoading }) => {
  const {
    privateGatewayId,
    newPrimaryDomain,
    privateGatewayName,
    onSubmitDelete,
    toggleOpen,
  } = useDeletePrivateGatewayContext();
  const [privateGatewayConfirmation, setPrivateGatewayConfirmation] =
    useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateGatewayConfirmation(e.target.value);
  };

  const handleSubmit = async () => {
    if (privateGatewayId) {
      setIsSubmitting(true);
      await onSubmitDelete(privateGatewayId, newPrimaryDomain?.id);
      setIsSubmitting(false);
      toggleOpen();
    }
  };

  return (
    <>
      <SettingsDeleteModal.Heading>
        Confirm private gateway deletion
      </SettingsDeleteModal.Heading>

      <Text>
        To confirm you want to delete your private gateway, enter the gateway
        name in the field below and click &lsquo;Delete private gateway&rsquo;
      </Text>

      <FormField.Root>
        <FormField.Label>
          Enter the private gateway name <b>{privateGatewayName}</b>
        </FormField.Label>
        <Input.Root>
          <Input.Field
            placeholder={privateGatewayName}
            value={privateGatewayConfirmation}
            onChange={handleConfirmationChange}
          />
        </Input.Root>
      </FormField.Root>

      <SettingsDeleteModal.Warning />

      <SettingsDeleteModal.Footer>
        <SettingsDeleteModal.CancelButton />
        <Button
          intent="danger"
          loading={isLoading}
          disabled={
            isSubmitting ||
            privateGatewayName !== privateGatewayConfirmation ||
            isSubmitting
          }
          onClick={handleSubmit}
          className="flex-1"
        >
          Delete private gateway
        </Button>
      </SettingsDeleteModal.Footer>
    </>
  );
};
