import { Client } from 'urql';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

import { ExternalLink } from '@/components';
import { constants } from '@/constants';
import {
  ApplicationNameAvailabilityDocument,
  ApplicationNameAvailabilityQuery,
  ApplicationNameAvailabilityQueryVariables,
  DomainAvailabilityDocument,
  DomainAvailabilityQuery,
  DomainAvailabilityQueryVariables,
  EmailAvailabilityDocument,
  EmailAvailabilityQuery,
  EmailAvailabilityQueryVariables,
  EnsNameAvailabilityDocument,
  EnsNameAvailabilityQuery,
  EnsNameAvailabilityQueryVariables,
  FleekFunctionDetailDocument,
  FleekFunctionDetailQuery,
  FleekFunctionDetailQueryVariables,
  FolderNameAvailabilityInParentFolderDocument,
  FolderNameAvailabilityInParentFolderQuery,
  FolderNameAvailabilityInParentFolderQueryVariables,
  PersonalAccessTokensDocument,
  PersonalAccessTokensQuery,
  PersonalAccessTokensQueryVariables,
  PinNameAvailabilityInParentFolderDocument,
  PinNameAvailabilityInParentFolderQuery,
  PinNameAvailabilityInParentFolderQueryVariables,
  PrivateGatewayNameAvailabilityDocument,
  PrivateGatewayNameAvailabilityQuery,
  PrivateGatewayNameAvailabilityQueryVariables,
  ProjectsDocument,
  ProjectsQuery,
  ProjectsQueryVariables,
  SecretAvailabilityDocument,
  SecretAvailabilityQuery,
  SecretAvailabilityQueryVariables,
  SiteNameAvailabilityDocument,
  SiteNameAvailabilityQuery,
  SiteNameAvailabilityQueryVariables,
  SlugAvailabilityDocument,
  SlugAvailabilityQuery,
  SlugAvailabilityQueryVariables,
  TemplateNameAvailabilityDocument,
  TemplateNameAvailabilityQuery,
  TemplateNameAvailabilityQueryVariables,
  UsernameAvailabilityDocument,
  UsernameAvailabilityQuery,
  UsernameAvailabilityQueryVariables,
} from '@/generated/graphqlClient';
import { Icon } from '@/ui';
import { isUniqueName } from '@/utils/isUniqueName';

import { FormController } from './FormController';

export const createExtraValidation = {
  username: (client: Client) => async (username: string) => {
    try {
      const result = await client
        .query<UsernameAvailabilityQuery, UsernameAvailabilityQueryVariables>(
          UsernameAvailabilityDocument,
          { where: { username } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the username');
      }

      return result.data?.usernameAvailability ? { status: 'valid' } : { status: 'invalid' };
    } catch (error) {
      return { status: 'invalid', error: 'Could not validate username' };
    }
  },

  ensName: (client: Client, siteId: string) => async (name: string) => {
    try {
      const result = await client
        .query<EnsNameAvailabilityQuery, EnsNameAvailabilityQueryVariables>(
          EnsNameAvailabilityDocument,
          { where: { name, siteId } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the ens name availability');
      }

      const viemClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      const normalizedName = normalize(name).split('.');
      const isAvailableForRegistration = await viemClient.readContract({
        address: constants.CONTRACTS.ENS_REGISTAR_CONTROLLER,
        abi: [
          {
            constant: true,
            inputs: [{ name: 'label', type: 'string' }],
            name: 'available',
            outputs: [{ name: '', type: 'bool' }],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
        ],
        functionName: 'available',
        args: [normalizedName[normalizedName.length - 2]],
      });

      if (!result.data?.ensNameAvailability) {
        return { status: 'invalid' };
      }

      if (isAvailableForRegistration) {
        return {
          status: 'other',
          message: (
            <>
              <Icon name="domain" />
              {`${name} is available for sale,`}
              <ExternalLink href={`${constants.EXTERNAL_LINK.ENS_DOMAIN}/${name}/register`} variant="accent">
                purchase it from ENS here.
              </ExternalLink>
            </>
          ),
        };
      }

      return { status: 'valid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate ENS name' };
    }
  },

  projectName: (client: Client) => async (projectName: string) => {
    try {
      // TODO we need to add a query to get ProjectByName
      const result = await client
        .query<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, {}, { requestPolicy: 'network-only' })
        .toPromise();

      const isUnique = isUniqueName({ name: projectName, list: result.data?.projects.data || [] });

      return { status: isUnique ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate project name' };
    }
  },

  domain: (client: Client) => async (hostname: string) => {
    try {
      const result = await client
        .query<DomainAvailabilityQuery, DomainAvailabilityQueryVariables>(
          DomainAvailabilityDocument,
          { where: { hostname } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the domain hostname');
      }

      return { status: result.data?.domainAvailability ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate domain' };
    }
  },

  email: (client: Client) => async (email: string) => {
    try {
      const result = await client
        .query<EmailAvailabilityQuery, EmailAvailabilityQueryVariables>(
          EmailAvailabilityDocument,
          { where: { email } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the email');
      }

      return { status: result.data?.emailAvailability ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate email' };
    }
  },

  patName: (client: Client) => async (patName: string) => {
    try {
      const result = await client
        .query<PersonalAccessTokensQuery, PersonalAccessTokensQueryVariables>(
          PersonalAccessTokensDocument,
          {},
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      const isUnique = isUniqueName({ name: patName, list: result.data?.personalAccessTokens.data || [] });

      return { status: isUnique ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate PAT name' };
    }
  },

  functionName: (client: Client) => async (functionName: string) => {
    try {
      const result = await client
        .query<FleekFunctionDetailQuery, FleekFunctionDetailQueryVariables>(
          FleekFunctionDetailDocument,
          { where: { name: functionName } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      return { status: result.data?.fleekFunctionByName ? 'invalid' : 'valid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate function name' };
    }
  },

  privateGatewayName: (client: Client) => async (privateGatewayName: string) => {
    try {
      const result = await client
        .query<PrivateGatewayNameAvailabilityQuery, PrivateGatewayNameAvailabilityQueryVariables>(
          PrivateGatewayNameAvailabilityDocument,
          {
            where: { name: privateGatewayName },
          },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the private gateway name');
      }

      return { status: result.data?.privateGatewayNameAvailability ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate private gateway name' };
    }
  },

  templateName:
    (client: Client) =>
    async (name = '') => {
      try {
        const result = await client
          .query<TemplateNameAvailabilityQuery, TemplateNameAvailabilityQueryVariables>(
            TemplateNameAvailabilityDocument,
            { where: { name } },
            { requestPolicy: 'network-only' }
          )
          .toPromise();

        return { status: result.data?.templateNameAvailability ? 'valid' : 'invalid' };
      } catch (error) {
        return { status: 'invalid', message: 'Could not validate template name' };
      }
    },

  pinName: (client: Client, parentId?: string, extension?: string) => async (filename: string) => {
    try {
      if (!parentId) {
        // we don't check pin names in the root folder

        return { status: 'valid' };
      }

      const result = await client
        .query<PinNameAvailabilityInParentFolderQuery, PinNameAvailabilityInParentFolderQueryVariables>(
          PinNameAvailabilityInParentFolderDocument,
          { where: { parentFolderId: parentId }, data: { filename, extension } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the pin name');
      }

      return { status: result.data?.pinNameAvailabilityInParentFolder ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate pin name' };
    }
  },

  folderName: (client: Client, parentId?: string) => async (folderName: string) => {
    try {
      const result = await client
        .query<FolderNameAvailabilityInParentFolderQuery, FolderNameAvailabilityInParentFolderQueryVariables>(
          FolderNameAvailabilityInParentFolderDocument,
          { where: { parentFolderId: parentId }, data: { name: folderName } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the folder name');
      }

      return { status: result.data?.folderNameAvailabilityInParentFolder ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate folder name' };
    }
  },

  siteName: (client: Client) => async (siteName: string) => {
    try {
      const result = await client
        .query<SiteNameAvailabilityQuery, SiteNameAvailabilityQueryVariables>(
          SiteNameAvailabilityDocument,
          { where: { name: siteName } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the site name');
      }

      return { status: result.data?.siteNameAvailability ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate site name' };
    }
  },

  slug: (client: Client) => async (slug: string) => {
    try {
      const result = await client
        .query<SlugAvailabilityQuery, SlugAvailabilityQueryVariables>(
          SlugAvailabilityDocument,
          { where: { slug } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      return { status: result.data?.slugAvailability ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate slug' };
    }
  },

  siteSecret:
    (client: Client, siteId: string = '') =>
    async (key: string) => {
      try {
        const result = await client
          .query<SecretAvailabilityQuery, SecretAvailabilityQueryVariables>(
            SecretAvailabilityDocument,
            { where: { siteId, key } },
            { requestPolicy: 'network-only' }
          )
          .toPromise();

        if (result.error) {
          throw result.error || new Error('There was an error trying to validate the variable name');
        }

        return { status: result.data?.secretAvailability ? 'valid' : 'invalid' };
      } catch (error) {
        return { status: 'invalid', message: 'Could not validate variable name' };
      }
    },

  applicationName: (client: Client) => async (name: string) => {
    try {
      const result = await client
        .query<ApplicationNameAvailabilityQuery, ApplicationNameAvailabilityQueryVariables>(
          ApplicationNameAvailabilityDocument,
          { where: { name } },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (result.error) {
        throw result.error || new Error('There was an error trying to validate the application name');
      }

      return { status: result.data?.applicationNameAvailability ? 'valid' : 'invalid' };
    } catch (error) {
      return { status: 'invalid', message: 'Could not validate application name' };
    }
  },
} as const satisfies Record<string, ExtraValidationFactory>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExtraValidationFactory = (...args: any[]) => (value: string) => Promise<FormController.ExtraValidationResult>;
