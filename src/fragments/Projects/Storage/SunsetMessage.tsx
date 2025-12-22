import { AlertBox } from '@/components';

export const SunsetMessage: React.FC = () => {
  return (
    <AlertBox size="sm" className="font-medium">
      Fleek storage has been sunsetted and you cannot upload new files or
      folders anymore.
    </AlertBox>
  );
};
