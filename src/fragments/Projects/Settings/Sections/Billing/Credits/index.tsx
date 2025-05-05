import { useCredits } from '@/hooks/useCredits';
import { Box, Button, Icon, Text } from '@/ui';

export const Credits = () => {
  const { credits, isCreditsLoading, isCreditsError, refetchCredits } =
    useCredits();

  const handleRefetchCredits = () => {
    refetchCredits();
  };

  if (isCreditsLoading) {
    return (
      <Box
        variant="container"
        className="flex justify-center items-center px-7 min-w-max"
      >
        <Text
          variant="secondary"
          size="2xl"
          className="text-neutral-12"
          weight={700}
        >
          <Icon name="spinner" />
        </Text>
        <Text variant="secondary" size="sm" className="text-neutral-11">
          Fetching Credits
        </Text>
      </Box>
    );
  }

  if (isCreditsError || !credits) {
    return (
      <Box
        variant="container"
        className="flex justify-center items-center px-7 min-w-max"
      >
        <Text
          variant="secondary"
          size="2xl"
          className="text-danger-10"
          weight={700}
        >
          <Icon name="alert-circled" />
        </Text>

        <Text
          variant="secondary"
          className="text-balance max-w-480 text-center"
        >
          Unexpected error fetching credits
        </Text>

        <Button
          intent="neutral"
          onClick={handleRefetchCredits}
          disabled={isCreditsLoading}
        >
          Try again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      variant="container"
      className="flex justify-center items-center px-7 min-w-max"
    >
      <Text
        variant="secondary"
        size="3xl"
        className="text-neutral-12"
        weight={700}
      >
        {credits.formatted}
      </Text>
      <Text variant="secondary" size="sm" className="text-neutral-11">
        Credit balance
      </Text>
    </Box>
  );
};
