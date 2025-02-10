'use client';
import { constants } from '@/constants';
import { Projects } from '@/fragments';
import { Page } from '@/types/App';
import { withAccess } from '@/utils/withAccess';

const AgentsPage: Page = () => {
  return <Projects.Agents.List />;
};

AgentsPage.getLayout = (page) => <Projects.Layout>{page}</Projects.Layout>;

export default withAccess({
  Component: AgentsPage,
  requiredPermissions: [constants.PERMISSION.AGENTS_AI.LIST],
});
