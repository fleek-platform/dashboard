import { Input } from '@/ui';

export const SearchBar: React.FC = () => {
  return (
    <Input.Root>
      <Input.Icon name="magnify" />
      <Input.Field placeholder="Search Templates" />
    </Input.Root>
  );
};
