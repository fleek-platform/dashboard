import { BillingPlansStyles as S } from './BillingPlans.styles';
import { ContactSalesModal } from './ContactSalesModal/ContactSalesModal';
import { Hero } from './Hero/Hero';
import { Layout } from './Layout';
import { PlansTable } from './PlansTable/PlansTable';

export const BillingPlans = {
  Layout,
  Hero,
  Table: PlansTable,
  PlanCardsWrapper: S.PlanCardsWrapper,
  ContactSalesModal: ContactSalesModal,
};
