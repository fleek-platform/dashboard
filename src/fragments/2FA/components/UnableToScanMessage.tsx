import { Text } from '@/ui';

type UnableToScanMessageProps = {
  onClick: () => void;
};

export const UnableToScanMessage: React.FC<UnableToScanMessageProps> = ({ onClick }) => (
  <Text className="flex gap-1 whitespace-nowrap flex-wrap">
    Unable to scan this code? Use the
    <Text as="span" onClick={onClick} className="text-accent-11 cursor-pointer hover:underline">
      setup key
    </Text>
    to manually configure your app.
  </Text>
);
