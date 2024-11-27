import { Link } from '@/components';
import { Box, Icon, Skeleton, Text } from '@/ui';

type ProjectGoBackProps = {
  isLoading?: boolean;
  projectName: string;
  goBackUrl: string;
};

export const ProjectGoBack: React.FC<ProjectGoBackProps> = ({ isLoading = false, projectName, goBackUrl }) => {
  return (
    <Link
      href={goBackUrl}
      className="group flex items-center gap-3 p-2.5 bg-neutral-1 hover:bg-neutral-2 border border-neutral-6 transition-colors ring-0 outline-0 focus-within:ring-2 focus-within:ring-neutral-8 rounded-lg"
    >
      <Box className="size-7 justify-center items-center group-hover:bg-neutral-3 rounded-lg transition-colors shrink-0">
        <Icon name="chevron-left" />
      </Box>
      <Box className="w-full">
        <Text size="xs">Go back</Text>
        {isLoading ? (
          <Skeleton variant="text" className="line-clamp-1 w-2/3 h-3 my-1 shrink-0" />
        ) : (
          <Text variant="primary" weight={500} className="line-clamp-1">
            {projectName}
          </Text>
        )}
      </Box>
    </Link>
  );
};
