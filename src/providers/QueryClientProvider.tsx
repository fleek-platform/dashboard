import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query';

import { ChildrenProps } from '@/types/Props';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryClientProvider: React.FC<ChildrenProps> = ({ children }) => <Provider client={queryClient}>{children}</Provider>;
