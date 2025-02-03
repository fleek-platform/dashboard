import { routes } from '@fleek-platform/utils-routes';

import { Link } from '@/components';
import { Box, Button, Text } from '@/ui';

export const SubmitFooter: React.FC = () => (
  <Box className="bg-neutral-2 border-t border-neutral-6">
    <Box className="w-full max-w-[75rem] self-center sm:flex-row gap-4 justify-content sm:justify-between items-center p-7">
      <Text>Submit a Template to Fleek</Text>
      <Link href={routes.profile.settings.templates()}>
        <Button>Submit template</Button>
      </Link>
    </Box>
  </Box>
);
