import { UnauthenticatedError } from '@fleek-platform/errors';
import { constants } from '@fleek-platform/utils-permissions';
import { devtoolsExchange } from '@urql/devtools';
import { authExchange } from '@urql/exchange-auth';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  createClient,
  fetchExchange,
  gql,
  makeOperation,
  mapExchange,
  Operation,
  Provider,
  ssrExchange,
} from 'urql';

import { constants as uiConstants } from '@/constants';
import {
  ApplicationsDocument,
  ApplicationsQuery,
  ApplicationsQueryVariables,
  CreateApplicationMutation,
  CreateDnsConfigMutation,
  CreateDnsConfigMutationVariables,
  CreateFleekFunctionMutation,
  CreateMigrationRequestsFromTokenMutation,
  CreateSiteMutation,
  CreateTemplateMutation,
  DeleteApplicationMutation,
  DeleteDomainMutation,
  DeleteFleekFunctionMutation,
  DeleteFolderMutation,
  DeleteProjectMutation,
  DeleteSecretKeyMutation,
  DeleteSecretKeyMutationVariables,
  DeleteSiteMutation,
  DeleteTemplateMutation,
  DeploymentsDocument,
  DeploymentsQuery,
  DeploymentsQueryVariables,
  DisableProtectedActionMutation,
  DisableProtectedActionMutationVariables,
  DnslinkStatus,
  DomainDocument,
  DomainQuery,
  DomainQueryVariables,
  EnableProtectedActionMutation,
  EnableProtectedActionMutationVariables,
  FleekFunctionsDocument,
  FleekFunctionsQuery,
  FleekFunctionsQueryVariables,
  GenerateTwoFactorSecretKeyMutation,
  GenerateTwoFactorSecretKeyMutationVariables,
  GetSecretKeysDocument,
  GetSecretKeysQuery,
  GetSecretKeysQueryVariables,
  LeaveProjectMutationVariables,
  MeDocument,
  MigrationRequestsDocument,
  MigrationRequestsQuery,
  MigrationRequestsQueryVariables,
  PersonalAccessToken,
  PersonalAccessTokensDocument,
  PersonalAccessTokensWithAggregation,
  PinsDocument,
  PinsWithAggregation,
  PrivateGatewaysDocument,
  PrivateGatewaysWithAggregation,
  ProjectMembersDocument,
  ProjectsDocument,
  ProjectsQuery,
  ProjectsQueryVariables,
  ProjectsWithAggregation,
  RetryDeploymentMutation,
  SiteDocument,
  SiteQuery,
  SiteQueryVariables,
  SitesDocument,
  SitesQuery,
  SitesQueryVariables,
  TemplatesDocument,
  TemplatesQuery,
  TemplatesQueryVariables,
  TriggerDeploymentMutation,
  UpdateSecretKeyMutation,
  User,
} from '@/generated/graphqlClient';
import { UpdateSecretKeyMutationVariables } from '@/generated/graphqlClient';
import { Pin } from '@/types/StorageProviders';
import { isServerSide } from '@/utils/isServerSide';

import { secrets } from '../secrets';

type AuthState = { token?: string | null };

type AddAuthToOperationProps = {
  authState?: AuthState | null;
  operation: Operation;
};

const addAuthToOperation = ({
  authState,
  operation,
}: AddAuthToOperationProps) => {
  if (!authState?.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        [constants.AUTHORIZATION_HEADER_NAME]: `Bearer ${authState.token}`,
        [constants.CUSTOM_HEADERS.clientType]: constants.UI_CLIENT_TYPE_NAME,
        ...(fetchOptions.headers || {}),
      },
    },
  });
};

// TODO: Logout user on token expiration
export const createUrqlClient = ({
  token,
  logout,
}: { token?: string; logout: () => void }) => {
  const isSsr = isServerSide();
  const ssr = ssrExchange({
    isClient: !isSsr,
    initialState: !isSsr ? (window as any).__URQL_DATA__ : undefined,
  });

  const cache = cacheExchange({
    keys: {
      SitesWithAggregation: () => null,
      ProjectsWithAggregation: () => null,
      Site: (data) => `${data.id}`,
      DeploymentsWithAggregation: () => null,
      TemplatesWithAggregation: () => null,
      TemplateCategoriesWithAggregation: () => null,
      Version: () => null,
      Membership: () => null,
      NotificationSettings: () => null,
      FleekFunctionsWithAggregation: () => null,
      GitApiRepo: () => null,
      GitApiBranch: () => null,
      GitIntegration: (data) => `${data.id}`,
      ResourceQuota: () => null,
    },
    updates: {
      Mutation: {
        deleteMembership: (_result, _args, cache) => {
          const deletedId = (_result.deleteMembership as { id: string })?.id;
          const projectId = (_args as { projectId: string })?.projectId;

          cache.updateQuery(
            { query: ProjectMembersDocument, variables: { id: projectId } },
            (data) => {
              if (
                data &&
                'project' in data &&
                data.project &&
                Array.isArray(data.memberships)
              ) {
                return {
                  ...data,
                  memberships: data.memberships.filter(
                    (membership) => membership.id !== deletedId,
                  ),
                };
              }

              return data;
            },
          );
        },
        createPersonalAccessTokenFromVerificationSession: (
          _result,
          _args,
          cache,
        ) => {
          cache.invalidate('Query', 'personalAccessTokens');
        },
        deletePersonalAccessToken: (result, _args, cache) => {
          const deletedId = (result.deletePersonalAccessToken as { id: string })
            ?.id;

          if (!deletedId) {
            return;
          }

          cache.updateQuery({ query: PersonalAccessTokensDocument }, (data) => {
            if (
              data &&
              'personalAccessTokens' in data &&
              data.personalAccessTokens &&
              Array.isArray(
                (
                  data.personalAccessTokens as PersonalAccessTokensWithAggregation
                ).data,
              )
            ) {
              const personalAccessTokens: any = data.personalAccessTokens;

              return {
                ...data,
                personalAccessTokens: {
                  data: personalAccessTokens.data.filter(
                    (pat: PersonalAccessToken) => pat.id !== deletedId,
                  ),
                  __typename: 'PersonalAccessTokensWithAggregation',
                },
              };
            }

            return data;
          });
        },
        deleteApplication: (
          result: DeleteApplicationMutation,
          _args,
          cache,
        ) => {
          const deletedId = result.deleteApplication.id;

          if (!deletedId) {
            return;
          }

          cache.updateQuery<ApplicationsQuery, ApplicationsQueryVariables>(
            { query: ApplicationsDocument },
            (data) => {
              if (
                data &&
                'applications' in data &&
                data.applications &&
                Array.isArray(data.applications.data)
              ) {
                return {
                  ...data,
                  applications: {
                    ...data.applications,
                    data: data.applications.data.filter(
                      (application) => application.id !== deletedId,
                    ),
                  },
                };
              }

              return data;
            },
          );
        },
        createApplication: (
          result: CreateApplicationMutation,
          _args,
          cache,
        ) => {
          const createdApplicationCredentials = result.createApplication;

          cache.updateQuery<ApplicationsQuery, ApplicationsQueryVariables>(
            { query: ApplicationsDocument, variables: { filter: undefined } },
            (data) => {
              if (
                data &&
                'applications' in data &&
                Array.isArray(data.applications.data)
              ) {
                return {
                  ...data,
                  applications: {
                    ...data.applications,
                    data: data.applications.data.concat(
                      createdApplicationCredentials,
                    ),
                  },
                };
              }

              return null;
            },
          );
        },
        createProject: (result, _args, cache, _info) => {
          cache.updateQuery(
            { query: ProjectsDocument, variables: { filter: undefined } },
            (data) => {
              if (
                data &&
                'projects' in data &&
                Array.isArray((data.projects as ProjectsWithAggregation).data)
              ) {
                const projects: any = data.projects;

                return {
                  ...data,
                  projects: {
                    data: [...projects.data, result.createProject as any],
                    __typename: 'ProjectsWithAggregation',
                  },
                };
              }

              return null;
            },
          );
        },
        createPrivateGateway: (result, _args, cache, _info) => {
          cache.updateQuery({ query: PrivateGatewaysDocument }, (data) => {
            if (
              data &&
              'privateGateways' in data &&
              Array.isArray(
                (data.privateGateways as PrivateGatewaysWithAggregation).data,
              )
            ) {
              const privateGateways: any = data.privateGateways;

              return {
                ...data,
                privateGateways: {
                  data: [
                    ...privateGateways.data,
                    result.createPrivateGateway as any,
                  ],
                  __typename: 'PrivateGatewaysWithAggregation',
                },
              };
            }

            return null;
          });
        },
        deletePin: (result, _args, cache, _info) => {
          const pinId = (result.deletePin as { id: string })?.id;

          if (!pinId) {
            return;
          }

          cache.invalidate({ __typename: 'Pin', id: pinId });
        },
        deleteFolder: (result: DeleteFolderMutation, _args, cache, _info) => {
          const folderId = result.deleteFolder.id;

          if (!folderId) {
            return;
          }

          cache.invalidate({ __typename: 'Folder', id: folderId });
        },
        updateUser: (result, _args, cache, _info) => {
          const userUpdated = result.updateUser as User;

          if (!userUpdated) {
            return;
          }

          cache.updateQuery({ query: MeDocument }, (data) => {
            // Check if the cached data exists and contains the user
            if (data && 'user' in data) {
              // Modify the user object with the updated values
              return {
                ...data,
                user: userUpdated,
              };
            }
            // If the data isn't in the format we expect, return it unmodified

            return data;
          });
        },

        updatePin: (result, _args, cache, _info) => {
          const pinUpdated = result.updatePin as Pin;

          if (!pinUpdated) {
            return;
          }

          cache.updateQuery({ query: PinsDocument }, (data) => {
            if (
              data &&
              'pins' in data &&
              Array.isArray((data.pins as PinsWithAggregation).data)
            ) {
              const pins: any = data.pins;

              return {
                ...data,
                pins: {
                  data: pins.data.map((pin: Pin) => {
                    if (pin.id === pinUpdated.id) {
                      return pinUpdated;
                    }

                    return pin;
                  }),
                  __typename: 'PinsWithAggregation',
                },
              };
            }

            return data;
          });
        },
        leaveProject: (
          _result,
          args: LeaveProjectMutationVariables,
          cache,
          _info,
        ) => {
          const projectId = args.where.projectId;

          cache.updateQuery<ProjectsQuery, ProjectsQueryVariables>(
            { query: ProjectsDocument, variables: { filter: undefined } },
            (data) => {
              if (
                data &&
                'projects' in data &&
                Array.isArray(data.projects.data)
              ) {
                return {
                  ...data,
                  projects: {
                    ...data.projects,
                    data: data.projects.data.filter(
                      (project) => project.id !== projectId,
                    ),
                  },
                };
              }

              return data;
            },
          );
        },
        createTemplate: (
          result: CreateTemplateMutation,
          _args,
          cache,
          _info,
        ) => {
          const createdTemplate = result.createTemplate;

          cache.updateQuery<TemplatesQuery, TemplatesQueryVariables>(
            {
              query: TemplatesDocument,
              variables: {
                where: {
                  createdById: createdTemplate.creator?.id,
                },
              },
            },
            (data) => {
              if (
                data &&
                'templates' in data &&
                Array.isArray(data.templates.data)
              ) {
                return {
                  ...data,
                  templates: {
                    ...data.templates,
                    data: data.templates.data.concat(createdTemplate),
                  },
                };
              }

              return data;
            },
          );
        },
        deleteTemplate: (
          result: DeleteTemplateMutation,
          _args,
          cache,
          _info,
        ) => {
          const deletedTemplate = result.deleteTemplate;

          cache.updateQuery<TemplatesQuery, TemplatesQueryVariables>(
            {
              query: TemplatesDocument,
              variables: {
                where: {
                  createdById: deletedTemplate.creator?.id,
                },
              },
            },
            (data) => {
              if (
                data &&
                'templates' in data &&
                Array.isArray(data.templates.data)
              ) {
                return {
                  ...data,
                  templates: {
                    ...data.templates,
                    data: data.templates.data.filter(
                      (template) => template.id !== deletedTemplate.id,
                    ),
                  },
                };
              }

              return data;
            },
          );
        },
        createSite: (result: CreateSiteMutation, _args, cache) => {
          const newSite = result.createSite;
          cache.updateQuery<SitesQuery, SitesQueryVariables>(
            {
              query: SitesDocument,
              variables: {
                where: {},
                filter: { take: uiConstants.SITES_PAGE_SIZE, page: 1 },
              },
            },
            (data) => {
              if (data && 'sites' in data && Array.isArray(data.sites.data)) {
                return {
                  ...data,
                  sites: {
                    ...data.sites,
                    data: [...data.sites.data, newSite as any],
                  },
                };
              }

              return data;
            },
          );
        },
        createFleekFunction: (
          result: CreateFleekFunctionMutation,
          _args,
          cache,
        ) => {
          const newFn = result.createFleekFunction;
          cache.updateQuery<FleekFunctionsQuery, FleekFunctionsQueryVariables>(
            {
              query: FleekFunctionsDocument,
              variables: {
                filter: { page: 1, take: uiConstants.FUNCTIONS_PAGE_SIZE },
              },
            },
            (data) => {
              if (
                data &&
                'fleekFunctions' in data &&
                Array.isArray(data.fleekFunctions.data)
              ) {
                return {
                  ...data,
                  fleekFunctions: {
                    ...data.fleekFunctions,
                    data: [newFn as any, ...data.fleekFunctions.data].slice(
                      0,
                      uiConstants.FUNCTIONS_PAGE_SIZE,
                    ),
                  },
                };
              }

              return data;
            },
          );
        },
        deleteFleekFunction: (
          result: DeleteFleekFunctionMutation,
          _args,
          cache,
          _info,
        ) => {
          cache.invalidate({
            __typename: 'FleekFunction',
            id: result.deleteFleekFunction.id,
          });
        },
        triggerDeployment: (
          result: TriggerDeploymentMutation,
          _args,
          cache,
        ) => {
          const newDeployment = result.triggerDeployment;

          // Updates the deployments list first page
          cache.updateQuery<DeploymentsQuery, DeploymentsQueryVariables>(
            {
              query: DeploymentsDocument,
              variables: {
                where: { siteId: newDeployment.siteId },
                filter: { take: uiConstants.DEPLOYMENTS_PAGE_SIZE, page: 1 },
              },
            },
            (data) => {
              if (
                data &&
                'deployments' in data &&
                Array.isArray(data.deployments.data)
              ) {
                return {
                  ...data,
                  deployments: {
                    ...data.deployments,
                    data: [
                      newDeployment as any,
                      ...data.deployments.data,
                    ].slice(0, uiConstants.DEPLOYMENTS_PAGE_SIZE),
                  },
                };
              }

              return data;
            },
          );

          cache.updateQuery<DeploymentsQuery, DeploymentsQueryVariables>(
            {
              query: DeploymentsDocument,
              variables: { where: { siteId: newDeployment.siteId } },
            },
            (data) => {
              if (
                data &&
                'deployments' in data &&
                Array.isArray(data.deployments.data)
              ) {
                return {
                  ...data,
                  deployments: {
                    ...data.deployments,
                    data: [newDeployment as any, ...data.deployments.data],
                  },
                };
              }

              return data;
            },
          );

          cache.updateQuery<SiteQuery, SiteQueryVariables>(
            {
              query: SiteDocument,
              variables: { where: { id: newDeployment.siteId } },
            },
            (data) => {
              if (data && 'site' in data) {
                return {
                  ...data,
                  site: {
                    ...data.site,
                    lastDeployment: newDeployment,
                  },
                };
              }

              return data;
            },
          );
        },
        retryDeployment: (result: RetryDeploymentMutation, _args, cache) => {
          const newDeployment = result.retryDeployment;

          // Updates the deployments list first page
          cache.updateQuery<DeploymentsQuery, DeploymentsQueryVariables>(
            {
              query: DeploymentsDocument,
              variables: {
                where: { siteId: newDeployment.siteId },
                filter: { take: uiConstants.DEPLOYMENTS_PAGE_SIZE, page: 1 },
              },
            },
            (data) => {
              if (
                data &&
                'deployments' in data &&
                Array.isArray(data.deployments.data)
              ) {
                return {
                  ...data,
                  deployments: {
                    ...data.deployments,
                    data: [
                      newDeployment as any,
                      ...data.deployments.data,
                    ].slice(0, uiConstants.DEPLOYMENTS_PAGE_SIZE),
                  },
                };
              }

              return data;
            },
          );

          cache.updateQuery<DeploymentsQuery, DeploymentsQueryVariables>(
            {
              query: DeploymentsDocument,
              variables: { where: { siteId: newDeployment.siteId } },
            },
            (data) => {
              if (
                data &&
                'deployments' in data &&
                Array.isArray(data.deployments.data)
              ) {
                return {
                  ...data,
                  deployments: {
                    ...data.deployments,
                    data: [newDeployment as any, ...data.deployments.data],
                  },
                };
              }

              return data;
            },
          );

          // update Recent Deploy component
          cache.updateQuery<SiteQuery, SiteQueryVariables>(
            {
              query: SiteDocument,
              variables: { where: { id: newDeployment.siteId } },
            },
            (data) => {
              if (data && 'site' in data) {
                return {
                  ...data,
                  site: {
                    ...data.site,
                    lastDeployment: newDeployment,
                  },
                };
              }

              return data;
            },
          );
        },
        deleteSite: (result: DeleteSiteMutation, _args, cache, _info) => {
          cache.invalidate({ __typename: 'Site', id: result.deleteSite.id });
        },
        deleteProject: (result: DeleteProjectMutation, _args, cache, _info) => {
          const deletedProject = result.deleteProject;

          cache.updateQuery<ProjectsQuery, ProjectsQueryVariables>(
            { query: ProjectsDocument },
            (data) => {
              if (
                data &&
                'projects' in data &&
                Array.isArray(data.projects.data)
              ) {
                return {
                  ...data,
                  projects: {
                    ...data.projects,
                    data: data.projects.data.filter(
                      (project) => project.id !== deletedProject.id,
                    ),
                  },
                };
              }

              return data;
            },
          );
        },
        deleteDomain: (result: DeleteDomainMutation, _args, cache) => {
          const deletedDomain = result.deleteDomain;
          const key = 'Query';

          cache
            .inspectFields(key)
            .filter(
              (field) =>
                field.fieldName === 'domain' ||
                (field.fieldKey === 'domainAvailability' &&
                  field.fieldKey.includes(deletedDomain.id)),
            )
            .forEach((field) => {
              cache.invalidate(key, field.fieldKey);
            });
        },
        createDnsConfig: (
          result: CreateDnsConfigMutation,
          _args: CreateDnsConfigMutationVariables,
          cache,
        ) => {
          const dnsConfig = result.createDnsConfig;
          const domainId = _args.where.domainId;

          cache.updateQuery<DomainQuery, DomainQueryVariables>(
            {
              query: DomainDocument,
              variables: {
                where: {
                  id: domainId,
                },
              },
            },
            (data) => {
              if (
                data &&
                'domain' in data &&
                Array.isArray(data.domain.dnsConfigs)
              ) {
                return {
                  ...data,
                  domain: {
                    ...data.domain,
                    dnslinkStatus: DnslinkStatus.CREATED,
                    dnsConfigs: [...data.domain.dnsConfigs, dnsConfig],
                  },
                };
              }

              return data;
            },
          );
        },
        createMigrationRequestsFromToken: (
          result: CreateMigrationRequestsFromTokenMutation,
          _args,
          cache,
        ) => {
          cache.updateQuery<
            MigrationRequestsQuery,
            MigrationRequestsQueryVariables
          >({ query: MigrationRequestsDocument }, (data) => {
            if (
              data &&
              'migrationRequests' in data &&
              Array.isArray(data.migrationRequests.data)
            ) {
              return {
                ...data,
                migrationRequests: {
                  ...data.migrationRequests,
                  data: {
                    ...data.migrationRequests.data,
                    ...result.createMigrationRequestsFromToken,
                  },
                },
              };
            }

            return data;
          });
        },
        deleteSecretKey: (
          result: DeleteSecretKeyMutation,
          _args: DeleteSecretKeyMutationVariables,
          cache,
        ) => {
          if (result.deleteSecretKey) {
            cache.updateQuery<GetSecretKeysQuery, GetSecretKeysQueryVariables>(
              { query: GetSecretKeysDocument },
              (data) => {
                console.log('new keysss');

                if (
                  data &&
                  'user' in data &&
                  Array.isArray(data.user.secretKeys)
                ) {
                  return {
                    ...data,
                    user: {
                      ...data.user,
                      secretKeys: [],
                    },
                  };
                }

                return data;
              },
            );

            cache.updateQuery<GetSecretKeysQuery, GetSecretKeysQueryVariables>(
              { query: GetSecretKeysDocument },
              (data) => {
                if (
                  data &&
                  'user' in data &&
                  Array.isArray(data.user.secretKeys)
                ) {
                  return {
                    ...data,
                    user: {
                      ...data.user,
                      secretKeys: [],
                    },
                  };
                }

                return data;
              },
            );
          }
        },
        generateTwoFactorSecretKey: (
          result: GenerateTwoFactorSecretKeyMutation,
          _args: GenerateTwoFactorSecretKeyMutationVariables,
          cache,
        ) => {
          if (!result.generateTwoFactorSecretKey) {
            return;
          }

          cache.updateQuery<GetSecretKeysQuery, GetSecretKeysQueryVariables>(
            { query: GetSecretKeysDocument },
            (data) => {
              if (
                data &&
                'user' in data &&
                Array.isArray(data.user.secretKeys)
              ) {
                return {
                  ...data,
                  user: {
                    ...data.user,
                    secretKeys: [result.generateTwoFactorSecretKey],
                  },
                };
              }

              return data;
            },
          );
        },
        updateTwoFactorSecretKey: (
          result: UpdateSecretKeyMutation,
          _args: UpdateSecretKeyMutationVariables,
          cache,
        ) => {
          if (!result.updateTwoFactorSecretKey) {
            return;
          }

          cache.updateQuery<GetSecretKeysQuery, GetSecretKeysQueryVariables>(
            { query: GetSecretKeysDocument },
            (data) => {
              if (
                data &&
                'user' in data &&
                Array.isArray(data.user.secretKeys)
              ) {
                return {
                  ...data,
                  user: {
                    ...data.user,
                    secretKeys: [result.updateTwoFactorSecretKey],
                  },
                };
              }

              return data;
            },
          );
        },
        enableTwoFactorProtectedAction: (
          result: EnableProtectedActionMutation,
          args: EnableProtectedActionMutationVariables,
          cache,
        ) => {
          if (!result.enableTwoFactorProtectedAction) {
            return;
          }

          const fragment = gql`
            fragment _ on TwoFactorProtectedAction {
              id
              enabled
            }
          `;

          cache.writeFragment(fragment, { id: args.where.id, enabled: true });
        },
        disableTwoFactorProtectedAction: (
          result: DisableProtectedActionMutation,
          args: DisableProtectedActionMutationVariables,
          cache,
        ) => {
          if (!result.disableTwoFactorProtectedAction) {
            return;
          }

          const fragment = gql`
            fragment _ on TwoFactorProtectedAction {
              id
              enabled
            }
          `;

          cache.writeFragment(fragment, { id: args.where.id, enabled: false });
        },
      },
    },
  });

  return createClient({
    url: secrets.NEXT_PUBLIC_SDK__AUTHENTICATION_URL,
    exchanges: [
      cache,
      ssr,
      devtoolsExchange,
      mapExchange({
        onError: (error) => {
          const isAuthError = error.graphQLErrors.some(
            (error) =>
              error.extensions?.name === UnauthenticatedError.toString() ||
              error.message === 'The request is not authenticated.',
          );

          if (isAuthError) {
            logout();
          }
        },
      }),
      authExchange(async () => {
        const authState: AuthState = { token: token ?? null };

        return {
          addAuthToOperation: (operation: Operation) =>
            addAuthToOperation({ authState, operation }),
          refreshAuth: async () => {
            // TODO: Add auth refresh logic
          },
          willAuthError: () => {
            // TODO: Logic to check if auth will fail (if needed)
            return false; // Replace with your logic
          },
          didAuthError: () => {
            // TODO: Logic to check if auth failed
            return false;
          },
        };
      }),
      fetchExchange,
    ],
  });
};

export const UrqlProviderComponent = Provider;
