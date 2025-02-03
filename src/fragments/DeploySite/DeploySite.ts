import { AsideContent } from './AsideContent';
import { BackButton } from './BackButton';
import { sourceProviderLabel } from './DeploySite.constants';
import {
  DeploySiteContext,
  DeploySiteProvider,
  useDeploySiteContext,
} from './DeploySite.context';
import { Grid } from './Grid';
import { Layout } from './Layout';
import { ProjectChangeGuard } from './ProjectChangeGuard';
import { ConfigureStep } from './Steps/Configure/Configure';
import { CreateTemplateFromRepositoryStep } from './Steps/CreateRepositoryFromTemplate/CreateRepositoryFromTemplate';
import { GitProviderStep } from './Steps/GitProvider/GitProvider';
import { RepositoryStep } from './Steps/Repository/Repository';

export const DeploySite = {
  // layout
  Layout,
  Grid,
  BackButton,

  // fragments
  Steps: {
    GitProvider: GitProviderStep,
    Repository: RepositoryStep,
    Configure: ConfigureStep,
    CreateRepositoryFromTemplate: CreateTemplateFromRepositoryStep,
  },
  AsideContent,
  ProjectChangeGuard,

  // context
  Provider: DeploySiteProvider,
  useContext: useDeploySiteContext,

  // constants
  constants: {
    sourceProviderLabel,
  },
};

export namespace DeploySite {
  export type Context = DeploySiteContext;
}
