import { useFlags } from 'launchdarkly-react-client-sdk';

export type FeatureFlags = {
  isInternalUser: boolean;
  enableTemplateCreation: boolean;
  uploadFileLimit: number;
  enableMigrationFlow: boolean;
  enableBilling: boolean;
  enableDnsLink: boolean;
  enableTwoFactorAuthentication: boolean;
  billingPlan: boolean;
  billingPayment: boolean;
  billingUsage: boolean;
  billingInvoices: boolean;
  enableBackendGitIntegration: boolean;
  enableGitIntegrationsView: boolean;
  storageFoldersFeature: boolean;
};

export const useFeatureFlags = useFlags<FeatureFlags>;
