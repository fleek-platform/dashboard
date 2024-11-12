import { useRouter } from '@/hooks/useRouter';
import { Button } from '@/ui';

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Button iconLeft="arrow-left" intent="neutral" onClick={handleBackClick}>
      Go back
    </Button>
  );
};
