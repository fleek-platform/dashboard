import { DetailsLayout } from './Details/DetailsLayout/DetailsLayout';
import { SimilarTemplates } from './Details/SimilarTemplates/SimilarTemplates';
import { Explorer } from './List/Explorer/Explorer';
import { Filter } from './List/Filter/Filter';
import { Hero as ListHero } from './List/Hero/Hero';
import { ListLayout } from './List/ListLayout/ListLayout';
import { TemplateStyles } from './Template.styles';
import { TemplateCard } from './TemplateCard/TemplateCard';
import { TemplateContent } from './TemplateContent/TemplateContent';
import { TemplateDetails } from './TemplateDetails/TemplateDetails';
import { TemplateOverview } from './TemplateOverview/TemplateOverview';
import { TemplateUpdateModal } from './TemplateUpdateModal';

export const Template = {
  List: {
    Layout: ListLayout,
    Elements: {
      Hero: ListHero,
      Explorer: Explorer,
      Filter,
    },
  },

  Details: {
    Layout: DetailsLayout,
    Elements: {
      SimilarTemplates,
      Content: TemplateContent,
      Overview: TemplateOverview,
      Details: TemplateDetails,
      Spacer: TemplateStyles.Details.Spacer,
    },
  },

  Elements: {
    Overview: TemplateOverview,
    Card: TemplateCard,
  },

  UpdateModal: TemplateUpdateModal,
};
