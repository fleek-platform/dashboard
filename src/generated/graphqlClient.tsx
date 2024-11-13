import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigInt` scalar type represents non-fractional signed whole numeric values. */
  BigInt: any;
  CID: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any;
  File: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AcceptInvitationWhereInput = {
  hash: Scalars['ID'];
};

export type Application = {
  __typename?: 'Application';
  clientId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
  /** @deprecated Deprecated in favour of whitelistDomains. Use the whitelistDomains, please! */
  whiteLabelDomains: Array<ApplicationWhiteLabelDomain>;
  whiteLabelDomainsPaginated: ApplicationWhiteLabelDomainsWithNestedAggregation;
  whitelistDomains: Array<ApplicationWhitelistDomain>;
};


export type ApplicationWhiteLabelDomainsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type ApplicationNameAvailabilityWhereInput = {
  name: Scalars['String'];
};

export type ApplicationWhereInput = {
  id: Scalars['ID'];
};

export type ApplicationWhiteLabelDomain = {
  __typename?: 'ApplicationWhiteLabelDomain';
  createdAt: Scalars['Date'];
  hostname: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type ApplicationWhiteLabelDomainsWithNestedAggregation = {
  __typename?: 'ApplicationWhiteLabelDomainsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<ApplicationWhiteLabelDomain>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type ApplicationWhitelistDomain = {
  __typename?: 'ApplicationWhitelistDomain';
  createdAt: Scalars['Date'];
  hostname: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type ApplicationsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ApplicationsWithAggregation = {
  __typename?: 'ApplicationsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Application>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type ArweavePin = {
  __typename?: 'ArweavePin';
  bundlrId: Scalars['String'];
};

export type BillingCycle = {
  __typename?: 'BillingCycle';
  billingCycleUsages?: Maybe<Array<BillingCycleUsage>>;
  billingPartnerTransactionId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  endDate: Scalars['Date'];
  id: Scalars['ID'];
  project: Project;
  projectId: Scalars['String'];
  startDate: Scalars['Date'];
  status: BillingCycleStatus;
  subscription: BillingSubscription;
  subscriptionId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export enum BillingCycleStatus {
  CLOSED = 'CLOSED',
  CURRENT = 'CURRENT',
  FAILED_EXTERNAL = 'FAILED_EXTERNAL',
  FAILED_INTERNAL = 'FAILED_INTERNAL',
  PAID = 'PAID',
  PAYMENT_FAILED = 'PAYMENT_FAILED'
}

export type BillingCycleUsage = {
  __typename?: 'BillingCycleUsage';
  amount: Scalars['Float'];
  billingCycle: BillingCycle;
  billingCycleId: Scalars['String'];
  billingPlanOverageRule?: Maybe<BillingPlanOverageRule>;
  billingPlanOverageRuleId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type BillingCycleUsagesPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type BillingCycleUsagesWithAggregation = {
  __typename?: 'BillingCycleUsagesWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<BillingCycleUsage>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type BillingPlan = {
  __typename?: 'BillingPlan';
  billingPartnerId?: Maybe<Scalars['String']>;
  billingPlanEnablementRules?: Maybe<Array<BillingPlanEnablementRule>>;
  billingPlanOverageRules?: Maybe<Array<BillingPlanOverageRule>>;
  billingPlanTierRules: Array<BillingPlanTierRule>;
  createdAt: Scalars['Date'];
  disabledAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isPublicPlan: Scalars['Boolean'];
  name: Scalars['String'];
  planLevel: BillingPlanLevel;
  price: Scalars['Float'];
  updatedAt: Scalars['Date'];
  version: Scalars['Int'];
};

export type BillingPlanEnablementRule = {
  __typename?: 'BillingPlanEnablementRule';
  billingPlan: BillingPlan;
  billingPlanId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isIncluded: Scalars['Boolean'];
  name: Scalars['String'];
  type: BillingPlanEnablementRuleType;
  updatedAt: Scalars['Date'];
};

export enum BillingPlanEnablementRuleType {
  ARWEAVE_BACKUP = 'ARWEAVE_BACKUP',
  FILECOIN_BACKUP = 'FILECOIN_BACKUP',
  FLEEK_DOMAINS = 'FLEEK_DOMAINS',
  SDK_INTEGRATIONS = 'SDK_INTEGRATIONS',
  SITE_STORAGE_ANALYTICS = 'SITE_STORAGE_ANALYTICS'
}

export enum BillingPlanLevel {
  BASIC = 'BASIC',
  ENTERPRISE = 'ENTERPRISE',
  FREE = 'FREE',
  PRO = 'PRO'
}

export type BillingPlanOverageRule = {
  __typename?: 'BillingPlanOverageRule';
  billingPlanId: Scalars['ID'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  includedAmount?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  overageBucketSize?: Maybe<Scalars['Int']>;
  overagePrice?: Maybe<Scalars['Float']>;
  overageType: BillingPlanOverageType;
  type: BillingPlanOverageRuleType;
  updatedAt: Scalars['Date'];
};

export enum BillingPlanOverageRuleType {
  BUILD_MINUTES = 'BUILD_MINUTES',
  CONCURRENT_BUILDS = 'CONCURRENT_BUILDS',
  FLEEK_FUNCTIONS_REQUEST_COUNT = 'FLEEK_FUNCTIONS_REQUEST_COUNT',
  FLEEK_FUNCTIONS_RUNTIME_MINUTES = 'FLEEK_FUNCTIONS_RUNTIME_MINUTES',
  IPFS_STORAGE = 'IPFS_STORAGE',
  PROJECT_MEMBERS_COUNT = 'PROJECT_MEMBERS_COUNT',
  TOTAL_BANDWIDTH = 'TOTAL_BANDWIDTH'
}

export enum BillingPlanOverageType {
  CAPPED = 'CAPPED',
  MAX = 'MAX',
  TOTAL = 'TOTAL',
  UNLIMITED = 'UNLIMITED'
}

export enum BillingPlanStatus {
  ACTIVE = 'ACTIVE',
  DEPRECATED = 'DEPRECATED',
  DRAFT = 'DRAFT'
}

export type BillingPlanTierRule = {
  __typename?: 'BillingPlanTierRule';
  billingPlan: BillingPlan;
  billingPlanId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export enum BillingPlanTierRuleType {
  CUSTOMER_SUPPORT_TIER = 'CUSTOMER_SUPPORT_TIER'
}

export type BillingPlanWhereInput = {
  id: Scalars['ID'];
};

export type BillingPlansPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type BillingPlansWithAggregation = {
  __typename?: 'BillingPlansWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<BillingPlan>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type BillingSubscription = {
  __typename?: 'BillingSubscription';
  billingPartnerSubscriptionId?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  endDate: Scalars['Date'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  project: Project;
  projectId: Scalars['String'];
  startDate: Scalars['Date'];
  type: SubscriptionType;
  updatedAt: Scalars['Date'];
};

export type Build = {
  __typename?: 'Build';
  baseDirectory?: Maybe<Scalars['String']>;
  buildCommand?: Maybe<Scalars['String']>;
  distDirectory?: Maybe<Scalars['String']>;
  dockerImage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  logs?: Maybe<Array<BuildLog>>;
  logsPaginated: BuildLogsWithNestedAggregation;
  status: BuildStatus;
};


export type BuildLogsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type BuildLog = {
  __typename?: 'BuildLog';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type BuildLogsWithNestedAggregation = {
  __typename?: 'BuildLogsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<BuildLog>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export enum BuildStatus {
  CANCELLED = 'CANCELLED',
  CANCELLING = 'CANCELLING',
  COMPLETED = 'COMPLETED',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
  INITIALISED = 'INITIALISED',
  QUEUED = 'QUEUED',
  RUNNING = 'RUNNING'
}

/** The client application type making the request */
export enum ClientAppType {
  CLI = 'CLI',
  UI = 'UI'
}

export type CreateApplicationDataInput = {
  name: Scalars['String'];
  whiteLabelDomains?: InputMaybe<Array<Scalars['String']>>;
  whitelistDomains?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateBillingCycleUsageDataInput = {
  amount: Scalars['Float'];
  billingCycleId: Scalars['ID'];
  billingPlanOverageRuleId: Scalars['ID'];
};

export type CreateBillingPlanDataInput = {
  billingPartnerId?: InputMaybe<Scalars['ID']>;
  description: Scalars['String'];
  isActive: Scalars['Boolean'];
  isPublicPlan: Scalars['Boolean'];
  name: Scalars['String'];
  planLevel: BillingPlanLevel;
  price: Scalars['Float'];
  version: Scalars['Int'];
};

export type CreateCustomIpfsDeploymentDataInput = {
  cid: Scalars['CID'];
  siteId: Scalars['ID'];
};

export type CreateDnsConfigDataInput = {
  /** Name of the DNS config to create. */
  name: Scalars['String'];
};

export type CreateDnsConfigWhereInput = {
  /** ID of the domain for which to create DNS config. */
  domainId: Scalars['ID'];
  /** ID of the site for which to create DNS config. */
  siteId: Scalars['ID'];
};

export type CreateDomainDataInput = {
  /** Hostname of the domain to create. */
  hostname: Scalars['String'];
};

export type CreateDomainWhereInput = {
  /** ID of a zone to create domain for. */
  zoneId: Scalars['ID'];
};

export type CreateEnsRecordDataInput = {
  name: Scalars['String'];
};

export type CreateEnsRecordWhereInput = {
  ipnsRecordId: Scalars['ID'];
  siteId: Scalars['ID'];
};

export type CreateFleekFunctionDataInput = {
  name: Scalars['String'];
  siteId?: InputMaybe<Scalars['String']>;
};

export type CreateFolderDataInput = {
  name: Scalars['String'];
};

export type CreateFolderWhereInput = {
  parentFolderId?: InputMaybe<Scalars['ID']>;
};

export type CreateGithubAppAuthorizationUrlWhereInput = {
  gitProviderId?: InputMaybe<Scalars['ID']>;
};

export type CreateGithubAppInstallationUrlWhereInput = {
  gitProviderId?: InputMaybe<Scalars['ID']>;
  projectId: Scalars['ID'];
};

export type CreateGithubIntegrationForProjectDataInput = {
  projectId: Scalars['String'];
};

export type CreateGithubRepoFromTemplateDataInput = {
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  repoName: Scalars['String'];
  repoOwner: Scalars['String'];
  templateOwner: Scalars['String'];
  templateRepo: Scalars['String'];
};

export type CreateGithubRepoFromTemplateWhereInput = {
  gitIntegrationId: Scalars['ID'];
};

export type CreateInvitationDataInput = {
  email?: InputMaybe<Scalars['String']>;
  permissionGroupId?: InputMaybe<Scalars['ID']>;
  /** @deprecated We recommend transitioning to the use of `permissionGroupId`. The concept of roles is being phased out as we shift our focus towards a permissions-based system. */
  role?: InputMaybe<Role>;
};

export type CreateIpnsRecordForSiteWhereInput = {
  siteId: Scalars['ID'];
};

export type CreateLoginVerificationSessionWhereInput = {
  /** Generated session id for authorization from CLI */
  id: Scalars['ID'];
};

export type CreateMigrationRequestsFromTokenDataInput = {
  token: Scalars['String'];
};

export type CreateMigrationTokenDataInput = {
  teamIds: Array<Scalars['String']>;
};

export type CreatePersonalAccessTokenFromVerificationSessionDataInput = {
  /** Client application making the request */
  clientAppType?: InputMaybe<ClientAppType>;
  /** Name of the personal access token */
  name?: InputMaybe<Scalars['String']>;
};

export type CreatePersonalAccessTokenFromVerificationSessionWhereInput = {
  /** Generated session ID for authorization from CLI */
  id: Scalars['ID'];
};

export type CreatePrivateGatewayDataInput = {
  name: Scalars['String'];
};

export type CreatePrivateGatewayWhereInput = {
  zoneId: Scalars['ID'];
};

export type CreateProjectDataInput = {
  name: Scalars['String'];
  planId?: InputMaybe<Scalars['ID']>;
};

export type CreateSalesContactRequestDataInput = {
  description: Scalars['String'];
  email: Scalars['String'];
};

export type CreateSecretDataInput = {
  groupId: Scalars['ID'];
  key: Scalars['String'];
  value: Scalars['String'];
  visibility: SecretVisibility;
};

export type CreateSiteDataInput = {
  baseDirectory?: InputMaybe<Scalars['String']>;
  buildCommand?: InputMaybe<Scalars['String']>;
  distDirectory?: InputMaybe<Scalars['String']>;
  dockerImage?: InputMaybe<Scalars['String']>;
  enablePreviews?: InputMaybe<Scalars['Boolean']>;
  frameworkId?: InputMaybe<Scalars['ID']>;
  gitIntegrationId?: InputMaybe<Scalars['ID']>;
  githubInstallationId?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  sourceBranch?: InputMaybe<Scalars['String']>;
  sourceProvider?: InputMaybe<SourceProvider>;
  sourceRepositoryId?: InputMaybe<Scalars['String']>;
  sourceRepositoryName?: InputMaybe<Scalars['String']>;
  sourceRepositoryOwner?: InputMaybe<Scalars['String']>;
  templateId?: InputMaybe<Scalars['ID']>;
};

export type CreateTemplateDataInput = {
  banner: Scalars['File'];
  description: Scalars['String'];
  name: Scalars['String'];
  siteId: Scalars['ID'];
  templateCategoryId: Scalars['ID'];
};

export type CreateZoneForSiteWhereInput = {
  /** ID of a site to add domain to. */
  siteId: Scalars['ID'];
};

export type DeclineInvitationWhereInput = {
  hash: Scalars['String'];
};

export type DeleteApplicationWhereInput = {
  id: Scalars['ID'];
};

export type DeleteDomainWhereInput = {
  id: Scalars['ID'];
};

export type DeleteEnsRecordWhereInput = {
  id: Scalars['ID'];
};

export type DeleteFleekFunctionWhereInput = {
  id: Scalars['String'];
};

export type DeleteFolderWhereInput = {
  id: Scalars['ID'];
};

export type DeleteInvitationWhereInput = {
  id: Scalars['ID'];
};

export type DeleteIpnsRecordWhereInput = {
  id: Scalars['ID'];
};

export type DeleteMembershipWhereInput = {
  projectId?: InputMaybe<Scalars['ID']>;
  userId: Scalars['ID'];
};

export type DeletePersonalAccessTokenWhereInput = {
  id: Scalars['ID'];
};

export type DeletePinWhereInput = {
  id: Scalars['ID'];
};

export type DeletePrivateGatewayWhereInput = {
  id: Scalars['ID'];
};

export type DeleteProjectWhereInput = {
  id: Scalars['ID'];
};

export type DeleteRecoveryCodesWhereInput = {
  secretKeyId: Scalars['ID'];
};

export type DeleteSecretKeyWhereInput = {
  id: Scalars['ID'];
};

export type DeleteSecretWhereInput = {
  id: Scalars['ID'];
};

export type DeleteSiteWhereInput = {
  id: Scalars['ID'];
};

export type DeleteTemplateWhereInput = {
  id: Scalars['ID'];
};

export type DeleteUserWhereInput = {
  id: Scalars['ID'];
};

export type DeleteZoneWhereInput = {
  id: Scalars['ID'];
};

export type Deployment = {
  __typename?: 'Deployment';
  build?: Maybe<Build>;
  cid?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  functionDeployments: Array<FleekFunctionDeployment>;
  id: Scalars['ID'];
  previewImageUrl?: Maybe<Scalars['String']>;
  previewOnly: Scalars['Boolean'];
  previewUrlSlug?: Maybe<Scalars['String']>;
  siteId: Scalars['ID'];
  sourceAuthor?: Maybe<Scalars['String']>;
  sourceBranch?: Maybe<Scalars['String']>;
  sourceMessage?: Maybe<Scalars['String']>;
  sourceProvider?: Maybe<SourceProvider>;
  sourceRef?: Maybe<Scalars['String']>;
  sourceRepositoryId?: Maybe<Scalars['String']>;
  sourceRepositoryName?: Maybe<Scalars['String']>;
  sourceRepositoryOwner?: Maybe<Scalars['String']>;
  startedAt?: Maybe<Scalars['Date']>;
  status: DeploymentStatus;
  storageType: StorageType;
  updatedAt: Scalars['Date'];
};

export enum DeploymentMode {
  PREVIEW_ONLY = 'PREVIEW_ONLY',
  PRODUCTION = 'PRODUCTION'
}

export enum DeploymentStatus {
  ARTIFACT_READY = 'ARTIFACT_READY',
  BUILD_CANCELLED = 'BUILD_CANCELLED',
  BUILD_CANCELLING = 'BUILD_CANCELLING',
  BUILD_COMPLETED = 'BUILD_COMPLETED',
  BUILD_FAILED = 'BUILD_FAILED',
  BUILD_IN_PROGRESS = 'BUILD_IN_PROGRESS',
  CHECK_RUN_CREATING_COMPLETED = 'CHECK_RUN_CREATING_COMPLETED',
  CHECK_RUN_CREATING_FAILED = 'CHECK_RUN_CREATING_FAILED',
  CREATED = 'CREATED',
  READY_CHECK_COMPLETED = 'READY_CHECK_COMPLETED',
  READY_CHECK_FAILED = 'READY_CHECK_FAILED',
  READY_CHECK_IN_PROGRESS = 'READY_CHECK_IN_PROGRESS',
  RELEASE_COMPLETED = 'RELEASE_COMPLETED',
  RELEASE_FAILED = 'RELEASE_FAILED',
  RELEASE_IN_PROGRESS = 'RELEASE_IN_PROGRESS',
  SOURCE_CLONE_COMPLETED = 'SOURCE_CLONE_COMPLETED',
  SOURCE_CLONE_FAILED = 'SOURCE_CLONE_FAILED',
  SOURCE_CLONE_IN_PROGRESS = 'SOURCE_CLONE_IN_PROGRESS',
  UPLOAD_COMPLETED = 'UPLOAD_COMPLETED',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  UPLOAD_IN_PROGRESS = 'UPLOAD_IN_PROGRESS'
}

export type DeploymentWhereInput = {
  id: Scalars['ID'];
};

export type DeploymentsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<DeploymentsSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type DeploymentsQueueLimitWhereInput = {
  siteId: Scalars['ID'];
};

export type DeploymentsWhereInput = {
  branch?: InputMaybe<Scalars['String']>;
  deploymentMode?: InputMaybe<DeploymentMode>;
  endDate?: InputMaybe<Scalars['Date']>;
  siteId: Scalars['ID'];
  startDate?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<DeploymentStatus>;
  statuses?: InputMaybe<Array<DeploymentStatus>>;
};

export type DeploymentsWithAggregation = {
  __typename?: 'DeploymentsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Deployment>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type DeploymentsWithNestedAggregation = {
  __typename?: 'DeploymentsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<Deployment>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type DisableTwoFactorProtectedActionWhereInput = {
  id: Scalars['ID'];
};

export type DnsConfig = {
  __typename?: 'DnsConfig';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: DnsConfigType;
  updatedAt: Scalars['Date'];
  value: Scalars['String'];
};

export enum DnsConfigType {
  A = 'A',
  CNAME = 'CNAME'
}

export enum DnslinkStatus {
  CREATED = 'CREATED',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  VERIFIED = 'VERIFIED'
}

export type Domain = {
  __typename?: 'Domain';
  createdAt: Scalars['Date'];
  dnsConfigs: Array<DnsConfig>;
  dnslinkStatus?: Maybe<DnslinkStatus>;
  errorMessage?: Maybe<Scalars['String']>;
  hostname: Scalars['String'];
  id: Scalars['ID'];
  isVerified: Scalars['Boolean'];
  project?: Maybe<Project>;
  status: DomainStatus;
  updatedAt: Scalars['Date'];
  zone?: Maybe<Zone>;
};

export type DomainAvailabilityWhereInput = {
  /** This GQL endpoint checks if domain is available or not globally */
  hostname: Scalars['String'];
};

export type DomainByHostnameWhereInput = {
  hostname: Scalars['String'];
};

export enum DomainStatus {
  ACTIVE = 'ACTIVE',
  CREATED = 'CREATED',
  CREATING = 'CREATING',
  CREATING_FAILED = 'CREATING_FAILED',
  DELETING = 'DELETING',
  DELETING_FAILED = 'DELETING_FAILED',
  VERIFYING = 'VERIFYING',
  VERIFYING_FAILED = 'VERIFYING_FAILED'
}

export type DomainWhereInput = {
  id: Scalars['ID'];
};

export type DomainsByZoneIdPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type DomainsByZoneIdWhereInput = {
  zoneId: Scalars['ID'];
};

export type DomainsByZoneIdWithAggregation = {
  __typename?: 'DomainsByZoneIdWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Domain>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type DomainsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type DomainsWithAggregation = {
  __typename?: 'DomainsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Domain>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type DomainsWithNestedAggregation = {
  __typename?: 'DomainsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<Domain>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type EmailAvailabilityWhereInput = {
  email: Scalars['String'];
};

export type EnableTwoFactorProtectedActionWhereInput = {
  id: Scalars['ID'];
};

export type EnsNameAvailabilityWhereInput = {
  /** The ENS name. */
  name: Scalars['String'];
  /** Prevents multiple same-names ensRecords for a site */
  siteId?: InputMaybe<Scalars['String']>;
};

export type EnsRecord = {
  __typename?: 'EnsRecord';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  ipnsRecord: IpnsRecord;
  name: Scalars['String'];
  site: Site;
  status: EnsRecordStatus;
  updatedAt: Scalars['Date'];
};

export type EnsRecordByNameWhereInput = {
  /** The ENS name. */
  name: Scalars['String'];
};

export enum EnsRecordStatus {
  ACTIVE = 'ACTIVE',
  CREATED = 'CREATED',
  VERIFYING = 'VERIFYING',
  VERIFYING_FAILED = 'VERIFYING_FAILED'
}

export type EnsRecordWhereInput = {
  id: Scalars['ID'];
};

export type EnsRecordsByIpnsIdPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type EnsRecordsByIpnsIdWhereInput = {
  ipnsRecordId: Scalars['ID'];
};

export type EnsRecordsByIpnsIdWithAggregation = {
  __typename?: 'EnsRecordsByIpnsIdWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<EnsRecord>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type EnsRecordsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type EnsRecordsWithAggregation = {
  __typename?: 'EnsRecordsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<EnsRecord>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type EnsRecordsWithNestedAggregation = {
  __typename?: 'EnsRecordsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<EnsRecord>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type FilecoinDeal = {
  __typename?: 'FilecoinDeal';
  activation: Scalars['Date'];
  cid: Scalars['String'];
  created: Scalars['Date'];
  dataModelSelector?: Maybe<Scalars['String']>;
  dealId: Scalars['Int'];
  expiration: Scalars['Date'];
  pieceCid: Scalars['String'];
  status: Scalars['String'];
  storageProvider: Scalars['String'];
  updated: Scalars['Date'];
};

export type FilecoinDealsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<FilecoinDealsSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FilecoinDealsWhereInput = {
  cid: Scalars['CID'];
};

export type FilecoinDealsWithAggregation = {
  __typename?: 'FilecoinDealsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<FilecoinDeal>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type FilecoinDealsWithNestedAggregation = {
  __typename?: 'FilecoinDealsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<FilecoinDeal>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type FilecoinPin = {
  __typename?: 'FilecoinPin';
  cid: Scalars['String'];
  deals: Array<FilecoinDeal>;
  dealsPaginated: FilecoinDealsWithNestedAggregation;
};


export type FilecoinPinDealsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type FleekFunction = {
  __typename?: 'FleekFunction';
  createdAt: Scalars['Date'];
  currentDeployment?: Maybe<FleekFunctionDeployment>;
  currentDeploymentId?: Maybe<Scalars['String']>;
  deployments: Array<FleekFunctionDeployment>;
  id: Scalars['ID'];
  invokeUrl: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
  site?: Maybe<Site>;
  siteId?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  status: FleekFunctionStatus;
  updatedAt: Scalars['Date'];
};

export type FleekFunctionByNameWhereInput = {
  name: Scalars['String'];
};

export type FleekFunctionDeployment = {
  __typename?: 'FleekFunctionDeployment';
  assetsCid?: Maybe<Scalars['String']>;
  blake3Hash?: Maybe<Scalars['String']>;
  cid: Scalars['String'];
  createdAt: Scalars['Date'];
  fleekFunctionId: Scalars['String'];
  id: Scalars['ID'];
  projectId: Scalars['String'];
  sgx: Scalars['Boolean'];
  siteDeploymentId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type FleekFunctionDeploymentWhereInput = {
  id: Scalars['ID'];
};

export type FleekFunctionDeploymentsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FleekFunctionDeploymentsWhereInput = {
  fleekFunctionId: Scalars['ID'];
};

export type FleekFunctionDeploymentsWithAggregation = {
  __typename?: 'FleekFunctionDeploymentsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<FleekFunctionDeployment>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export enum FleekFunctionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type FleekFunctionsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<FleekFunctionsSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type FleekFunctionsWhereInput = {
  siteId?: InputMaybe<Scalars['ID']>;
};

export type FleekFunctionsWithAggregation = {
  __typename?: 'FleekFunctionsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<FleekFunction>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['Date'];
  folderCount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  path: Scalars['String'];
  pinCount: Scalars['Int'];
  sizeBigInt: Scalars['BigInt'];
  updatedAt: Scalars['Date'];
};

export type FolderNameAvailabilityInParentFolderDataInput = {
  name: Scalars['String'];
};

export type FolderNameAvailabilityInParentFolderWhereInput = {
  parentFolderId?: InputMaybe<Scalars['ID']>;
};

export type FolderOrPin = Folder | Pin;

export type FolderWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  path?: InputMaybe<Scalars['ID']>;
};

export type GenerateRecoveryCodesWhereInput = {
  secretKeyId: Scalars['ID'];
};

export type GitApiBranch = {
  __typename?: 'GitApiBranch';
  name: Scalars['String'];
};

export type GitApiBranchesWhereInput = {
  gitProviderId: Scalars['ID'];
  sourceRepositoryName: Scalars['String'];
  sourceRepositoryOwner: Scalars['String'];
};

export type GitApiInsatallation = {
  __typename?: 'GitApiInsatallation';
  avatar: Scalars['String'];
  installationId: Scalars['Int'];
  isOrganization: Scalars['Boolean'];
  name: Scalars['String'];
  repos: Array<GitApiRepo>;
};

export type GitApiInstallationsWhereInput = {
  gitProviderId: Scalars['ID'];
};

export type GitApiIsRepoNameAvailableWhereInput = {
  gitProviderId: Scalars['ID'];
  owner: Scalars['String'];
  repo: Scalars['String'];
};

export type GitApiRepo = {
  __typename?: 'GitApiRepo';
  defaultBranch: Scalars['String'];
  id: Scalars['Int'];
  installationId: Scalars['Int'];
  name: Scalars['String'];
};

export type GitApiTree = {
  __typename?: 'GitApiTree';
  mode?: Maybe<Scalars['String']>;
  path?: Maybe<Scalars['String']>;
  sha?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type GitApiTreeWhereInput = {
  gitProviderId: Scalars['ID'];
  sourceBranch: Scalars['String'];
  sourceRepositoryName: Scalars['String'];
  sourceRepositoryOwner: Scalars['String'];
};

export type GitIntegration = {
  __typename?: 'GitIntegration';
  createdAt: Scalars['Date'];
  gitProvider: GitProvider;
  githubAppInstallation: GithubAppInstallation;
  id: Scalars['ID'];
  projectId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type GitIntegrationWhereInput = {
  gitProviderId: Scalars['ID'];
};

export type GitProvider = {
  __typename?: 'GitProvider';
  createdAt: Scalars['Date'];
  enabled: Scalars['Boolean'];
  gitUserAccessTokens: Array<GitUserAccessToken>;
  id: Scalars['ID'];
  name: Scalars['String'];
  sourceProvider: SourceProvider;
  tags: Scalars['JSON'];
  updatedAt: Scalars['Date'];
};

export enum GitProviderTags {
  sites = 'sites',
  templates = 'templates'
}

export type GitProviderWhereInput = {
  tag: GitProviderTags;
};

export type GitUserAccessToken = {
  __typename?: 'GitUserAccessToken';
  createdAt: Scalars['Date'];
  gitProviderId: Scalars['String'];
  id: Scalars['ID'];
  token: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type GithubAppInstallation = {
  __typename?: 'GithubAppInstallation';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  installationId?: Maybe<Scalars['String']>;
  projectId: Scalars['String'];
  updatedAt: Scalars['Date'];
};

export type GithubAppInstallationsWhereInput = {
  gitProviderId?: InputMaybe<Scalars['ID']>;
};

export type GithubRepo = {
  __typename?: 'GithubRepo';
  defaultBranch: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  name: Scalars['String'];
  repositoryId: Scalars['Int'];
  url: Scalars['String'];
};

export type Invitation = {
  __typename?: 'Invitation';
  createdAt: Scalars['Date'];
  createdBy: User;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  permissionGroup: PermissionGroup;
  role?: Maybe<Role>;
};

export type InvitationDetail = {
  __typename?: 'InvitationDetail';
  hash: Scalars['String'];
  permissionGroup: PermissionGroup;
  projectAvatar?: Maybe<Scalars['File']>;
  projectId: Scalars['String'];
  projectName: Scalars['String'];
  role?: Maybe<Role>;
};

export type InvitationDetailsWithNestedAggregation = {
  __typename?: 'InvitationDetailsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<InvitationDetail>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type InvitationWhereInput = {
  hash: Scalars['String'];
};

export type InvitationsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<InvitationsSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type InvitationsWithAggregation = {
  __typename?: 'InvitationsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Invitation>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type IpnsRecord = {
  __typename?: 'IpnsRecord';
  createdAt: Scalars['Date'];
  ensRecords: Array<EnsRecord>;
  ensRecordsPaginated: EnsRecordsWithNestedAggregation;
  hash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type IpnsRecordEnsRecordsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type IpnsRecordWhereInput = {
  /** IPNS record name */
  name: Scalars['String'];
};

export type IpnsRecordsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type IpnsRecordsWithAggregation = {
  __typename?: 'IpnsRecordsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<IpnsRecord>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type IpnsRecordsWithNestedAggregation = {
  __typename?: 'IpnsRecordsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<IpnsRecord>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type LeaveProjectWhereInput = {
  projectId: Scalars['ID'];
};

export type LinkPublicKeyDataInput = {
  /** SIWE Message stringified. */
  message: Scalars['String'];
  signature: Scalars['String'];
};

export type ListDeploymentBranchesWhereInput = {
  deploymentMode?: InputMaybe<DeploymentMode>;
  endDate?: InputMaybe<Scalars['Date']>;
  siteId: Scalars['ID'];
  startDate?: InputMaybe<Scalars['Date']>;
  statuses?: InputMaybe<Array<DeploymentStatus>>;
};

export type ListFolderPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<ListFolderSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ListFolderWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ListFolderWithAggregation = {
  __typename?: 'ListFolderWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<FolderOrPin>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type LoginWithAdminAccessTokenDataInput = {
  adminAccessToken: Scalars['String'];
};

export type LoginWithDynamicDataInput = {
  authToken: Scalars['String'];
  projectId?: InputMaybe<Scalars['ID']>;
};

export type LoginWithPersonalAccessTokenDataInput = {
  personalAccessToken: Scalars['String'];
  projectId?: InputMaybe<Scalars['ID']>;
};

export type MarkNotificationsAsReadWhereInput = {
  ids: Array<Scalars['ID']>;
};

export type Membership = {
  __typename?: 'Membership';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  permissionGroup: PermissionGroup;
  role?: Maybe<Role>;
  updatedAt: Scalars['Date'];
  user: User;
};

export type MembershipsWithNestedAggregation = {
  __typename?: 'MembershipsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<Membership>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type MigrationFailedEntity = {
  __typename?: 'MigrationFailedEntity';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: MigrationFailedEntityType;
};

export enum MigrationFailedEntityType {
  DEPLOYMENT = 'DEPLOYMENT',
  IPNS_ENS = 'IPNS_ENS',
  PIN_CONTENT = 'PIN_CONTENT',
  PRIVATE_GATEWAY = 'PRIVATE_GATEWAY',
  SITE = 'SITE',
  STORAGE_PIN = 'STORAGE_PIN',
  USER = 'USER',
  ZONE = 'ZONE'
}

export type MigrationLog = {
  __typename?: 'MigrationLog';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  text: Scalars['String'];
};

export type MigrationLogsWithNestedAggregation = {
  __typename?: 'MigrationLogsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<MigrationLog>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type MigrationRequest = {
  __typename?: 'MigrationRequest';
  createdAt: Scalars['Date'];
  failedEntities: Array<MigrationFailedEntity>;
  id: Scalars['ID'];
  logs: MigrationLogsWithNestedAggregation;
  status: MigrationStatus;
  teamId: Scalars['String'];
  teamInfo?: Maybe<MigrationTeamInfo>;
  updatedAt: Scalars['Date'];
};


export type MigrationRequestLogsArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type MigrationRequestWhereInput = {
  id: Scalars['ID'];
};

export type MigrationRequestsByTokenWhereInput = {
  token: Scalars['String'];
};

export type MigrationRequestsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<MigrationRequestsSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type MigrationRequestsWithAggregation = {
  __typename?: 'MigrationRequestsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<MigrationRequest>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type MigrationScheduledRequest = {
  __typename?: 'MigrationScheduledRequest';
  status?: Maybe<MigrationStatus>;
  teamId: Scalars['String'];
  triggerAfter: Scalars['Date'];
};

export type MigrationScheduledRequestWhereInput = {
  teamId: Scalars['String'];
};

export enum MigrationStatus {
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  IN_PROGRESS = 'IN_PROGRESS'
}

export type MigrationStatusByTeamIdWhereInput = {
  teamId: Scalars['String'];
};

export type MigrationTeamInfo = {
  __typename?: 'MigrationTeamInfo';
  filesCount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  sitesCount: Scalars['Int'];
  usersCount: Scalars['Int'];
};

export type MigrationTeamInfosFromTokenWhereInput = {
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptInvitation: Membership;
  /** Create application client for the given project ID. */
  createApplication: Application;
  createBillingCycleUsage: BillingCycleUsage;
  createBillingPlan: BillingPlan;
  createCustomIpfsDeployment: Deployment;
  /** Create a DNS config for the domain. */
  createDnsConfig: DnsConfig;
  /** Create a domain for the project. */
  createDomain: Domain;
  createEnsRecord: EnsRecord;
  createFleekFunction: FleekFunction;
  createFolder: Folder;
  /** Get URL where you can authorize a GitHub application */
  createGithubAppAuthorizationUrl: Scalars['String'];
  /** Get URL where you can install a GitHub application */
  createGithubAppInstallationUrl: Scalars['String'];
  createGithubIntegrationForProject: Scalars['Boolean'];
  /** Create a GitHub repository from a template */
  createGithubRepoFromTemplate: GithubRepo;
  createInvitation: Scalars['String'];
  /** Creates IPNS record for the given project ID. */
  createIpnsRecord: IpnsRecord;
  /** Creates IPNS record for the given site. */
  createIpnsRecordForSite: IpnsRecord;
  createLoginVerificationSession: Scalars['Boolean'];
  createMigrationRequestsFromToken: Array<MigrationRequest>;
  createMigrationToken: Scalars['String'];
  createPersonalAccessTokenFromVerificationSession: Scalars['String'];
  createPrivateGateway: PrivateGateway;
  createProject: Project;
  createPublicKeyChallenge: Scalars['String'];
  createSalesContactRequest: SalesContactRequest;
  createSecret: Secret;
  createSite: Site;
  createTemplate: Template;
  /** Creates a new zone where domains can be assigned. */
  createZoneForPrivateGateway: Zone;
  /** Creates a new zone where domains can be assigned. */
  createZoneForSite: Zone;
  declineInvitation: Scalars['Boolean'];
  /** Delete application client with the given ID */
  deleteApplication: Application;
  deleteDomain: Domain;
  deleteEnsRecord: EnsRecord;
  deleteFleekFunction: FleekFunction;
  deleteFolder: Folder;
  deleteInvitation: Invitation;
  deleteIpnsRecord: IpnsRecord;
  deleteMembership: Membership;
  deletePersonalAccessToken: PersonalAccessToken;
  deletePin: Pin;
  deletePrivateGateway: PrivateGateway;
  deleteProject: Project;
  deleteRecoveryCodes: Scalars['Boolean'];
  deleteSecret: Secret;
  deleteSecretKey: Scalars['Boolean'];
  deleteSite: Site;
  deleteTemplate: Template;
  deleteUser: User;
  deleteZone: Zone;
  disableTwoFactorProtectedAction: Scalars['Boolean'];
  enableTwoFactorProtectedAction: Scalars['Boolean'];
  generateRecoveryCodes: RecoveryCodes;
  generateTwoFactorSecretKey: SecretKey;
  leaveProject: Membership;
  linkPublicKey: PublicKey;
  loginWithAdminAccessToken: Scalars['String'];
  loginWithDynamic: Scalars['String'];
  loginWithPersonalAccessToken: Scalars['String'];
  markNotificationsAsRead: Scalars['Boolean'];
  promoteDeployment: Scalars['Boolean'];
  /** Publishes autogenerated IPNS name for the given IPFS hash and managed record ID. */
  publishIpnsRecord: IpnsRecord;
  /** Publishes autogenerated IPNS name for the given IPFS hash. */
  publishSignedIpnsName: Scalars['String'];
  purgeSiteCache: Site;
  retryDeployment: Deployment;
  retryMigrationRequest: MigrationRequest;
  selectPrimaryDomain: Domain;
  /** Check if authorization and installation is required and return both urls if required */
  siteDeploymentRequirements: SiteDeploymentRequirements;
  stopDeployment: Scalars['Boolean'];
  triggerDeployment: Deployment;
  triggerFleekFunctionDeployment: FleekFunctionDeployment;
  /** Update application client with the given ID */
  updateApplication: Application;
  updateBillingPlan: BillingPlan;
  updateFleekFunction: FleekFunction;
  updateFolder: Folder;
  updateMembership: Membership;
  updateNotificationSettings: Scalars['Boolean'];
  updatePin: Pin;
  updatePrivateGateway: PrivateGateway;
  updateProject: Project;
  updateSecret: Secret;
  updateSite: Site;
  updateTemplate: Template;
  updateTwoFactorSecretKey: SecretKey;
  updateUser: User;
  verifyDnslink: Domain;
  verifyDomain: Domain;
  verifyEnsRecord: EnsRecord;
  verifyTwoFactorSecretKey: SecretKey;
};


export type MutationAcceptInvitationArgs = {
  where: AcceptInvitationWhereInput;
};


export type MutationCreateApplicationArgs = {
  data: CreateApplicationDataInput;
};


export type MutationCreateBillingCycleUsageArgs = {
  data: CreateBillingCycleUsageDataInput;
};


export type MutationCreateBillingPlanArgs = {
  data: CreateBillingPlanDataInput;
};


export type MutationCreateCustomIpfsDeploymentArgs = {
  data: CreateCustomIpfsDeploymentDataInput;
};


export type MutationCreateDnsConfigArgs = {
  data: CreateDnsConfigDataInput;
  where: CreateDnsConfigWhereInput;
};


export type MutationCreateDomainArgs = {
  data: CreateDomainDataInput;
  where: CreateDomainWhereInput;
};


export type MutationCreateEnsRecordArgs = {
  data: CreateEnsRecordDataInput;
  where: CreateEnsRecordWhereInput;
};


export type MutationCreateFleekFunctionArgs = {
  data: CreateFleekFunctionDataInput;
};


export type MutationCreateFolderArgs = {
  data: CreateFolderDataInput;
  where: CreateFolderWhereInput;
};


export type MutationCreateGithubAppAuthorizationUrlArgs = {
  where: CreateGithubAppAuthorizationUrlWhereInput;
};


export type MutationCreateGithubAppInstallationUrlArgs = {
  where: CreateGithubAppInstallationUrlWhereInput;
};


export type MutationCreateGithubIntegrationForProjectArgs = {
  data: CreateGithubIntegrationForProjectDataInput;
};


export type MutationCreateGithubRepoFromTemplateArgs = {
  data: CreateGithubRepoFromTemplateDataInput;
  where: CreateGithubRepoFromTemplateWhereInput;
};


export type MutationCreateInvitationArgs = {
  data: CreateInvitationDataInput;
};


export type MutationCreateIpnsRecordForSiteArgs = {
  where: CreateIpnsRecordForSiteWhereInput;
};


export type MutationCreateLoginVerificationSessionArgs = {
  where: CreateLoginVerificationSessionWhereInput;
};


export type MutationCreateMigrationRequestsFromTokenArgs = {
  data: CreateMigrationRequestsFromTokenDataInput;
};


export type MutationCreateMigrationTokenArgs = {
  data: CreateMigrationTokenDataInput;
};


export type MutationCreatePersonalAccessTokenFromVerificationSessionArgs = {
  data: CreatePersonalAccessTokenFromVerificationSessionDataInput;
  where: CreatePersonalAccessTokenFromVerificationSessionWhereInput;
};


export type MutationCreatePrivateGatewayArgs = {
  data: CreatePrivateGatewayDataInput;
  where: CreatePrivateGatewayWhereInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectDataInput;
};


export type MutationCreateSalesContactRequestArgs = {
  data: CreateSalesContactRequestDataInput;
};


export type MutationCreateSecretArgs = {
  data: CreateSecretDataInput;
};


export type MutationCreateSiteArgs = {
  data: CreateSiteDataInput;
};


export type MutationCreateTemplateArgs = {
  data: CreateTemplateDataInput;
};


export type MutationCreateZoneForSiteArgs = {
  where: CreateZoneForSiteWhereInput;
};


export type MutationDeclineInvitationArgs = {
  where: DeclineInvitationWhereInput;
};


export type MutationDeleteApplicationArgs = {
  where: DeleteApplicationWhereInput;
};


export type MutationDeleteDomainArgs = {
  where: DeleteDomainWhereInput;
};


export type MutationDeleteEnsRecordArgs = {
  where: DeleteEnsRecordWhereInput;
};


export type MutationDeleteFleekFunctionArgs = {
  where: DeleteFleekFunctionWhereInput;
};


export type MutationDeleteFolderArgs = {
  where: DeleteFolderWhereInput;
};


export type MutationDeleteInvitationArgs = {
  where: DeleteInvitationWhereInput;
};


export type MutationDeleteIpnsRecordArgs = {
  where: DeleteIpnsRecordWhereInput;
};


export type MutationDeleteMembershipArgs = {
  where: DeleteMembershipWhereInput;
};


export type MutationDeletePersonalAccessTokenArgs = {
  where: DeletePersonalAccessTokenWhereInput;
};


export type MutationDeletePinArgs = {
  where: DeletePinWhereInput;
};


export type MutationDeletePrivateGatewayArgs = {
  where: DeletePrivateGatewayWhereInput;
};


export type MutationDeleteProjectArgs = {
  where: DeleteProjectWhereInput;
};


export type MutationDeleteRecoveryCodesArgs = {
  where: DeleteRecoveryCodesWhereInput;
};


export type MutationDeleteSecretArgs = {
  where: DeleteSecretWhereInput;
};


export type MutationDeleteSecretKeyArgs = {
  where: DeleteSecretKeyWhereInput;
};


export type MutationDeleteSiteArgs = {
  where: DeleteSiteWhereInput;
};


export type MutationDeleteTemplateArgs = {
  where: DeleteTemplateWhereInput;
};


export type MutationDeleteUserArgs = {
  where: DeleteUserWhereInput;
};


export type MutationDeleteZoneArgs = {
  where: DeleteZoneWhereInput;
};


export type MutationDisableTwoFactorProtectedActionArgs = {
  where: DisableTwoFactorProtectedActionWhereInput;
};


export type MutationEnableTwoFactorProtectedActionArgs = {
  where: EnableTwoFactorProtectedActionWhereInput;
};


export type MutationGenerateRecoveryCodesArgs = {
  where: GenerateRecoveryCodesWhereInput;
};


export type MutationLeaveProjectArgs = {
  where: LeaveProjectWhereInput;
};


export type MutationLinkPublicKeyArgs = {
  data: LinkPublicKeyDataInput;
};


export type MutationLoginWithAdminAccessTokenArgs = {
  data: LoginWithAdminAccessTokenDataInput;
};


export type MutationLoginWithDynamicArgs = {
  data: LoginWithDynamicDataInput;
};


export type MutationLoginWithPersonalAccessTokenArgs = {
  data: LoginWithPersonalAccessTokenDataInput;
};


export type MutationMarkNotificationsAsReadArgs = {
  where: MarkNotificationsAsReadWhereInput;
};


export type MutationPromoteDeploymentArgs = {
  where: PromoteDeploymentWhereInput;
};


export type MutationPublishIpnsRecordArgs = {
  data: PublishIpnsRecordDataInput;
  where: PublishIpnsRecordWhereInput;
};


export type MutationPublishSignedIpnsNameArgs = {
  data: PublishSignedIpnsNameDataInput;
};


export type MutationPurgeSiteCacheArgs = {
  where: PurgeSiteCacheWhereInput;
};


export type MutationRetryDeploymentArgs = {
  where: RetryDeploymentWhereInput;
};


export type MutationRetryMigrationRequestArgs = {
  data: RetryMigrationRequestDataInput;
  where: RetryMigrationRequestWhereInput;
};


export type MutationSelectPrimaryDomainArgs = {
  where: SelectPrimaryDomainWhereInput;
};


export type MutationSiteDeploymentRequirementsArgs = {
  where: SiteDeploymentRequirementsWhereInput;
};


export type MutationStopDeploymentArgs = {
  where: StopDeploymentWhereInput;
};


export type MutationTriggerDeploymentArgs = {
  where: TriggerDeploymentWhereInput;
};


export type MutationTriggerFleekFunctionDeploymentArgs = {
  data?: InputMaybe<TriggerFleekFunctionDeploymentDataInput>;
  where: TriggerFleekFunctionDeploymentWhereInput;
};


export type MutationUpdateApplicationArgs = {
  data: UpdateApplicationDataInput;
  where: UpdateApplicationWhereInput;
};


export type MutationUpdateBillingPlanArgs = {
  data: UpdateBillingPlanDataInput;
  where: UpdateBillingPlanWhereInput;
};


export type MutationUpdateFleekFunctionArgs = {
  data: UpdateFleekFunctionDataInput;
  where: UpdateFleekFunctionWhereInput;
};


export type MutationUpdateFolderArgs = {
  data: UpdateFolderDataInput;
  where: UpdateFolderWhereInput;
};


export type MutationUpdateMembershipArgs = {
  data: UpdateMembershipDataInput;
  where: UpdateMembershipWhereInput;
};


export type MutationUpdateNotificationSettingsArgs = {
  data: UpdateNotificationSettingsDataInput;
};


export type MutationUpdatePinArgs = {
  data: UpdatePinDataInput;
  where: UpdatePinWhereInput;
};


export type MutationUpdatePrivateGatewayArgs = {
  data: UpdatePrivateGatewayDataInput;
  where: UpdatePrivateGatewayWhereInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectDataInput;
  where: UpdateProjectWhereInput;
};


export type MutationUpdateSecretArgs = {
  data: UpdateSecretDataInput;
  where: UpdateSecretWhereInput;
};


export type MutationUpdateSiteArgs = {
  data: UpdateSiteDataInput;
  where: UpdateSiteWhereInput;
};


export type MutationUpdateTemplateArgs = {
  data: UpdateTemplateDataInput;
  where: UpdateTemplateWhereInput;
};


export type MutationUpdateTwoFactorSecretKeyArgs = {
  data: UpdateTwoFactorSecretKeyDataInput;
  where: UpdateTwoFactorSecretKeyWhereInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserDataInput;
};


export type MutationVerifyDnslinkArgs = {
  where: VerifyDnslinkWhereInput;
};


export type MutationVerifyDomainArgs = {
  data?: InputMaybe<VerifyDomainDataInput>;
  where: VerifyDomainWhereInput;
};


export type MutationVerifyEnsRecordArgs = {
  where: VerifyEnsRecordWhereInput;
};


export type MutationVerifyTwoFactorSecretKeyArgs = {
  data: VerifyTwoFactorSecretKeyDataInput;
  where: VerifyTwoFactorSecretKeyWhereInput;
};

export type Notification = {
  __typename?: 'Notification';
  content: Scalars['String'];
  createdAt: Scalars['Date'];
  data: Scalars['JSON'];
  id: Scalars['ID'];
  isRead: Scalars['Boolean'];
  title: Scalars['String'];
  type: NotificationType;
  updatedAt: Scalars['Date'];
};

export enum NotificationChannel {
  EMAIL = 'EMAIL',
  IN_APP = 'IN_APP'
}

export type NotificationSettings = {
  __typename?: 'NotificationSettings';
  isEnabled: Scalars['Boolean'];
  notificationChannel: NotificationChannel;
  notificationType: NotificationType;
};

export enum NotificationType {
  CO_MIGRATION_COMPLETED = 'CO_MIGRATION_COMPLETED',
  CO_MIGRATION_FAILED = 'CO_MIGRATION_FAILED',
  DEPLOYMENT_COMPLETED = 'DEPLOYMENT_COMPLETED',
  DEPLOYMENT_FAILED = 'DEPLOYMENT_FAILED',
  DOMAIN_CREATED = 'DOMAIN_CREATED',
  DOMAIN_DELETED = 'DOMAIN_DELETED',
  DOMAIN_MISCONFIGURED = 'DOMAIN_MISCONFIGURED',
  MEMBER_INVITE = 'MEMBER_INVITE'
}

export type NotificationsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type NotificationsWithAggregation = {
  __typename?: 'NotificationsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Notification>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type PaginationInput = {
  page?: InputMaybe<Scalars['Int']>;
  take: Scalars['Int'];
};

export type PermissionGroup = {
  __typename?: 'PermissionGroup';
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
  systemRole?: Maybe<Role>;
  updatedAt: Scalars['Date'];
};

export type PermissionGroupsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PermissionGroupsWithAggregation = {
  __typename?: 'PermissionGroupsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<PermissionGroup>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type PersonalAccessToken = {
  __typename?: 'PersonalAccessToken';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  maskedToken: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
};

export type PersonalAccessTokensPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<PersonalAccessTokensSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PersonalAccessTokensWithAggregation = {
  __typename?: 'PersonalAccessTokensWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<PersonalAccessToken>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Pin = {
  __typename?: 'Pin';
  arweavePin?: Maybe<ArweavePin>;
  cid: Scalars['ID'];
  createdAt: Scalars['Date'];
  deployments: Array<Deployment>;
  deploymentsPaginated: DeploymentsWithNestedAggregation;
  extension: Scalars['String'];
  filecoinPin?: Maybe<FilecoinPin>;
  filename: Scalars['String'];
  id: Scalars['ID'];
  pathInFolder?: Maybe<Scalars['String']>;
  projectId: Scalars['String'];
  size: Scalars['Int'];
  sizeBigInt: Scalars['BigInt'];
  storedOnArweave: Scalars['Boolean'];
  storedOnFilecoin: Scalars['Boolean'];
  storedOnS3: Scalars['Boolean'];
};


export type PinDeploymentsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type PinNameAvailabilityInParentFolderDataInput = {
  extension?: InputMaybe<Scalars['String']>;
  filename: Scalars['String'];
};

export type PinNameAvailabilityInParentFolderWhereInput = {
  parentFolderId: Scalars['ID'];
};

export type PinWhereInput = {
  cid: Scalars['CID'];
};

export type PinsByFilenamePaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<PinsByFilenameSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PinsByFilenameWhereInput = {
  extension: Scalars['String'];
  filename: Scalars['String'];
};

export type PinsByFilenameWithAggregation = {
  __typename?: 'PinsByFilenameWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Pin>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type PinsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<PinsSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PinsWhereInput = {
  storedOnArweave?: InputMaybe<Scalars['Boolean']>;
  storedOnFilecoin?: InputMaybe<Scalars['Boolean']>;
};

export type PinsWithAggregation = {
  __typename?: 'PinsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Pin>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type PrivateGateway = {
  __typename?: 'PrivateGateway';
  createdAt: Scalars['Date'];
  domains: Array<Domain>;
  domainsPaginated?: Maybe<DomainsWithNestedAggregation>;
  id: Scalars['ID'];
  name: Scalars['String'];
  primaryDomain?: Maybe<Domain>;
  project: Project;
  slug: Scalars['String'];
  updatedAt: Scalars['Date'];
  zone?: Maybe<Zone>;
};


export type PrivateGatewayDomainsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type PrivateGatewayBySlugWhereInput = {
  slug: Scalars['String'];
};

export type PrivateGatewayNameAvailabilityWhereInput = {
  /** This GQL endpoint checks if PGW name available or not in the current project */
  name: Scalars['String'];
};

export type PrivateGatewayWhereInput = {
  id: Scalars['ID'];
};

export type PrivateGatewaysPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type PrivateGatewaysWithAggregation = {
  __typename?: 'PrivateGatewaysWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<PrivateGateway>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  allowAccessFromOfacCountries?: Maybe<Scalars['Boolean']>;
  avatar?: Maybe<Scalars['File']>;
  backupStorageOnArweave?: Maybe<Scalars['Boolean']>;
  backupStorageOnFilecoin?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  currentUserMembership: Membership;
  id: Scalars['ID'];
  memberships: Array<Membership>;
  membershipsPaginated: MembershipsWithNestedAggregation;
  name: Scalars['String'];
  updatedAt: Scalars['Date'];
};


export type ProjectMembershipsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type ProjectQuota = {
  __typename?: 'ProjectQuota';
  filesUploadedPerDay: ResourceQuota;
  maxFleekFunctions: ResourceQuota;
  maxSites: ResourceQuota;
  totalSizeUploadedPerDay: ResourceQuota;
};

export type ProjectWhereInput = {
  id: Scalars['ID'];
};

export type ProjectsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<ProjectsSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ProjectsWithAggregation = {
  __typename?: 'ProjectsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Project>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type PromoteDeploymentWhereInput = {
  deploymentId: Scalars['ID'];
};

export type PublicKey = {
  __typename?: 'PublicKey';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  publicKey: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Date'];
  user: User;
};

export type PublicKeysWithNestedAggregation = {
  __typename?: 'PublicKeysWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<PublicKey>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type PublishIpnsRecordDataInput = {
  /** The IPFS SHA-256 hash represented in base32. */
  hash: Scalars['String'];
};

export type PublishIpnsRecordWhereInput = {
  /** The managed record ID to publish. */
  id: Scalars['ID'];
};

export type PublishSignedIpnsNameDataInput = {
  /** The signed IPNS record represented as base64 string. */
  input: Scalars['String'];
  /** A string representation of a public key, which is the "name" that can be resolved to a record. */
  key: Scalars['String'];
};

export type PurgeSiteCacheWhereInput = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** Get application client for the given ID. */
  application: Application;
  applicationNameAvailability: Scalars['Boolean'];
  /** Get application clients for the current project. */
  applications: ApplicationsWithAggregation;
  billingCycleUsages: BillingCycleUsagesWithAggregation;
  billingPlan: BillingPlan;
  billingPlans: BillingPlansWithAggregation;
  deployment: Deployment;
  deployments: DeploymentsWithAggregation;
  deploymentsQueueLimit: Scalars['Boolean'];
  domain: Domain;
  domainAvailability: Scalars['Boolean'];
  domainByHostname: Domain;
  domains: DomainsWithAggregation;
  domainsByZoneId: DomainsByZoneIdWithAggregation;
  emailAvailability: Scalars['Boolean'];
  /** This GQL endpoint checks if ENS name available or not globally. If available, it returns true. If not available, it returns false. */
  ensNameAvailability: Scalars['Boolean'];
  ensRecord: EnsRecord;
  ensRecordByName: EnsRecord;
  ensRecords: EnsRecordsWithAggregation;
  ensRecordsByIpnsId: EnsRecordsByIpnsIdWithAggregation;
  filecoinDeals: FilecoinDealsWithAggregation;
  fleekFunctionByName: FleekFunction;
  fleekFunctionDeployment: FleekFunctionDeployment;
  fleekFunctionDeployments: FleekFunctionDeploymentsWithAggregation;
  fleekFunctions: FleekFunctionsWithAggregation;
  folder: Folder;
  folderNameAvailabilityInParentFolder: Scalars['Boolean'];
  /** Get Git branches from the api for the repo of a given site */
  gitApiBranches: Array<GitApiBranch>;
  /** Get Git Installation From Github Rest Api including organizations */
  gitApiInstallations: Array<GitApiInsatallation>;
  /** Check if repo name is availble for creating a new repo */
  gitApiIsRepoNameAvailable: Scalars['Boolean'];
  /** Get Git tree from the api for the repo of a given site */
  gitApiTree: Array<GitApiTree>;
  gitIntegration: GitIntegration;
  gitProvider: GitProvider;
  gitProviders: Array<GitProvider>;
  githubAppInstallations: Array<GithubAppInstallation>;
  invitation: InvitationDetail;
  /** List project all invitations. */
  invitations: InvitationsWithAggregation;
  /** Get IPNS record for the current project. */
  ipnsRecord: IpnsRecord;
  ipnsRecords: IpnsRecordsWithAggregation;
  listDeploymentBranches: Array<Scalars['String']>;
  listFolder: ListFolderWithAggregation;
  migrationRequest: MigrationRequest;
  migrationRequests: MigrationRequestsWithAggregation;
  migrationRequestsByToken: Array<MigrationRequest>;
  migrationScheduledRequest?: Maybe<MigrationScheduledRequest>;
  migrationStatusByTeamId?: Maybe<MigrationStatus>;
  migrationTeamInfosFromToken: Array<MigrationTeamInfo>;
  notificationSettings: Array<NotificationSettings>;
  notifications: NotificationsWithAggregation;
  permissionGroups: PermissionGroupsWithAggregation;
  personalAccessTokens: PersonalAccessTokensWithAggregation;
  pin: Pin;
  pinNameAvailabilityInParentFolder: Scalars['Boolean'];
  pins: PinsWithAggregation;
  pinsByFilename: PinsByFilenameWithAggregation;
  privateGateway: PrivateGateway;
  privateGatewayBySlug: PrivateGateway;
  privateGatewayNameAvailability: Scalars['Boolean'];
  privateGateways: PrivateGatewaysWithAggregation;
  project: Project;
  projectQuota: ProjectQuota;
  projects: ProjectsWithAggregation;
  /** Resolves IPNS name to the IPFS hash. */
  resolveIpnsName: Scalars['String'];
  /** This GQL endpoint checks if the environment variable is available or not in the current site */
  secretAvailability: Scalars['Boolean'];
  site: Site;
  /** Get site build settings */
  siteBuildSettings: SiteBuildSettings;
  siteBySlug: Site;
  siteFramework: SiteFramework;
  siteFrameworks: Array<SiteFramework>;
  siteNameAvailability: Scalars['Boolean'];
  siteQuota: SiteQuota;
  sites: SitesWithAggregation;
  slugAvailability: Scalars['Boolean'];
  template: Template;
  templateCategories: TemplateCategoriesWithAggregation;
  templateCategory: TemplateCategory;
  templateNameAvailability: Scalars['Boolean'];
  templates: TemplatesWithAggregation;
  twoFactorProtectedActions: TwoFactorProtectedActionsWithAggregation;
  user: User;
  userQuota: UserQuota;
  usernameAvailability: Scalars['Boolean'];
  /** Get hash of currently deployed Git commit */
  version: Version;
  zone: Zone;
  zones: ZonesWithAggregation;
};


export type QueryApplicationArgs = {
  where: ApplicationWhereInput;
};


export type QueryApplicationNameAvailabilityArgs = {
  where: ApplicationNameAvailabilityWhereInput;
};


export type QueryApplicationsArgs = {
  filter?: InputMaybe<ApplicationsPaginationInput>;
};


export type QueryBillingCycleUsagesArgs = {
  filter?: InputMaybe<BillingCycleUsagesPaginationInput>;
};


export type QueryBillingPlanArgs = {
  where: BillingPlanWhereInput;
};


export type QueryBillingPlansArgs = {
  filter?: InputMaybe<BillingPlansPaginationInput>;
};


export type QueryDeploymentArgs = {
  where: DeploymentWhereInput;
};


export type QueryDeploymentsArgs = {
  filter?: InputMaybe<DeploymentsPaginationInput>;
  where: DeploymentsWhereInput;
};


export type QueryDeploymentsQueueLimitArgs = {
  where: DeploymentsQueueLimitWhereInput;
};


export type QueryDomainArgs = {
  where: DomainWhereInput;
};


export type QueryDomainAvailabilityArgs = {
  where: DomainAvailabilityWhereInput;
};


export type QueryDomainByHostnameArgs = {
  where: DomainByHostnameWhereInput;
};


export type QueryDomainsArgs = {
  filter?: InputMaybe<DomainsPaginationInput>;
};


export type QueryDomainsByZoneIdArgs = {
  filter?: InputMaybe<DomainsByZoneIdPaginationInput>;
  where: DomainsByZoneIdWhereInput;
};


export type QueryEmailAvailabilityArgs = {
  where: EmailAvailabilityWhereInput;
};


export type QueryEnsNameAvailabilityArgs = {
  where: EnsNameAvailabilityWhereInput;
};


export type QueryEnsRecordArgs = {
  where: EnsRecordWhereInput;
};


export type QueryEnsRecordByNameArgs = {
  where: EnsRecordByNameWhereInput;
};


export type QueryEnsRecordsArgs = {
  filter?: InputMaybe<EnsRecordsPaginationInput>;
};


export type QueryEnsRecordsByIpnsIdArgs = {
  filter?: InputMaybe<EnsRecordsByIpnsIdPaginationInput>;
  where: EnsRecordsByIpnsIdWhereInput;
};


export type QueryFilecoinDealsArgs = {
  filter?: InputMaybe<FilecoinDealsPaginationInput>;
  where: FilecoinDealsWhereInput;
};


export type QueryFleekFunctionByNameArgs = {
  where: FleekFunctionByNameWhereInput;
};


export type QueryFleekFunctionDeploymentArgs = {
  where: FleekFunctionDeploymentWhereInput;
};


export type QueryFleekFunctionDeploymentsArgs = {
  filter?: InputMaybe<FleekFunctionDeploymentsPaginationInput>;
  where: FleekFunctionDeploymentsWhereInput;
};


export type QueryFleekFunctionsArgs = {
  filter?: InputMaybe<FleekFunctionsPaginationInput>;
  where?: InputMaybe<FleekFunctionsWhereInput>;
};


export type QueryFolderArgs = {
  where: FolderWhereInput;
};


export type QueryFolderNameAvailabilityInParentFolderArgs = {
  data: FolderNameAvailabilityInParentFolderDataInput;
  where: FolderNameAvailabilityInParentFolderWhereInput;
};


export type QueryGitApiBranchesArgs = {
  where: GitApiBranchesWhereInput;
};


export type QueryGitApiInstallationsArgs = {
  where: GitApiInstallationsWhereInput;
};


export type QueryGitApiIsRepoNameAvailableArgs = {
  where: GitApiIsRepoNameAvailableWhereInput;
};


export type QueryGitApiTreeArgs = {
  where: GitApiTreeWhereInput;
};


export type QueryGitIntegrationArgs = {
  where: GitIntegrationWhereInput;
};


export type QueryGitProviderArgs = {
  where: GitProviderWhereInput;
};


export type QueryGithubAppInstallationsArgs = {
  where: GithubAppInstallationsWhereInput;
};


export type QueryInvitationArgs = {
  where: InvitationWhereInput;
};


export type QueryInvitationsArgs = {
  filter?: InputMaybe<InvitationsPaginationInput>;
};


export type QueryIpnsRecordArgs = {
  where: IpnsRecordWhereInput;
};


export type QueryIpnsRecordsArgs = {
  filter?: InputMaybe<IpnsRecordsPaginationInput>;
};


export type QueryListDeploymentBranchesArgs = {
  where: ListDeploymentBranchesWhereInput;
};


export type QueryListFolderArgs = {
  filter?: InputMaybe<ListFolderPaginationInput>;
  where: ListFolderWhereInput;
};


export type QueryMigrationRequestArgs = {
  where: MigrationRequestWhereInput;
};


export type QueryMigrationRequestsArgs = {
  filter?: InputMaybe<MigrationRequestsPaginationInput>;
};


export type QueryMigrationRequestsByTokenArgs = {
  where: MigrationRequestsByTokenWhereInput;
};


export type QueryMigrationScheduledRequestArgs = {
  where: MigrationScheduledRequestWhereInput;
};


export type QueryMigrationStatusByTeamIdArgs = {
  where: MigrationStatusByTeamIdWhereInput;
};


export type QueryMigrationTeamInfosFromTokenArgs = {
  where: MigrationTeamInfosFromTokenWhereInput;
};


export type QueryNotificationsArgs = {
  filter?: InputMaybe<NotificationsPaginationInput>;
};


export type QueryPermissionGroupsArgs = {
  filter?: InputMaybe<PermissionGroupsPaginationInput>;
};


export type QueryPersonalAccessTokensArgs = {
  filter?: InputMaybe<PersonalAccessTokensPaginationInput>;
};


export type QueryPinArgs = {
  where: PinWhereInput;
};


export type QueryPinNameAvailabilityInParentFolderArgs = {
  data: PinNameAvailabilityInParentFolderDataInput;
  where: PinNameAvailabilityInParentFolderWhereInput;
};


export type QueryPinsArgs = {
  filter?: InputMaybe<PinsPaginationInput>;
  where?: InputMaybe<PinsWhereInput>;
};


export type QueryPinsByFilenameArgs = {
  filter?: InputMaybe<PinsByFilenamePaginationInput>;
  where: PinsByFilenameWhereInput;
};


export type QueryPrivateGatewayArgs = {
  where: PrivateGatewayWhereInput;
};


export type QueryPrivateGatewayBySlugArgs = {
  where: PrivateGatewayBySlugWhereInput;
};


export type QueryPrivateGatewayNameAvailabilityArgs = {
  where: PrivateGatewayNameAvailabilityWhereInput;
};


export type QueryPrivateGatewaysArgs = {
  filter?: InputMaybe<PrivateGatewaysPaginationInput>;
};


export type QueryProjectArgs = {
  where: ProjectWhereInput;
};


export type QueryProjectsArgs = {
  filter?: InputMaybe<ProjectsPaginationInput>;
};


export type QueryResolveIpnsNameArgs = {
  where: ResolveIpnsNameWhereInput;
};


export type QuerySecretAvailabilityArgs = {
  where: SecretAvailabilityWhereInput;
};


export type QuerySiteArgs = {
  where: SiteWhereInput;
};


export type QuerySiteBuildSettingsArgs = {
  where: SiteBuildSettingsWhereInput;
};


export type QuerySiteBySlugArgs = {
  where: SiteBySlugWhereInput;
};


export type QuerySiteFrameworkArgs = {
  where: SiteFrameworkWhereInput;
};


export type QuerySiteNameAvailabilityArgs = {
  where: SiteNameAvailabilityWhereInput;
};


export type QuerySiteQuotaArgs = {
  where: SiteQuotaWhereInput;
};


export type QuerySitesArgs = {
  filter?: InputMaybe<SitesPaginationInput>;
  where: SitesWhereInput;
};


export type QuerySlugAvailabilityArgs = {
  where: SlugAvailabilityWhereInput;
};


export type QueryTemplateArgs = {
  where: TemplateWhereInput;
};


export type QueryTemplateCategoriesArgs = {
  filter?: InputMaybe<TemplateCategoriesPaginationInput>;
};


export type QueryTemplateCategoryArgs = {
  where: TemplateCategoryWhereInput;
};


export type QueryTemplateNameAvailabilityArgs = {
  where: TemplateNameAvailabilityWhereInput;
};


export type QueryTemplatesArgs = {
  filter?: InputMaybe<TemplatesPaginationInput>;
  where: TemplatesWhereInput;
};


export type QueryTwoFactorProtectedActionsArgs = {
  filter?: InputMaybe<TwoFactorProtectedActionsPaginationInput>;
};


export type QueryUsernameAvailabilityArgs = {
  where: UsernameAvailabilityWhereInput;
};


export type QueryZoneArgs = {
  where: ZoneWhereInput;
};


export type QueryZonesArgs = {
  filter?: InputMaybe<ZonesPaginationInput>;
};

export type RecoveryCode = {
  __typename?: 'RecoveryCode';
  code: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  isUsed: Scalars['Boolean'];
  updatedAt: Scalars['Date'];
};

export type RecoveryCodes = {
  __typename?: 'RecoveryCodes';
  recoveryCodes: Array<Scalars['String']>;
};

export type ResolveIpnsNameWhereInput = {
  /** The IPNS name to resolve. */
  name: Scalars['String'];
};

export type ResourceQuota = {
  __typename?: 'ResourceQuota';
  remaining: Scalars['Int'];
  total: Scalars['Int'];
};

export type RetryDeploymentWhereInput = {
  deploymentId: Scalars['ID'];
};

export type RetryMigrationRequestDataInput = {
  skipFailedEntities: Scalars['Boolean'];
};

export type RetryMigrationRequestWhereInput = {
  id: Scalars['ID'];
};

export enum Role {
  MEMBER = 'MEMBER',
  OWNER = 'OWNER'
}

export type SalesContactRequest = {
  __typename?: 'SalesContactRequest';
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['Date'];
};

export type Secret = {
  __typename?: 'Secret';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  key: Scalars['String'];
  updatedAt: Scalars['Date'];
  value: Scalars['String'];
  visibility: SecretVisibility;
};

export type SecretAvailabilityWhereInput = {
  /** Environment variable key name to check availability for */
  key: Scalars['String'];
  /** Site ID */
  siteId: Scalars['ID'];
};

export type SecretGroup = {
  __typename?: 'SecretGroup';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  secrets: Array<Secret>;
  secretsPaginated: SecretsWithNestedAggregation;
  updatedAt: Scalars['Date'];
};


export type SecretGroupSecretsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type SecretKey = {
  __typename?: 'SecretKey';
  algorithm: SecretKeyAlgorithm;
  createdAt: Scalars['Date'];
  digits: Scalars['Int'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  key: Scalars['String'];
  period: Scalars['Int'];
  recoveryCodes: Array<RecoveryCode>;
  type: SecretKeyType;
  updatedAt: Scalars['Date'];
  verifiedAt?: Maybe<Scalars['Date']>;
};

export enum SecretKeyAlgorithm {
  SHA1 = 'SHA1',
  SHA256 = 'SHA256',
  SHA512 = 'SHA512'
}

export enum SecretKeyType {
  TWO_FACTOR_AUTH = 'TWO_FACTOR_AUTH'
}

export enum SecretVisibility {
  ENCRYPTED = 'ENCRYPTED',
  PUBLIC = 'PUBLIC'
}

export type SecretsWithNestedAggregation = {
  __typename?: 'SecretsWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<Secret>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type SelectPrimaryDomainWhereInput = {
  id: Scalars['ID'];
};

export type Site = {
  __typename?: 'Site';
  avatar?: Maybe<Scalars['File']>;
  baseDirectory?: Maybe<Scalars['String']>;
  buildCommand?: Maybe<Scalars['String']>;
  buildDurationLimitSeconds?: Maybe<Scalars['Int']>;
  cpuLimit?: Maybe<Scalars['String']>;
  currentDeployment?: Maybe<Deployment>;
  deployments: Array<Deployment>;
  deploymentsPaginated: DeploymentsWithNestedAggregation;
  distDirectory?: Maybe<Scalars['String']>;
  dockerImage?: Maybe<Scalars['String']>;
  domains: Array<Domain>;
  domainsPaginated: DomainsWithNestedAggregation;
  enablePreviews: Scalars['Boolean'];
  framework?: Maybe<SiteFramework>;
  gitIntegration?: Maybe<GitIntegration>;
  githubInstallationId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  ipnsRecords: Array<IpnsRecord>;
  ipnsRecordsPaginated: IpnsRecordsWithNestedAggregation;
  lastDeployment?: Maybe<Deployment>;
  memoryLimit?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  primaryDomain?: Maybe<Domain>;
  secretGroup?: Maybe<SecretGroup>;
  slug: Scalars['String'];
  sourceBranch?: Maybe<Scalars['String']>;
  sourceProvider?: Maybe<SourceProvider>;
  sourceRepositoryId?: Maybe<Scalars['String']>;
  sourceRepositoryName?: Maybe<Scalars['String']>;
  sourceRepositoryOwner?: Maybe<Scalars['String']>;
  zones: Array<SiteZone>;
  zonesPaginated: SiteZonesWithNestedAggregation;
};


export type SiteDeploymentsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};


export type SiteDomainsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};


export type SiteIpnsRecordsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};


export type SiteZonesPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type SiteBuildSettings = {
  __typename?: 'SiteBuildSettings';
  buildCommand: Scalars['String'];
  dockerImage: Scalars['String'];
  envVars: Scalars['JSON'];
  frameworkId?: Maybe<Scalars['String']>;
  publishDirectory: Scalars['String'];
};

export type SiteBuildSettingsWhereInput = {
  baseDirectory: Scalars['String'];
  gitProviderId: Scalars['ID'];
  sourceBranch: Scalars['String'];
  sourceRepositoryName: Scalars['String'];
  sourceRepositoryOwner: Scalars['String'];
};

export type SiteBySlugWhereInput = {
  slug: Scalars['String'];
};

export type SiteDeploymentRequirements = {
  __typename?: 'SiteDeploymentRequirements';
  authorizationUrl?: Maybe<Scalars['String']>;
  installationUrl?: Maybe<Scalars['String']>;
  shouldAuthenticate: Scalars['Boolean'];
  shouldInstall: Scalars['Boolean'];
};

export type SiteDeploymentRequirementsWhereInput = {
  gitProviderId: Scalars['ID'];
};

export type SiteFramework = {
  __typename?: 'SiteFramework';
  avatar: Scalars['File'];
  buildScript: Scalars['String'];
  createdAt: Scalars['Date'];
  dockerImage: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  publishDirectory: Scalars['String'];
  recognitionArgument: Scalars['String'];
  recognitionStrategy: SiteFrameworkRecognitionStrategy;
  slug: Scalars['String'];
  templatesCount: Scalars['Int'];
  updatedAt: Scalars['Date'];
};

export enum SiteFrameworkRecognitionStrategy {
  FILES = 'FILES',
  NEXTJS = 'NEXTJS',
  NODEJS = 'NODEJS'
}

export type SiteFrameworkWhereInput = {
  id: Scalars['ID'];
};

export type SiteNameAvailabilityWhereInput = {
  /** This GQL endpoint checks if site name available or not in the current project */
  name: Scalars['String'];
};

export type SiteQuota = {
  __typename?: 'SiteQuota';
  maxDeploymentQueue: ResourceQuota;
};

export type SiteQuotaWhereInput = {
  id: Scalars['ID'];
};

export type SiteWhereInput = {
  id: Scalars['ID'];
};

export type SiteZone = {
  __typename?: 'SiteZone';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  status: ZoneStatus;
  updatedAt: Scalars['Date'];
};

export type SiteZonesWithNestedAggregation = {
  __typename?: 'SiteZonesWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<SiteZone>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type SitesPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<SitesSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type SitesWhereInput = {
  hasSourceProvider?: InputMaybe<Scalars['Boolean']>;
  isDeployed?: InputMaybe<Scalars['Boolean']>;
  isTemplate?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SitesWithAggregation = {
  __typename?: 'SitesWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Site>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type SlugAvailabilityWhereInput = {
  slug: Scalars['String'];
};

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

export enum SourceProvider {
  BITBUCKET = 'BITBUCKET',
  GITHUB = 'GITHUB',
  GITLAB = 'GITLAB'
}

export type StopDeploymentWhereInput = {
  deploymentId: Scalars['ID'];
};

export enum StorageType {
  IPFS = 'IPFS'
}

export enum SubscriptionType {
  CRYPTO = 'CRYPTO',
  FIAT = 'FIAT'
}

export type Template = {
  __typename?: 'Template';
  banner: Scalars['File'];
  category: TemplateCategory;
  createdAt: Scalars['Date'];
  creator?: Maybe<User>;
  deployment: Deployment;
  description: Scalars['String'];
  framework?: Maybe<SiteFramework>;
  id: Scalars['ID'];
  name: Scalars['String'];
  reviewComment?: Maybe<Scalars['String']>;
  reviewStatus: TemplateReviewStatus;
  reviewedAt?: Maybe<Scalars['Date']>;
  /** @deprecated It will be deleted because of security reasons before next release. */
  site: Site;
  siteAvatar?: Maybe<Scalars['File']>;
  siteId: Scalars['String'];
  siteSlug: Scalars['String'];
  updatedAt: Scalars['Date'];
  usageCount: Scalars['Int'];
};

export type TemplateCategoriesPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<TemplateCategoriesSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type TemplateCategoriesWithAggregation = {
  __typename?: 'TemplateCategoriesWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<TemplateCategory>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type TemplateCategory = {
  __typename?: 'TemplateCategory';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  templates: Array<Template>;
  templatesCount: Scalars['Int'];
  templatesPaginated: TemplatesWithNestedAggregation;
};


export type TemplateCategoryTemplatesPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type TemplateCategoryWhereInput = {
  id: Scalars['ID'];
};

export type TemplateNameAvailabilityWhereInput = {
  name: Scalars['String'];
};

export enum TemplateReviewStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export type TemplateWhereInput = {
  id: Scalars['ID'];
};

export type TemplatesPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  sortField?: InputMaybe<TemplatesSortableFields>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']>;
};

export type TemplatesWhereInput = {
  categoryId?: InputMaybe<Scalars['ID']>;
  createdById?: InputMaybe<Scalars['ID']>;
  frameworkId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TemplatesWithAggregation = {
  __typename?: 'TemplatesWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Template>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type TemplatesWithNestedAggregation = {
  __typename?: 'TemplatesWithNestedAggregation';
  currentPage: Scalars['Int'];
  data: Array<Template>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type TriggerDeploymentWhereInput = {
  siteId: Scalars['ID'];
};

export type TriggerFleekFunctionDeploymentDataInput = {
  assetsCid?: InputMaybe<Scalars['String']>;
  blake3Hash?: InputMaybe<Scalars['String']>;
  sgx?: InputMaybe<Scalars['Boolean']>;
};

export type TriggerFleekFunctionDeploymentWhereInput = {
  cid: Scalars['String'];
  functionId: Scalars['ID'];
};

export type TwoFactorProtectedAction = {
  __typename?: 'TwoFactorProtectedAction';
  createdAt: Scalars['Date'];
  enabled: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: TwoFactorProtectedActionType;
  updatedAt: Scalars['Date'];
};

export enum TwoFactorProtectedActionType {
  DELETE_PROJECT = 'DELETE_PROJECT',
  DELETE_SITE = 'DELETE_SITE',
  DELETE_USER = 'DELETE_USER',
  INVITE_MEMBER = 'INVITE_MEMBER'
}

export type TwoFactorProtectedActionsPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type TwoFactorProtectedActionsWithAggregation = {
  __typename?: 'TwoFactorProtectedActionsWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<TwoFactorProtectedAction>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export type UpdateApplicationDataInput = {
  name?: InputMaybe<Scalars['String']>;
  whiteLabelDomains?: InputMaybe<Array<Scalars['String']>>;
  whitelistDomains?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateApplicationWhereInput = {
  id: Scalars['ID'];
};

export type UpdateBillingPlanDataInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type UpdateBillingPlanWhereInput = {
  id: Scalars['ID'];
};

export type UpdateFleekFunctionDataInput = {
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<FleekFunctionStatus>;
};

export type UpdateFleekFunctionWhereInput = {
  id: Scalars['String'];
};

export type UpdateFolderDataInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateFolderWhereInput = {
  id: Scalars['ID'];
};

export type UpdateMembershipDataInput = {
  permissionGroupId: Scalars['ID'];
};

export type UpdateMembershipWhereInput = {
  id?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type UpdateNotificationSettingsDataInput = {
  isEnabled: Scalars['Boolean'];
  notificationChannel: NotificationChannel;
  notificationType: NotificationType;
};

export type UpdatePinDataInput = {
  filename?: InputMaybe<Scalars['String']>;
  moveToRoot?: InputMaybe<Scalars['Boolean']>;
  parentFolderId?: InputMaybe<Scalars['ID']>;
};

export type UpdatePinWhereInput = {
  id: Scalars['ID'];
};

export type UpdatePrivateGatewayDataInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePrivateGatewayWhereInput = {
  id: Scalars['ID'];
};

export type UpdateProjectDataInput = {
  allowAccessFromOfacCountries?: InputMaybe<Scalars['Boolean']>;
  avatar?: InputMaybe<Scalars['File']>;
  backupStorageOnArweave?: InputMaybe<Scalars['Boolean']>;
  backupStorageOnFilecoin?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  planId?: InputMaybe<Scalars['ID']>;
};

export type UpdateProjectWhereInput = {
  id: Scalars['ID'];
};

export type UpdateSecretDataInput = {
  value: Scalars['String'];
  visibility: SecretVisibility;
};

export type UpdateSecretWhereInput = {
  id: Scalars['ID'];
};

export type UpdateSiteDataInput = {
  avatar?: InputMaybe<Scalars['File']>;
  baseDirectory?: InputMaybe<Scalars['String']>;
  buildCommand?: InputMaybe<Scalars['String']>;
  distDirectory?: InputMaybe<Scalars['String']>;
  dockerImage?: InputMaybe<Scalars['String']>;
  enablePreviews?: InputMaybe<Scalars['Boolean']>;
  frameworkId?: InputMaybe<Scalars['ID']>;
  githubInstallationId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  sourceBranch?: InputMaybe<Scalars['String']>;
  sourceProvider?: InputMaybe<SourceProvider>;
  sourceRepositoryId?: InputMaybe<Scalars['String']>;
  sourceRepositoryName?: InputMaybe<Scalars['String']>;
  sourceRepositoryOwner?: InputMaybe<Scalars['String']>;
};

export type UpdateSiteWhereInput = {
  id: Scalars['ID'];
};

export type UpdateTemplateDataInput = {
  banner?: InputMaybe<Scalars['File']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  templateCategoryId?: InputMaybe<Scalars['ID']>;
};

export type UpdateTemplateWhereInput = {
  id: Scalars['ID'];
};

export type UpdateTwoFactorSecretKeyDataInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  key?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateTwoFactorSecretKeyWhereInput = {
  id: Scalars['ID'];
};

export type UpdateUserDataInput = {
  avatar?: InputMaybe<Scalars['File']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  walletAddress?: InputMaybe<Scalars['String']>;
  walletChain?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['File']>;
  createdAt: Scalars['Date'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gitUserAccessTokens: Array<GitUserAccessToken>;
  /** GitHub access token with scope intersection for user and GitHub App */
  githubUserAccessToken?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  pendingInvitations?: Maybe<Array<InvitationDetail>>;
  pendingInvitationsPaginated: InvitationDetailsWithNestedAggregation;
  /** Active project based on Access Token */
  project?: Maybe<Project>;
  publicKeys: Array<PublicKey>;
  publicKeysPaginated: PublicKeysWithNestedAggregation;
  secretKeys: Array<SecretKey>;
  updatedAt: Scalars['Date'];
  username?: Maybe<Scalars['String']>;
  walletAddress?: Maybe<Scalars['String']>;
  walletChain?: Maybe<Scalars['String']>;
};


export type UserPendingInvitationsPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};


export type UserPublicKeysPaginatedArgs = {
  filter?: InputMaybe<PaginationInput>;
};

export type UserQuota = {
  __typename?: 'UserQuota';
  maxProjects: ResourceQuota;
};

export type UsernameAvailabilityWhereInput = {
  username: Scalars['String'];
};

export type VerifyDnslinkWhereInput = {
  domainId: Scalars['ID'];
};

export type VerifyDomainDataInput = {
  /** This field is for backward compatibility and is ignored by the server. */
  placeholder?: InputMaybe<Scalars['String']>;
};

export type VerifyDomainWhereInput = {
  id: Scalars['ID'];
};

export type VerifyEnsRecordWhereInput = {
  id: Scalars['ID'];
};

export type VerifyTwoFactorSecretKeyDataInput = {
  token: Scalars['String'];
};

export type VerifyTwoFactorSecretKeyWhereInput = {
  secretKeyId: Scalars['ID'];
};

export type Version = {
  __typename?: 'Version';
  commitHash: Scalars['String'];
};

export type Zone = {
  __typename?: 'Zone';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  originUrl?: Maybe<Scalars['String']>;
  originUrlChangedAt?: Maybe<Scalars['Date']>;
  originUrlChangedBy?: Maybe<User>;
  project?: Maybe<Project>;
  status: ZoneStatus;
  type: ZoneType;
  updatedAt: Scalars['Date'];
};

export enum ZoneStatus {
  CREATED = 'CREATED',
  CREATING = 'CREATING',
  CREATING_FAILED = 'CREATING_FAILED',
  DELETING = 'DELETING',
  DELETING_FAILED = 'DELETING_FAILED'
}

export enum ZoneType {
  PRIVATE_GATEWAY = 'PRIVATE_GATEWAY',
  SITE = 'SITE'
}

export type ZoneWhereInput = {
  id: Scalars['ID'];
};

export type ZonesPaginationInput = {
  match?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ZonesWithAggregation = {
  __typename?: 'ZonesWithAggregation';
  currentPage: Scalars['Int'];
  data: Array<Zone>;
  isFirstPage: Scalars['Boolean'];
  isLastPage: Scalars['Boolean'];
  nextPage?: Maybe<Scalars['Int']>;
  pageCount: Scalars['Int'];
  previousPage?: Maybe<Scalars['Int']>;
  totalCount: Scalars['Int'];
};

export enum DeploymentsSortableFields {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt'
}

export enum FilecoinDealsSortableFields {
  createdAt = 'createdAt'
}

export enum FleekFunctionsSortableFields {
  createdAt = 'createdAt',
  name = 'name',
  updatedAt = 'updatedAt'
}

export enum InvitationsSortableFields {
  createdAt = 'createdAt'
}

export enum ListFolderSortableFields {
  createdAt = 'createdAt',
  name = 'name',
  size = 'size',
  type = 'type'
}

export enum MigrationRequestsSortableFields {
  createdAt = 'createdAt'
}

export enum PersonalAccessTokensSortableFields {
  createdAt = 'createdAt'
}

export enum PinsByFilenameSortableFields {
  createdAt = 'createdAt',
  filename = 'filename'
}

export enum PinsSortableFields {
  createdAt = 'createdAt',
  filename = 'filename'
}

export enum ProjectsSortableFields {
  createdAt = 'createdAt',
  name = 'name'
}

export enum SitesSortableFields {
  createdAt = 'createdAt',
  name = 'name',
  updatedAt = 'updatedAt'
}

export enum TemplateCategoriesSortableFields {
  createdAt = 'createdAt',
  name = 'name'
}

export enum TemplatesSortableFields {
  createdAt = 'createdAt',
  name = 'name'
}

export type DeleteRecoveryCodesMutationVariables = Exact<{
  where: DeleteRecoveryCodesWhereInput;
}>;


export type DeleteRecoveryCodesMutation = { __typename?: 'Mutation', deleteRecoveryCodes: boolean };

export type DeleteSecretKeyMutationVariables = Exact<{
  where: DeleteSecretKeyWhereInput;
}>;


export type DeleteSecretKeyMutation = { __typename?: 'Mutation', deleteSecretKey: boolean };

export type DisableProtectedActionMutationVariables = Exact<{
  where: DisableTwoFactorProtectedActionWhereInput;
}>;


export type DisableProtectedActionMutation = { __typename?: 'Mutation', disableTwoFactorProtectedAction: boolean };

export type EnableProtectedActionMutationVariables = Exact<{
  where: EnableTwoFactorProtectedActionWhereInput;
}>;


export type EnableProtectedActionMutation = { __typename?: 'Mutation', enableTwoFactorProtectedAction: boolean };

export type GenerateRecoveryCodesMutationVariables = Exact<{
  where: GenerateRecoveryCodesWhereInput;
}>;


export type GenerateRecoveryCodesMutation = { __typename?: 'Mutation', generateRecoveryCodes: { __typename?: 'RecoveryCodes', recoveryCodes: Array<string> } };

export type GenerateTwoFactorSecretKeyMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateTwoFactorSecretKeyMutation = { __typename?: 'Mutation', generateTwoFactorSecretKey: { __typename?: 'SecretKey', id: string, algorithm: SecretKeyAlgorithm, key: string, digits: number, period: number, isActive: boolean, isVerified: boolean, verifiedAt?: any | null } };

export type UpdateSecretKeyMutationVariables = Exact<{
  where: UpdateTwoFactorSecretKeyWhereInput;
  data: UpdateTwoFactorSecretKeyDataInput;
}>;


export type UpdateSecretKeyMutation = { __typename?: 'Mutation', updateTwoFactorSecretKey: { __typename?: 'SecretKey', id: string, algorithm: SecretKeyAlgorithm, key: string, digits: number, period: number, isActive: boolean, isVerified: boolean, verifiedAt?: any | null } };

export type VerifySecretKeyMutationVariables = Exact<{
  where: VerifyTwoFactorSecretKeyWhereInput;
  data: VerifyTwoFactorSecretKeyDataInput;
}>;


export type VerifySecretKeyMutation = { __typename?: 'Mutation', verifyTwoFactorSecretKey: { __typename?: 'SecretKey', id: string, algorithm: SecretKeyAlgorithm, key: string, digits: number, period: number, isActive: boolean, isVerified: boolean, verifiedAt?: any | null } };

export type ProtectedActionsQueryVariables = Exact<{
  filter?: InputMaybe<TwoFactorProtectedActionsPaginationInput>;
}>;


export type ProtectedActionsQuery = { __typename?: 'Query', twoFactorProtectedActions: { __typename?: 'TwoFactorProtectedActionsWithAggregation', data: Array<{ __typename?: 'TwoFactorProtectedAction', id: string, type: TwoFactorProtectedActionType, name: string, enabled: boolean }> } };

export type GetSecretKeysQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSecretKeysQuery = { __typename?: 'Query', user: { __typename?: 'User', secretKeys: Array<{ __typename?: 'SecretKey', id: string, algorithm: SecretKeyAlgorithm, key: string, digits: number, period: number, isActive: boolean, isVerified: boolean, verifiedAt?: any | null }> } };

export type CreateApplicationMutationVariables = Exact<{
  data: CreateApplicationDataInput;
}>;


export type CreateApplicationMutation = { __typename?: 'Mutation', createApplication: { __typename?: 'Application', clientId: string, createdAt: any, id: string, name: string, updatedAt: any, whitelistDomains: Array<{ __typename?: 'ApplicationWhitelistDomain', hostname: string }>, whiteLabelDomains: Array<{ __typename?: 'ApplicationWhiteLabelDomain', hostname: string }> } };

export type DeleteApplicationMutationVariables = Exact<{
  where: DeleteApplicationWhereInput;
}>;


export type DeleteApplicationMutation = { __typename?: 'Mutation', deleteApplication: { __typename?: 'Application', id: string } };

export type UpdateApplicationMutationVariables = Exact<{
  data: UpdateApplicationDataInput;
  where: UpdateApplicationWhereInput;
}>;


export type UpdateApplicationMutation = { __typename?: 'Mutation', updateApplication: { __typename?: 'Application', id: string, name: string, whitelistDomains: Array<{ __typename?: 'ApplicationWhitelistDomain', hostname: string }>, whiteLabelDomains: Array<{ __typename?: 'ApplicationWhiteLabelDomain', hostname: string }> } };

export type ApplicationQueryVariables = Exact<{
  where: ApplicationWhereInput;
}>;


export type ApplicationQuery = { __typename?: 'Query', application: { __typename?: 'Application', clientId: string, createdAt: any, id: string, name: string, updatedAt: any, whitelistDomains: Array<{ __typename?: 'ApplicationWhitelistDomain', hostname: string }>, whiteLabelDomains: Array<{ __typename?: 'ApplicationWhiteLabelDomain', hostname: string }> } };

export type ApplicationNameAvailabilityQueryVariables = Exact<{
  where: ApplicationNameAvailabilityWhereInput;
}>;


export type ApplicationNameAvailabilityQuery = { __typename?: 'Query', applicationNameAvailability: boolean };

export type ApplicationsQueryVariables = Exact<{
  filter?: InputMaybe<ApplicationsPaginationInput>;
}>;


export type ApplicationsQuery = { __typename?: 'Query', applications: { __typename?: 'ApplicationsWithAggregation', data: Array<{ __typename?: 'Application', clientId: string, createdAt: any, id: string, name: string, updatedAt: any, whitelistDomains: Array<{ __typename?: 'ApplicationWhitelistDomain', hostname: string }>, whiteLabelDomains: Array<{ __typename?: 'ApplicationWhiteLabelDomain', hostname: string }> }> } };

export type CreateGithubAppAuthorizationUrlMutationVariables = Exact<{
  where: CreateGithubAppAuthorizationUrlWhereInput;
}>;


export type CreateGithubAppAuthorizationUrlMutation = { __typename?: 'Mutation', createGithubAppAuthorizationUrl: string };

export type CreateGithubAppInstallationUrlMutationVariables = Exact<{
  where: CreateGithubAppInstallationUrlWhereInput;
}>;


export type CreateGithubAppInstallationUrlMutation = { __typename?: 'Mutation', createGithubAppInstallationUrl: string };

export type CreateLoginVerificationSessionMutationVariables = Exact<{
  where: CreateLoginVerificationSessionWhereInput;
}>;


export type CreateLoginVerificationSessionMutation = { __typename?: 'Mutation', createLoginVerificationSession: boolean };

export type CreatePersonalAccessTokenFromVerificationSessionMutationVariables = Exact<{
  where: CreatePersonalAccessTokenFromVerificationSessionWhereInput;
  data: CreatePersonalAccessTokenFromVerificationSessionDataInput;
}>;


export type CreatePersonalAccessTokenFromVerificationSessionMutation = { __typename?: 'Mutation', createPersonalAccessTokenFromVerificationSession: string };

export type CreatePublicKeyChallengeMutationVariables = Exact<{ [key: string]: never; }>;


export type CreatePublicKeyChallengeMutation = { __typename?: 'Mutation', createPublicKeyChallenge: string };

export type DeletePersonalAccessTokenMutationVariables = Exact<{
  where: DeletePersonalAccessTokenWhereInput;
}>;


export type DeletePersonalAccessTokenMutation = { __typename?: 'Mutation', deletePersonalAccessToken: { __typename?: 'PersonalAccessToken', id: string } };

export type LinkPublicKeyMutationVariables = Exact<{
  data: LinkPublicKeyDataInput;
}>;


export type LinkPublicKeyMutation = { __typename?: 'Mutation', linkPublicKey: { __typename?: 'PublicKey', id: string } };

export type LoginWithDynamicMutationVariables = Exact<{
  data: LoginWithDynamicDataInput;
}>;


export type LoginWithDynamicMutation = { __typename?: 'Mutation', loginWithDynamic: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, avatar?: any | null, username?: string | null, firstName?: string | null, email?: string | null, githubUserAccessToken?: string | null, walletAddress?: string | null, project?: { __typename?: 'Project', id: string, name: string, currentUserMembership: { __typename?: 'Membership', permissionGroup: { __typename?: 'PermissionGroup', id: string, name: string, permissions: Array<string> } } } | null, secretKeys: Array<{ __typename?: 'SecretKey', id: string, algorithm: SecretKeyAlgorithm, key: string, digits: number, period: number, isActive: boolean, isVerified: boolean, verifiedAt?: any | null }>, pendingInvitations?: Array<{ __typename?: 'InvitationDetail', hash: string, projectAvatar?: any | null, projectId: string, projectName: string }> | null } };

export type PersonalAccessTokensQueryVariables = Exact<{
  filter?: InputMaybe<PersonalAccessTokensPaginationInput>;
}>;


export type PersonalAccessTokensQuery = { __typename?: 'Query', personalAccessTokens: { __typename?: 'PersonalAccessTokensWithAggregation', data: Array<{ __typename?: 'PersonalAccessToken', id: string, name?: string | null, maskedToken: string, createdAt: any, updatedAt: any }> } };

export type ProjectMembershipsQueryVariables = Exact<{
  where: ProjectWhereInput;
}>;


export type ProjectMembershipsQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, memberships: Array<{ __typename?: 'Membership', id: string, role?: Role | null, user: { __typename?: 'User', id: string } }> } };

export type ProjectsQueryVariables = Exact<{
  filter?: InputMaybe<ProjectsPaginationInput>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects: { __typename?: 'ProjectsWithAggregation', data: Array<{ __typename?: 'Project', id: string, name: string, backupStorageOnArweave?: boolean | null, backupStorageOnFilecoin?: boolean | null, avatar?: any | null, currentUserMembership: { __typename?: 'Membership', permissionGroup: { __typename?: 'PermissionGroup', id: string, name: string, permissions: Array<string> } } }> } };

export type RetryDeploymentMutationVariables = Exact<{
  where: RetryDeploymentWhereInput;
}>;


export type RetryDeploymentMutation = { __typename?: 'Mutation', retryDeployment: { __typename?: 'Deployment', cid?: string | null, id: string, siteId: string, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceBranch?: string | null, storageType: StorageType, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, createdAt: any, startedAt?: any | null, updatedAt: any, sourceRef?: string | null, status: DeploymentStatus, previewOnly: boolean, build?: { __typename?: 'Build', id: string, status: BuildStatus, logs?: Array<{ __typename?: 'BuildLog', id: string, createdAt: any, text: string }> | null } | null } };

export type StopDeploymentMutationVariables = Exact<{
  where: StopDeploymentWhereInput;
}>;


export type StopDeploymentMutation = { __typename?: 'Mutation', stopDeployment: boolean };

export type DeploymentQueryVariables = Exact<{
  where: DeploymentWhereInput;
}>;


export type DeploymentQuery = { __typename?: 'Query', deployment: { __typename?: 'Deployment', cid?: string | null, id: string, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceBranch?: string | null, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, previewOnly: boolean, createdAt: any, startedAt?: any | null, updatedAt: any, sourceRef?: string | null, previewUrlSlug?: string | null, status: DeploymentStatus, build?: { __typename?: 'Build', id: string, status: BuildStatus, logs?: Array<{ __typename?: 'BuildLog', id: string, createdAt: any, text: string }> | null } | null } };

export type DeploymentStatusQueryVariables = Exact<{
  where: DeploymentWhereInput;
}>;


export type DeploymentStatusQuery = { __typename?: 'Query', deployment: { __typename?: 'Deployment', id: string, status: DeploymentStatus, createdAt: any, updatedAt: any } };

export type DeploymentsQueryVariables = Exact<{
  where: DeploymentsWhereInput;
  filter?: InputMaybe<DeploymentsPaginationInput>;
}>;


export type DeploymentsQuery = { __typename?: 'Query', deployments: { __typename?: 'DeploymentsWithAggregation', pageCount: number, totalCount: number, data: Array<{ __typename?: 'Deployment', cid?: string | null, id: string, status: DeploymentStatus, createdAt: any, startedAt?: any | null, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, previewOnly: boolean, storageType: StorageType, sourceBranch?: string | null, updatedAt: any, sourceRef?: string | null, previewUrlSlug?: string | null }> } };

export type CreateDnsConfigMutationVariables = Exact<{
  data: CreateDnsConfigDataInput;
  where: CreateDnsConfigWhereInput;
}>;


export type CreateDnsConfigMutation = { __typename?: 'Mutation', createDnsConfig: { __typename: 'DnsConfig', id: string, type: DnsConfigType, name: string, value: string, createdAt: any, updatedAt: any } };

export type CreateDomainMutationVariables = Exact<{
  where: CreateDomainWhereInput;
  data: CreateDomainDataInput;
}>;


export type CreateDomainMutation = { __typename?: 'Mutation', createDomain: { __typename?: 'Domain', id: string, status: DomainStatus } };

export type DeleteDomainMutationVariables = Exact<{
  where: DeleteDomainWhereInput;
}>;


export type DeleteDomainMutation = { __typename?: 'Mutation', deleteDomain: { __typename?: 'Domain', id: string, status: DomainStatus, hostname: string, zone?: { __typename?: 'Zone', id: string } | null } };

export type SelectPrimaryDomainMutationVariables = Exact<{
  where: SelectPrimaryDomainWhereInput;
}>;


export type SelectPrimaryDomainMutation = { __typename?: 'Mutation', selectPrimaryDomain: { __typename: 'Domain', id: string, hostname: string } };

export type VerifyDnslinkMutationVariables = Exact<{
  where: VerifyDnslinkWhereInput;
}>;


export type VerifyDnslinkMutation = { __typename?: 'Mutation', verifyDnslink: { __typename?: 'Domain', id: string, hostname: string, createdAt: any, status: DomainStatus, isVerified: boolean, errorMessage?: string | null, dnslinkStatus?: DnslinkStatus | null, dnsConfigs: Array<{ __typename?: 'DnsConfig', id: string, type: DnsConfigType, name: string, value: string }> } };

export type VerifyDomainMutationVariables = Exact<{
  where: VerifyDomainWhereInput;
}>;


export type VerifyDomainMutation = { __typename?: 'Mutation', verifyDomain: { __typename?: 'Domain', id: string, hostname: string, createdAt: any, status: DomainStatus, isVerified: boolean, errorMessage?: string | null, dnslinkStatus?: DnslinkStatus | null, dnsConfigs: Array<{ __typename?: 'DnsConfig', id: string, type: DnsConfigType, name: string, value: string }> } };

export type DomainQueryVariables = Exact<{
  where: DomainWhereInput;
}>;


export type DomainQuery = { __typename?: 'Query', domain: { __typename?: 'Domain', id: string, hostname: string, createdAt: any, status: DomainStatus, isVerified: boolean, errorMessage?: string | null, dnslinkStatus?: DnslinkStatus | null, dnsConfigs: Array<{ __typename?: 'DnsConfig', id: string, type: DnsConfigType, name: string, value: string }> } };

export type DomainAvailabilityQueryVariables = Exact<{
  where: DomainAvailabilityWhereInput;
}>;


export type DomainAvailabilityQuery = { __typename?: 'Query', domainAvailability: boolean };

export type DomainByHostnameQueryVariables = Exact<{
  where: DomainByHostnameWhereInput;
}>;


export type DomainByHostnameQuery = { __typename?: 'Query', domainByHostname: { __typename?: 'Domain', id: string, hostname: string, errorMessage?: string | null, createdAt: any, status: DomainStatus } };

export type DomainDnsLinkStatusQueryVariables = Exact<{
  where: DomainWhereInput;
}>;


export type DomainDnsLinkStatusQuery = { __typename?: 'Query', domain: { __typename?: 'Domain', id: string, dnslinkStatus?: DnslinkStatus | null, errorMessage?: string | null, dnsConfigs: Array<{ __typename?: 'DnsConfig', id: string, type: DnsConfigType, name: string, value: string }> } };

export type DomainStatusQueryVariables = Exact<{
  where: DomainWhereInput;
}>;


export type DomainStatusQuery = { __typename?: 'Query', domain: { __typename?: 'Domain', id: string, status: DomainStatus, errorMessage?: string | null, dnsConfigs: Array<{ __typename?: 'DnsConfig', id: string, type: DnsConfigType, name: string, value: string }> } };

export type DomainsQueryVariables = Exact<{
  filter?: InputMaybe<DomainsPaginationInput>;
}>;


export type DomainsQuery = { __typename?: 'Query', domains: { __typename?: 'DomainsWithAggregation', data: Array<{ __typename?: 'Domain', id: string, errorMessage?: string | null, hostname: string, createdAt: any, status: DomainStatus }> } };

export type DomainsByZoneIdQueryVariables = Exact<{
  where: DomainsByZoneIdWhereInput;
  filter?: InputMaybe<DomainsByZoneIdPaginationInput>;
}>;


export type DomainsByZoneIdQuery = { __typename?: 'Query', domainsByZoneId: { __typename?: 'DomainsByZoneIdWithAggregation', data: Array<{ __typename: 'Domain', id: string, hostname: string, status: DomainStatus, errorMessage?: string | null, isVerified: boolean, createdAt: any, updatedAt: any, zone?: { __typename?: 'Zone', id: string } | null, dnsConfigs: Array<{ __typename: 'DnsConfig', createdAt: any, id: string, name: string, type: DnsConfigType, updatedAt: any, value: string }> }> } };

export type CreateEnsRecordMutationVariables = Exact<{
  where: CreateEnsRecordWhereInput;
  data: CreateEnsRecordDataInput;
}>;


export type CreateEnsRecordMutation = { __typename?: 'Mutation', createEnsRecord: { __typename?: 'EnsRecord', id: string, status: EnsRecordStatus } };

export type DeleteEnsRecordMutationVariables = Exact<{
  where: DeleteEnsRecordWhereInput;
}>;


export type DeleteEnsRecordMutation = { __typename?: 'Mutation', deleteEnsRecord: { __typename?: 'EnsRecord', id: string, status: EnsRecordStatus } };

export type VerifyEnsRecordMutationVariables = Exact<{
  where: VerifyEnsRecordWhereInput;
}>;


export type VerifyEnsRecordMutation = { __typename?: 'Mutation', verifyEnsRecord: { __typename?: 'EnsRecord', id: string, status: EnsRecordStatus } };

export type EnsNameAvailabilityQueryVariables = Exact<{
  where: EnsNameAvailabilityWhereInput;
}>;


export type EnsNameAvailabilityQuery = { __typename?: 'Query', ensNameAvailability: boolean };

export type EnsRecordQueryVariables = Exact<{
  where: EnsRecordWhereInput;
}>;


export type EnsRecordQuery = { __typename?: 'Query', ensRecord: { __typename?: 'EnsRecord', id: string, name: string, createdAt: any, status: EnsRecordStatus, ipnsRecord: { __typename?: 'IpnsRecord', id: string, hash?: string | null, name: string } } };

export type EnsRecordByNameQueryVariables = Exact<{
  where: EnsRecordByNameWhereInput;
}>;


export type EnsRecordByNameQuery = { __typename?: 'Query', ensRecordByName: { __typename?: 'EnsRecord', id: string, name: string, createdAt: any, status: EnsRecordStatus } };

export type EnsRecordsByIpnsIdQueryVariables = Exact<{
  where: EnsRecordsByIpnsIdWhereInput;
  filter?: InputMaybe<EnsRecordsByIpnsIdPaginationInput>;
}>;


export type EnsRecordsByIpnsIdQuery = { __typename?: 'Query', ensRecordsByIpnsId: { __typename?: 'EnsRecordsByIpnsIdWithAggregation', data: Array<{ __typename?: 'EnsRecord', id: string, name: string, createdAt: any, status: EnsRecordStatus }> } };

export type EnsRecordStatusQueryVariables = Exact<{
  where: EnsRecordWhereInput;
}>;


export type EnsRecordStatusQuery = { __typename?: 'Query', ensRecord: { __typename?: 'EnsRecord', id: string, status: EnsRecordStatus } };

export type SiteDeploymentRequirementsMutationVariables = Exact<{
  where: SiteDeploymentRequirementsWhereInput;
}>;


export type SiteDeploymentRequirementsMutation = { __typename?: 'Mutation', siteDeploymentRequirements: { __typename?: 'SiteDeploymentRequirements', authorizationUrl?: string | null, installationUrl?: string | null, shouldAuthenticate: boolean, shouldInstall: boolean } };

export type GitBranchesQueryVariables = Exact<{
  where: GitApiBranchesWhereInput;
}>;


export type GitBranchesQuery = { __typename?: 'Query', gitApiBranches: Array<{ __typename?: 'GitApiBranch', name: string }> };

export type GitInstallationsQueryVariables = Exact<{
  where: GitApiInstallationsWhereInput;
}>;


export type GitInstallationsQuery = { __typename?: 'Query', gitApiInstallations: Array<{ __typename?: 'GitApiInsatallation', avatar: string, installationId: number, name: string }> };

export type GitIntegrationQueryVariables = Exact<{
  where: GitIntegrationWhereInput;
}>;


export type GitIntegrationQuery = { __typename?: 'Query', gitIntegration: { __typename?: 'GitIntegration', id: string } };

export type GitProviderQueryVariables = Exact<{
  where: GitProviderWhereInput;
}>;


export type GitProviderQuery = { __typename?: 'Query', gitProvider: { __typename?: 'GitProvider', id: string, name: string, tags: any, enabled: boolean, sourceProvider: SourceProvider, createdAt: any } };

export type GitProvidersQueryVariables = Exact<{ [key: string]: never; }>;


export type GitProvidersQuery = { __typename?: 'Query', gitProviders: Array<{ __typename?: 'GitProvider', id: string, name: string, tags: any, enabled: boolean, sourceProvider: SourceProvider, createdAt: any }> };

export type GitRepositoriesQueryVariables = Exact<{
  where: GitApiInstallationsWhereInput;
}>;


export type GitRepositoriesQuery = { __typename?: 'Query', gitApiInstallations: Array<{ __typename?: 'GitApiInsatallation', avatar: string, installationId: number, isOrganization: boolean, name: string, repos: Array<{ __typename?: 'GitApiRepo', id: number, defaultBranch: string, name: string }> }> };

export type GitSiteBuildSettingsQueryVariables = Exact<{
  where: SiteBuildSettingsWhereInput;
}>;


export type GitSiteBuildSettingsQuery = { __typename?: 'Query', siteBuildSettings: { __typename?: 'SiteBuildSettings', buildCommand: string, dockerImage: string, publishDirectory: string, envVars: any, frameworkId?: string | null } };

export type GitTreeQueryVariables = Exact<{
  where: GitApiTreeWhereInput;
}>;


export type GitTreeQuery = { __typename?: 'Query', gitApiTree: Array<{ __typename?: 'GitApiTree', path?: string | null, mode?: string | null, type?: string | null, sha?: string | null, size?: number | null, url?: string | null }> };

export type GithubAppInstallationsQueryVariables = Exact<{
  where: GithubAppInstallationsWhereInput;
}>;


export type GithubAppInstallationsQuery = { __typename?: 'Query', githubAppInstallations: Array<{ __typename?: 'GithubAppInstallation', id: string, installationId?: string | null, projectId: string }> };

export type CreateProjectGithubIntegrationMutationVariables = Exact<{
  data: CreateGithubIntegrationForProjectDataInput;
}>;


export type CreateProjectGithubIntegrationMutation = { __typename?: 'Mutation', createGithubIntegrationForProject: boolean };

export type CreateRepositoryFromTemplateMutationVariables = Exact<{
  where: CreateGithubRepoFromTemplateWhereInput;
  data: CreateGithubRepoFromTemplateDataInput;
}>;


export type CreateRepositoryFromTemplateMutation = { __typename?: 'Mutation', createGithubRepoFromTemplate: { __typename?: 'GithubRepo', url: string, name: string, isPrivate: boolean, defaultBranch: string, repositoryId: number } };

export type CreateIpnsRecordForSiteMutationVariables = Exact<{
  where: CreateIpnsRecordForSiteWhereInput;
}>;


export type CreateIpnsRecordForSiteMutation = { __typename?: 'Mutation', createIpnsRecordForSite: { __typename?: 'IpnsRecord', id: string, name: string, hash?: string | null, createdAt: any } };

export type IpnsRecordQueryVariables = Exact<{
  where: IpnsRecordWhereInput;
}>;


export type IpnsRecordQuery = { __typename?: 'Query', ipnsRecord: { __typename?: 'IpnsRecord', id: string, name: string, hash?: string | null, createdAt: any } };

export type CreateMigrationRequestsFromTokenMutationVariables = Exact<{
  data: CreateMigrationRequestsFromTokenDataInput;
}>;


export type CreateMigrationRequestsFromTokenMutation = { __typename?: 'Mutation', createMigrationRequestsFromToken: Array<{ __typename?: 'MigrationRequest', id: string, status: MigrationStatus, teamId: string, createdAt: any, teamInfo?: { __typename?: 'MigrationTeamInfo', sitesCount: number, filesCount: number, usersCount: number, name: string, id: string } | null }> };

export type CreateMigrationTokenMutationVariables = Exact<{
  data: CreateMigrationTokenDataInput;
}>;


export type CreateMigrationTokenMutation = { __typename?: 'Mutation', createMigrationToken: string };

export type MigrationRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type MigrationRequestsQuery = { __typename?: 'Query', migrationRequests: { __typename?: 'MigrationRequestsWithAggregation', data: Array<{ __typename?: 'MigrationRequest', id: string, status: MigrationStatus, teamId: string, createdAt: any, teamInfo?: { __typename?: 'MigrationTeamInfo', sitesCount: number, filesCount: number, usersCount: number, name: string, id: string } | null }> } };

export type MigrationTeamInfosFromTokenQueryVariables = Exact<{
  where: MigrationTeamInfosFromTokenWhereInput;
}>;


export type MigrationTeamInfosFromTokenQuery = { __typename?: 'Query', migrationTeamInfosFromToken: Array<{ __typename?: 'MigrationTeamInfo', id: string, name: string, filesCount: number, sitesCount: number, usersCount: number }> };

export type DeletePinMutationVariables = Exact<{
  where: DeletePinWhereInput;
}>;


export type DeletePinMutation = { __typename?: 'Mutation', deletePin: { __typename?: 'Pin', id: string } };

export type UpdatePinMutationVariables = Exact<{
  data: UpdatePinDataInput;
  where: UpdatePinWhereInput;
}>;


export type UpdatePinMutation = { __typename?: 'Mutation', updatePin: { __typename?: 'Pin', id: string, cid: string, size: number, extension: string, createdAt: any, filename: string } };

export type PinFragmentFragment = { __typename: 'Pin', id: string, cid: string, size: number, sizeBigInt: any, extension: string, createdAt: any, filename: string, storedOnArweave: boolean, storedOnFilecoin: boolean, pathInFolder?: string | null, arweavePin?: { __typename?: 'ArweavePin', bundlrId: string } | null, filecoinPin?: { __typename?: 'FilecoinPin', cid: string, deals: Array<{ __typename?: 'FilecoinDeal', dealId: number }> } | null };

export type FolderFragmentFragment = { __typename: 'Folder', id: string, createdAt: any, name: string, path: string, sizeBigInt: any };

export type ListFolderQueryVariables = Exact<{
  where: ListFolderWhereInput;
  filter?: InputMaybe<ListFolderPaginationInput>;
}>;


export type ListFolderQuery = { __typename?: 'Query', listFolder: { __typename?: 'ListFolderWithAggregation', pageCount: number, data: Array<{ __typename: 'Folder', id: string, createdAt: any, name: string, path: string, sizeBigInt: any } | { __typename: 'Pin', id: string, cid: string, size: number, sizeBigInt: any, extension: string, createdAt: any, filename: string, storedOnArweave: boolean, storedOnFilecoin: boolean, pathInFolder?: string | null, arweavePin?: { __typename?: 'ArweavePin', bundlrId: string } | null, filecoinPin?: { __typename?: 'FilecoinPin', cid: string, deals: Array<{ __typename?: 'FilecoinDeal', dealId: number }> } | null }> } };

export type PinsQueryVariables = Exact<{
  filter?: InputMaybe<PinsPaginationInput>;
}>;


export type PinsQuery = { __typename?: 'Query', pins: { __typename?: 'PinsWithAggregation', pageCount: number, data: Array<{ __typename: 'Pin', id: string, cid: string, size: number, sizeBigInt: any, extension: string, createdAt: any, filename: string, storedOnArweave: boolean, storedOnFilecoin: boolean, pathInFolder?: string | null, arweavePin?: { __typename?: 'ArweavePin', bundlrId: string } | null, filecoinPin?: { __typename?: 'FilecoinPin', cid: string, deals: Array<{ __typename?: 'FilecoinDeal', dealId: number }> } | null }> } };

export type PinQueryVariables = Exact<{
  where: PinWhereInput;
}>;


export type PinQuery = { __typename?: 'Query', pin: { __typename: 'Pin', id: string, cid: string, size: number, sizeBigInt: any, extension: string, createdAt: any, filename: string, storedOnArweave: boolean, storedOnFilecoin: boolean, pathInFolder?: string | null, arweavePin?: { __typename?: 'ArweavePin', bundlrId: string } | null, filecoinPin?: { __typename?: 'FilecoinPin', cid: string, deals: Array<{ __typename?: 'FilecoinDeal', dealId: number }> } | null } };

export type PinNameAvailabilityInParentFolderQueryVariables = Exact<{
  data: PinNameAvailabilityInParentFolderDataInput;
  where: PinNameAvailabilityInParentFolderWhereInput;
}>;


export type PinNameAvailabilityInParentFolderQuery = { __typename?: 'Query', pinNameAvailabilityInParentFolder: boolean };

export type CreatePrivateGatewayMutationVariables = Exact<{
  where: CreatePrivateGatewayWhereInput;
  data: CreatePrivateGatewayDataInput;
}>;


export type CreatePrivateGatewayMutation = { __typename?: 'Mutation', createPrivateGateway: { __typename?: 'PrivateGateway', id: string, name: string, createdAt: any, zone?: { __typename?: 'Zone', id: string } | null } };

export type DeletePrivateGatewayMutationVariables = Exact<{
  where: DeletePrivateGatewayWhereInput;
}>;


export type DeletePrivateGatewayMutation = { __typename?: 'Mutation', deletePrivateGateway: { __typename?: 'PrivateGateway', id: string, name: string } };

export type DeletePrivateGatewayDependenciesQueryVariables = Exact<{
  where: PrivateGatewayWhereInput;
}>;


export type DeletePrivateGatewayDependenciesQuery = { __typename?: 'Query', privateGateway: { __typename?: 'PrivateGateway', name: string, primaryDomain?: { __typename?: 'Domain', id: string, hostname: string, status: DomainStatus, isVerified: boolean } | null, zone?: { __typename?: 'Zone', id: string, status: ZoneStatus, type: ZoneType } | null, domains: Array<{ __typename: 'Domain', id: string, status: DomainStatus, hostname: string, isVerified: boolean }> } };

export type PrivateGatewayNameAvailabilityQueryVariables = Exact<{
  where: PrivateGatewayNameAvailabilityWhereInput;
}>;


export type PrivateGatewayNameAvailabilityQuery = { __typename?: 'Query', privateGatewayNameAvailability: boolean };

export type PrivateGatewaysQueryVariables = Exact<{
  filter?: InputMaybe<PrivateGatewaysPaginationInput>;
}>;


export type PrivateGatewaysQuery = { __typename?: 'Query', privateGateways: { __typename?: 'PrivateGatewaysWithAggregation', data: Array<{ __typename?: 'PrivateGateway', id: string, name: string, createdAt: any, zone?: { __typename?: 'Zone', id: string } | null, domains: Array<{ __typename: 'Domain', id: string, hostname: string, status: DomainStatus, errorMessage?: string | null, isVerified: boolean, createdAt: any, updatedAt: any, zone?: { __typename?: 'Zone', id: string } | null, dnsConfigs: Array<{ __typename: 'DnsConfig', createdAt: any, id: string, name: string, type: DnsConfigType, updatedAt: any, value: string }> }>, primaryDomain?: { __typename?: 'Domain', id: string, hostname: string, isVerified: boolean } | null }> } };

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectDataInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, name: string, backupStorageOnArweave?: boolean | null, backupStorageOnFilecoin?: boolean | null, avatar?: any | null, currentUserMembership: { __typename?: 'Membership', permissionGroup: { __typename?: 'PermissionGroup', id: string, name: string, permissions: Array<string> } } } };

export type DeleteMembershipMutationVariables = Exact<{
  where: DeleteMembershipWhereInput;
}>;


export type DeleteMembershipMutation = { __typename?: 'Mutation', deleteMembership: { __typename?: 'Membership', id: string } };

export type DeleteProjectMutationVariables = Exact<{
  where: DeleteProjectWhereInput;
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: { __typename?: 'Project', id: string, name: string } };

export type CreateFleekFunctionMutationVariables = Exact<{
  data: CreateFleekFunctionDataInput;
}>;


export type CreateFleekFunctionMutation = { __typename?: 'Mutation', createFleekFunction: { __typename?: 'FleekFunction', id: string, name: string, slug: string, invokeUrl: string, status: FleekFunctionStatus, createdAt: any, updatedAt: any, site?: { __typename?: 'Site', id: string, name: string } | null, currentDeployment?: { __typename?: 'FleekFunctionDeployment', id: string, cid: string, createdAt: any } | null } };

export type DeleteFleekFunctionMutationVariables = Exact<{
  where: DeleteFleekFunctionWhereInput;
}>;


export type DeleteFleekFunctionMutation = { __typename?: 'Mutation', deleteFleekFunction: { __typename?: 'FleekFunction', id: string } };

export type UpdateFleekFunctionMutationVariables = Exact<{
  where: UpdateFleekFunctionWhereInput;
  data: UpdateFleekFunctionDataInput;
}>;


export type UpdateFleekFunctionMutation = { __typename?: 'Mutation', updateFleekFunction: { __typename?: 'FleekFunction', id: string, name: string, slug: string, invokeUrl: string, status: FleekFunctionStatus, createdAt: any, updatedAt: any, site?: { __typename?: 'Site', id: string, name: string } | null, currentDeployment?: { __typename?: 'FleekFunctionDeployment', id: string, cid: string, createdAt: any } | null } };

export type LeaveProjectMutationVariables = Exact<{
  where: LeaveProjectWhereInput;
}>;


export type LeaveProjectMutation = { __typename?: 'Mutation', leaveProject: { __typename?: 'Membership', id: string } };

export type UpdateProjectMutationVariables = Exact<{
  data: UpdateProjectDataInput;
  where: UpdateProjectWhereInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string, name: string, backupStorageOnArweave?: boolean | null, backupStorageOnFilecoin?: boolean | null, allowAccessFromOfacCountries?: boolean | null, avatar?: any | null } };

export type FleekFunctionFragmentFragment = { __typename?: 'FleekFunction', id: string, name: string, slug: string, invokeUrl: string, status: FleekFunctionStatus, createdAt: any, updatedAt: any, site?: { __typename?: 'Site', id: string, name: string } | null, currentDeployment?: { __typename?: 'FleekFunctionDeployment', id: string, cid: string, createdAt: any } | null };

export type FleekFunctionsQueryVariables = Exact<{
  filter?: InputMaybe<FleekFunctionsPaginationInput>;
  where?: InputMaybe<FleekFunctionsWhereInput>;
}>;


export type FleekFunctionsQuery = { __typename?: 'Query', fleekFunctions: { __typename?: 'FleekFunctionsWithAggregation', pageCount: number, currentPage: number, data: Array<{ __typename?: 'FleekFunction', id: string, name: string, slug: string, invokeUrl: string, status: FleekFunctionStatus, createdAt: any, updatedAt: any, site?: { __typename?: 'Site', id: string, name: string } | null, currentDeployment?: { __typename?: 'FleekFunctionDeployment', id: string, cid: string, createdAt: any } | null }> } };

export type FleekFunctionDetailQueryVariables = Exact<{
  where: FleekFunctionByNameWhereInput;
}>;


export type FleekFunctionDetailQuery = { __typename?: 'Query', fleekFunctionByName: { __typename?: 'FleekFunction', id: string, name: string, slug: string, invokeUrl: string, status: FleekFunctionStatus, createdAt: any, updatedAt: any, site?: { __typename?: 'Site', id: string, name: string } | null, currentDeployment?: { __typename?: 'FleekFunctionDeployment', id: string, cid: string, createdAt: any } | null } };

export type FleekFunctionDeploymentsQueryVariables = Exact<{
  fleekFunctionId: Scalars['ID'];
  page?: InputMaybe<Scalars['Int']>;
}>;


export type FleekFunctionDeploymentsQuery = { __typename?: 'Query', fleekFunctionDeployments: { __typename?: 'FleekFunctionDeploymentsWithAggregation', pageCount: number, currentPage: number, data: Array<{ __typename?: 'FleekFunctionDeployment', id: string, cid: string, createdAt: any, updatedAt: any }> } };

export type ProjectQueryVariables = Exact<{
  where: ProjectWhereInput;
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, name: string, backupStorageOnArweave?: boolean | null, backupStorageOnFilecoin?: boolean | null, allowAccessFromOfacCountries?: boolean | null, avatar?: any | null, currentUserMembership: { __typename?: 'Membership', permissionGroup: { __typename?: 'PermissionGroup', id: string, name: string, permissions: Array<string> } } } };

export type CreateSalesContactRequestMutationVariables = Exact<{
  data: CreateSalesContactRequestDataInput;
}>;


export type CreateSalesContactRequestMutation = { __typename?: 'Mutation', createSalesContactRequest: { __typename?: 'SalesContactRequest', id: string, email: string, description: string, createdAt: any } };

export type CreateSecretMutationVariables = Exact<{
  data: CreateSecretDataInput;
}>;


export type CreateSecretMutation = { __typename?: 'Mutation', createSecret: { __typename?: 'Secret', id: string } };

export type DeleteSecretMutationVariables = Exact<{
  where: DeleteSecretWhereInput;
}>;


export type DeleteSecretMutation = { __typename?: 'Mutation', deleteSecret: { __typename?: 'Secret', id: string } };

export type UpdateSecretMutationVariables = Exact<{
  where: UpdateSecretWhereInput;
  data: UpdateSecretDataInput;
}>;


export type UpdateSecretMutation = { __typename?: 'Mutation', updateSecret: { __typename?: 'Secret', id: string, value: string, visibility: SecretVisibility } };

export type CreateSiteMutationVariables = Exact<{
  data: CreateSiteDataInput;
}>;


export type CreateSiteMutation = { __typename?: 'Mutation', createSite: { __typename: 'Site', id: string, name: string, sourceProvider?: SourceProvider | null, sourceRepositoryId?: string | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, enablePreviews: boolean, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null, cpuLimit?: string | null, memoryLimit?: string | null, buildDurationLimitSeconds?: number | null, secretGroup?: { __typename?: 'SecretGroup', id: string } | null } };

export type DeleteSiteMutationVariables = Exact<{
  where: DeleteSiteWhereInput;
}>;


export type DeleteSiteMutation = { __typename?: 'Mutation', deleteSite: { __typename?: 'Site', id: string } };

export type PurgeSiteCacheMutationVariables = Exact<{
  where: PurgeSiteCacheWhereInput;
}>;


export type PurgeSiteCacheMutation = { __typename?: 'Mutation', purgeSiteCache: { __typename?: 'Site', id: string } };

export type TriggerDeploymentMutationVariables = Exact<{
  where: TriggerDeploymentWhereInput;
}>;


export type TriggerDeploymentMutation = { __typename?: 'Mutation', triggerDeployment: { __typename?: 'Deployment', cid?: string | null, id: string, siteId: string, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceBranch?: string | null, storageType: StorageType, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, createdAt: any, startedAt?: any | null, updatedAt: any, sourceRef?: string | null, status: DeploymentStatus, previewOnly: boolean, build?: { __typename?: 'Build', id: string, status: BuildStatus, logs?: Array<{ __typename?: 'BuildLog', id: string, createdAt: any, text: string }> | null } | null } };

export type UpdateSiteMutationVariables = Exact<{
  data: UpdateSiteDataInput;
  where: UpdateSiteWhereInput;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite: { __typename?: 'Site', id: string, name: string, slug: string, sourceProvider?: SourceProvider | null, sourceRepositoryId?: string | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, enablePreviews: boolean, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null, cpuLimit?: string | null, memoryLimit?: string | null, buildDurationLimitSeconds?: number | null } };

export type SiteQuotaQueryVariables = Exact<{
  where: SiteQuotaWhereInput;
}>;


export type SiteQuotaQuery = { __typename?: 'Query', siteQuota: { __typename?: 'SiteQuota', maxDeploymentQueue: { __typename?: 'ResourceQuota', total: number, remaining: number } } };

export type SecretAvailabilityQueryVariables = Exact<{
  where: SecretAvailabilityWhereInput;
}>;


export type SecretAvailabilityQuery = { __typename?: 'Query', secretAvailability: boolean };

export type SiteQueryVariables = Exact<{
  where: SiteWhereInput;
}>;


export type SiteQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, avatar?: any | null, slug: string, name: string, sourceProvider?: SourceProvider | null, sourceRepositoryId?: string | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, githubInstallationId?: number | null, enablePreviews: boolean, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null, cpuLimit?: string | null, memoryLimit?: string | null, buildDurationLimitSeconds?: number | null, currentDeployment?: { __typename?: 'Deployment', cid?: string | null, id: string, status: DeploymentStatus, createdAt: any, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, previewOnly: boolean, storageType: StorageType, sourceBranch?: string | null, updatedAt: any, sourceRef?: string | null, startedAt?: any | null, functionDeployments: Array<{ __typename?: 'FleekFunctionDeployment', id: string }> } | null, lastDeployment?: { __typename?: 'Deployment', cid?: string | null, id: string, siteId: string, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceBranch?: string | null, storageType: StorageType, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, createdAt: any, updatedAt: any, startedAt?: any | null, sourceRef?: string | null, status: DeploymentStatus, previewOnly: boolean } | null, ipnsRecords: Array<{ __typename?: 'IpnsRecord', id: string, hash?: string | null, name: string, ensRecords: Array<{ __typename: 'EnsRecord', createdAt: any, id: string, name: string, status: EnsRecordStatus, updatedAt: any }> }>, zones: Array<{ __typename?: 'SiteZone', id: string, status: ZoneStatus }>, secretGroup?: { __typename?: 'SecretGroup', id: string, name?: string | null, secrets: Array<{ __typename?: 'Secret', id: string, key: string, value: string, visibility: SecretVisibility, updatedAt: any }> } | null, domains: Array<{ __typename: 'Domain', id: string, hostname: string, status: DomainStatus, errorMessage?: string | null, isVerified: boolean, createdAt: any, updatedAt: any, dnslinkStatus?: DnslinkStatus | null, zone?: { __typename?: 'Zone', id: string } | null, dnsConfigs: Array<{ __typename: 'DnsConfig', createdAt: any, id: string, name: string, type: DnsConfigType, updatedAt: any, value: string }> }>, primaryDomain?: { __typename?: 'Domain', id: string, hostname: string, isVerified: boolean } | null, framework?: { __typename?: 'SiteFramework', id: string, name: string, avatar: any } | null, gitIntegration?: { __typename: 'GitIntegration', id: string, gitProvider: { __typename?: 'GitProvider', id: string, name: string, tags: any, enabled: boolean, sourceProvider: SourceProvider }, githubAppInstallation: { __typename?: 'GithubAppInstallation', id: string, installationId?: string | null } } | null } };

export type SiteFrameworksQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteFrameworksQuery = { __typename?: 'Query', siteFrameworks: Array<{ __typename?: 'SiteFramework', id: string, name: string, slug: string, avatar: any, dockerImage: string, publishDirectory: string, buildScript: string, recognitionStrategy: SiteFrameworkRecognitionStrategy, recognitionArgument: string, templatesCount: number, createdAt: any, updatedAt: any }> };

export type SiteIpnsRecordsQueryVariables = Exact<{
  where: SiteWhereInput;
}>;


export type SiteIpnsRecordsQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, ipnsRecords: Array<{ __typename?: 'IpnsRecord', id: string, hash?: string | null }> } };

export type SiteNameAvailabilityQueryVariables = Exact<{
  where: SiteNameAvailabilityWhereInput;
}>;


export type SiteNameAvailabilityQuery = { __typename?: 'Query', siteNameAvailability: boolean };

export type SiteZonesQueryVariables = Exact<{
  where: SiteWhereInput;
}>;


export type SiteZonesQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: string, zones: Array<{ __typename?: 'SiteZone', id: string }> } };

export type SitesQueryVariables = Exact<{
  where: SitesWhereInput;
  filter?: InputMaybe<SitesPaginationInput>;
}>;


export type SitesQuery = { __typename?: 'Query', sites: { __typename?: 'SitesWithAggregation', pageCount: number, totalCount: number, data: Array<{ __typename: 'Site', id: string, avatar?: any | null, name: string, slug: string, sourceProvider?: SourceProvider | null, sourceRepositoryId?: string | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, githubInstallationId?: number | null, enablePreviews: boolean, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null, cpuLimit?: string | null, memoryLimit?: string | null, buildDurationLimitSeconds?: number | null, lastDeployment?: { __typename?: 'Deployment', cid?: string | null, id: string, siteId: string, status: DeploymentStatus, createdAt: any, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, previewOnly: boolean, storageType: StorageType, sourceBranch?: string | null, updatedAt: any, sourceRef?: string | null } | null, currentDeployment?: { __typename?: 'Deployment', cid?: string | null, id: string, status: DeploymentStatus, createdAt: any, sourceProvider?: SourceProvider | null, sourceAuthor?: string | null, sourceMessage?: string | null, sourceRepositoryName?: string | null, sourceRepositoryOwner?: string | null, previewImageUrl?: string | null, previewOnly: boolean, storageType: StorageType, sourceBranch?: string | null, updatedAt: any, sourceRef?: string | null, functionDeployments: Array<{ __typename?: 'FleekFunctionDeployment', id: string }> } | null, ipnsRecords: Array<{ __typename?: 'IpnsRecord', id: string, hash?: string | null, name: string, ensRecords: Array<{ __typename: 'EnsRecord', createdAt: any, id: string, name: string, status: EnsRecordStatus, updatedAt: any }> }>, domains: Array<{ __typename: 'Domain', id: string, hostname: string, status: DomainStatus, errorMessage?: string | null, isVerified: boolean, createdAt: any, updatedAt: any, dnslinkStatus?: DnslinkStatus | null, zone?: { __typename?: 'Zone', id: string } | null, dnsConfigs: Array<{ __typename: 'DnsConfig', createdAt: any, id: string, name: string, type: DnsConfigType, updatedAt: any, value: string }> }>, primaryDomain?: { __typename?: 'Domain', id: string, hostname: string, isVerified: boolean } | null, zones: Array<{ __typename?: 'SiteZone', id: string, status: ZoneStatus }> }> } };

export type SlugAvailabilityQueryVariables = Exact<{
  where: SlugAvailabilityWhereInput;
}>;


export type SlugAvailabilityQuery = { __typename?: 'Query', slugAvailability: boolean };

export type CreateFolderMutationVariables = Exact<{
  data: CreateFolderDataInput;
  where: CreateFolderWhereInput;
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename: 'Folder', id: string, createdAt: any, name: string, path: string, sizeBigInt: any } };

export type DeleteFolderMutationVariables = Exact<{
  where: DeleteFolderWhereInput;
}>;


export type DeleteFolderMutation = { __typename?: 'Mutation', deleteFolder: { __typename: 'Folder', id: string, createdAt: any, name: string, path: string } };

export type UpdateFolderMutationVariables = Exact<{
  data: UpdateFolderDataInput;
  where: UpdateFolderWhereInput;
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', updateFolder: { __typename: 'Folder', id: string, createdAt: any, name: string, path: string } };

export type FolderDetailsQueryVariables = Exact<{
  where: FolderWhereInput;
}>;


export type FolderDetailsQuery = { __typename?: 'Query', folder: { __typename?: 'Folder', id: string, path: string, name: string, folderCount: number, pinCount: number } };

export type FolderNameAvailabilityInParentFolderQueryVariables = Exact<{
  data: FolderNameAvailabilityInParentFolderDataInput;
  where: FolderNameAvailabilityInParentFolderWhereInput;
}>;


export type FolderNameAvailabilityInParentFolderQuery = { __typename?: 'Query', folderNameAvailabilityInParentFolder: boolean };

export type AcceptInvitationMutationVariables = Exact<{
  where: AcceptInvitationWhereInput;
}>;


export type AcceptInvitationMutation = { __typename?: 'Mutation', acceptInvitation: { __typename?: 'Membership', id: string } };

export type CreateInvitationMutationVariables = Exact<{
  data: CreateInvitationDataInput;
}>;


export type CreateInvitationMutation = { __typename?: 'Mutation', createInvitation: string };

export type DeclineInvitationMutationVariables = Exact<{
  where: DeclineInvitationWhereInput;
}>;


export type DeclineInvitationMutation = { __typename?: 'Mutation', declineInvitation: boolean };

export type DeleteInvitationMutationVariables = Exact<{
  where: DeleteInvitationWhereInput;
}>;


export type DeleteInvitationMutation = { __typename?: 'Mutation', deleteInvitation: { __typename?: 'Invitation', id: string, email?: string | null, role?: Role | null, createdAt: any } };

export type UpdateMembershipMutationVariables = Exact<{
  data: UpdateMembershipDataInput;
  where: UpdateMembershipWhereInput;
}>;


export type UpdateMembershipMutation = { __typename?: 'Mutation', updateMembership: { __typename?: 'Membership', id: string, role?: Role | null, createdAt: any, permissionGroup: { __typename?: 'PermissionGroup', id: string, name: string, description: string }, user: { __typename?: 'User', id: string, email?: string | null, username?: string | null } } };

export type CountSitesWithSourceProviderQueryVariables = Exact<{ [key: string]: never; }>;


export type CountSitesWithSourceProviderQuery = { __typename?: 'Query', sites: { __typename?: 'SitesWithAggregation', totalCount: number } };

export type InvitationQueryVariables = Exact<{
  where: InvitationWhereInput;
}>;


export type InvitationQuery = { __typename?: 'Query', invitation: { __typename?: 'InvitationDetail', hash: string, projectAvatar?: any | null, projectId: string, projectName: string } };

export type PermissionGroupsQueryVariables = Exact<{
  filter?: InputMaybe<PermissionGroupsPaginationInput>;
}>;


export type PermissionGroupsQuery = { __typename?: 'Query', permissionGroups: { __typename?: 'PermissionGroupsWithAggregation', data: Array<{ __typename?: 'PermissionGroup', id: string, name: string, description: string }> } };

export type InvitationsQueryVariables = Exact<{
  filter?: InputMaybe<InvitationsPaginationInput>;
}>;


export type InvitationsQuery = { __typename?: 'Query', invitations: { __typename?: 'InvitationsWithAggregation', data: Array<{ __typename?: 'Invitation', id: string, email?: string | null, role?: Role | null, createdAt: any }> } };

export type ProjectMembersQueryVariables = Exact<{
  where: ProjectWhereInput;
}>;


export type ProjectMembersQuery = { __typename?: 'Query', project: { __typename?: 'Project', memberships: Array<{ __typename?: 'Membership', id: string, role?: Role | null, createdAt: any, permissionGroup: { __typename?: 'PermissionGroup', id: string, name: string, description: string }, user: { __typename?: 'User', id: string, email?: string | null, username?: string | null } }> } };

export type CreateTemplateMutationVariables = Exact<{
  data: CreateTemplateDataInput;
}>;


export type CreateTemplateMutation = { __typename?: 'Mutation', createTemplate: { __typename?: 'Template', id: string, name: string, banner: any, description: string, siteId: string, siteAvatar?: any | null, siteSlug: string, usageCount: number, reviewStatus: TemplateReviewStatus, reviewComment?: string | null, createdAt: any, updatedAt: any, framework?: { __typename?: 'SiteFramework', id: string, name: string, avatar: any } | null, deployment: { __typename?: 'Deployment', id: string, previewImageUrl?: string | null, sourceProvider?: SourceProvider | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, sourceRef?: string | null, build?: { __typename?: 'Build', id: string, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null } | null }, creator?: { __typename?: 'User', id: string, username?: string | null, avatar?: any | null } | null, category: { __typename?: 'TemplateCategory', id: string, name: string, slug: string } } };

export type DeleteTemplateMutationVariables = Exact<{
  where: DeleteTemplateWhereInput;
}>;


export type DeleteTemplateMutation = { __typename?: 'Mutation', deleteTemplate: { __typename?: 'Template', id: string, creator?: { __typename?: 'User', id: string } | null } };

export type UpdateTemplateMutationVariables = Exact<{
  data: UpdateTemplateDataInput;
  where: UpdateTemplateWhereInput;
}>;


export type UpdateTemplateMutation = { __typename?: 'Mutation', updateTemplate: { __typename?: 'Template', id: string, name: string, banner: any, description: string, reviewStatus: TemplateReviewStatus, createdAt: any, updatedAt: any, deployment: { __typename?: 'Deployment', previewImageUrl?: string | null, sourceProvider?: SourceProvider | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, build?: { __typename?: 'Build', id: string, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null } | null }, creator?: { __typename?: 'User', id: string } | null, category: { __typename?: 'TemplateCategory', id: string, name: string, slug: string } } };

export type TemplateQueryVariables = Exact<{
  where: TemplateWhereInput;
}>;


export type TemplateQuery = { __typename?: 'Query', template: { __typename?: 'Template', id: string, name: string, description: string, banner: any, siteId: string, siteAvatar?: any | null, siteSlug: string, usageCount: number, reviewStatus: TemplateReviewStatus, createdAt: any, updatedAt: any, framework?: { __typename?: 'SiteFramework', id: string, name: string, avatar: any } | null, deployment: { __typename?: 'Deployment', id: string, previewImageUrl?: string | null, sourceProvider?: SourceProvider | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, sourceRef?: string | null, build?: { __typename?: 'Build', id: string, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null } | null }, creator?: { __typename?: 'User', id: string, username?: string | null, avatar?: any | null } | null, category: { __typename?: 'TemplateCategory', id: string, name: string, slug: string, templatesCount: number } } };

export type TemplateCategoriesQueryVariables = Exact<{
  filter?: InputMaybe<TemplateCategoriesPaginationInput>;
}>;


export type TemplateCategoriesQuery = { __typename?: 'Query', templateCategories: { __typename?: 'TemplateCategoriesWithAggregation', data: Array<{ __typename?: 'TemplateCategory', id: string, name: string, slug: string, templatesCount: number }> } };

export type TemplateDeployQueryVariables = Exact<{
  where: TemplateWhereInput;
}>;


export type TemplateDeployQuery = { __typename?: 'Query', template: { __typename?: 'Template', id: string, name: string, description: string, siteId: string, siteAvatar?: any | null, framework?: { __typename?: 'SiteFramework', id: string, name: string, avatar: any } | null, deployment: { __typename?: 'Deployment', id: string, sourceProvider?: SourceProvider | null, sourceRepositoryOwner?: string | null, sourceRepositoryName?: string | null, sourceBranch?: string | null, sourceRef?: string | null, build?: { __typename?: 'Build', id: string, baseDirectory?: string | null, buildCommand?: string | null, distDirectory?: string | null, dockerImage?: string | null } | null } } };

export type TemplateNameAvailabilityQueryVariables = Exact<{
  where: TemplateNameAvailabilityWhereInput;
}>;


export type TemplateNameAvailabilityQuery = { __typename?: 'Query', templateNameAvailability: boolean };

export type TemplatesQueryVariables = Exact<{
  where: TemplatesWhereInput;
  filter?: InputMaybe<TemplatesPaginationInput>;
}>;


export type TemplatesQuery = { __typename?: 'Query', templates: { __typename?: 'TemplatesWithAggregation', currentPage: number, nextPage?: number | null, isLastPage: boolean, totalCount: number, data: Array<{ __typename?: 'Template', id: string, name: string, description: string, usageCount: number, banner: any, siteId: string, siteAvatar?: any | null, siteSlug: string, reviewStatus: TemplateReviewStatus, reviewComment?: string | null, createdAt: any, updatedAt: any, framework?: { __typename?: 'SiteFramework', id: string, name: string, avatar: any } | null, deployment: { __typename?: 'Deployment', id: string, previewImageUrl?: string | null, sourceRepositoryOwner?: string | null }, creator?: { __typename?: 'User', id: string, username?: string | null, avatar?: any | null } | null, category: { __typename?: 'TemplateCategory', id: string, name: string, slug: string } }> } };

export type UpdateNotificationSettingsMutationVariables = Exact<{
  data: UpdateNotificationSettingsDataInput;
}>;


export type UpdateNotificationSettingsMutation = { __typename?: 'Mutation', updateNotificationSettings: boolean };

export type UpdateUserMutationVariables = Exact<{
  data: UpdateUserDataInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email?: string | null, avatar?: any | null, username?: string | null, githubUserAccessToken?: string | null, walletAddress?: string | null, project?: { __typename?: 'Project', id: string, name: string } | null } };

export type EmailAvailabilityQueryVariables = Exact<{
  where: EmailAvailabilityWhereInput;
}>;


export type EmailAvailabilityQuery = { __typename?: 'Query', emailAvailability: boolean };

export type GitAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GitAccessTokenQuery = { __typename?: 'Query', user: { __typename?: 'User', gitUserAccessTokens: Array<{ __typename: 'GitUserAccessToken', gitProviderId: string, token: string }> } };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notificationSettings: Array<{ __typename?: 'NotificationSettings', notificationType: NotificationType, notificationChannel: NotificationChannel, isEnabled: boolean }> };

export type UsernameAvailabilityQueryVariables = Exact<{
  where: UsernameAvailabilityWhereInput;
}>;


export type UsernameAvailabilityQuery = { __typename?: 'Query', usernameAvailability: boolean };

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = { __typename?: 'Query', version: { __typename?: 'Version', commitHash: string } };

export type CreateZoneForPrivateGatewayMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateZoneForPrivateGatewayMutation = { __typename?: 'Mutation', createZoneForPrivateGateway: { __typename?: 'Zone', id: string, type: ZoneType } };

export type CreateZoneForSiteMutationVariables = Exact<{
  where: CreateZoneForSiteWhereInput;
}>;


export type CreateZoneForSiteMutation = { __typename?: 'Mutation', createZoneForSite: { __typename?: 'Zone', id: string } };

export type ZoneQueryVariables = Exact<{
  where: ZoneWhereInput;
}>;


export type ZoneQuery = { __typename?: 'Query', zone: { __typename?: 'Zone', id: string, status: ZoneStatus } };

export const PinFragmentFragmentDoc = gql`
    fragment PinFragment on Pin {
  __typename
  id
  cid
  size
  sizeBigInt
  extension
  createdAt
  filename
  storedOnArweave
  storedOnFilecoin
  arweavePin {
    bundlrId
  }
  filecoinPin {
    cid
    deals {
      dealId
    }
  }
  pathInFolder
}
    `;
export const FolderFragmentFragmentDoc = gql`
    fragment FolderFragment on Folder {
  __typename
  id
  createdAt
  name
  path
  sizeBigInt
}
    `;
export const FleekFunctionFragmentFragmentDoc = gql`
    fragment FleekFunctionFragment on FleekFunction {
  id
  name
  slug
  invokeUrl
  status
  site {
    id
    name
  }
  currentDeployment {
    id
    cid
    createdAt
  }
  createdAt
  updatedAt
}
    `;
export const DeleteRecoveryCodesDocument = gql`
    mutation deleteRecoveryCodes($where: DeleteRecoveryCodesWhereInput!) {
  deleteRecoveryCodes(where: $where)
}
    `;

export function useDeleteRecoveryCodesMutation() {
  return Urql.useMutation<DeleteRecoveryCodesMutation, DeleteRecoveryCodesMutationVariables>(DeleteRecoveryCodesDocument);
};
export const DeleteSecretKeyDocument = gql`
    mutation deleteSecretKey($where: DeleteSecretKeyWhereInput!) {
  deleteSecretKey(where: $where)
}
    `;

export function useDeleteSecretKeyMutation() {
  return Urql.useMutation<DeleteSecretKeyMutation, DeleteSecretKeyMutationVariables>(DeleteSecretKeyDocument);
};
export const DisableProtectedActionDocument = gql`
    mutation disableProtectedAction($where: DisableTwoFactorProtectedActionWhereInput!) {
  disableTwoFactorProtectedAction(where: $where)
}
    `;

export function useDisableProtectedActionMutation() {
  return Urql.useMutation<DisableProtectedActionMutation, DisableProtectedActionMutationVariables>(DisableProtectedActionDocument);
};
export const EnableProtectedActionDocument = gql`
    mutation enableProtectedAction($where: EnableTwoFactorProtectedActionWhereInput!) {
  enableTwoFactorProtectedAction(where: $where)
}
    `;

export function useEnableProtectedActionMutation() {
  return Urql.useMutation<EnableProtectedActionMutation, EnableProtectedActionMutationVariables>(EnableProtectedActionDocument);
};
export const GenerateRecoveryCodesDocument = gql`
    mutation generateRecoveryCodes($where: GenerateRecoveryCodesWhereInput!) {
  generateRecoveryCodes(where: $where) {
    recoveryCodes
  }
}
    `;

export function useGenerateRecoveryCodesMutation() {
  return Urql.useMutation<GenerateRecoveryCodesMutation, GenerateRecoveryCodesMutationVariables>(GenerateRecoveryCodesDocument);
};
export const GenerateTwoFactorSecretKeyDocument = gql`
    mutation generateTwoFactorSecretKey {
  generateTwoFactorSecretKey {
    id
    algorithm
    key
    digits
    period
    isActive
    isVerified
    verifiedAt
  }
}
    `;

export function useGenerateTwoFactorSecretKeyMutation() {
  return Urql.useMutation<GenerateTwoFactorSecretKeyMutation, GenerateTwoFactorSecretKeyMutationVariables>(GenerateTwoFactorSecretKeyDocument);
};
export const UpdateSecretKeyDocument = gql`
    mutation updateSecretKey($where: UpdateTwoFactorSecretKeyWhereInput!, $data: UpdateTwoFactorSecretKeyDataInput!) {
  updateTwoFactorSecretKey(where: $where, data: $data) {
    id
    algorithm
    key
    digits
    period
    isActive
    isVerified
    verifiedAt
  }
}
    `;

export function useUpdateSecretKeyMutation() {
  return Urql.useMutation<UpdateSecretKeyMutation, UpdateSecretKeyMutationVariables>(UpdateSecretKeyDocument);
};
export const VerifySecretKeyDocument = gql`
    mutation verifySecretKey($where: VerifyTwoFactorSecretKeyWhereInput!, $data: VerifyTwoFactorSecretKeyDataInput!) {
  verifyTwoFactorSecretKey(where: $where, data: $data) {
    id
    algorithm
    key
    digits
    period
    isActive
    isVerified
    verifiedAt
  }
}
    `;

export function useVerifySecretKeyMutation() {
  return Urql.useMutation<VerifySecretKeyMutation, VerifySecretKeyMutationVariables>(VerifySecretKeyDocument);
};
export const ProtectedActionsDocument = gql`
    query protectedActions($filter: TwoFactorProtectedActionsPaginationInput) {
  twoFactorProtectedActions(filter: $filter) {
    data {
      id
      type
      name
      enabled
    }
  }
}
    `;

export function useProtectedActionsQuery(options?: Omit<Urql.UseQueryArgs<ProtectedActionsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProtectedActionsQuery, ProtectedActionsQueryVariables>({ query: ProtectedActionsDocument, ...options });
};
export const GetSecretKeysDocument = gql`
    query getSecretKeys {
  user {
    secretKeys {
      id
      algorithm
      key
      digits
      period
      isActive
      isVerified
      verifiedAt
    }
  }
}
    `;

export function useGetSecretKeysQuery(options?: Omit<Urql.UseQueryArgs<GetSecretKeysQueryVariables>, 'query'>) {
  return Urql.useQuery<GetSecretKeysQuery, GetSecretKeysQueryVariables>({ query: GetSecretKeysDocument, ...options });
};
export const CreateApplicationDocument = gql`
    mutation createApplication($data: CreateApplicationDataInput!) {
  createApplication(data: $data) {
    clientId
    createdAt
    id
    name
    updatedAt
    whitelistDomains {
      hostname
    }
    whiteLabelDomains {
      hostname
    }
  }
}
    `;

export function useCreateApplicationMutation() {
  return Urql.useMutation<CreateApplicationMutation, CreateApplicationMutationVariables>(CreateApplicationDocument);
};
export const DeleteApplicationDocument = gql`
    mutation deleteApplication($where: DeleteApplicationWhereInput!) {
  deleteApplication(where: $where) {
    id
  }
}
    `;

export function useDeleteApplicationMutation() {
  return Urql.useMutation<DeleteApplicationMutation, DeleteApplicationMutationVariables>(DeleteApplicationDocument);
};
export const UpdateApplicationDocument = gql`
    mutation updateApplication($data: UpdateApplicationDataInput!, $where: UpdateApplicationWhereInput!) {
  updateApplication(data: $data, where: $where) {
    id
    name
    whitelistDomains {
      hostname
    }
    whiteLabelDomains {
      hostname
    }
  }
}
    `;

export function useUpdateApplicationMutation() {
  return Urql.useMutation<UpdateApplicationMutation, UpdateApplicationMutationVariables>(UpdateApplicationDocument);
};
export const ApplicationDocument = gql`
    query application($where: ApplicationWhereInput!) {
  application(where: $where) {
    clientId
    createdAt
    id
    name
    updatedAt
    whitelistDomains {
      hostname
    }
    whiteLabelDomains {
      hostname
    }
  }
}
    `;

export function useApplicationQuery(options: Omit<Urql.UseQueryArgs<ApplicationQueryVariables>, 'query'>) {
  return Urql.useQuery<ApplicationQuery, ApplicationQueryVariables>({ query: ApplicationDocument, ...options });
};
export const ApplicationNameAvailabilityDocument = gql`
    query applicationNameAvailability($where: ApplicationNameAvailabilityWhereInput!) {
  applicationNameAvailability(where: $where)
}
    `;

export function useApplicationNameAvailabilityQuery(options: Omit<Urql.UseQueryArgs<ApplicationNameAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<ApplicationNameAvailabilityQuery, ApplicationNameAvailabilityQueryVariables>({ query: ApplicationNameAvailabilityDocument, ...options });
};
export const ApplicationsDocument = gql`
    query applications($filter: ApplicationsPaginationInput) {
  applications(filter: $filter) {
    data {
      clientId
      createdAt
      id
      name
      updatedAt
      whitelistDomains {
        hostname
      }
      whiteLabelDomains {
        hostname
      }
    }
  }
}
    `;

export function useApplicationsQuery(options?: Omit<Urql.UseQueryArgs<ApplicationsQueryVariables>, 'query'>) {
  return Urql.useQuery<ApplicationsQuery, ApplicationsQueryVariables>({ query: ApplicationsDocument, ...options });
};
export const CreateGithubAppAuthorizationUrlDocument = gql`
    mutation createGithubAppAuthorizationUrl($where: CreateGithubAppAuthorizationUrlWhereInput!) {
  createGithubAppAuthorizationUrl(where: $where)
}
    `;

export function useCreateGithubAppAuthorizationUrlMutation() {
  return Urql.useMutation<CreateGithubAppAuthorizationUrlMutation, CreateGithubAppAuthorizationUrlMutationVariables>(CreateGithubAppAuthorizationUrlDocument);
};
export const CreateGithubAppInstallationUrlDocument = gql`
    mutation createGithubAppInstallationUrl($where: CreateGithubAppInstallationUrlWhereInput!) {
  createGithubAppInstallationUrl(where: $where)
}
    `;

export function useCreateGithubAppInstallationUrlMutation() {
  return Urql.useMutation<CreateGithubAppInstallationUrlMutation, CreateGithubAppInstallationUrlMutationVariables>(CreateGithubAppInstallationUrlDocument);
};
export const CreateLoginVerificationSessionDocument = gql`
    mutation createLoginVerificationSession($where: CreateLoginVerificationSessionWhereInput!) {
  createLoginVerificationSession(where: $where)
}
    `;

export function useCreateLoginVerificationSessionMutation() {
  return Urql.useMutation<CreateLoginVerificationSessionMutation, CreateLoginVerificationSessionMutationVariables>(CreateLoginVerificationSessionDocument);
};
export const CreatePersonalAccessTokenFromVerificationSessionDocument = gql`
    mutation createPersonalAccessTokenFromVerificationSession($where: CreatePersonalAccessTokenFromVerificationSessionWhereInput!, $data: CreatePersonalAccessTokenFromVerificationSessionDataInput!) {
  createPersonalAccessTokenFromVerificationSession(where: $where, data: $data)
}
    `;

export function useCreatePersonalAccessTokenFromVerificationSessionMutation() {
  return Urql.useMutation<CreatePersonalAccessTokenFromVerificationSessionMutation, CreatePersonalAccessTokenFromVerificationSessionMutationVariables>(CreatePersonalAccessTokenFromVerificationSessionDocument);
};
export const CreatePublicKeyChallengeDocument = gql`
    mutation createPublicKeyChallenge {
  createPublicKeyChallenge
}
    `;

export function useCreatePublicKeyChallengeMutation() {
  return Urql.useMutation<CreatePublicKeyChallengeMutation, CreatePublicKeyChallengeMutationVariables>(CreatePublicKeyChallengeDocument);
};
export const DeletePersonalAccessTokenDocument = gql`
    mutation deletePersonalAccessToken($where: DeletePersonalAccessTokenWhereInput!) {
  deletePersonalAccessToken(where: $where) {
    id
  }
}
    `;

export function useDeletePersonalAccessTokenMutation() {
  return Urql.useMutation<DeletePersonalAccessTokenMutation, DeletePersonalAccessTokenMutationVariables>(DeletePersonalAccessTokenDocument);
};
export const LinkPublicKeyDocument = gql`
    mutation linkPublicKey($data: LinkPublicKeyDataInput!) {
  linkPublicKey(data: $data) {
    id
  }
}
    `;

export function useLinkPublicKeyMutation() {
  return Urql.useMutation<LinkPublicKeyMutation, LinkPublicKeyMutationVariables>(LinkPublicKeyDocument);
};
export const LoginWithDynamicDocument = gql`
    mutation loginWithDynamic($data: LoginWithDynamicDataInput!) {
  loginWithDynamic(data: $data)
}
    `;

export function useLoginWithDynamicMutation() {
  return Urql.useMutation<LoginWithDynamicMutation, LoginWithDynamicMutationVariables>(LoginWithDynamicDocument);
};
export const MeDocument = gql`
    query me {
  user {
    id
    avatar
    username
    firstName
    email
    githubUserAccessToken
    project {
      id
      name
      currentUserMembership {
        permissionGroup {
          id
          name
          permissions
        }
      }
    }
    secretKeys {
      id
      algorithm
      key
      digits
      period
      isActive
      isVerified
      verifiedAt
    }
    pendingInvitations {
      hash
      projectAvatar
      projectId
      projectName
    }
    walletAddress
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};
export const PersonalAccessTokensDocument = gql`
    query personalAccessTokens($filter: PersonalAccessTokensPaginationInput) {
  personalAccessTokens(filter: $filter) {
    data {
      id
      name
      maskedToken
      createdAt
      updatedAt
    }
  }
}
    `;

export function usePersonalAccessTokensQuery(options?: Omit<Urql.UseQueryArgs<PersonalAccessTokensQueryVariables>, 'query'>) {
  return Urql.useQuery<PersonalAccessTokensQuery, PersonalAccessTokensQueryVariables>({ query: PersonalAccessTokensDocument, ...options });
};
export const ProjectMembershipsDocument = gql`
    query projectMemberships($where: ProjectWhereInput!) {
  project(where: $where) {
    id
    memberships {
      id
      role
      user {
        id
      }
    }
  }
}
    `;

export function useProjectMembershipsQuery(options: Omit<Urql.UseQueryArgs<ProjectMembershipsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectMembershipsQuery, ProjectMembershipsQueryVariables>({ query: ProjectMembershipsDocument, ...options });
};
export const ProjectsDocument = gql`
    query projects($filter: ProjectsPaginationInput) {
  projects(filter: $filter) {
    data {
      id
      name
      backupStorageOnArweave
      backupStorageOnFilecoin
      avatar
      currentUserMembership {
        permissionGroup {
          id
          name
          permissions
        }
      }
    }
  }
}
    `;

export function useProjectsQuery(options?: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectsQuery, ProjectsQueryVariables>({ query: ProjectsDocument, ...options });
};
export const RetryDeploymentDocument = gql`
    mutation retryDeployment($where: RetryDeploymentWhereInput!) {
  retryDeployment(where: $where) {
    cid
    id
    siteId
    sourceProvider
    sourceAuthor
    sourceMessage
    sourceBranch
    storageType
    sourceRepositoryName
    sourceRepositoryOwner
    previewImageUrl
    createdAt
    startedAt
    updatedAt
    sourceRef
    status
    previewOnly
    build {
      id
      logs {
        id
        createdAt
        text
      }
      status
    }
  }
}
    `;

export function useRetryDeploymentMutation() {
  return Urql.useMutation<RetryDeploymentMutation, RetryDeploymentMutationVariables>(RetryDeploymentDocument);
};
export const StopDeploymentDocument = gql`
    mutation stopDeployment($where: StopDeploymentWhereInput!) {
  stopDeployment(where: $where)
}
    `;

export function useStopDeploymentMutation() {
  return Urql.useMutation<StopDeploymentMutation, StopDeploymentMutationVariables>(StopDeploymentDocument);
};
export const DeploymentDocument = gql`
    query deployment($where: DeploymentWhereInput!) {
  deployment(where: $where) {
    cid
    id
    sourceProvider
    sourceAuthor
    sourceMessage
    sourceBranch
    sourceRepositoryName
    sourceRepositoryOwner
    previewImageUrl
    previewOnly
    createdAt
    startedAt
    updatedAt
    sourceRef
    previewUrlSlug
    build {
      id
      logs {
        id
        createdAt
        text
      }
      status
    }
    status
  }
}
    `;

export function useDeploymentQuery(options: Omit<Urql.UseQueryArgs<DeploymentQueryVariables>, 'query'>) {
  return Urql.useQuery<DeploymentQuery, DeploymentQueryVariables>({ query: DeploymentDocument, ...options });
};
export const DeploymentStatusDocument = gql`
    query deploymentStatus($where: DeploymentWhereInput!) {
  deployment(where: $where) {
    id
    status
    createdAt
    updatedAt
  }
}
    `;

export function useDeploymentStatusQuery(options: Omit<Urql.UseQueryArgs<DeploymentStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<DeploymentStatusQuery, DeploymentStatusQueryVariables>({ query: DeploymentStatusDocument, ...options });
};
export const DeploymentsDocument = gql`
    query deployments($where: DeploymentsWhereInput!, $filter: DeploymentsPaginationInput) {
  deployments(where: $where, filter: $filter) {
    pageCount
    data {
      cid
      id
      status
      createdAt
      startedAt
      sourceProvider
      sourceAuthor
      sourceMessage
      sourceRepositoryName
      sourceRepositoryOwner
      previewImageUrl
      previewOnly
      storageType
      sourceBranch
      updatedAt
      sourceRef
      previewUrlSlug
    }
    totalCount
  }
}
    `;

export function useDeploymentsQuery(options: Omit<Urql.UseQueryArgs<DeploymentsQueryVariables>, 'query'>) {
  return Urql.useQuery<DeploymentsQuery, DeploymentsQueryVariables>({ query: DeploymentsDocument, ...options });
};
export const CreateDnsConfigDocument = gql`
    mutation createDnsConfig($data: CreateDnsConfigDataInput!, $where: CreateDnsConfigWhereInput!) {
  createDnsConfig(data: $data, where: $where) {
    __typename
    id
    type
    name
    value
    createdAt
    updatedAt
  }
}
    `;

export function useCreateDnsConfigMutation() {
  return Urql.useMutation<CreateDnsConfigMutation, CreateDnsConfigMutationVariables>(CreateDnsConfigDocument);
};
export const CreateDomainDocument = gql`
    mutation createDomain($where: CreateDomainWhereInput!, $data: CreateDomainDataInput!) {
  createDomain(where: $where, data: $data) {
    id
    status
  }
}
    `;

export function useCreateDomainMutation() {
  return Urql.useMutation<CreateDomainMutation, CreateDomainMutationVariables>(CreateDomainDocument);
};
export const DeleteDomainDocument = gql`
    mutation deleteDomain($where: DeleteDomainWhereInput!) {
  deleteDomain(where: $where) {
    id
    status
    hostname
    zone {
      id
    }
  }
}
    `;

export function useDeleteDomainMutation() {
  return Urql.useMutation<DeleteDomainMutation, DeleteDomainMutationVariables>(DeleteDomainDocument);
};
export const SelectPrimaryDomainDocument = gql`
    mutation selectPrimaryDomain($where: SelectPrimaryDomainWhereInput!) {
  selectPrimaryDomain(where: $where) {
    __typename
    id
    hostname
  }
}
    `;

export function useSelectPrimaryDomainMutation() {
  return Urql.useMutation<SelectPrimaryDomainMutation, SelectPrimaryDomainMutationVariables>(SelectPrimaryDomainDocument);
};
export const VerifyDnslinkDocument = gql`
    mutation verifyDnslink($where: VerifyDnslinkWhereInput!) {
  verifyDnslink(where: $where) {
    id
    hostname
    createdAt
    status
    isVerified
    errorMessage
    dnslinkStatus
    dnsConfigs {
      id
      type
      name
      value
    }
  }
}
    `;

export function useVerifyDnslinkMutation() {
  return Urql.useMutation<VerifyDnslinkMutation, VerifyDnslinkMutationVariables>(VerifyDnslinkDocument);
};
export const VerifyDomainDocument = gql`
    mutation verifyDomain($where: VerifyDomainWhereInput!) {
  verifyDomain(where: $where) {
    id
    hostname
    createdAt
    status
    isVerified
    errorMessage
    dnslinkStatus
    dnsConfigs {
      id
      type
      name
      value
    }
  }
}
    `;

export function useVerifyDomainMutation() {
  return Urql.useMutation<VerifyDomainMutation, VerifyDomainMutationVariables>(VerifyDomainDocument);
};
export const DomainDocument = gql`
    query domain($where: DomainWhereInput!) {
  domain(where: $where) {
    id
    hostname
    createdAt
    status
    isVerified
    errorMessage
    dnslinkStatus
    dnsConfigs {
      id
      type
      name
      value
    }
  }
}
    `;

export function useDomainQuery(options: Omit<Urql.UseQueryArgs<DomainQueryVariables>, 'query'>) {
  return Urql.useQuery<DomainQuery, DomainQueryVariables>({ query: DomainDocument, ...options });
};
export const DomainAvailabilityDocument = gql`
    query domainAvailability($where: DomainAvailabilityWhereInput!) {
  domainAvailability(where: $where)
}
    `;

export function useDomainAvailabilityQuery(options: Omit<Urql.UseQueryArgs<DomainAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<DomainAvailabilityQuery, DomainAvailabilityQueryVariables>({ query: DomainAvailabilityDocument, ...options });
};
export const DomainByHostnameDocument = gql`
    query domainByHostname($where: DomainByHostnameWhereInput!) {
  domainByHostname(where: $where) {
    id
    hostname
    errorMessage
    createdAt
    status
  }
}
    `;

export function useDomainByHostnameQuery(options: Omit<Urql.UseQueryArgs<DomainByHostnameQueryVariables>, 'query'>) {
  return Urql.useQuery<DomainByHostnameQuery, DomainByHostnameQueryVariables>({ query: DomainByHostnameDocument, ...options });
};
export const DomainDnsLinkStatusDocument = gql`
    query domainDnsLinkStatus($where: DomainWhereInput!) {
  domain(where: $where) {
    id
    dnslinkStatus
    errorMessage
    dnsConfigs {
      id
      type
      name
      value
    }
  }
}
    `;

export function useDomainDnsLinkStatusQuery(options: Omit<Urql.UseQueryArgs<DomainDnsLinkStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<DomainDnsLinkStatusQuery, DomainDnsLinkStatusQueryVariables>({ query: DomainDnsLinkStatusDocument, ...options });
};
export const DomainStatusDocument = gql`
    query domainStatus($where: DomainWhereInput!) {
  domain(where: $where) {
    id
    status
    errorMessage
    dnsConfigs {
      id
      type
      name
      value
    }
  }
}
    `;

export function useDomainStatusQuery(options: Omit<Urql.UseQueryArgs<DomainStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<DomainStatusQuery, DomainStatusQueryVariables>({ query: DomainStatusDocument, ...options });
};
export const DomainsDocument = gql`
    query domains($filter: DomainsPaginationInput) {
  domains(filter: $filter) {
    data {
      id
      errorMessage
      hostname
      createdAt
      status
    }
  }
}
    `;

export function useDomainsQuery(options?: Omit<Urql.UseQueryArgs<DomainsQueryVariables>, 'query'>) {
  return Urql.useQuery<DomainsQuery, DomainsQueryVariables>({ query: DomainsDocument, ...options });
};
export const DomainsByZoneIdDocument = gql`
    query domainsByZoneId($where: DomainsByZoneIdWhereInput!, $filter: DomainsByZoneIdPaginationInput) {
  domainsByZoneId(where: $where, filter: $filter) {
    data {
      __typename
      id
      hostname
      status
      errorMessage
      zone {
        id
      }
      dnsConfigs {
        __typename
        createdAt
        id
        name
        type
        updatedAt
        value
      }
      isVerified
      createdAt
      updatedAt
    }
  }
}
    `;

export function useDomainsByZoneIdQuery(options: Omit<Urql.UseQueryArgs<DomainsByZoneIdQueryVariables>, 'query'>) {
  return Urql.useQuery<DomainsByZoneIdQuery, DomainsByZoneIdQueryVariables>({ query: DomainsByZoneIdDocument, ...options });
};
export const CreateEnsRecordDocument = gql`
    mutation createEnsRecord($where: CreateEnsRecordWhereInput!, $data: CreateEnsRecordDataInput!) {
  createEnsRecord(where: $where, data: $data) {
    id
    status
  }
}
    `;

export function useCreateEnsRecordMutation() {
  return Urql.useMutation<CreateEnsRecordMutation, CreateEnsRecordMutationVariables>(CreateEnsRecordDocument);
};
export const DeleteEnsRecordDocument = gql`
    mutation deleteEnsRecord($where: DeleteEnsRecordWhereInput!) {
  deleteEnsRecord(where: $where) {
    id
    status
  }
}
    `;

export function useDeleteEnsRecordMutation() {
  return Urql.useMutation<DeleteEnsRecordMutation, DeleteEnsRecordMutationVariables>(DeleteEnsRecordDocument);
};
export const VerifyEnsRecordDocument = gql`
    mutation verifyEnsRecord($where: VerifyEnsRecordWhereInput!) {
  verifyEnsRecord(where: $where) {
    id
    status
  }
}
    `;

export function useVerifyEnsRecordMutation() {
  return Urql.useMutation<VerifyEnsRecordMutation, VerifyEnsRecordMutationVariables>(VerifyEnsRecordDocument);
};
export const EnsNameAvailabilityDocument = gql`
    query ensNameAvailability($where: EnsNameAvailabilityWhereInput!) {
  ensNameAvailability(where: $where)
}
    `;

export function useEnsNameAvailabilityQuery(options: Omit<Urql.UseQueryArgs<EnsNameAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<EnsNameAvailabilityQuery, EnsNameAvailabilityQueryVariables>({ query: EnsNameAvailabilityDocument, ...options });
};
export const EnsRecordDocument = gql`
    query ensRecord($where: EnsRecordWhereInput!) {
  ensRecord(where: $where) {
    id
    name
    createdAt
    status
    ipnsRecord {
      id
      hash
      name
    }
  }
}
    `;

export function useEnsRecordQuery(options: Omit<Urql.UseQueryArgs<EnsRecordQueryVariables>, 'query'>) {
  return Urql.useQuery<EnsRecordQuery, EnsRecordQueryVariables>({ query: EnsRecordDocument, ...options });
};
export const EnsRecordByNameDocument = gql`
    query ensRecordByName($where: EnsRecordByNameWhereInput!) {
  ensRecordByName(where: $where) {
    id
    name
    createdAt
    status
  }
}
    `;

export function useEnsRecordByNameQuery(options: Omit<Urql.UseQueryArgs<EnsRecordByNameQueryVariables>, 'query'>) {
  return Urql.useQuery<EnsRecordByNameQuery, EnsRecordByNameQueryVariables>({ query: EnsRecordByNameDocument, ...options });
};
export const EnsRecordsByIpnsIdDocument = gql`
    query ensRecordsByIpnsId($where: EnsRecordsByIpnsIdWhereInput!, $filter: EnsRecordsByIpnsIdPaginationInput) {
  ensRecordsByIpnsId(where: $where, filter: $filter) {
    data {
      id
      name
      createdAt
      status
    }
  }
}
    `;

export function useEnsRecordsByIpnsIdQuery(options: Omit<Urql.UseQueryArgs<EnsRecordsByIpnsIdQueryVariables>, 'query'>) {
  return Urql.useQuery<EnsRecordsByIpnsIdQuery, EnsRecordsByIpnsIdQueryVariables>({ query: EnsRecordsByIpnsIdDocument, ...options });
};
export const EnsRecordStatusDocument = gql`
    query ensRecordStatus($where: EnsRecordWhereInput!) {
  ensRecord(where: $where) {
    id
    status
  }
}
    `;

export function useEnsRecordStatusQuery(options: Omit<Urql.UseQueryArgs<EnsRecordStatusQueryVariables>, 'query'>) {
  return Urql.useQuery<EnsRecordStatusQuery, EnsRecordStatusQueryVariables>({ query: EnsRecordStatusDocument, ...options });
};
export const SiteDeploymentRequirementsDocument = gql`
    mutation siteDeploymentRequirements($where: SiteDeploymentRequirementsWhereInput!) {
  siteDeploymentRequirements(where: $where) {
    authorizationUrl
    installationUrl
    shouldAuthenticate
    shouldInstall
  }
}
    `;

export function useSiteDeploymentRequirementsMutation() {
  return Urql.useMutation<SiteDeploymentRequirementsMutation, SiteDeploymentRequirementsMutationVariables>(SiteDeploymentRequirementsDocument);
};
export const GitBranchesDocument = gql`
    query gitBranches($where: GitApiBranchesWhereInput!) {
  gitApiBranches(where: $where) {
    name
  }
}
    `;

export function useGitBranchesQuery(options: Omit<Urql.UseQueryArgs<GitBranchesQueryVariables>, 'query'>) {
  return Urql.useQuery<GitBranchesQuery, GitBranchesQueryVariables>({ query: GitBranchesDocument, ...options });
};
export const GitInstallationsDocument = gql`
    query gitInstallations($where: GitApiInstallationsWhereInput!) {
  gitApiInstallations(where: $where) {
    avatar
    installationId
    name
  }
}
    `;

export function useGitInstallationsQuery(options: Omit<Urql.UseQueryArgs<GitInstallationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GitInstallationsQuery, GitInstallationsQueryVariables>({ query: GitInstallationsDocument, ...options });
};
export const GitIntegrationDocument = gql`
    query gitIntegration($where: GitIntegrationWhereInput!) {
  gitIntegration(where: $where) {
    id
  }
}
    `;

export function useGitIntegrationQuery(options: Omit<Urql.UseQueryArgs<GitIntegrationQueryVariables>, 'query'>) {
  return Urql.useQuery<GitIntegrationQuery, GitIntegrationQueryVariables>({ query: GitIntegrationDocument, ...options });
};
export const GitProviderDocument = gql`
    query gitProvider($where: GitProviderWhereInput!) {
  gitProvider(where: $where) {
    id
    name
    tags
    enabled
    sourceProvider
    createdAt
  }
}
    `;

export function useGitProviderQuery(options: Omit<Urql.UseQueryArgs<GitProviderQueryVariables>, 'query'>) {
  return Urql.useQuery<GitProviderQuery, GitProviderQueryVariables>({ query: GitProviderDocument, ...options });
};
export const GitProvidersDocument = gql`
    query gitProviders {
  gitProviders {
    id
    name
    tags
    enabled
    sourceProvider
    createdAt
  }
}
    `;

export function useGitProvidersQuery(options?: Omit<Urql.UseQueryArgs<GitProvidersQueryVariables>, 'query'>) {
  return Urql.useQuery<GitProvidersQuery, GitProvidersQueryVariables>({ query: GitProvidersDocument, ...options });
};
export const GitRepositoriesDocument = gql`
    query gitRepositories($where: GitApiInstallationsWhereInput!) {
  gitApiInstallations(where: $where) {
    avatar
    installationId
    isOrganization
    name
    repos {
      id
      defaultBranch
      name
    }
  }
}
    `;

export function useGitRepositoriesQuery(options: Omit<Urql.UseQueryArgs<GitRepositoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GitRepositoriesQuery, GitRepositoriesQueryVariables>({ query: GitRepositoriesDocument, ...options });
};
export const GitSiteBuildSettingsDocument = gql`
    query gitSiteBuildSettings($where: SiteBuildSettingsWhereInput!) {
  siteBuildSettings(where: $where) {
    buildCommand
    dockerImage
    publishDirectory
    envVars
    frameworkId
  }
}
    `;

export function useGitSiteBuildSettingsQuery(options: Omit<Urql.UseQueryArgs<GitSiteBuildSettingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GitSiteBuildSettingsQuery, GitSiteBuildSettingsQueryVariables>({ query: GitSiteBuildSettingsDocument, ...options });
};
export const GitTreeDocument = gql`
    query gitTree($where: GitApiTreeWhereInput!) {
  gitApiTree(where: $where) {
    path
    mode
    type
    sha
    size
    url
  }
}
    `;

export function useGitTreeQuery(options: Omit<Urql.UseQueryArgs<GitTreeQueryVariables>, 'query'>) {
  return Urql.useQuery<GitTreeQuery, GitTreeQueryVariables>({ query: GitTreeDocument, ...options });
};
export const GithubAppInstallationsDocument = gql`
    query githubAppInstallations($where: GithubAppInstallationsWhereInput!) {
  githubAppInstallations(where: $where) {
    id
    installationId
    projectId
  }
}
    `;

export function useGithubAppInstallationsQuery(options: Omit<Urql.UseQueryArgs<GithubAppInstallationsQueryVariables>, 'query'>) {
  return Urql.useQuery<GithubAppInstallationsQuery, GithubAppInstallationsQueryVariables>({ query: GithubAppInstallationsDocument, ...options });
};
export const CreateProjectGithubIntegrationDocument = gql`
    mutation createProjectGithubIntegration($data: CreateGithubIntegrationForProjectDataInput!) {
  createGithubIntegrationForProject(data: $data)
}
    `;

export function useCreateProjectGithubIntegrationMutation() {
  return Urql.useMutation<CreateProjectGithubIntegrationMutation, CreateProjectGithubIntegrationMutationVariables>(CreateProjectGithubIntegrationDocument);
};
export const CreateRepositoryFromTemplateDocument = gql`
    mutation createRepositoryFromTemplate($where: CreateGithubRepoFromTemplateWhereInput!, $data: CreateGithubRepoFromTemplateDataInput!) {
  createGithubRepoFromTemplate(where: $where, data: $data) {
    url
    name
    isPrivate
    defaultBranch
    repositoryId
  }
}
    `;

export function useCreateRepositoryFromTemplateMutation() {
  return Urql.useMutation<CreateRepositoryFromTemplateMutation, CreateRepositoryFromTemplateMutationVariables>(CreateRepositoryFromTemplateDocument);
};
export const CreateIpnsRecordForSiteDocument = gql`
    mutation createIpnsRecordForSite($where: CreateIpnsRecordForSiteWhereInput!) {
  createIpnsRecordForSite(where: $where) {
    id
    name
    hash
    createdAt
  }
}
    `;

export function useCreateIpnsRecordForSiteMutation() {
  return Urql.useMutation<CreateIpnsRecordForSiteMutation, CreateIpnsRecordForSiteMutationVariables>(CreateIpnsRecordForSiteDocument);
};
export const IpnsRecordDocument = gql`
    query ipnsRecord($where: IpnsRecordWhereInput!) {
  ipnsRecord(where: $where) {
    id
    name
    hash
    createdAt
  }
}
    `;

export function useIpnsRecordQuery(options: Omit<Urql.UseQueryArgs<IpnsRecordQueryVariables>, 'query'>) {
  return Urql.useQuery<IpnsRecordQuery, IpnsRecordQueryVariables>({ query: IpnsRecordDocument, ...options });
};
export const CreateMigrationRequestsFromTokenDocument = gql`
    mutation createMigrationRequestsFromToken($data: CreateMigrationRequestsFromTokenDataInput!) {
  createMigrationRequestsFromToken(data: $data) {
    id
    status
    teamId
    teamInfo {
      sitesCount
      filesCount
      usersCount
      name
      id
    }
    createdAt
  }
}
    `;

export function useCreateMigrationRequestsFromTokenMutation() {
  return Urql.useMutation<CreateMigrationRequestsFromTokenMutation, CreateMigrationRequestsFromTokenMutationVariables>(CreateMigrationRequestsFromTokenDocument);
};
export const CreateMigrationTokenDocument = gql`
    mutation createMigrationToken($data: CreateMigrationTokenDataInput!) {
  createMigrationToken(data: $data)
}
    `;

export function useCreateMigrationTokenMutation() {
  return Urql.useMutation<CreateMigrationTokenMutation, CreateMigrationTokenMutationVariables>(CreateMigrationTokenDocument);
};
export const MigrationRequestsDocument = gql`
    query migrationRequests {
  migrationRequests {
    data {
      id
      status
      teamId
      teamInfo {
        sitesCount
        filesCount
        usersCount
        name
        id
      }
      createdAt
    }
  }
}
    `;

export function useMigrationRequestsQuery(options?: Omit<Urql.UseQueryArgs<MigrationRequestsQueryVariables>, 'query'>) {
  return Urql.useQuery<MigrationRequestsQuery, MigrationRequestsQueryVariables>({ query: MigrationRequestsDocument, ...options });
};
export const MigrationTeamInfosFromTokenDocument = gql`
    query migrationTeamInfosFromToken($where: MigrationTeamInfosFromTokenWhereInput!) {
  migrationTeamInfosFromToken(where: $where) {
    id
    name
    filesCount
    sitesCount
    usersCount
  }
}
    `;

export function useMigrationTeamInfosFromTokenQuery(options: Omit<Urql.UseQueryArgs<MigrationTeamInfosFromTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<MigrationTeamInfosFromTokenQuery, MigrationTeamInfosFromTokenQueryVariables>({ query: MigrationTeamInfosFromTokenDocument, ...options });
};
export const DeletePinDocument = gql`
    mutation deletePin($where: DeletePinWhereInput!) {
  deletePin(where: $where) {
    id
  }
}
    `;

export function useDeletePinMutation() {
  return Urql.useMutation<DeletePinMutation, DeletePinMutationVariables>(DeletePinDocument);
};
export const UpdatePinDocument = gql`
    mutation updatePin($data: UpdatePinDataInput!, $where: UpdatePinWhereInput!) {
  updatePin(data: $data, where: $where) {
    id
    cid
    size
    extension
    createdAt
    filename
  }
}
    `;

export function useUpdatePinMutation() {
  return Urql.useMutation<UpdatePinMutation, UpdatePinMutationVariables>(UpdatePinDocument);
};
export const ListFolderDocument = gql`
    query listFolder($where: ListFolderWhereInput!, $filter: ListFolderPaginationInput) {
  listFolder(where: $where, filter: $filter) {
    pageCount
    data {
      ...PinFragment
      ...FolderFragment
    }
  }
}
    ${PinFragmentFragmentDoc}
${FolderFragmentFragmentDoc}`;

export function useListFolderQuery(options: Omit<Urql.UseQueryArgs<ListFolderQueryVariables>, 'query'>) {
  return Urql.useQuery<ListFolderQuery, ListFolderQueryVariables>({ query: ListFolderDocument, ...options });
};
export const PinsDocument = gql`
    query pins($filter: PinsPaginationInput) {
  pins(filter: $filter) {
    pageCount
    data {
      ...PinFragment
    }
  }
}
    ${PinFragmentFragmentDoc}`;

export function usePinsQuery(options?: Omit<Urql.UseQueryArgs<PinsQueryVariables>, 'query'>) {
  return Urql.useQuery<PinsQuery, PinsQueryVariables>({ query: PinsDocument, ...options });
};
export const PinDocument = gql`
    query pin($where: PinWhereInput!) {
  pin(where: $where) {
    ...PinFragment
  }
}
    ${PinFragmentFragmentDoc}`;

export function usePinQuery(options: Omit<Urql.UseQueryArgs<PinQueryVariables>, 'query'>) {
  return Urql.useQuery<PinQuery, PinQueryVariables>({ query: PinDocument, ...options });
};
export const PinNameAvailabilityInParentFolderDocument = gql`
    query pinNameAvailabilityInParentFolder($data: PinNameAvailabilityInParentFolderDataInput!, $where: PinNameAvailabilityInParentFolderWhereInput!) {
  pinNameAvailabilityInParentFolder(data: $data, where: $where)
}
    `;

export function usePinNameAvailabilityInParentFolderQuery(options: Omit<Urql.UseQueryArgs<PinNameAvailabilityInParentFolderQueryVariables>, 'query'>) {
  return Urql.useQuery<PinNameAvailabilityInParentFolderQuery, PinNameAvailabilityInParentFolderQueryVariables>({ query: PinNameAvailabilityInParentFolderDocument, ...options });
};
export const CreatePrivateGatewayDocument = gql`
    mutation createPrivateGateway($where: CreatePrivateGatewayWhereInput!, $data: CreatePrivateGatewayDataInput!) {
  createPrivateGateway(where: $where, data: $data) {
    id
    name
    createdAt
    zone {
      id
    }
  }
}
    `;

export function useCreatePrivateGatewayMutation() {
  return Urql.useMutation<CreatePrivateGatewayMutation, CreatePrivateGatewayMutationVariables>(CreatePrivateGatewayDocument);
};
export const DeletePrivateGatewayDocument = gql`
    mutation deletePrivateGateway($where: DeletePrivateGatewayWhereInput!) {
  deletePrivateGateway(where: $where) {
    id
    name
  }
}
    `;

export function useDeletePrivateGatewayMutation() {
  return Urql.useMutation<DeletePrivateGatewayMutation, DeletePrivateGatewayMutationVariables>(DeletePrivateGatewayDocument);
};
export const DeletePrivateGatewayDependenciesDocument = gql`
    query deletePrivateGatewayDependencies($where: PrivateGatewayWhereInput!) {
  privateGateway(where: $where) {
    name
    primaryDomain {
      id
      hostname
      status
      isVerified
    }
    zone {
      id
      status
      type
    }
    domains {
      __typename
      id
      status
      hostname
      isVerified
    }
  }
}
    `;

export function useDeletePrivateGatewayDependenciesQuery(options: Omit<Urql.UseQueryArgs<DeletePrivateGatewayDependenciesQueryVariables>, 'query'>) {
  return Urql.useQuery<DeletePrivateGatewayDependenciesQuery, DeletePrivateGatewayDependenciesQueryVariables>({ query: DeletePrivateGatewayDependenciesDocument, ...options });
};
export const PrivateGatewayNameAvailabilityDocument = gql`
    query privateGatewayNameAvailability($where: PrivateGatewayNameAvailabilityWhereInput!) {
  privateGatewayNameAvailability(where: $where)
}
    `;

export function usePrivateGatewayNameAvailabilityQuery(options: Omit<Urql.UseQueryArgs<PrivateGatewayNameAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<PrivateGatewayNameAvailabilityQuery, PrivateGatewayNameAvailabilityQueryVariables>({ query: PrivateGatewayNameAvailabilityDocument, ...options });
};
export const PrivateGatewaysDocument = gql`
    query privateGateways($filter: PrivateGatewaysPaginationInput) {
  privateGateways(filter: $filter) {
    data {
      id
      name
      createdAt
      zone {
        id
      }
      domains {
        __typename
        id
        hostname
        status
        errorMessage
        zone {
          id
        }
        dnsConfigs {
          __typename
          createdAt
          id
          name
          type
          updatedAt
          value
        }
        isVerified
        createdAt
        updatedAt
      }
      primaryDomain {
        id
        hostname
        isVerified
      }
    }
  }
}
    `;

export function usePrivateGatewaysQuery(options?: Omit<Urql.UseQueryArgs<PrivateGatewaysQueryVariables>, 'query'>) {
  return Urql.useQuery<PrivateGatewaysQuery, PrivateGatewaysQueryVariables>({ query: PrivateGatewaysDocument, ...options });
};
export const CreateProjectDocument = gql`
    mutation createProject($data: CreateProjectDataInput!) {
  createProject(data: $data) {
    id
    name
    backupStorageOnArweave
    backupStorageOnFilecoin
    avatar
    currentUserMembership {
      permissionGroup {
        id
        name
        permissions
      }
    }
  }
}
    `;

export function useCreateProjectMutation() {
  return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
};
export const DeleteMembershipDocument = gql`
    mutation deleteMembership($where: DeleteMembershipWhereInput!) {
  deleteMembership(where: $where) {
    id
  }
}
    `;

export function useDeleteMembershipMutation() {
  return Urql.useMutation<DeleteMembershipMutation, DeleteMembershipMutationVariables>(DeleteMembershipDocument);
};
export const DeleteProjectDocument = gql`
    mutation deleteProject($where: DeleteProjectWhereInput!) {
  deleteProject(where: $where) {
    id
    name
  }
}
    `;

export function useDeleteProjectMutation() {
  return Urql.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument);
};
export const CreateFleekFunctionDocument = gql`
    mutation createFleekFunction($data: CreateFleekFunctionDataInput!) {
  createFleekFunction(data: $data) {
    ...FleekFunctionFragment
  }
}
    ${FleekFunctionFragmentFragmentDoc}`;

export function useCreateFleekFunctionMutation() {
  return Urql.useMutation<CreateFleekFunctionMutation, CreateFleekFunctionMutationVariables>(CreateFleekFunctionDocument);
};
export const DeleteFleekFunctionDocument = gql`
    mutation deleteFleekFunction($where: DeleteFleekFunctionWhereInput!) {
  deleteFleekFunction(where: $where) {
    id
  }
}
    `;

export function useDeleteFleekFunctionMutation() {
  return Urql.useMutation<DeleteFleekFunctionMutation, DeleteFleekFunctionMutationVariables>(DeleteFleekFunctionDocument);
};
export const UpdateFleekFunctionDocument = gql`
    mutation updateFleekFunction($where: UpdateFleekFunctionWhereInput!, $data: UpdateFleekFunctionDataInput!) {
  updateFleekFunction(where: $where, data: $data) {
    ...FleekFunctionFragment
  }
}
    ${FleekFunctionFragmentFragmentDoc}`;

export function useUpdateFleekFunctionMutation() {
  return Urql.useMutation<UpdateFleekFunctionMutation, UpdateFleekFunctionMutationVariables>(UpdateFleekFunctionDocument);
};
export const LeaveProjectDocument = gql`
    mutation leaveProject($where: LeaveProjectWhereInput!) {
  leaveProject(where: $where) {
    id
  }
}
    `;

export function useLeaveProjectMutation() {
  return Urql.useMutation<LeaveProjectMutation, LeaveProjectMutationVariables>(LeaveProjectDocument);
};
export const UpdateProjectDocument = gql`
    mutation updateProject($data: UpdateProjectDataInput!, $where: UpdateProjectWhereInput!) {
  updateProject(data: $data, where: $where) {
    id
    name
    backupStorageOnArweave
    backupStorageOnFilecoin
    allowAccessFromOfacCountries
    avatar
  }
}
    `;

export function useUpdateProjectMutation() {
  return Urql.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument);
};
export const FleekFunctionsDocument = gql`
    query fleekFunctions($filter: FleekFunctionsPaginationInput, $where: FleekFunctionsWhereInput) {
  fleekFunctions(filter: $filter, where: $where) {
    data {
      ...FleekFunctionFragment
    }
    pageCount
    currentPage
  }
}
    ${FleekFunctionFragmentFragmentDoc}`;

export function useFleekFunctionsQuery(options?: Omit<Urql.UseQueryArgs<FleekFunctionsQueryVariables>, 'query'>) {
  return Urql.useQuery<FleekFunctionsQuery, FleekFunctionsQueryVariables>({ query: FleekFunctionsDocument, ...options });
};
export const FleekFunctionDetailDocument = gql`
    query fleekFunctionDetail($where: FleekFunctionByNameWhereInput!) {
  fleekFunctionByName(where: $where) {
    ...FleekFunctionFragment
  }
}
    ${FleekFunctionFragmentFragmentDoc}`;

export function useFleekFunctionDetailQuery(options: Omit<Urql.UseQueryArgs<FleekFunctionDetailQueryVariables>, 'query'>) {
  return Urql.useQuery<FleekFunctionDetailQuery, FleekFunctionDetailQueryVariables>({ query: FleekFunctionDetailDocument, ...options });
};
export const FleekFunctionDeploymentsDocument = gql`
    query fleekFunctionDeployments($fleekFunctionId: ID!, $page: Int) {
  fleekFunctionDeployments(
    where: {fleekFunctionId: $fleekFunctionId}
    filter: {page: $page}
  ) {
    data {
      id
      cid
      createdAt
      updatedAt
    }
    pageCount
    currentPage
  }
}
    `;

export function useFleekFunctionDeploymentsQuery(options: Omit<Urql.UseQueryArgs<FleekFunctionDeploymentsQueryVariables>, 'query'>) {
  return Urql.useQuery<FleekFunctionDeploymentsQuery, FleekFunctionDeploymentsQueryVariables>({ query: FleekFunctionDeploymentsDocument, ...options });
};
export const ProjectDocument = gql`
    query project($where: ProjectWhereInput!) {
  project(where: $where) {
    id
    name
    backupStorageOnArweave
    backupStorageOnFilecoin
    allowAccessFromOfacCountries
    avatar
    currentUserMembership {
      permissionGroup {
        id
        name
        permissions
      }
    }
  }
}
    `;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectQuery, ProjectQueryVariables>({ query: ProjectDocument, ...options });
};
export const CreateSalesContactRequestDocument = gql`
    mutation createSalesContactRequest($data: CreateSalesContactRequestDataInput!) {
  createSalesContactRequest(data: $data) {
    id
    email
    description
    createdAt
  }
}
    `;

export function useCreateSalesContactRequestMutation() {
  return Urql.useMutation<CreateSalesContactRequestMutation, CreateSalesContactRequestMutationVariables>(CreateSalesContactRequestDocument);
};
export const CreateSecretDocument = gql`
    mutation createSecret($data: CreateSecretDataInput!) {
  createSecret(data: $data) {
    id
  }
}
    `;

export function useCreateSecretMutation() {
  return Urql.useMutation<CreateSecretMutation, CreateSecretMutationVariables>(CreateSecretDocument);
};
export const DeleteSecretDocument = gql`
    mutation deleteSecret($where: DeleteSecretWhereInput!) {
  deleteSecret(where: $where) {
    id
  }
}
    `;

export function useDeleteSecretMutation() {
  return Urql.useMutation<DeleteSecretMutation, DeleteSecretMutationVariables>(DeleteSecretDocument);
};
export const UpdateSecretDocument = gql`
    mutation updateSecret($where: UpdateSecretWhereInput!, $data: UpdateSecretDataInput!) {
  updateSecret(where: $where, data: $data) {
    id
    value
    visibility
  }
}
    `;

export function useUpdateSecretMutation() {
  return Urql.useMutation<UpdateSecretMutation, UpdateSecretMutationVariables>(UpdateSecretDocument);
};
export const CreateSiteDocument = gql`
    mutation createSite($data: CreateSiteDataInput!) {
  createSite(data: $data) {
    __typename
    id
    name
    sourceProvider
    sourceRepositoryId
    sourceRepositoryOwner
    sourceRepositoryName
    sourceBranch
    enablePreviews
    baseDirectory
    buildCommand
    distDirectory
    dockerImage
    cpuLimit
    memoryLimit
    buildDurationLimitSeconds
    secretGroup {
      id
    }
  }
}
    `;

export function useCreateSiteMutation() {
  return Urql.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument);
};
export const DeleteSiteDocument = gql`
    mutation deleteSite($where: DeleteSiteWhereInput!) {
  deleteSite(where: $where) {
    id
  }
}
    `;

export function useDeleteSiteMutation() {
  return Urql.useMutation<DeleteSiteMutation, DeleteSiteMutationVariables>(DeleteSiteDocument);
};
export const PurgeSiteCacheDocument = gql`
    mutation purgeSiteCache($where: PurgeSiteCacheWhereInput!) {
  purgeSiteCache(where: $where) {
    id
  }
}
    `;

export function usePurgeSiteCacheMutation() {
  return Urql.useMutation<PurgeSiteCacheMutation, PurgeSiteCacheMutationVariables>(PurgeSiteCacheDocument);
};
export const TriggerDeploymentDocument = gql`
    mutation triggerDeployment($where: TriggerDeploymentWhereInput!) {
  triggerDeployment(where: $where) {
    cid
    id
    siteId
    sourceProvider
    sourceAuthor
    sourceMessage
    sourceBranch
    storageType
    sourceRepositoryName
    sourceRepositoryOwner
    previewImageUrl
    createdAt
    startedAt
    updatedAt
    sourceRef
    status
    previewOnly
    previewOnly
    build {
      id
      logs {
        id
        createdAt
        text
      }
      status
    }
  }
}
    `;

export function useTriggerDeploymentMutation() {
  return Urql.useMutation<TriggerDeploymentMutation, TriggerDeploymentMutationVariables>(TriggerDeploymentDocument);
};
export const UpdateSiteDocument = gql`
    mutation updateSite($data: UpdateSiteDataInput!, $where: UpdateSiteWhereInput!) {
  updateSite(data: $data, where: $where) {
    id
    name
    slug
    sourceProvider
    sourceRepositoryId
    sourceRepositoryOwner
    sourceRepositoryName
    sourceBranch
    enablePreviews
    baseDirectory
    buildCommand
    distDirectory
    dockerImage
    cpuLimit
    memoryLimit
    buildDurationLimitSeconds
  }
}
    `;

export function useUpdateSiteMutation() {
  return Urql.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument);
};
export const SiteQuotaDocument = gql`
    query siteQuota($where: SiteQuotaWhereInput!) {
  siteQuota(where: $where) {
    maxDeploymentQueue {
      total
      remaining
    }
  }
}
    `;

export function useSiteQuotaQuery(options: Omit<Urql.UseQueryArgs<SiteQuotaQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteQuotaQuery, SiteQuotaQueryVariables>({ query: SiteQuotaDocument, ...options });
};
export const SecretAvailabilityDocument = gql`
    query secretAvailability($where: SecretAvailabilityWhereInput!) {
  secretAvailability(where: $where)
}
    `;

export function useSecretAvailabilityQuery(options: Omit<Urql.UseQueryArgs<SecretAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<SecretAvailabilityQuery, SecretAvailabilityQueryVariables>({ query: SecretAvailabilityDocument, ...options });
};
export const SiteDocument = gql`
    query site($where: SiteWhereInput!) {
  site(where: $where) {
    id
    avatar
    slug
    name
    sourceProvider
    sourceRepositoryId
    sourceRepositoryOwner
    sourceRepositoryName
    sourceBranch
    githubInstallationId
    enablePreviews
    baseDirectory
    buildCommand
    distDirectory
    dockerImage
    cpuLimit
    memoryLimit
    buildDurationLimitSeconds
    currentDeployment {
      cid
      id
      status
      createdAt
      sourceProvider
      sourceAuthor
      sourceMessage
      sourceRepositoryName
      sourceRepositoryOwner
      previewImageUrl
      previewOnly
      storageType
      sourceBranch
      updatedAt
      sourceRef
      startedAt
      functionDeployments {
        id
      }
    }
    lastDeployment {
      cid
      id
      siteId
      sourceProvider
      sourceAuthor
      sourceMessage
      sourceBranch
      storageType
      sourceRepositoryName
      sourceRepositoryOwner
      previewImageUrl
      createdAt
      updatedAt
      startedAt
      sourceRef
      status
      previewOnly
    }
    ipnsRecords {
      id
      hash
      name
      ensRecords {
        __typename
        createdAt
        id
        name
        status
        updatedAt
      }
    }
    zones {
      id
      status
    }
    secretGroup {
      id
      name
      secrets {
        id
        key
        value
        visibility
        updatedAt
      }
    }
    domains {
      __typename
      id
      hostname
      status
      errorMessage
      zone {
        id
      }
      dnsConfigs {
        __typename
        createdAt
        id
        name
        type
        updatedAt
        value
      }
      isVerified
      createdAt
      updatedAt
      dnslinkStatus
    }
    primaryDomain {
      id
      hostname
      isVerified
    }
    framework {
      id
      name
      avatar
    }
    gitIntegration {
      id
      __typename
      gitProvider {
        id
        name
        tags
        enabled
        sourceProvider
      }
      githubAppInstallation {
        id
        installationId
      }
    }
  }
}
    `;

export function useSiteQuery(options: Omit<Urql.UseQueryArgs<SiteQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteQuery, SiteQueryVariables>({ query: SiteDocument, ...options });
};
export const SiteFrameworksDocument = gql`
    query siteFrameworks {
  siteFrameworks {
    id
    name
    slug
    avatar
    dockerImage
    publishDirectory
    buildScript
    recognitionStrategy
    recognitionArgument
    templatesCount
    createdAt
    updatedAt
  }
}
    `;

export function useSiteFrameworksQuery(options?: Omit<Urql.UseQueryArgs<SiteFrameworksQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteFrameworksQuery, SiteFrameworksQueryVariables>({ query: SiteFrameworksDocument, ...options });
};
export const SiteIpnsRecordsDocument = gql`
    query siteIpnsRecords($where: SiteWhereInput!) {
  site(where: $where) {
    id
    ipnsRecords {
      id
      hash
    }
  }
}
    `;

export function useSiteIpnsRecordsQuery(options: Omit<Urql.UseQueryArgs<SiteIpnsRecordsQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteIpnsRecordsQuery, SiteIpnsRecordsQueryVariables>({ query: SiteIpnsRecordsDocument, ...options });
};
export const SiteNameAvailabilityDocument = gql`
    query siteNameAvailability($where: SiteNameAvailabilityWhereInput!) {
  siteNameAvailability(where: $where)
}
    `;

export function useSiteNameAvailabilityQuery(options: Omit<Urql.UseQueryArgs<SiteNameAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteNameAvailabilityQuery, SiteNameAvailabilityQueryVariables>({ query: SiteNameAvailabilityDocument, ...options });
};
export const SiteZonesDocument = gql`
    query siteZones($where: SiteWhereInput!) {
  site(where: $where) {
    id
    zones {
      id
    }
  }
}
    `;

export function useSiteZonesQuery(options: Omit<Urql.UseQueryArgs<SiteZonesQueryVariables>, 'query'>) {
  return Urql.useQuery<SiteZonesQuery, SiteZonesQueryVariables>({ query: SiteZonesDocument, ...options });
};
export const SitesDocument = gql`
    query sites($where: SitesWhereInput!, $filter: SitesPaginationInput) {
  sites(where: $where, filter: $filter) {
    pageCount
    totalCount
    data {
      __typename
      id
      avatar
      name
      slug
      sourceProvider
      sourceRepositoryId
      sourceRepositoryOwner
      sourceRepositoryName
      sourceBranch
      githubInstallationId
      enablePreviews
      baseDirectory
      buildCommand
      distDirectory
      dockerImage
      cpuLimit
      memoryLimit
      buildDurationLimitSeconds
      lastDeployment {
        cid
        id
        siteId
        status
        createdAt
        sourceProvider
        sourceAuthor
        sourceMessage
        sourceRepositoryName
        sourceRepositoryOwner
        previewImageUrl
        previewOnly
        storageType
        sourceBranch
        updatedAt
        sourceRef
      }
      currentDeployment {
        cid
        id
        status
        createdAt
        sourceProvider
        sourceAuthor
        sourceMessage
        sourceRepositoryName
        sourceRepositoryOwner
        previewImageUrl
        previewOnly
        storageType
        sourceBranch
        updatedAt
        sourceRef
        functionDeployments {
          id
        }
      }
      ipnsRecords {
        id
        hash
        name
        ensRecords {
          __typename
          createdAt
          id
          name
          status
          updatedAt
        }
      }
      domains {
        __typename
        id
        hostname
        status
        errorMessage
        zone {
          id
        }
        dnsConfigs {
          __typename
          createdAt
          id
          name
          type
          updatedAt
          value
        }
        isVerified
        createdAt
        updatedAt
        dnslinkStatus
      }
      primaryDomain {
        id
        hostname
        isVerified
      }
      zones {
        id
        status
      }
    }
  }
}
    `;

export function useSitesQuery(options: Omit<Urql.UseQueryArgs<SitesQueryVariables>, 'query'>) {
  return Urql.useQuery<SitesQuery, SitesQueryVariables>({ query: SitesDocument, ...options });
};
export const SlugAvailabilityDocument = gql`
    query slugAvailability($where: SlugAvailabilityWhereInput!) {
  slugAvailability(where: $where)
}
    `;

export function useSlugAvailabilityQuery(options: Omit<Urql.UseQueryArgs<SlugAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<SlugAvailabilityQuery, SlugAvailabilityQueryVariables>({ query: SlugAvailabilityDocument, ...options });
};
export const CreateFolderDocument = gql`
    mutation createFolder($data: CreateFolderDataInput!, $where: CreateFolderWhereInput!) {
  createFolder(data: $data, where: $where) {
    __typename
    id
    createdAt
    name
    path
    sizeBigInt
  }
}
    `;

export function useCreateFolderMutation() {
  return Urql.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument);
};
export const DeleteFolderDocument = gql`
    mutation deleteFolder($where: DeleteFolderWhereInput!) {
  deleteFolder(where: $where) {
    __typename
    id
    createdAt
    name
    path
  }
}
    `;

export function useDeleteFolderMutation() {
  return Urql.useMutation<DeleteFolderMutation, DeleteFolderMutationVariables>(DeleteFolderDocument);
};
export const UpdateFolderDocument = gql`
    mutation updateFolder($data: UpdateFolderDataInput!, $where: UpdateFolderWhereInput!) {
  updateFolder(data: $data, where: $where) {
    __typename
    id
    createdAt
    name
    path
  }
}
    `;

export function useUpdateFolderMutation() {
  return Urql.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument);
};
export const FolderDetailsDocument = gql`
    query folderDetails($where: FolderWhereInput!) {
  folder(where: $where) {
    id
    path
    name
    folderCount
    pinCount
  }
}
    `;

export function useFolderDetailsQuery(options: Omit<Urql.UseQueryArgs<FolderDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<FolderDetailsQuery, FolderDetailsQueryVariables>({ query: FolderDetailsDocument, ...options });
};
export const FolderNameAvailabilityInParentFolderDocument = gql`
    query folderNameAvailabilityInParentFolder($data: FolderNameAvailabilityInParentFolderDataInput!, $where: FolderNameAvailabilityInParentFolderWhereInput!) {
  folderNameAvailabilityInParentFolder(data: $data, where: $where)
}
    `;

export function useFolderNameAvailabilityInParentFolderQuery(options: Omit<Urql.UseQueryArgs<FolderNameAvailabilityInParentFolderQueryVariables>, 'query'>) {
  return Urql.useQuery<FolderNameAvailabilityInParentFolderQuery, FolderNameAvailabilityInParentFolderQueryVariables>({ query: FolderNameAvailabilityInParentFolderDocument, ...options });
};
export const AcceptInvitationDocument = gql`
    mutation acceptInvitation($where: AcceptInvitationWhereInput!) {
  acceptInvitation(where: $where) {
    id
  }
}
    `;

export function useAcceptInvitationMutation() {
  return Urql.useMutation<AcceptInvitationMutation, AcceptInvitationMutationVariables>(AcceptInvitationDocument);
};
export const CreateInvitationDocument = gql`
    mutation createInvitation($data: CreateInvitationDataInput!) {
  createInvitation(data: $data)
}
    `;

export function useCreateInvitationMutation() {
  return Urql.useMutation<CreateInvitationMutation, CreateInvitationMutationVariables>(CreateInvitationDocument);
};
export const DeclineInvitationDocument = gql`
    mutation declineInvitation($where: DeclineInvitationWhereInput!) {
  declineInvitation(where: $where)
}
    `;

export function useDeclineInvitationMutation() {
  return Urql.useMutation<DeclineInvitationMutation, DeclineInvitationMutationVariables>(DeclineInvitationDocument);
};
export const DeleteInvitationDocument = gql`
    mutation deleteInvitation($where: DeleteInvitationWhereInput!) {
  deleteInvitation(where: $where) {
    id
    email
    role
    createdAt
  }
}
    `;

export function useDeleteInvitationMutation() {
  return Urql.useMutation<DeleteInvitationMutation, DeleteInvitationMutationVariables>(DeleteInvitationDocument);
};
export const UpdateMembershipDocument = gql`
    mutation updateMembership($data: UpdateMembershipDataInput!, $where: UpdateMembershipWhereInput!) {
  updateMembership(data: $data, where: $where) {
    id
    role
    createdAt
    permissionGroup {
      id
      name
      description
    }
    user {
      id
      email
      username
    }
  }
}
    `;

export function useUpdateMembershipMutation() {
  return Urql.useMutation<UpdateMembershipMutation, UpdateMembershipMutationVariables>(UpdateMembershipDocument);
};
export const CountSitesWithSourceProviderDocument = gql`
    query countSitesWithSourceProvider {
  sites(where: {hasSourceProvider: true}) {
    totalCount
  }
}
    `;

export function useCountSitesWithSourceProviderQuery(options?: Omit<Urql.UseQueryArgs<CountSitesWithSourceProviderQueryVariables>, 'query'>) {
  return Urql.useQuery<CountSitesWithSourceProviderQuery, CountSitesWithSourceProviderQueryVariables>({ query: CountSitesWithSourceProviderDocument, ...options });
};
export const InvitationDocument = gql`
    query invitation($where: InvitationWhereInput!) {
  invitation(where: $where) {
    hash
    projectAvatar
    projectId
    projectName
  }
}
    `;

export function useInvitationQuery(options: Omit<Urql.UseQueryArgs<InvitationQueryVariables>, 'query'>) {
  return Urql.useQuery<InvitationQuery, InvitationQueryVariables>({ query: InvitationDocument, ...options });
};
export const PermissionGroupsDocument = gql`
    query permissionGroups($filter: PermissionGroupsPaginationInput) {
  permissionGroups(filter: $filter) {
    data {
      id
      name
      description
    }
  }
}
    `;

export function usePermissionGroupsQuery(options?: Omit<Urql.UseQueryArgs<PermissionGroupsQueryVariables>, 'query'>) {
  return Urql.useQuery<PermissionGroupsQuery, PermissionGroupsQueryVariables>({ query: PermissionGroupsDocument, ...options });
};
export const InvitationsDocument = gql`
    query invitations($filter: InvitationsPaginationInput) {
  invitations(filter: $filter) {
    data {
      id
      email
      role
      createdAt
    }
  }
}
    `;

export function useInvitationsQuery(options?: Omit<Urql.UseQueryArgs<InvitationsQueryVariables>, 'query'>) {
  return Urql.useQuery<InvitationsQuery, InvitationsQueryVariables>({ query: InvitationsDocument, ...options });
};
export const ProjectMembersDocument = gql`
    query projectMembers($where: ProjectWhereInput!) {
  project(where: $where) {
    memberships {
      id
      role
      createdAt
      permissionGroup {
        id
        name
        description
      }
      user {
        id
        email
        username
      }
    }
  }
}
    `;

export function useProjectMembersQuery(options: Omit<Urql.UseQueryArgs<ProjectMembersQueryVariables>, 'query'>) {
  return Urql.useQuery<ProjectMembersQuery, ProjectMembersQueryVariables>({ query: ProjectMembersDocument, ...options });
};
export const CreateTemplateDocument = gql`
    mutation createTemplate($data: CreateTemplateDataInput!) {
  createTemplate(data: $data) {
    id
    name
    banner
    description
    siteId
    siteAvatar
    siteSlug
    framework {
      id
      name
      avatar
    }
    deployment {
      id
      previewImageUrl
      sourceProvider
      sourceRepositoryOwner
      sourceRepositoryName
      sourceBranch
      sourceRef
      build {
        id
        baseDirectory
        buildCommand
        distDirectory
        dockerImage
      }
    }
    creator {
      id
      username
      avatar
    }
    category {
      id
      name
      slug
    }
    usageCount
    reviewStatus
    reviewComment
    createdAt
    updatedAt
  }
}
    `;

export function useCreateTemplateMutation() {
  return Urql.useMutation<CreateTemplateMutation, CreateTemplateMutationVariables>(CreateTemplateDocument);
};
export const DeleteTemplateDocument = gql`
    mutation deleteTemplate($where: DeleteTemplateWhereInput!) {
  deleteTemplate(where: $where) {
    id
    creator {
      id
    }
  }
}
    `;

export function useDeleteTemplateMutation() {
  return Urql.useMutation<DeleteTemplateMutation, DeleteTemplateMutationVariables>(DeleteTemplateDocument);
};
export const UpdateTemplateDocument = gql`
    mutation updateTemplate($data: UpdateTemplateDataInput!, $where: UpdateTemplateWhereInput!) {
  updateTemplate(data: $data, where: $where) {
    id
    name
    banner
    description
    deployment {
      previewImageUrl
      sourceProvider
      sourceRepositoryOwner
      sourceRepositoryName
      sourceBranch
      build {
        id
        baseDirectory
        buildCommand
        distDirectory
        dockerImage
      }
    }
    creator {
      id
    }
    category {
      id
      name
      slug
    }
    reviewStatus
    createdAt
    updatedAt
  }
}
    `;

export function useUpdateTemplateMutation() {
  return Urql.useMutation<UpdateTemplateMutation, UpdateTemplateMutationVariables>(UpdateTemplateDocument);
};
export const TemplateDocument = gql`
    query Template($where: TemplateWhereInput!) {
  template(where: $where) {
    id
    name
    description
    banner
    siteId
    siteAvatar
    siteSlug
    framework {
      id
      name
      avatar
    }
    deployment {
      id
      previewImageUrl
      sourceProvider
      sourceRepositoryOwner
      sourceRepositoryName
      sourceBranch
      sourceRef
      build {
        id
        baseDirectory
        buildCommand
        distDirectory
        dockerImage
      }
    }
    creator {
      id
      username
      avatar
    }
    category {
      id
      name
      slug
      templatesCount
    }
    usageCount
    reviewStatus
    createdAt
    updatedAt
  }
}
    `;

export function useTemplateQuery(options: Omit<Urql.UseQueryArgs<TemplateQueryVariables>, 'query'>) {
  return Urql.useQuery<TemplateQuery, TemplateQueryVariables>({ query: TemplateDocument, ...options });
};
export const TemplateCategoriesDocument = gql`
    query templateCategories($filter: TemplateCategoriesPaginationInput) {
  templateCategories(filter: $filter) {
    data {
      id
      name
      slug
      templatesCount
    }
  }
}
    `;

export function useTemplateCategoriesQuery(options?: Omit<Urql.UseQueryArgs<TemplateCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<TemplateCategoriesQuery, TemplateCategoriesQueryVariables>({ query: TemplateCategoriesDocument, ...options });
};
export const TemplateDeployDocument = gql`
    query templateDeploy($where: TemplateWhereInput!) {
  template(where: $where) {
    id
    name
    description
    siteId
    siteAvatar
    framework {
      id
      name
      avatar
    }
    deployment {
      id
      sourceProvider
      sourceRepositoryOwner
      sourceRepositoryName
      sourceBranch
      sourceRef
      build {
        id
        baseDirectory
        buildCommand
        distDirectory
        dockerImage
      }
    }
  }
}
    `;

export function useTemplateDeployQuery(options: Omit<Urql.UseQueryArgs<TemplateDeployQueryVariables>, 'query'>) {
  return Urql.useQuery<TemplateDeployQuery, TemplateDeployQueryVariables>({ query: TemplateDeployDocument, ...options });
};
export const TemplateNameAvailabilityDocument = gql`
    query templateNameAvailability($where: TemplateNameAvailabilityWhereInput!) {
  templateNameAvailability(where: $where)
}
    `;

export function useTemplateNameAvailabilityQuery(options: Omit<Urql.UseQueryArgs<TemplateNameAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<TemplateNameAvailabilityQuery, TemplateNameAvailabilityQueryVariables>({ query: TemplateNameAvailabilityDocument, ...options });
};
export const TemplatesDocument = gql`
    query templates($where: TemplatesWhereInput!, $filter: TemplatesPaginationInput) {
  templates(where: $where, filter: $filter) {
    data {
      id
      name
      description
      usageCount
      banner
      siteId
      siteAvatar
      siteSlug
      framework {
        id
        name
        avatar
      }
      deployment {
        id
        previewImageUrl
        sourceRepositoryOwner
      }
      creator {
        id
        username
        avatar
      }
      category {
        id
        name
        slug
      }
      reviewStatus
      reviewComment
      createdAt
      updatedAt
    }
    currentPage
    nextPage
    isLastPage
    totalCount
  }
}
    `;

export function useTemplatesQuery(options: Omit<Urql.UseQueryArgs<TemplatesQueryVariables>, 'query'>) {
  return Urql.useQuery<TemplatesQuery, TemplatesQueryVariables>({ query: TemplatesDocument, ...options });
};
export const UpdateNotificationSettingsDocument = gql`
    mutation updateNotificationSettings($data: UpdateNotificationSettingsDataInput!) {
  updateNotificationSettings(data: $data)
}
    `;

export function useUpdateNotificationSettingsMutation() {
  return Urql.useMutation<UpdateNotificationSettingsMutation, UpdateNotificationSettingsMutationVariables>(UpdateNotificationSettingsDocument);
};
export const UpdateUserDocument = gql`
    mutation updateUser($data: UpdateUserDataInput!) {
  updateUser(data: $data) {
    id
    email
    avatar
    username
    githubUserAccessToken
    project {
      id
      name
    }
    walletAddress
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const EmailAvailabilityDocument = gql`
    query emailAvailability($where: EmailAvailabilityWhereInput!) {
  emailAvailability(where: $where)
}
    `;

export function useEmailAvailabilityQuery(options: Omit<Urql.UseQueryArgs<EmailAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<EmailAvailabilityQuery, EmailAvailabilityQueryVariables>({ query: EmailAvailabilityDocument, ...options });
};
export const GitAccessTokenDocument = gql`
    query gitAccessToken {
  user {
    gitUserAccessTokens {
      __typename
      gitProviderId
      token
    }
  }
}
    `;

export function useGitAccessTokenQuery(options?: Omit<Urql.UseQueryArgs<GitAccessTokenQueryVariables>, 'query'>) {
  return Urql.useQuery<GitAccessTokenQuery, GitAccessTokenQueryVariables>({ query: GitAccessTokenDocument, ...options });
};
export const NotificationsDocument = gql`
    query notifications {
  notificationSettings {
    notificationType
    notificationChannel
    isEnabled
  }
}
    `;

export function useNotificationsQuery(options?: Omit<Urql.UseQueryArgs<NotificationsQueryVariables>, 'query'>) {
  return Urql.useQuery<NotificationsQuery, NotificationsQueryVariables>({ query: NotificationsDocument, ...options });
};
export const UsernameAvailabilityDocument = gql`
    query usernameAvailability($where: UsernameAvailabilityWhereInput!) {
  usernameAvailability(where: $where)
}
    `;

export function useUsernameAvailabilityQuery(options: Omit<Urql.UseQueryArgs<UsernameAvailabilityQueryVariables>, 'query'>) {
  return Urql.useQuery<UsernameAvailabilityQuery, UsernameAvailabilityQueryVariables>({ query: UsernameAvailabilityDocument, ...options });
};
export const VersionDocument = gql`
    query version {
  version {
    commitHash
  }
}
    `;

export function useVersionQuery(options?: Omit<Urql.UseQueryArgs<VersionQueryVariables>, 'query'>) {
  return Urql.useQuery<VersionQuery, VersionQueryVariables>({ query: VersionDocument, ...options });
};
export const CreateZoneForPrivateGatewayDocument = gql`
    mutation createZoneForPrivateGateway {
  createZoneForPrivateGateway {
    id
    type
  }
}
    `;

export function useCreateZoneForPrivateGatewayMutation() {
  return Urql.useMutation<CreateZoneForPrivateGatewayMutation, CreateZoneForPrivateGatewayMutationVariables>(CreateZoneForPrivateGatewayDocument);
};
export const CreateZoneForSiteDocument = gql`
    mutation createZoneForSite($where: CreateZoneForSiteWhereInput!) {
  createZoneForSite(where: $where) {
    id
  }
}
    `;

export function useCreateZoneForSiteMutation() {
  return Urql.useMutation<CreateZoneForSiteMutation, CreateZoneForSiteMutationVariables>(CreateZoneForSiteDocument);
};
export const ZoneDocument = gql`
    query zone($where: ZoneWhereInput!) {
  zone(where: $where) {
    id
    status
  }
}
    `;

export function useZoneQuery(options: Omit<Urql.UseQueryArgs<ZoneQueryVariables>, 'query'>) {
  return Urql.useQuery<ZoneQuery, ZoneQueryVariables>({ query: ZoneDocument, ...options });
};