import { routes } from '@fleek-platform/utils-routes';

import { BadgeText, Link } from '@/components';
import { constants } from '@/constants';
import { Project } from '@/types/Project';

export type RenameBadgeProps = {
  selectedProject?: Project;
};

export const RenameBadge: React.FC<RenameBadgeProps> = ({
  selectedProject,
}) => {
  const shouldShowRenameBadge =
    selectedProject?.name === constants.FIRST_PROJECT_NAME;

  if (!shouldShowRenameBadge) {
    return null;
  }

  return (
    <Link
      href={routes.project.settings.general({ projectId: selectedProject?.id })}
    >
      <BadgeText colorScheme="slate" hoverable>
        Name it!
      </BadgeText>
    </Link>
  );
};
