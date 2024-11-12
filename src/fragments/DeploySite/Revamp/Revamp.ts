import { AsideContent } from './AsideContent';
import { BackButton } from './BackButton';
import { DeploySiteProvider, useDeploySiteContext } from './DeploySite.context';
import { ProjectChangeGuard } from './ProjectChangeGuard';
import { ConfigureStep } from './Steps/Configure/Configure';
import { CreateTemplateFromRepositoryStep } from './Steps/CreateRepositoryFromTemplate/CreateRepositoryFromTemplate';
import { GitProviderStep } from './Steps/GitProvider/GitProvider';
import { RepositoryStep } from './Steps/Repository/Repository';

export const Revamp = {
  BackButton,

  // Fragments
  AsideContent,
  ProjectChangeGuard,
  Steps: {
    GitProvider: GitProviderStep,
    Repository: RepositoryStep,
    Configure: ConfigureStep,
    CreateRepositoryFromTemplate: CreateTemplateFromRepositoryStep,
  },

  // Context
  Provider: DeploySiteProvider,
  useContext: useDeploySiteContext,
};
