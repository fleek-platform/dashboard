import { ActionBox } from '@/components';
import { constants } from '@/constants';
import { Box } from '@/ui';

export const ExternalLinks = () => (
  <Box className="sm:flex-row gap-4">
    <ActionBox
      icon="bookmark"
      href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_LEARN_MORE}
      title="Fleek Functions guide"
      description="Learn more about functions in the docs."
    />
    <ActionBox
      icon="bulb"
      href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_FUTURE}
      title="Future of Functions"
      description="Read the post about expanding compute."
    />
  </Box>
);
